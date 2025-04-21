import { NextRequest } from "next/server"
import { db } from "~/server/db"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;  
    const teacherId = searchParams.get("teacherId") || ""

    const disciplines = await db.teacherDiscipline.findMany({
    where: { teacherId: teacherId },
    include: {
      discipline: true
      },
      orderBy: {discipline: {name: "asc"}},
    }) ?? []

  return new Response(JSON.stringify(disciplines), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

