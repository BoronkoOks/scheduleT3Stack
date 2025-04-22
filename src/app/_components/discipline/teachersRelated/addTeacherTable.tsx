"use client"

import React from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Teacher } from "@prisma/client"


export function AddTeacherTable ({query, disciplineId}:
    {query: string, disciplineId: string}
) {
  const queryClient = useQueryClient()
  const [teachersToAdd, setTeachersToAdd] = React.useState<Teacher[]>([])
  const url = "/api/disciplineNotRelatedTeachers?disciplineId=" + disciplineId + "&query=" + query

  const tdStyle = "px-2 border border-black border-solid"

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["disciplineNotRelatedTeachers", "disciplineId", "query"],
    
    queryFn: async () => {
      const teachers = await fetch(url).then((res) => res.json())
      
      setTeachersToAdd(teachers.map((u: Teacher) => u))

      return teachers
    },
  })

  const postMutation = useMutation({
    mutationFn: async (teacherId: string) => {
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
      queryClient.invalidateQueries(["disciplineNotRelatedTeachers", "disciplineId", "query"])
    },
  })


  function handleAdd(id: string) {
    postMutation.mutate(id)
  }


  if (isPending) {
    return (
      <div className="m-4">Загрузка...</div>
    )
  }

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
        <th className={tdStyle}>Фамилия</th>
        <th className={tdStyle}>Имя</th>
        <th className={tdStyle}>Отчество</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {teachersToAdd.map((t, i) => (
      <tr key={t.id}>
        <td className={tdStyle}><p>{i+1}</p></td>
        <td className={tdStyle}>{t.surname}</td>
        <td className={tdStyle}>{t.name}</td>
        <td className={tdStyle}>{t.fathername}</td>
        <td>
          <button onClick={() => handleAdd(t.id)}>
            <PlusIcon className="w-6 mr-2 ml-2" />
          </button>
        </td>
      </tr>
      ))}
    </tbody>
    </table>
  )
}
