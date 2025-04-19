import React from "react"
import { updateButtonStyle, deleteButtonStyle} from "~/styles/daisystyles"
import { Classroom } from "@prisma/client"
import { updateClassroom } from "~/app/api/action/classroom";


export function ClassroomInfoMODE ({classroom} : {classroom: Classroom}) {
  const inputClassStyle = "input input-bordered"
  const divField = "flex align-middle"

    return (
        <main>
        <div>
          <form action = {updateClassroom} className = "form-control">
          <div>
            <input type="hidden" name="id" defaultValue={classroom.id ?? ""} />

            <div className = {divField}>
            <label className = "mt-2 mr-2">Название</label>
              <input
                type="text"
                name="name"
                required
                className="input input-bordered w-56"
                defaultValue={classroom.name ?? ""}
              />
            </div>
          <div className = {divField + " mt-4"}>
            <div className = {divField}>
              <label className = "mt-2 mr-2">Мест</label>
              <input
                type="number"
                min = "0"
                name="seats"
                className={inputClassStyle + " w-16"}
                defaultValue = {classroom.seats || 0}
              />
          </div>
          <div className = {divField}>
            <label className = "mt-2 mr-1 ml-5">Компьютеров</label>
            <input
              type="number"
              min = "0"
              name="computers"
              className = {inputClassStyle + " w-16"}
              defaultValue = {Number(classroom.computers) || 0}
              />
          </div>
          </div>
            <div className = {divField + " mt-2"}>
              <label>Проектор</label>
              <input
                  type="checkbox"
                  name="subgroups"
                  className = "mt-2 ml-2 mb-4"
                  defaultChecked = {classroom.projector ?? false}
              />
          </div>
            <div>
              <button type="submit" className={updateButtonStyle + " w-full"}>
                Обновить
              </button>
            </div>
          </div>
        </form>
        <form action={updateClassroom} className="form-control">
          <div className = "mt-4">
            <input type="hidden" name="id" defaultValue={classroom.id ?? ""} />
            <button type="submit" className = {deleteButtonStyle + " w-full"}>
              Удалить
            </button>
          </div>
        </form>
      </div>
      </main>
    )
}


export function ClassroomInfo ({classroom} : {classroom: Classroom}) {
    return (
      <div>
        <p><b>Название:</b> {classroom.name}</p>
        <p><b>Мест:</b> {classroom.seats}</p>
        <p><b>Компьютеров:</b> {classroom.computers}</p>
        <p><b>Проектор:</b> {classroom.projector? "есть" : "нет"}</p>
      </div>
    )
}

