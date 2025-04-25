import { db } from "~/server/db"
import { getRole } from "~/app/api/auth/check"
import { PlusIcon } from "@heroicons/react/24/outline"
import { addSpecDisc } from "~/app/api/action/speciality"


export default async function AddSpecDiscTable ({query, specialityId}:
    {query: string, specialityId: string}
) {
    const tdStyle = "px-2 border border-black border-solid"

    const edit = (await getRole()) == "ADMIN"

    const disciplines = await db.discipline.findMany({
        include: {
            discSpec: true
        },
        where: { name: { startsWith: query, mode: 'insensitive' }},
        orderBy: {name: "asc"}
      }) ?? []

    const filteredDisciplines = disciplines.filter(discipline => 
        !discipline.discSpec.some(spec => spec.specialityId == specialityId)
    )

    return (
        <table className="box-border mx-4 my-4 border-collapse border-1 border-black">
        <thead>
            <tr>
            <th className={tdStyle}>№</th>
            <th className={tdStyle + "whitespace-nowrap"}>Название</th>
            {edit && <th></th>}
            </tr>
        </thead>
        <tbody>
            {filteredDisciplines.map((d, i) => (
            <tr key={d.id}>
                <td className={tdStyle}><p>{i+1}</p></td>
                <td className={tdStyle}>{d.name}</td>

                {edit && 
                <td>
                <form action = {addSpecDisc} className="form-control">
                    <div className="flex max-w-xs flex-col space-y-2">
                    <input
                        type="hidden"
                        name="disciplineId"
                        defaultValue={d.id}
                    />
                    <input
                        type="hidden"
                        name="specialityId"
                        defaultValue={specialityId}
                    />
                    <button type="submit">
                        <PlusIcon className="w-6 mr-2 ml-2" />
                    </button>
                    </div>
                </form>
                </td>
                }
            </tr>
            ))}
        </tbody>
        </table>
    )
}
