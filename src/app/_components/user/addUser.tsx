import {UserPlusIcon} from "@heroicons/react/16/solid"
import { createGroup } from "~/app/api/action/group"
import { createUser } from "~/app/api/action/user"
import { db } from "~/server/db"
import { updateButtonStyle } from "~/styles/daisystyles"

export async function AddUser () {
    const divField = "flex align-middle"
    const inputClassStyle = "input input-bordered"

    const teachers = await db.teacher.findMany({
        where: {
            userId: null
        },
        orderBy: {
            surname: "asc"
        }
    })

    return (
        <div className = "border-2 border-green-700 bg-white rounded-lg">
        <details className = "collapse" tabIndex={0}>
            <summary className = "collapse-title text-xl font-medium">
                <UserPlusIcon  className = "w-6" />
            </summary>
            <form className = "collapse-content form-control" action = {createUser}>
                <input type="hidden" name="id" defaultValue="" />

                <div className = {divField}>
                    <label className = "mt-2 mr-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className= {inputClassStyle + " ml-2"}
                    />
                </div>
                <div className = {divField + " mt-2"}>
                    <label className = "mr-5">Роль</label>
                    <select name = "role" defaultValue = "STUDENT">
                        <option value= "STUDENT" >STUDENT</option>
                        <option value= "TEACHER" >TEACHER</option>
                        <option value= "ADMIN" >ADMIN</option>
                    </select>
                </div>
                <div className = {divField + " mt-2"}>
                    <label className = "mr-2">Преподаватель</label>
                    <select name = "teacherId" defaultValue = "">
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
                <div className = "mb-1 flex items-center">
                    <button type="submit" className={updateButtonStyle + " w-2/3 mx-16"}>
                        Добавить
                    </button>
                </div>
        </form>
    </details>
    </div>
    )
}