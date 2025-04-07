import {PlusIcon} from "@heroicons/react/16/solid"
import { updateButtonStyle, divForm } from "~/styles/daisystyles"

export function AddSpeciality () {
    const inputClassStyle = "input input-bordered"

    return (
        <details className = "collapse" tabIndex={0}>
            <summary className = "collapse-title text-xl font-medium">
                <div className = "flex">
                    <PlusIcon  className = "w-6" />
                </div>
            </summary>
            <form className = "collapse-content form-control bg-white pt-4"
            // action = {createDiscipline}
            >
          {/* <div //className = "pl-3"
          className={divForm + "w-min"}
          > */}
              <input type="hidden" name="id" />
            <div className = "flex align-middle">
            <label  className = "mt-2 mr-2">Название</label>
              <input
                type="text"
                name="name"
                required
                className="input input-bordered w-96"
              />
            </div>
            <div className = "flex align-middle mt-4">
              <label className = "mt-2 mr-2">Код</label>
              <input
                type="text"
                name="code"
                className={"input input-bordered w-24"}
                maxLength = {8}
              />
          </div>
            <div className = "flex align-middle mt-4">
              <label className = "mt-2 mr-2">Лет обучения</label>
              <input
                type="number"
                min = "0"
                name="years"
                className={"input input-bordered w-16"}
                />
            </div>
            <button type="submit" className={updateButtonStyle + " mt-2 ml-2"}>
              Добавить
            </button>
          {/* </div> */}
        </form>
    </details>
    )
}
