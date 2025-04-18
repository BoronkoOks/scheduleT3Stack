import Link from "next/link";
import React, { Suspense } from "react"
import { db } from "~/server/db"
import { metadata } from "~/app/layout"
import {divForm, updateButtonStyle, deleteButtonStyle} from "~/styles/daisystyles"
import { Group } from "@prisma/client"


export async function GroupInfoMODE ({group} : {group: Group}) {
    // const specialities = await db.speciality.findMany()

    return (
        <main>
        <div>
            <form 
            // action={updateClassroom}
            className="form-control">
                <div className = "pl-6"
                //className={divForm + " border-b-0"}
                >
                    <input type="hidden" name="id" defaultValue={group.id ?? ""} />
                    <div className = "flex align-middle">
                    <label  className = "mt-2 mr-2">Название</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="input input-bordered w-40"
                        defaultValue={group.name ?? ""}
                    />
                    </div>
                    <div className = "flex align-middle mt-4">
                    <label className = "mt-2 mr-2">Студентов</label>
                    <input
                        type="number"
                        min = "0"
                        name="students"
                        className={"input input-bordered w-16"}
                        defaultValue = {group.students ?? 0}
                    />
                </div>
                    <div className = "flex align-middle mt-4">
                    <label className = "mt-2 mr-2">Год поступления</label>
                    <input
                        type="number"
                        min = "0"
                        name="year"
                        className={"input input-bordered w-20"}
                        defaultValue = {group.year ?? 0}
                        />
                    </div>
                    <div className="mt-4 mr-4">
                    <label>Специальность</label>
                    <select
                        name="subgroups"
                          className = "ml-4"
                        defaultValue = {`${group.speciality.code} ${group.speciality.name}`}
                    >
                        <option>{`${group.speciality.code} ${group.speciality.name}`}</option>
                    </select>
                    </div>

                    <button type="submit" className={updateButtonStyle + " ml-2 mt-4"}>
                        Обновить
                    </button>
                </div>
            </form>
            <form //action={deleteClassroom}
                className="form-control">
                <div className = "mt-6 ml-9"
                //className={divForm + " border-t-0"}
                >
                    <input type="hidden" name="id" defaultValue={group.id ?? ""} />
                    <button type="submit" className={deleteButtonStyle}>
                    Удалить
                    </button>
                </div>
            </form>
        </div>
        </main>
    )
}


export function GroupInfo ({group} : {group: Group}) {
    return (
      <div className = "m-4">
        <p><b>Название:</b> {group.name}</p>
        <p><b>Студентов:</b> {group.students}</p>
        <p><b>Год поступления:</b> {group.year}</p>
        <p><b>Специальность: </b>{group.speciality.code} {group.speciality.name}</p>
      </div>
    )
}

