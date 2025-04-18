import Link from "next/link";
import React, { Suspense } from "react"
import { db } from "~/server/db"
import { metadata } from "~/app/layout"
import {divForm, updateButtonStyle, deleteButtonStyle} from "~/styles/daisystyles"
import { Discipline } from "@prisma/client"
import { updateDiscipline, deleteDiscipline } from "~/app/api/action/discipline";


export function DisciplineInfoMODE ({discipline} : {discipline: Discipline}) {
    const inputClassStyle = "input input-bordered"

    return (
        <main>
            <div>
            <form action={updateDiscipline} className = "form-control">
                <div>
                    <input type="hidden" name="id" defaultValue={discipline.id ?? ""} />

                    <div className = "flex align-middle">
                        <label className = "mt-2 mr-2">Название</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className={inputClassStyle + " w-96"}
                            defaultValue = {discipline.name ?? ""}
                        />
                    </div>
                    <div className = "flex align-middle mt-2">
                        <label className = "mt-2 mr-2">Семестров</label>
                        <input
                            type="number"
                            min = "1"
                            max = "10"
                            name="semesters"
                            className={inputClassStyle + " w-16 mb-1"}
                            defaultValue = {Number(discipline.semesters) || ""}
                        />
                    </div>
                    <div className = "flex align-middle">
                        <label className = "mt-1  mb-4">Деление на подгруппы</label>
                        <input
                            type="checkbox"
                            name="subgroups"
                            className = "mt-2 ml-2 mb-4"
                            defaultChecked = {discipline.subgroups ?? false}
                        />
                    </div>
                    <div>
                        <button type="submit" className={updateButtonStyle + " w-2/3"}>
                            Обновить
                        </button>
                    </div>
                </div>
            </form>
            <form action={deleteDiscipline} className="form-control">
                <div className = "mt-4">
                    <input type="hidden" name="id" defaultValue={discipline.id ?? ""} />
                    <button type="submit" className={deleteButtonStyle + " w-2/3"}>
                        Удалить
                    </button>
                </div>
            </form>
            </div>
        </main>
    )
}


export function DisciplineInfo ({discipline} : {discipline: Discipline}) {
    return (
        <div className = "my-4">
            <p><b>Название:</b> {discipline.name}</p>
            <p><b>Семестров:</b> {discipline?.semesters ?? "все"}</p>
            <p><b>Деление на подгруппы:</b> {discipline.subgroups ? "да": "нет"}</p>
        </div>
    )
}
