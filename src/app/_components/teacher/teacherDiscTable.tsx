import React, { Suspense } from "react";
import { ArrowLongDownIcon, MinusIcon, CheckIcon } from "@heroicons/react/24/outline"
import DiscTable from "./discTable";


export default async function TeacherDiscTable ({ teacherId, mode, query }:
    {teacherId: string, mode: string, query: string }
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
          <DiscTable teacherId = {teacherId} mode = {mode} />
        </Suspense>
      </details>
    </div>
  )
}



