import { HydrateClient } from "~/trpc/server"
import {pageHeaderStyle} from "~/styles/daisystyles"
import ScheduleTable from "~/app/_components/schedule/scheduleTable"
import SearchInput from "~/app/ui/searchInput"
import { getRole } from "~/app/api/auth/check"
import SearchPanel from "../_components/schedule/searchPanel"
import { db } from "~/server/db"
import { Schedule } from "@prisma/client"


export default async function Home(props:
  {searchParams: Promise<{ query?: string; searchBy?: string, selected?: string }>}
) {
  const role = (await getRole())

  const searchParams = await props.searchParams;
  const query = searchParams.query || ""
  const searchBy = searchParams.searchBy || "group"
  const selected = searchParams.selected || ""

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


  return (
    <HydrateClient>
      <main>
        <h2 className = {pageHeaderStyle}>Расписание</h2>
        <div className = "mt-4 mb-6">
          <SearchPanel searchByList = {results} />
        </div>
        <div  className = "mt-4 mb-6 ml-2">
          <div className = "border-2 border-gray-500 rounded-lg pl-2">
            <details className = "collapse" tabIndex={0}>
                <summary className = "collapse-title">
                  <b>Нечётная неделя</b>
                </summary>
              <div className = "mb-4 mx-4">
                <ScheduleTable schedule = {lessons.filter(l => l.evenWeek == false)} forWho = {searchBy} />
              </div>
            </details>
          </div>
          <div className = "border-2 border-gray-500 rounded-lg pl-2 mt-2">
            <details className = "collapse" tabIndex={0}>
                <summary className = "collapse-title">
                  <b>Чётная неделя</b>
                </summary>
              <div className = "mb-4 mx-4">
                <ScheduleTable schedule = {lessons.filter(l => l.evenWeek == true)} forWho = {searchBy} />
              </div>
            </details>
          </div>
        </div>
      </main>
    </HydrateClient>
  )
}
