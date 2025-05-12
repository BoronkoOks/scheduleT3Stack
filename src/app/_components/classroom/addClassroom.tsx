import {PlusIcon, ComputerDesktopIcon} from "@heroicons/react/16/solid"
import { addClassroom } from "~/app/api/action/classroom"
import { updateButtonStyle, divForm } from "~/styles/daisystyles"

export function AddClassroom () {
    const divField = "flex align-middle"
    const inputClassStyle = "input input-bordered"

    return (
      <div className = "border-2 border-green-700 bg-white rounded-lg">
        <details className = "collapse" tabIndex={0}>
        <summary className = "collapse-title text-xl font-medium">
          <div className = "flex">
            <PlusIcon  className = "w-6" />
            <ComputerDesktopIcon className = "w-6" />
          </div>
        </summary>
        <form className = "collapse-content form-control " action = {addClassroom} >
          <div className = {divField}>
          <label  className = "mt-2 mr-2">Название</label>
            <input
              type="text"
              name="name"
              required
              className="input input-bordered w-50"
              defaultValue=""
            />
          </div>
        <div className = {divField + " mt-4"}>
          <div className = {divField}>
            <label className = "mt-2 mr-1">Мест</label>
            <input
              type="number"
              min = "0"
              name="seats"
              className = {inputClassStyle + " ml-2 w-16"}
              defaultValue = "0"
          />
        </div>
          <div className = {divField}>
            <label className = "mt-2 mr-1 ml-4">Компьютеров</label>
            <input
              type="number"
              min = "0"
              name="computers"
              className={"input input-bordered w-16 ml-2"}
              defaultValue = "0"
              />
          </div>
        </div>
          <div className = {divField + " mt-2"}>
            <label >Проектор</label>
            <input
                type="checkbox"
                name="subgroups"
                className = "mt-2 ml-2 mb-4"
                defaultChecked = {false}
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
