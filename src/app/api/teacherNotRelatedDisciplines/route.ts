import { NextRequest } from "next/server"
import { db } from "~/server/db"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const teacherId = searchParams.get("teacherId") || ""
  const query = searchParams.get("query") || ""

  const disciplines = await db.discipline.findMany({
    include: {
      discTeacher: true
    },
    where: { name: { startsWith: query, mode: 'insensitive' }},
    orderBy: {name: "asc"}
  }) ?? []

  const filteredDisciplines = disciplines.filter(discipline => 
    !discipline.discTeacher.some(td => td.teacherId == teacherId)
  )

  return new Response(JSON.stringify(filteredDisciplines), {
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

