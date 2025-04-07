import Link from "next/link";
import React, { Suspense } from "react"
import { db } from "~/server/db"
import { metadata } from "~/app/layout"
import {divForm, updateButtonStyle, deleteButtonStyle} from "~/styles/daisystyles"
import { Teacher } from "@prisma/client"


export function TeacherInfoMODE ({teacher}: {teacher: Teacher}) {
    const inputClassStyle = "input input-bordered"

    return (
        <main>
            <div>
                <form 
                    // action={updateTeacher}
                    className="form-control pt-4 ml-4">
                    
                    <input type="hidden" name="id" defaultValue={teacher.id ?? ""} />
                    <div className= "flex align-middle mb-4">
                    <label className = "mr-2 mt-2">Фамилия</label>
                    <input
                        type="text"
                        name="surname"
                        required
                        className={inputClassStyle}
                        defaultValue={teacher.surname ?? ""}
                    />
                    </div>
                    <div className= "flex align-middle mb-4">
                    <label className = "mr-12 mt-2">Имя</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className={inputClassStyle}
                        defaultValue={teacher.name ?? ""}
                    />
                    </div>
                    <div className= "flex align-middle mb-4">
                    <label className = "mr-2 mt-2">Отчество</label>
                    <input
                        type="text"
                        name="fathername"
                        required
                        className={inputClassStyle}
                        defaultValue={teacher?.fathername ?? ""}
                    />
                    </div>
                    <div className= "flex align-middle mb-4">
                    <button type="submit" className={updateButtonStyle + " ml-14"}>
                        Обновить
                    </button>
                    </div>
                </form>
                <form 
                // action={deleteTeacher} 
                className="form-control">
                    <div //className={divForm + " border-t-0"}
                        className = "ml-20"
                    >
                    <input type="hidden" name="id" defaultValue={teacher.id ?? ""} />
                    <button type="submit" className = {deleteButtonStyle + "-ml-1"}>
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
        <div className = "m-4">
            <p><b>Фамилия:</b> {teacher.surname}</p>
            <p><b>Имя:</b> {teacher.name}</p>
            <p><b>Отчество:</b> {teacher.fathername}</p>
        </div>
    )
}
