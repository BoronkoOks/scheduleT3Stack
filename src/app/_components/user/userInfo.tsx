import React, { Suspense } from "react"
import { db } from "~/server/db"
import {updateButtonStyle, deleteButtonStyle} from "~/styles/daisystyles"
import { User } from "@prisma/client"
import { deleteUser, updateUser } from "~/app/api/action/user";


export async function UserInfoMODE ({user} : {user: User}) {
    const inputClassStyle = "input input-bordered"
    const divField = "flex align-middle"

    const teachers = await db.teacher.findMany({
        where: {
            userId: null
        },
        orderBy: {
            surname: "asc"
        }
    })

    return (
        <main>
        <div>
            <form action={updateUser} className="form-control" >
                <div>
                    <input type="hidden" name="id" defaultValue={user.id ?? ""} />

                    <div className = {divField}>
                        <label className = "mt-2 mr-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className= {inputClassStyle + " ml-2"}
                            defaultValue={user.email ?? ""}
                        />
                    </div>
                    <div className = {divField + " mt-2"}>
                        <label className = "mr-2">Роль</label>
                        <select name = "role" defaultValue = {user.role}>
                            <option value= "STUDENT" >STUDENT</option>
                            <option value= "TEACHER" >TEACHER</option>
                            <option value= "ADMIN" >ADMIN</option>
                        </select>
                    </div>

                    <div className = {divField + " mt-2"}>
                        <label className = "mr-2">Преподаватель</label>

                        <input type="hidden" name="teacherId_old" defaultValue = {user?.teacher?.id ?? ""} />

                        <select name = "teacherId" defaultValue = {user?.teacher?.id ?? ""}>
                            {user?.teacher && 
                                <option key={user.teacher.id} value={user.teacher.id}>
                                    {user.teacher.surname + " " + user.teacher.name + " " + user.teacher.fathername}
                                </option>
                            }
                            <option key = "" value = "">не преподаватель</option>
                            {
                                teachers.map(t => 
                                    <option key = {t.id} value = {t.id}>
                                        {t.surname + " " + t.name + " " + t.fathername}
                                    </option>
                                )
                            }
                        </select>
                    </div>
                    <div>
                        <button type="submit" className={updateButtonStyle + " w-2/3"}>
                            Обновить
                        </button>
                    </div>
                </div>
            </form>
            <form action={deleteUser} className="form-control">
                <div className = "mt-4">
                    <input type="hidden" name="id" defaultValue={user.id ?? ""} />
                    <button type="submit" className={deleteButtonStyle + " w-2/3"}>
                        Удалить
                    </button>
                </div>
            </form>
        </div>
        </main>
    )
}


export function UserInfo ({user} : {user: User}) {
    return (
      <div>
        <div className="m-4">
        <h1 className = "mb-4 font-bold">403 forbidden</h1>
            Вам тут делать нечего.
        </div>
      </div>
    )
}
