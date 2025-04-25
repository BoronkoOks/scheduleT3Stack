import React, { Suspense } from "react";
import { ArrowLongDownIcon, MinusIcon } from "@heroicons/react/24/outline"
import DiscTable from "./specDiscTable";


export default async function SpecDiscDropdown ({specialityId, role}:
  {specialityId: string, role: string}
) {
  return (
    <div className = "border-2 border-gray-500 rounded-lg">
      <details className = "collapse" tabIndex={0}>
      <summary className = "collapse-title">
        <div className = "flex">
          <h2 className=" ml-2"><b>Дисциплины специальности</b></h2>
          <ArrowLongDownIcon className = "w-6" />
        </div>
      </summary>
        <DiscTable specialityId = {specialityId} role = {role} />
      </details>
    </div>
  )
}