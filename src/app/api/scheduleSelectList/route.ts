import { NextRequest } from "next/server"
import { db } from "~/server/db"
import {Group, Teacher, Classroom} from "@prisma/client"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const searchBy = searchParams.get("searchBy") || ""
  const query = searchParams.get("query") || ""

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
      }
      )
    }; break;

    default: results = []; break;
  }

  console.log("\n\n", results, "\n\n")

  return new Response(JSON.stringify(results), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}


// export async function POST(request: NextRequest) {
//   const data = await request.json()

//   const added = await db.teacherDiscipline.create({
//       data: data
//     })

//   return new Response(JSON.stringify(added), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });
// }

