import {PlusIcon, AcademicCapIcon} from "@heroicons/react/16/solid"
import { createSpeciality } from "~/app/api/action/speciality"
import { updateButtonStyle } from "~/styles/daisystyles"

export function AddSpeciality () {
  const divField = "flex align-middle"
  const inputClassStyle = "input input-bordered"

  return (
    <div className = "border-2 border-green-700 bg-white rounded-lg">
    <details className = "collapse" tabIndex={0}>
      <summary className = "collapse-title text-xl font-medium">
        <div className = "flex">
          <PlusIcon  className = "w-6" />
          <AcademicCapIcon className = "w-6" />
        </div>
      </summary>
      <form className = "collapse-content form-control mr-2" action = {createSpeciality}>
          <input type="hidden" name="id" />

          <label>Название</label>
            <input
              type="text"
              name="name"
              required
              className = {inputClassStyle + " w-full my-2"}
            />
          <div className = {divField}>
            <label className = "mt-2 mr-2">Код</label>
            <input
              type="text"
              name="code"
              required
              className={inputClassStyle+ " w-24 mb-1"}
              maxLength = {8}
            />
        </div>
        <div className = {divField}>
          <label className = "mt-3 mr-2">Лет обучения</label>
          <input
            type="number"
            min = "1"
            name="years"
            required
            className={inputClassStyle + " w-16 my-1"}
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
