import { HydrateClient } from "~/trpc/server"
import {pageHeaderStyle} from "~/styles/daisystyles"
import { isAdmin, isAdminOrSelectedTeacher } from "~/app/api/auth/check"
import SearchPanel from "~/app/_components/schedule/searchPanel"
import { db } from "~/server/db"
import { Schedule } from "@prisma/client"
import ScheduleDropdown from "~/app/_components/schedule/scheduleDropdown"


export default async function Home(props:
  {searchParams: Promise<{ query?: string; searchBy?: string, selected?: string }>}
) {
  const searchParams = await props.searchParams;
  const query = searchParams.query || ""
  const searchBy = searchParams.searchBy || "group"
  const selected = searchParams.selected || ""

  // Содержит список групп/преподавателей/кабинетов в зависимости от критерия searchBy
  let results: {id: string, name: string}[]
  
  switch (searchBy) {
    case "group": {
      results = await db.group.findMany({
        where: {
          name: {startsWith: query, mode: "insensitive"}
        },
        select: {
          id: true,
          name: true
        },
        orderBy: {
          name: "asc"
        }
      })
    }; break;
    case "teacher": { 
      const teacherResults = await db.teacher.findMany({
        where: {
          surname: {startsWith: query, mode: "insensitive"}
        },
        select: {
          id: true,
          surname: true,
          name: true,
          fathername: true
        },
        orderBy: [
          {surname: "asc"},
          {name: "asc"},
          {fathername: "asc"}
        ]
      }) ?? []

      results = teacherResults.map((t) => {
        return {id: t.id, name: t.surname + " " + t.name + " " + t.fathername}
      })
    }; break;

    case "classroom": {
      results = await db.classroom.findMany({
        where: {
          name: {startsWith: query, mode: "insensitive"}
        },
        select: {
          id: true,
          name: true
        },
        orderBy: {
          name: "asc"
        }
      })
    }; break;

    default: results = []; break;
  }

  // Содержит массив занятий, найденных по запросу (зависит от searchBy)
  let lessons: Schedule[] = []

  if (selected != "") {
    switch (searchBy) {
      case "group": {
        lessons = await db.schedule.findMany({
          where: {
            groupId: selected
          },
          include: {
            discipline: true,
            teacher: true,
            classroom: true
          }
        })
      }; break;

      case "teacher": {
        lessons = await db.schedule.findMany({
          where: {
            teacherId: selected
          },
          include: {
            discipline: true,
            group: true,
            classroom: true
          }
        })
      }; break;

      case "classroom": {
        lessons = await db.schedule.findMany({
          where: {
            classroomID: selected
          },
          include: {
            discipline: true,
            teacher: true,
            group: true
          }
        })
      }; break;

      default: ; break;
    }
  }
  
  // Режим чтения/редактирования
  let edit = false

  if (searchBy == "teacher" && selected != "") {
    // разрешить пользователю-преподавателю редактировать, если просматривается его расписание
    edit = await isAdminOrSelectedTeacher(selected)
  }
  else {
    edit = await isAdmin() // разрешить редактировать, если пользователь - администратор
  }


  return (
    <HydrateClient>
      <main>
        <h2 className = {pageHeaderStyle}>Расписание</h2>
        <div className = "mt-4 mb-6">
          <SearchPanel searchByList = {results}/> {/* панель поиска */}
        </div>
        {selected != "" &&
          <div className = "mt-4 mb-6 ml-2 mr-2">
            {/* Раскрывающиеся элементы с расписанием */}
            <div className="mb-2">
              <ScheduleDropdown summary = "Нечётная неделя" edit = {edit} evenWeek = {false}
                schedule = {lessons.filter(l => l.evenWeek == false)} forWho = {searchBy} />
            </div>
            <div>
              <ScheduleDropdown summary = "Чётная неделя" edit = {edit} evenWeek = {true}
                schedule = {lessons.filter(l => l.evenWeek == true)} forWho = {searchBy} />
            </div>
          </div>
        }
      </main>
    </HydrateClient>
  )
}
