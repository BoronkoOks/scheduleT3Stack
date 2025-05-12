import Link from "next/link";
import React, { Suspense } from "react"
import { db } from "~/server/db"
import { metadata } from "~/app/layout"
import {divForm, updateButtonStyle, deleteButtonStyle} from "~/styles/daisystyles"
import { Group } from "@prisma/client"
import { deleteGroup, updateGroup } from "~/app/api/action/group";


export async function GroupInfoMODE ({groupId} : {groupId: string}) {
    const inputClassStyle = "input input-bordered"
    const divField = "flex align-middle"

    const specialities = await db.speciality.findMany({
        orderBy: {
            name: "asc"
        }
    })

    const group = await db.group.findUnique(
            {
                where: { id: groupId },
                include: {
                    speciality: true
                }
            }
        )
    
        if (!group) {
            return (
                <main><h1>Группа не найдена</h1></main>
            )
        }


    return (
        <main>
        <div>
            <form action={updateGroup} className="form-control" >
                <div>
                    <input type="hidden" name="id" defaultValue={group.id ?? ""} />

                    <div className = {divField}>
                        <label className = "mt-2 mr-2">Название</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="input input-bordered w-16 ml-2"
                            defaultValue={group.name ?? ""}
                        />
                    </div>
                    <div className = {divField + " mt-2"}>
                    <label className = "mt-2 mr-2">Студентов</label>
                    <input
                        type="number"
                        min = "0"
                        name="students"
                        className={"input input-bordered w-16"}
                        defaultValue = {group.students ?? 0}
                    />
                </div>
                    <div className = {divField + " mt-2"}>
                    <label className = "mt-2 mr-2">Год поступления</label>
                    <input
                        type="number"
                        min = "0"
                        name="year"
                        className={"input input-bordered w-20"}
                        defaultValue = {group.year ?? 0}
                        />
                    </div>
                    <div className={divField + " mt-2"}>
                        <label>Специальность</label>
                        <select name="specialityId" className = "ml-4"
                        defaultValue={group.specialityId}
                        >
                        {
                            specialities.map(s =>
                                <option key = {s.id} value={s.id}>{s.code + " " + s.name}</option>
                            )
                        }
                        </select>
                    </div>
                    <div>
                        <button type="submit" className={updateButtonStyle + " w-1/3"}>
                            Обновить
                        </button>
                    </div>
                </div>
            </form>
            <form action={deleteGroup} className="form-control">
                <div className = "mt-4">
                    <input type="hidden" name="id" defaultValue={group.id ?? ""} />
                    <button type="submit" className={deleteButtonStyle + " w-1/3"}>
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
      <div>
        <p><b>Название:</b> {group.name}</p>
        <p><b>Студентов:</b> {group.students}</p>
        <p><b>Год поступления:</b> {group.year}</p>
        <p><b>Специальность: </b>{group.speciality.code} {group.speciality.name}</p>
      </div>
    )
}

