import {UserPlusIcon} from "@heroicons/react/16/solid"
import { createTeacher } from "~/app/api/action/teacher"
import {divForm} from "~/styles/daisystyles"

export function AddTeacher () {
    // const divForm = "flex max-w-xs flex-col space-y-2 mx-5 py-4 px-5 border-2 border-green-800 bg-white"
  const inputClassStyle = "input input-bordered"

    return (
        <details className = "collapse bg-green-200" tabIndex={0}>
            <summary className = "collapse-title text-xl font-medium">
                <UserPlusIcon className = "w-6" />
            </summary>
            <form className = "collapse-content form-control" action = {createTeacher} >
            <div className={divForm}>
                <label>Фамилия</label>
                <input
                    type="text"
                    name="surname"
                    required
                    className={inputClassStyle}
                />
                <label>Имя</label>
                <input
                    type="text"
                    name="name"
                    required
                    className={inputClassStyle}
                />
                <label>Отчество</label>
                <input
                    type="text"
                    name="fathername"
                    required
                    className={inputClassStyle}
                />
                <button type="submit" className="btn bg-green-500 border-2 border-green-700 mt-3 hover:text-gray-50 hover:bg-green-700">
                    Добавить
                </button>
                </div> 
            </form>
        </details>
    )
}
