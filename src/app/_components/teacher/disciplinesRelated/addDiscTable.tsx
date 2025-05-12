"use client"

import React from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Discipline } from "@prisma/client"


export function AddDiscTable ({query, teacherId}:
    {query: string, teacherId: string}
) {
    const queryClient = useQueryClient()
    const [discsToAdd, setDiscsToAdd] = React.useState<Discipline[]>([])

    // адрес api
    const url = "/api/teacherNotRelatedDisciplines?teacherId=" + teacherId + "&query=" + query
  
    const tdStyle = "px-2 border border-black border-solid"

    // GET-запрос
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["teacherNotRelatedDisciplines", "teacherId", "query"],
        queryFn: async () => {
            const disciplines = await fetch(url).then((res) => res.json())
            setDiscsToAdd(disciplines.map((u: Discipline) => u))

            return disciplines
        },
    })

    // POST-запрос
    const postMutation = useMutation({
        mutationFn: async (disciplineId: string) => {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({teacherId: teacherId, disciplineId: disciplineId})
            })
            
            if (!response.ok) {
                throw new Error("Не получилось")
            }
            
            return response.json()
        },
            onSuccess: () => {
            queryClient.invalidateQueries(["teacherNotRelatedDisciplines", "teacherId", "query"])
        },
    })

    // Действие для кнопки добавления
    function handleAdd(id: string) {
        postMutation.mutate(id)
    }


    // Данные ещё загружаются
    if (isPending) {
        return (
        <div className="m-4">Загрузка...</div>
        )
    }

    // Что-то пошло не так
    if (isError) {
        return (
        <div className="m-4">Ошибка: {JSON.stringify(error)}</div>
        )
    }

    return (
        <table className="box-border mx-4 my-4 border-collapse border-1 border-black">
        <thead>
            <tr>
                <th className={tdStyle}>№</th>
                <th className={tdStyle + "whitespace-nowrap"}>Название</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {discsToAdd.map((d, i) => (
            <tr key={d.id}>
                <td className={tdStyle}><p>{i+1}</p></td>
                <td className={tdStyle}>{d.name}</td>
                <td>
                    <button onClick={()=> handleAdd(d.id)}>
                        <PlusIcon className="w-6 mr-2 ml-2" />
                    </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    )
}