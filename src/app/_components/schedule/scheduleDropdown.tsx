import React from "react"
import type { Schedule } from "@prisma/client"
import ScheduleTable from "./scheduleTable"


export default async function ScheduleDropdown ({summary, schedule, forWho, edit = false}:
    {summary: string, schedule: Schedule[], forWho: string, edit: boolean}
){
    return (
      <div className = "border-2 border-gray-500 rounded-lg pl-2">
        <details className = "collapse" tabIndex={0}>
            <summary className = "collapse-title">
              <b>{summary}</b>
            </summary>
          <div className = "mb-4 mx-4 overscroll-x-contain">
            <ScheduleTable schedule = {schedule} forWho = {forWho} edit = {edit} />
          </div>
        </details>
      </div>
    )
}