import Link from "next/link";
import React, { Suspense } from "react"
import { db } from "~/server/db"
import { metadata } from "~/app/layout"
import {divForm, updateButtonStyle, deleteButtonStyle} from "~/styles/daisystyles"
import { Classroom } from "@prisma/client"


export function ClassroomInfoMODE ({classroom} : {classroom: Classroom}) {
    return (
        <main>
        <div>
          <form 
          // action={updateClassroom}
          className="form-control">
          <div className = "pl-6"
          //className={divForm + " border-b-0"}
          >
            <input type="hidden" name="id" defaultValue={classroom.id ?? ""} />
            <div className = "flex align-middle">
            <label  className = "mt-2 mr-2">Название</label>
              <input
                type="text"
                name="name"
                required
                className="input input-bordered w-40"
                defaultValue={classroom.name ?? ""}
              />
            </div>
          <div className = "flex align-middle mt-2">
            <div className = "flex align-middle mt-4">
              <label className = "mt-2 mr-2">Мест</label>
              <input
                type="number"
                min = "0"
                name="seats"
                className={"input input-bordered w-16"}
                defaultValue = {classroom.seats || 0}
              />
          </div>
            <div className = "flex align-middle mt-4 ml-4">
              <label className = "mt-2 mr-2">Компьютеров</label>
              <input
                type="number"
                min = "0"
                name="computers"
                className={"input input-bordered w-16"}
                defaultValue = {Number(classroom.computers) || 0}
                />
            </div>
          </div>
            <div className = "flex align-middle mt-4">
              <label>Проектор</label>
              <input
                  type="checkbox"
                  name="subgroups"
                  className = "mt-2 ml-2 mb-4"
                  defaultChecked = {classroom.projector ?? false}
              />
          </div>

            <button type="submit" className={updateButtonStyle + " ml-2"}>
              Обновить
            </button>
          </div>
        </form>
        <form //action={deleteClassroom}
         className="form-control">
          <div className = "mt-6 ml-9"
          //className={divForm + " border-t-0"}
          >
            <input type="hidden" name="id" defaultValue={classroom.id ?? ""} />
            <button type="submit" className={deleteButtonStyle}>
              Удалить
            </button>
          </div>
        </form>
      </div>
      </main>
    )
}


export function ClassroomInfo ({classroom} : {classroom: Classroom}) {
    return (
      <div className = "m-4">
        <p><b>Название:</b> {classroom.name}</p>
        <p><b>Мест:</b> {classroom.seats}</p>
        <p><b>Компьютеров:</b> {classroom.computers}</p>
        <p><b>Проектор:</b> {classroom.projector? "есть" : "нет"}</p>
      </div>
    )
}

