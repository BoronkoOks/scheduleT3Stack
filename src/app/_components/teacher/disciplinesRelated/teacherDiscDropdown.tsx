import React, { Suspense } from "react"
import { ArrowLongDownIcon } from "@heroicons/react/24/outline"
import TeacherDiscTable from "./teacherDiscTable"


export default async function TeacherDiscDropdown ({ teacherId, mode }:
    {teacherId: string, mode: string}
  ) {
  return (
    <div className = "border-2 border-gray-500 rounded-lg">
      <details className = "collapse" tabIndex={0}>
      <summary className = "collapse-title">
        <div className = "flex">
          <h2 className=" ml-2"><b>Дисциплины преподавателя</b></h2>
          <ArrowLongDownIcon className = "w-6" />
        </div>
      </summary>
        <Suspense fallback={<div>Загрузка...</div>}>
          <TeacherDiscTable teacherId = {teacherId} mode = {mode} />
        </Suspense>
      </details>
    </div>
  )
}
