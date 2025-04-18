import Link from "next/link";
import React, { Suspense } from "react"
import { db } from "~/server/db"
import { metadata } from "~/app/layout"
import {divForm, updateButtonStyle, deleteButtonStyle} from "~/styles/daisystyles"
import { Speciality } from "@prisma/client"


export function SpecialityInfoMODE ({speciality} : {speciality: Speciality}) {
    return (
        <main>
        <div>
          <form 
          // action={updateClassroom}
          className="form-control">
          <div className = "pl-6"
          //className={divForm + " border-b-0"}
          >
            <input type="hidden" name="id" defaultValue={speciality.id ?? ""} />
            <div className = "flex align-middle">
            <label  className = "mt-2 mr-2">Название</label>
              <input
                type="text"
                name="name"
                required
                className="input input-bordered w-96"
                defaultValue={speciality.name ?? ""}
              />
            </div>
            <div className = "flex align-middle mt-4">
              <label className = "mt-2 mr-2">Код</label>
              <input
                type="text"
                name="code"
                className={"input input-bordered w-24"}
                maxLength = {8}
                defaultValue = {speciality.code ?? ""}
              />
          </div>
            <div className = "flex align-middle mt-4 ml-4">
              <label className = "mt-2 mr-2">Лет обучения</label>
              <input
                type="number"
                min = "0"
                name="years"
                className={"input input-bordered w-16"}
                defaultValue = {speciality.years ?? 0}
                />
            </div>
            <button type="submit" className={updateButtonStyle + " ml-2"}>
              Обновить
            </button>
          </div>
        </form>
        <form //action={deleteClassroom}
         className="form-control">
          <div className = "mt-6 ml-9"
          //className={divForm + " border-t-0"}
          >
            <input type="hidden" name="id" defaultValue={speciality.id ?? ""} />
            <button type="submit" className={deleteButtonStyle}>
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
      <div className = "m-4">
        <p><b>Название:</b> {speciality.name}</p>
        <p><b>Код:</b> {speciality.code}</p>
        <p><b>Лет обучения:</b> {speciality.years}</p>
      </div>
    )
}

