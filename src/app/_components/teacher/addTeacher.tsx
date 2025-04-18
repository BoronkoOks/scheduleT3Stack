import {UserPlusIcon} from "@heroicons/react/16/solid"
import { createTeacher } from "~/app/api/action/teacher"
import { updateButtonStyle, divForm } from "~/styles/daisystyles"

export function AddTeacher () {
    const divField = "flex align-middle mb-4"
    const inputClassStyle = "input input-bordered"

    return (
        <div className = "border-2 border-green-700 bg-white rounded-lg">
        <details className = "collapse" tabIndex={0}>
            <summary className = "collapse-title text-xl font-medium">
                <UserPlusIcon className = "w-6" />
            </summary>
            <form className = "collapse-content form-control pt-4"
             action = {createTeacher} >
            <div className= {divField}>
                <label className = "mr-2 mt-1">Фамилия</label>
                <input
                    type="text"
                    name="surname"
                    required
                    className={inputClassStyle}
                />
            </div>
                <div className= {divField}>
                <label className = "mr-12 mt-1">Имя</label>
                <input
                    type="text"
                    name="name"
                    required
                    className={inputClassStyle}
                />
                </div>
                <div className= {divField}>
                <label className = "mr-2 mt-2">Отчество</label>
                <input
                    type="text"
                    name="fathername"
                    required
                    className={inputClassStyle}
                />
                </div>
                <div className= {divField}>
                <button type="submit" className={updateButtonStyle + " ml-24"}>
                    Добавить
                </button>
                </div> 
            </form>
        </details>
        </div>
    )
}
