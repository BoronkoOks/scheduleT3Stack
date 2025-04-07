import {BookOpenIcon, PlusIcon} from "@heroicons/react/16/solid"
import { createDiscipline } from "~/app/api/action/discipline"
import {divForm} from "~/styles/daisystyles"

export function AddDiscipline () {
    const inputClassStyle = "input input-bordered"

    return (
        <details className = "collapse" tabIndex={0}>
            <summary className = "collapse-title text-xl font-medium">
                <div className = "flex">
            <PlusIcon  className = "w-6" /> <BookOpenIcon className = "w-6" />
            </div>
            </summary>
            <form className = "collapse-content form-control " action = {createDiscipline} >
            <div className={divForm + " w-full"}>
                <label>Название</label>
                <input
                    type="text"
                    name="name"
                    required
                    className={inputClassStyle + " w-full"}
                />
                <div className = "flex align-middle">
                    <label className = "mt-2 mr-2">Семестров</label>
                    <input
                        type="number"
                        min = "1"
                        max = "10"
                        name="semesters"
                        className={inputClassStyle + " w-16"}
                    />
                </div>
                    <div className = "flex align-middle">
                        <label className = "mt-1  mb-4">Деление на подгруппы</label>
                        <input
                            type="checkbox"
                            name="subgroups"
                            className = "mt-2 ml-2 mb-4"
                        />
                    </div>
                    <button type="submit" className="btn bg-green-500 border-2 border-green-700 mt-3 hover:text-gray-50 hover:bg-green-700">
                        Добавить
                    </button>
                </div> 
            </form>
        </details>
    )
}
