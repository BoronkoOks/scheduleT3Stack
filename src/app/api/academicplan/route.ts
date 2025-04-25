import { NextRequest } from "next/server"
import { db } from "~/server/db"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const specDiscId = searchParams.get("specDiscId") || ""

  const plans = await db.academicPlan.findMany(
  {
    where: { specDiscId: specDiscId },
    orderBy: {semester: "asc"}
  }
)

  return new Response(JSON.stringify(plans), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}


export async function POST(request: NextRequest) {
  const data = await request.json()

  const added = await db.academicPlan.create({
      data: {
        specDiscId: data.specDiscId,
        semester: data.semester,
        lectures: data.lectures,
        practise: data.practise,
        labs: data.labs,
        ksr: data.ksr,
        coursework: data.coursework,
        exam: data.exam
      }
    })

  return new Response(JSON.stringify(added), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

