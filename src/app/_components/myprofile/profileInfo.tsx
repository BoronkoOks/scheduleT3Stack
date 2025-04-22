import React from "react"
import { db } from "~/server/db"
import {updateButtonStyle, deleteButtonStyle} from "~/styles/daisystyles"
import { User } from "@prisma/client"
import { deleteUser, updateUser } from "~/app/api/action/user";
import { updateProfile } from "~/app/api/action/myprofile";


export async function ProfileInfoMODE ({user} : {user: User}) {
    const inputClassStyle = "input input-bordered"
    const divField = "flex align-middle"

    return (
        <div >
            <form action={updateProfile} className="form-control" >
                <div>
                    <input type="hidden" name="id" defaultValue={user.id ?? ""} />

                    <div className = {divField}>
                        <label className = "mt-2">Имя</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className= {inputClassStyle + " ml-6"}
                            defaultValue={user.name ?? ""}
                        />
                    </div>
                    <div className = {divField + " mt-2"}>
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
                        <label className = "mr-2">Роль: </label>{user.role}
                        {user?.teacher && <> ({user.teacher.surname} {user.teacher.name} {user.teacher.fathername})</>}
                    </div>
                    <div>
                        <button type="submit" className={updateButtonStyle + " w-full"}>
                            Обновить
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}