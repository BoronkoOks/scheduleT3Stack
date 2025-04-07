import {PlusIcon} from "@heroicons/react/16/solid"
import { updateButtonStyle, divForm } from "~/styles/daisystyles"

export function AddClassroom () {
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
            <div className = "flex align-middle">
            <label  className = "mt-2 mr-2">Название</label>
              <input
                type="text"
                name="name"
                required
                className="input input-bordered w-50"
                defaultValue=""
              />
            </div>
          <div className = "flex align-middle mt-2">
            <div className = "flex align-middle mt-4">
              <label className = "mt-2 mr-1">Мест</label>
              <input
                type="number"
                min = "0"
                name="seats"
                className={"input input-bordered w-16"}
                defaultValue = "0"
              />
          </div>
            <div className = "flex align-middle mt-4 ml-2">
              <label className = "mt-2 mr-1">Компьютеров</label>
              <input
                type="number"
                min = "0"
                name="computers"
                className={"input input-bordered w-16"}
                defaultValue = "0"
                />
            </div>
          </div>
            <div className = "flex align-middle mt-4">
              <label>Проектор</label>
              <input
                  type="checkbox"
                  name="subgroups"
                  className = "mt-2 ml-2 mb-4"
                  defaultChecked = {false}
              />
          </div>

            <button type="submit" className={updateButtonStyle + " ml-2"}>
              Добавить
            </button>
          </div>
        </form>
    </details>
    )
}
