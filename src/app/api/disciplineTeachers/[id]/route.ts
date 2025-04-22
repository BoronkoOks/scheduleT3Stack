import { NextRequest, NextResponse } from "next/server"
import { db } from "~/server/db"


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const deletedDisc = await db.teacherDiscipline.delete({
      where: { id },
    })

    return new Response(JSON.stringify(deletedDisc), {
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
    const updatedDisc = await db.teacherDiscipline.update({
      where: { id: id.id },
      data: {
        lectures: data.lectures,
        subgroup: data.subgroup
      }
    })

    return new Response(JSON.stringify(updatedDisc), {
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
