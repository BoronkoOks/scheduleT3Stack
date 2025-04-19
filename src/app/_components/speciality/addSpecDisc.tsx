import { HydrateClient } from "~/trpc/server"
import { db } from "~/server/db"
import SpecialityTable from "~/app/_components/speciality/specialityTable"
import {AddSpeciality} from "~/app/_components/speciality/addSpeciality"
import SearchInput from "~/app/ui/searchInput"
import Pagination from "~/app/ui/pagination"
import { getRole } from "~/app/api/auth/check"
import { Suspense } from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { addSpecDisc, deleteSpecDisc } from "~/app/api/action/speciality"
import { ArrowLongDownIcon, MinusIcon } from "@heroicons/react/24/outline"


export default async function AddSpecDisc({query, specialityId}:
    {query: string, specialityId: string}
) {
    return (
        <div className = "border-2 border-gray-500 rounded-lg pl-2">
        <details className = "collapse" tabIndex={0}>
            <summary className = "collapse-title">
                <div className = "flex">
                    <h2><b>Добавить дисциплину</b></h2>
                    <ArrowLongDownIcon className = "w-6" />
                </div>
            </summary>
            <div className = "mb-4 mx-4">
            <SearchInput placeholder = "Найти дисциплину..." />
            </div>
            {query != "" && <Suspense fallback={<div>Загрузка...</div>}>
                <DisciplinesToAddTable query = {query} specialityId = {specialityId} />
            </Suspense>
             }
        </details>
        </div>
    )
}


async function DisciplinesToAddTable ({query, specialityId}:
    {query: string, specialityId: string}
) {
    const tdStyle = "px-2 border border-black border-solid"

    const edit = (await getRole()) == "ADMIN"

    const disciplines = await db.discipline.findMany({
        include: {
            discSpec: true
        },
        where: {
          AND: [
            { name: { startsWith: query, mode: 'insensitive' }},
            {
                // OR: [
                //     {
                //         NOT:
                //         {
                //             has: {
                //             discSpec: {
                //                 specialtyID: {
                //                     has: specialityId
                //                 }
                //             }
                //             }
                //         }
                //     }
                //     // {specialityDisc: null}
                //     // {NOT: {discSpec: {specialityId: specialityId}}}
                // ]
            }
            
          ]
        },
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

