import { NextRequest, NextResponse } from "next/server"
import { db } from "~/server/db"


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const deletedPlan = await db.academicPlan.delete({
      where: { id },
    })

    return new Response(JSON.stringify(deletedPlan), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = await params
  const data = await request.json()

  try {
    const updatedPlan = await db.academicPlan.update({
      where: { id: id.id },
      data: {
        semester: data.semester,
        lectures: data.lectures,
        practise: data.practise,
        labs: data.labs,
        ksr: data.ksr,
        coursework: data.coursework,
        exam: data.exam
      }
    })

    return new Response(JSON.stringify(updatedPlan), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
