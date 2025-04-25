import { NextRequest } from "next/server"
import { db } from "~/server/db"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;  
    const specialityId = searchParams.get("specialityId") || ""

    const disciplines = await db.specialityDisc.findMany({
    where: { specialityId: specialityId },
    include: {
        speciality: true
      },
      orderBy: {discipline: {name: "asc"}},
    }) ?? []

  return new Response(JSON.stringify(disciplines), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

