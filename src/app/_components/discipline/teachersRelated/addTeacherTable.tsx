import { db } from "~/server/db"
import { PlusIcon } from "@heroicons/react/24/outline"
import { addDiscToTeacher } from "~/app/api/action/teacher"


export async function AddTeacherTable ({query, disciplineId}:
    {query: string, disciplineId: string}
) {
    const tdStyle = "px-2 border border-black border-solid"

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

    return (
        <table className="box-border mx-4 my-4 border-collapse border-1 border-black">
        <thead>
            <tr>
                <th className={tdStyle}>№</th>
                <th className={tdStyle}>Фамилия</th>
                <th className={tdStyle}>Имя</th>
                <th className={tdStyle}>Отчество</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {filteredTeachers.map((t, i) => (
            <tr key={t.id}>
                <td className={tdStyle}><p>{i+1}</p></td>
                <td className={tdStyle}>{t.surname}</td>
                <td className={tdStyle}>{t.name}</td>
                <td className={tdStyle}>{t.fathername}</td>
                <td>
                    <form action = {addDiscToTeacher} className="form-control">
                        <div className="flex max-w-xs flex-col space-y-2">
                        <input
                            type="hidden"
                            name="id_teacher"
                            defaultValue={t.id}
                        />
                        <input
                            type="hidden"
                            name="id_discipline"
                            defaultValue={disciplineId}
                        />
                        <button type="submit">
                            <PlusIcon className="w-6 mr-2 ml-2" />
                        </button>
                        </div>
                    </form>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    )
}
