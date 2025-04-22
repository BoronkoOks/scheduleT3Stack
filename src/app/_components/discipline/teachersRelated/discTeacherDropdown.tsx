import React, { Suspense } from "react"
import { ArrowLongDownIcon } from "@heroicons/react/24/outline"
import DiscTeacherTable from "./discTeacherTable"

export default async function DiscTeacherDropdown({ disciplineId, role }:
  {disciplineId: string, role: string }) {
  return (
    <div className = "border-2 border-gray-500 rounded-lg">
      <details className = "collapse" tabIndex={0}>
      <summary className = "collapse-title">
        <div className = "flex">
          <h2 className=" ml-2"><b>Преподаватели дисциплины</b></h2>
          <ArrowLongDownIcon className = "w-6" />
        </div>
      </summary>
          <DiscTeacherTable disciplineId = {disciplineId} role = {role} />
      </details>
    </div>
  )
}
