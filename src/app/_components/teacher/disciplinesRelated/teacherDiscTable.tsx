"use client"

import React from "react"
import {MinusIcon, CheckIcon } from "@heroicons/react/24/outline"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TeacherDiscipline } from "@prisma/client"

export default function TeacherDiscTable({ teacherId, mode }:
    {teacherId: string, mode: string }
) {
  const queryClient = useQueryClient()
  const [discs, setDiscs] = React.useState<TeacherDiscipline[]>([])

  // адрес api
  const url = "/api/teacherDisciplines?teacherId=" + teacherId
  
  const tdStyle = "px-2 border border-black border-solid"
  const edit = mode === "ADMIN"

  // GET-запрос
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["teacherDisciplines", "teacherId"],

    queryFn: async () => {
      const disciplines = await fetch(url).then((res) => res.json())
      setDiscs(disciplines.map((u: TeacherDiscipline) => u))

      return disciplines
    },
  })

  // DELETE-запрос
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/teacherDisciplines/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Не получилось");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["teacherDisciplines", "teacherId"]);
    },
    })

  // PUT-запрос
  const putMutation = useMutation({
    mutationFn: async (dt: TeacherDiscipline) => {
      const response = await fetch(`/api/teacherDisciplines/${dt.id}`, {
        method: "PUT",
        body: JSON.stringify({lectures: dt.lectures, subgroup: dt.subgroup}),
        })

      if (!response.ok) {
        console.log(response)
      }
      return response.json();
    },
  })

  // Изменение чекбокса "Лекции"
  function handleChangeLectures (id: string, lectures: boolean) {
    setDiscs(discs.map(d => {
      if (d.id != id) {
        return d
      }
      else {
        return { ...d, lectures: lectures }
      }
    }))
  }

  // Изменение выбранной подгруппы
  function handleChangeSubgroup (id: string, subgroup: string) {
    setDiscs(discs.map(d => {
      if (d.id != id) {
        return d
      }
      else {
        return {...d, subgroup: subgroup}
      }
    }))
  }

  // Действие для кнопки сохранения
  function handleSave(id: string) {
    const td = discs.find(d => d.id == id)
      if (td){
        putMutation.mutate(td)
      }
  }

  // Действие для кнопки удаления
  function handleDelete(id: string) {
    deleteMutation.mutate(id);
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
    <table className="box-border mx-4 mb-4 border-collapse border-1 border-black border-collapse">
    <thead>
      <tr>
        <th className={tdStyle}>№</th>
        <th className={tdStyle + "whitespace-nowrap"}>Название</th>
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
      {discs.map( (d, i) => 
        <tr key = {d.id}>
          <td className={tdStyle}><p>{i+1}</p></td>
          <td className={tdStyle}>{d.discipline.name}</td>
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
            <select name = "subgroup" defaultValue = {d.subgroup ? d.subgroup : "-"}
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