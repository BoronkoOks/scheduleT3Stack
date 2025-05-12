import {PlusIcon, UserGroupIcon} from "@heroicons/react/16/solid"
import { createGroup } from "~/app/api/action/group"
import { db } from "~/server/db"
import { updateButtonStyle, divForm } from "~/styles/daisystyles"

export async function AddGroup () {
    const divField = "flex align-middle"
    const inputClassStyle = "input input-bordered"

    const specialities = await db.speciality.findMany({
        orderBy: {
            name: "asc"
        }
    })

    return (
        <div className = "border-2 border-green-700 bg-white rounded-lg">
        <details className = "collapse" tabIndex={0}>
            <summary className = "collapse-title text-xl font-medium">
                <div className = "flex">
                    <PlusIcon  className = "w-6" />
                    <UserGroupIcon className = "w-6" />
                </div>
            </summary>
            <form className = "collapse-content form-control" action = {createGroup} >
                <input type="hidden" name="id" defaultValue="" />
            <div className="flex">
                <div className = {divField}>
                <label className = "mt-2 mr-2">Название</label>
                <input
                    type="text"
                    name="name"
                    required
                    className= {inputClassStyle + " w-16 ml-2"}
                />
                </div>
                <div className = {divField + " ml-4"}>
                <label className = "mt-2 mr-2">Студентов</label>
                <input
                    type="number"
                    min = "0"
                    name="students"
                    className={inputClassStyle + " w-16"}
                    defaultValue = "0"
                />
            </div>
            </div>
            <div className = {divField + " mt-2"}>
                <label className = "mt-2 mr-2">Год поступления</label>
                <input
                    type="number"
                    min = "0"
                    max = {Number(new Date().getFullYear())}
                    name="year"
                    className={inputClassStyle + " w-20"}
                    defaultValue = {Number(new Date().getFullYear())}
                />
            </div>
            <div className="mt-4 mr-4">
                <label>Специальность</label>
                <select name = "specialityId" className = " w-full">
                {
                    specialities.map(s =>
                        <option key = {s.id} value={s.id}>{s.code + " " + s.name}</option>
                    )
                }
                </select>
            </div>
            <div className = "mb-1 flex items-center">
                <button type="submit" className={updateButtonStyle + " w-2/3 ml-20"}>
                    Добавить
                </button>
            </div>
        </form>
    </details>
    </div>
    )
}