import React, { Suspense } from "react"
import {updateButtonStyle} from "~/styles/daisystyles"
import { Teacher } from "@prisma/client"
import { deleteTeacher, updateTeacher } from "~/app/api/action/teacher"


export function TeacherInfoMODE ({teacher}: {teacher: Teacher}) {
    const divField = "flex align-middle mb-4"
    const inputClassStyle = "input input-bordered"
    const deleteButtonStyle = "btn bg-red-500 border-2 border-red-800 hover:text-gray-50 hover:bg-red-700"

    return (
        <main>
        <div>
            <form action={updateTeacher} className="form-control">
                <input type="hidden" name="id" defaultValue={teacher.id ?? ""} />

                <div className = {divField}>
                    <label className = "mr-2 mt-2">Фамилия</label>
                    <input
                        type="text"
                        name="surname"
                        required
                        className={inputClassStyle}
                        defaultValue={teacher.surname ?? ""}
                    />
                </div>
                <div className = {divField}>
                    <label className = "mr-12 mt-2">Имя</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className={inputClassStyle}
                        defaultValue={teacher.name ?? ""}
                    />
                </div>
                <div className = {divField}>
                    <label className = "mr-2 mt-2">Отчество</label>
                    <input
                        type="text"
                        name="fathername"
                        required
                        className={inputClassStyle}
                        defaultValue={teacher?.fathername ?? ""}
                    />
                </div>
                <div>
                    <button type="submit" className={updateButtonStyle + " w-full"}>
                        Обновить
                    </button>
                </div>
            </form>
            <form action={deleteTeacher} className="form-control">
                <div className = "mt-4">
                    <input type="hidden" name="id" defaultValue={teacher.id ?? ""} />

                    <button type="submit" className = {deleteButtonStyle + " w-full"}>
                        Удалить
                    </button>
                </div>
            </form>
        </div>
        </main>
    )
}


export function TeacherInfo ({teacher}: {teacher: Teacher}) {
    return (
        <div>
            <p><b>Фамилия:</b> {teacher.surname}</p>
            <p><b>Имя:</b> {teacher.name}</p>
            <p><b>Отчество:</b> {teacher.fathername}</p>
        </div>
    )
}
