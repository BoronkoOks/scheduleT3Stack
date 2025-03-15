import Link from "next/link";
import React from "react";
import { updateTeacher, deleteTeacher } from "~/app/api/action/teacher";
import { db } from "~/server/db";
import { metadata } from "~/app/layout"
import {divForm} from "~/styles/daisystyles"


export default async function Page(props: { params: Promise<{ id: string }> }
) {
  const params = await props.params

  const teacher = await db.teacher.findUnique(
    {
      where: { id: params.id }
    }
  )

  if (!teacher) {
    // metadata.title = "404"

    return (
        <main><h1>Преподаватель не найден</h1></main>
    )
  }

  const pageTitle = "Информация о преподавателе"

  // metadata.title = pageTitle

  // const divForm = "flex max-w-xs flex-col space-y-2 mx-5 py-4 px-5 border-2 border-green-800 bg-white"
  const inputClassStyle = "input input-bordered"

  return (
    <main>
      <form 
        action={updateTeacher}
        className="form-control">
        <div className={divForm + " border-b-0"}>
        <label className = "font-bold">{pageTitle}</label>
          <input type="hidden" name="id" defaultValue={teacher.id ?? ""} />
          <label>Фамилия</label>
          <input
            type="text"
            name="surname"
            required
            className={inputClassStyle}
            defaultValue={teacher.surname ?? ""}
          />
          <label>Имя</label>
          <input
            type="text"
            name="name"
            required
            className={inputClassStyle}
            defaultValue={teacher.name ?? ""}
          />
          <label>Отчество</label>
          <input
            type="text"
            name="fathername"
            required
            className={inputClassStyle}
            defaultValue={teacher?.fathername ?? ""}
          />
          <button type="submit" className="btn bg-green-500 border-2 border-green-700 mt-3 hover:text-gray-50 hover:bg-green-700">
            Обновить
          </button>
        </div>
      </form>
      <form action={deleteTeacher} className="form-control">
        <div className={divForm + " border-t-0"}>
          <input type="hidden" name="id" defaultValue={teacher.id ?? ""} />
          <button type="submit" className="btn bg-red-500 border-2 border-red-800 hover:text-gray-50 hover:bg-red-700">
            Удалить
          </button>
        </div>
      </form>
    </main>
  );
}