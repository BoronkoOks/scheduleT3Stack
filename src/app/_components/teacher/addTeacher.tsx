import {UserPlusIcon} from "@heroicons/react/16/solid"
import { createTeacher } from "~/app/api/action/teacher"
import { updateButtonStyle, divForm } from "~/styles/daisystyles"

export function AddTeacher () {
    // const divForm = "flex max-w-xs flex-col space-y-2 mx-5 py-4 px-5 border-2 border-green-800 bg-white"
  const inputClassStyle = "input input-bordered"

    return (
        <details className = "collapse" tabIndex={0}>
            <summary className = "collapse-title text-xl font-medium">
                <UserPlusIcon className = "w-6" />
            </summary>
            <form className = "collapse-content form-control bg-white pt-4"
             action = {createTeacher} >
            <div className= "flex align-middle mb-4">
                <label className = "mr-2 mt-1">Фамилия</label>
                <input
                    type="text"
                    name="surname"
                    required
                    className={inputClassStyle}
                />
                </div>
                <div className= "flex align-middle mb-4">
                <label className = "mr-12 mt-1">Имя</label>
                <input
                    type="text"
                    name="name"
                    required
                    className={inputClassStyle}
                />
                </div>
                <div className= "flex align-middle mb-4">
                <label className = "mr-2 mt-2">Отчество</label>
                <input
                    type="text"
                    name="fathername"
                    required
                    className={inputClassStyle}
                />
                </div>
                <div className= "flex align-middle mb-4">
                <button type="submit" className={updateButtonStyle + " ml-24"}>
                    Добавить
                </button>
                </div> 
            </form>
        </details>
    )
}
