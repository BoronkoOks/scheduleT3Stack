import {PlusIcon} from "@heroicons/react/16/solid"
import { updateButtonStyle, divForm } from "~/styles/daisystyles"

export function AddGroup () {
    const inputClassStyle = "input input-bordered"

    return (
        <details className = "collapse" tabIndex={0}>
            <summary className = "collapse-title text-xl font-medium">
                <div className = "flex">
                    <PlusIcon  className = "w-6" />
                </div>
            </summary>
            <form className = "collapse-content form-control "
            // action = {createDiscipline}
            >
          <div //className = "pl-3"
          className={divForm + "w-500"}
          >
            <input type="hidden" name="id" defaultValue="" />
                    <div className = "flex align-middle">
                    <label  className = "mt-2 mr-2">Название</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="input input-bordered w-40"
                    />
                    </div>
                    <div className = "flex align-middle mt-4">
                    <label className = "mt-2 mr-2">Студентов</label>
                    <input
                        type="number"
                        min = "0"
                        name="students"
                        className={"input input-bordered w-16"}
                        defaultValue = "0"
                    />
                </div>
                    <div className = "flex align-middle mt-4">
                    <label className = "mt-2 mr-2">Год поступления</label>
                    <input
                        type="number"
                        min = "0"
                        name="year"
                        className={"input input-bordered w-20"}
                        defaultValue = "2025"
                        />
                    </div>
                    <div className="mt-4 mr-4">
                    <label>Специальность</label>
                    <select
                        name="subgroups"
                          className = "ml-4"
                        // defaultValue = {`${group.speciality.code} ${group.speciality.name}`}
                    >
                        <option>...скоро здесь что-то будет</option>
                    </select>
                    </div>

                    <button type="submit" className={updateButtonStyle + " ml-2 mt-4"}>
                        Добавить
                    </button>
                </div>
        </form>
    </details>
    )
}