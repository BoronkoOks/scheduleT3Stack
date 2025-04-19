import React from "react"
import { updateButtonStyle, deleteButtonStyle} from "~/styles/daisystyles"
import { Speciality } from "@prisma/client"
import { deleteSpeciality, updateSpeciality } from "~/app/api/action/speciality"


export function SpecialityInfoMODE ({speciality} : {speciality: Speciality}) {
  const inputClassStyle = "input input-bordered"
  const divStyle = "flex align-middle"

    return (
        <main>
        <div>
          <form action={updateSpeciality} className="form-control">
          <div>
            <input type="hidden" name="id" defaultValue={speciality.id ?? ""} />

            <div className = {divStyle}>
            <label  className = "mt-2 mr-2">Название</label>
              <input
                type="text"
                name="name"
                required
                className={inputClassStyle + " w-96"}
                defaultValue={speciality.name ?? ""}
              />
            </div>
            <div className = {divStyle + " mt-2"}>
              <label className = "mt-2 mr-2">Код</label>
              <input
                type="text"
                name="code"
                className={"input input-bordered w-24"}
                maxLength = {8}
                defaultValue = {speciality.code ?? ""}
              />
            </div>
            <div className = {divStyle + " mt-2 mb-4"}>
              <label className = "mt-2 mr-2">Лет обучения</label>
              <input
                type="number"
                min = "1"
                name="years"
                className={inputClassStyle + " w-16"}
                defaultValue = {speciality.years ?? 0}
              />
            </div>
            <div>
              <button type="submit" className={updateButtonStyle + " w-2/3"}>
                Обновить
              </button>
            </div>
          </div>
        </form>
        <form action = {deleteSpeciality} className="form-control">
          <div className = "mt-4">
            <input type="hidden" name="id" defaultValue={speciality.id ?? ""} />
            <button type="submit" className = {deleteButtonStyle + " w-2/3"}>
              Удалить
            </button>
          </div>
        </form>
      </div>
      </main>
    )
}


export function SpecialityInfo ({speciality} : {speciality: Speciality}) {
    return (
      <div>
        <p><b>Название:</b> {speciality.name}</p>
        <p><b>Код:</b> {speciality.code}</p>
        <p><b>Лет обучения:</b> {speciality.years}</p>
      </div>
    )
}

