import { NextRequest } from "next/server"
import { db } from "~/server/db"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;  
    const disciplineId = searchParams.get("disciplineId") || ""

    const teachers = await db.teacherDiscipline.findMany({
    where: { disciplineId: disciplineId },
    include: {
      teacher: true
      },
      orderBy: {discipline: {name: "asc"}},
    }) ?? []

  return new Response(JSON.stringify(teachers), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

