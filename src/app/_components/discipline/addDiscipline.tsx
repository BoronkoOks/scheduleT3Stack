import {BookOpenIcon, PlusIcon} from "@heroicons/react/16/solid"
import { createDiscipline } from "~/app/api/action/discipline"
import {divForm, updateButtonStyle} from "~/styles/daisystyles"

export function AddDiscipline () {
    const divField = "flex align-middle mb-4"
    const inputClassStyle = "input border-2 boder-dashed"

    return (
        <div className = "border-2 border-green-700 bg-white rounded-lg">
        <details className = "collapse" tabIndex={0}>
            <summary className = "collapse-title text-xl font-medium">
                <div className = "flex">
            <PlusIcon  className = "w-6" /> <BookOpenIcon className = "w-6" />
            </div>
            </summary>
            <form className = "collapse-content form-control " action = {createDiscipline} >
                <label>Название</label>
                <input
                    type="text"
                    name="name"
                    required
                    className={inputClassStyle + " w-full my-2"}
                />
                <div className = "flex align-middle">
                    <label className = "mt-2 mr-2">Семестров</label>
                    <input
                        type="number"
                        min = "1"
                        max = "10"
                        name = "semesters"
                        className={inputClassStyle + " w-16 mb-1"}
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
                <div className = "mb-1">
                    <button type="submit" className={updateButtonStyle + " w-full"}>
                        Добавить
                    </button>
                </div> 
            </form>
        </details>
        </div>
    )
}
