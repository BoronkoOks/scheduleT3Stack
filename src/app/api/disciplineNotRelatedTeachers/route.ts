import { NextRequest } from "next/server"
import { db } from "~/server/db"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const disciplineId = searchParams.get("disciplineId") || ""
  const query = searchParams.get("query") || ""

  const teachers = await db.teacher.findMany({
      include: {
          teacherDisc: true
      },
      where: { surname: { startsWith: query, mode: 'insensitive' }},
      orderBy: [
          {surname: "asc"},
          {name: "asc"},
          {fathername: "asc"}
        ]
    }) ?? []

  const filteredTeachers = teachers.filter(teacher => 
      !teacher.teacherDisc.some(td => td.disciplineId == disciplineId)
  )

  return new Response(JSON.stringify(filteredTeachers), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}


export async function POST(request: NextRequest) {
  const data = await request.json()

  const added = await db.teacherDiscipline.create({
      data: data
    })

  return new Response(JSON.stringify(added), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

