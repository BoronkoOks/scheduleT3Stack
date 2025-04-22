"use client"

import React from "react"
import {MinusIcon, CheckIcon } from "@heroicons/react/24/outline"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TeacherDiscipline } from "@prisma/client"

export default function DiscTeacherTable({ disciplineId, role }:
    {disciplineId: string, role: string }
) {
  const queryClient = useQueryClient()
  const [teachersDetails, setTeachersDetails] = React.useState<TeacherDiscipline[]>([])
  const url = "/api/disciplineTeachers?disciplineId=" + disciplineId
  
  const tdStyle = "px-2 border border-black border-solid"
  const edit = role === "ADMIN"

  const { isPending, isError, data, error } = useQuery({
      queryKey: ["disciplineTeachers", "disciplineId"],
      queryFn: async () => {
          const teachers = await fetch(url).then((res) => res.json())
          setTeachersDetails(teachers.map((u: TeacherDiscipline) => u))

          return teachers
      },
  })

  const deleteMutation = useMutation({
      mutationFn: async (id: string) => {
        const response = await fetch(`/api/disciplineTeachers/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Не получилось");
        }
        
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["disciplineTeachers", "disciplineId"]);
      },
    })

  const putMutation = useMutation({
    mutationFn: async (dt: TeacherDiscipline) => {
        console.log(dt.id, "\n\n")
        const response = await fetch(`/api/disciplineTeachers/${dt.id}`, {
            method: "PUT",
            body: JSON.stringify({lectures: dt.lectures, subgroup: dt.subgroup}),
            })

          if (!response.ok) {
              console.log(response)
          }
        return response.json();
  },
  });



  function handleDelete(id: string) {
      deleteMutation.mutate(id);
  }

  function handleChangeLectures (id: string, lectures: boolean) {
      setTeachersDetails(teachersDetails.map(d => {
          if (d.id != id) {
              return d
          }
          else {
              return { ...d, lectures: lectures }
          }
      }))
  }

  function handleChangeSubgroup (id: string, subgroup: string) {
      setTeachersDetails(teachersDetails.map(d => {
          if (d.id != id) {
              return d
          }
          else {
              return {...d, subgroup: subgroup}
          }
      }))
  }

  function handleSave(id: string) {
    const td = teachersDetails.find(d => d.id == id)
      if (td){
        putMutation.mutate(td)
      }
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
    <table className="box-border mx-4 mb-4 border-collapse border-1 border-black border-collapse">
    <thead>
      <tr>
        <th className={tdStyle}>№</th>
        <th className={tdStyle + "whitespace-nowrap"}>Преподаватель</th>
        <th className={tdStyle + " pr-0.5"}>Лекции</th>
        <th className={tdStyle}>Подгруппа</th>

        {edit && <>
          <th></th>
          <th></th>
        </>
        }
      </tr>
    </thead>
    <tbody>
      {teachersDetails.map( (d, i) => 
        <tr key = {d.id}>
            <td className={tdStyle}><p>{i+1}</p></td>
            <td className={tdStyle}>{d.teacher.surname + " " + d.teacher.name.substring(0,1) + ". " + d.teacher.fathername.substring(0,1) + "."}</td>
            <td className={tdStyle}>
              {edit ?
                <input
                type="checkbox"
                name="lectures"
                className = "ml-6"
                defaultChecked = {d.lectures ?? false}
                onChange={(e) => handleChangeLectures(d.id, e.target.checked)}
                />
                :
                <>{d?.lectures? "+": "-"}</>
              }
            </td>
            <td className={tdStyle}>
                {edit ?
                  <select name = "subgroup" defaultValue = {d.subgroup ?? "-"}
                    onChange={e => handleChangeSubgroup(d.id, e.target.value)}
                  >
                      <option key = "-" value = "-">-</option>
                      <option key = "1" value = "1">1</option>
                      <option key = "2" value = "2">2</option>
                      <option key = "все" value = "все">все</option>
                  </select>
                  :
                  <>{d.subgroup ? d.subgroup : "-"}</>
                }
            </td>
            {
              edit && <>
                <td>
                  <button onClick={() => handleSave(d.id)}>
                    <CheckIcon className="w-6 mr-2 ml-2" />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(d.id)}>
                    <MinusIcon className="w-6 mr-2 ml-2" />
                  </button>
                </td>
              </>
            }
        </tr>
      )
      }
    </tbody>
    </table>
  )
}