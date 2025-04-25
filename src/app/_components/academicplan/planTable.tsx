"use client"

import {MinusIcon, CheckIcon } from "@heroicons/react/24/outline"
import React, {useState} from "react"
import { AcademicPlan } from "@prisma/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export default function PlanTable({specDiscId, role}:
  {specDiscId: string, role: string}
) {
  const tdStyle = "border border-black border-solid"
  const inputClassStyle = "input border-2 boder-dashed"

  const edit = role == "ADMIN"

  const queryClient = useQueryClient()
  const [plan, setPlan] = useState<AcademicPlan[]>([])

  const url = "/api/academicplan?specDiscId=" + specDiscId

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["academicplan", "specDiscId"],
    queryFn: async () => {
      const plans = await fetch(url).then((res) => res.json())
      setPlan(plans.map((u: AcademicPlan) => u))

      return plans
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/academicplan/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Не получилось");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["academicplan", "specDiscId"]);
    },
  })

  const putMutation = useMutation({
    mutationFn: async (plan: AcademicPlan) => {
      const response = await fetch(`/api/academicplan/${plan.id}`, {
        method: "PUT",
        body: JSON.stringify(plan),
      })

      if (!response.ok) {
          console.log(response)
      }

      return response.json();
    },
  })



  function handleDelete(id: string) {
    deleteMutation.mutate(id);
  }

  function handleSave(id: string) {
    const p = plan.find(p => p.id == id)

    if (p){
      putMutation.mutate(p)
    }
  }


  function handleSemesterChange(id: string, semester: string){
    if (Number(semester)) {
      setPlan(
        plan.map(p => {
          if (p.id != id) {
            return p
          }
          else {
            return {...p, semester: Number(semester)}
          }
        })
      )
    }
  }

  function handleLecturesChange(id: string, lectures: string){
    if (Number(lectures)) {
      setPlan(
        plan.map(p => {
          if (p.id != id) {
            return p
          }
          else {
            return {...p, lectures: Number(lectures)}
          }
        })
      )
    }
  }

  function handlePractiseChange(id: string, practise: string){
    if (Number(practise)) {
      setPlan(
        plan.map(p => {
          if (p.id != id) {
            return p
          }
          else {
            return {...p, practise: Number(practise)}
          }
        })
      )
    }
  }

  function handleLabsChange(id: string, labs: string){
    if (Number(labs)) {
      setPlan(
        plan.map(p => {
          if (p.id != id) {
            return p
          }
          else {
            return {...p, labs: Number(labs)}
          }
        })
      )
    }
  }

  function handleKsrChange(id: string, ksr: string){
    if (Number(ksr)) {
      setPlan(
        plan.map(p => {
          if (p.id != id) {
            return p
          }
          else {
            return {...p, ksr: Number(ksr)}
          }
        })
      )
    }
  }

  function handleCourseworkChange(id: string, coursework: boolean){
    setPlan(
      plan.map(p => {
        if (p.id != id) {
          return p
        }
        else {
          return {...p, coursework: coursework}
        }
      })
    )
  }

  function handleExamChange(id: string, exam: string){
    const isExam = exam == "экзамен"

    setPlan(
      plan.map(p => {
        if (p.id != id) {
          return p
        }
        else {
          return {...p, exam: isExam}
        }
      })
    )
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
    <div>
      <table className = "box-border my-4 border-collapse border-1 border-black">
        <thead>
          <tr>
            <th className={tdStyle}>№</th>
            <th className={tdStyle + " px-2"}>Семестр</th>
            <th className={tdStyle + " px-2"}>Лекций</th>
            <th className={tdStyle + " px-2"}>Практик</th>
            <th className={tdStyle + " px-2"}>Лабораторных</th>
            <th className={tdStyle + " px-2"}>КСР</th>
            <th className={tdStyle + " px-2"}>Курсовая</th>
            <th className={tdStyle + " px-2"}>Форма аттестации</th>
            {edit && <>
              <th></th>
              <th></th>
            </>}
          </tr>
        </thead>
        <tbody>
          {plan.map((p, i) => (
            <tr key={p.id}>
              <td className={tdStyle + " text-right px-2"}>{i + 1}</td>
              <td className={tdStyle + " text-center"}>
                {edit ?
                  <input
                    type="number"
                    min = "1"
                    max = "10"
                    required
                    className={inputClassStyle + " w-16"}
                    value={p.semester}
                    onChange={(e) => handleSemesterChange(p.id, e.target.value)}
                  />
                  :
                  <>{p.semester}</>
                }
              </td>
              <td className={tdStyle + " text-center"}>
                {edit ?
                  <input
                    type="number"
                    min = "1"
                    required
                    className={inputClassStyle + " w-16"}
                    value={p.lectures}
                    onChange={(e) => handleLecturesChange(p.id, e.target.value)}
                  />
                  :
                  <>{p.lectures}</>
                }
              </td>
              <td className={tdStyle + " text-center"}>
                {edit ?
                  <input
                    type="number"
                    min = "1"
                    required
                    className={inputClassStyle + " w-16"}
                    value={p.practise}
                    onChange={(e) => handlePractiseChange(p.id, e.target.value)}
                  />
                  :
                  <>{p.practise}</>
                }
              </td>
              <td className={tdStyle + " text-center"}>
                {edit ?
                  <input
                    type="number"
                    min = "1"
                    required
                    className={inputClassStyle + " w-16"}
                    value={p.labs}
                    onChange={(e) => handleLabsChange(p.id, e.target.value)}
                  />
                  :
                  <>{p.labs}</>
                }
              </td>
              <td className={tdStyle + " text-center"}>
                {edit ?
                  <input
                    type="number"
                    min = "1"
                    required
                    className={inputClassStyle + " w-16"}
                    value={p.ksr}
                    onChange={(e) => handleKsrChange(p.id, e.target.value)}
                  />
                :
                <>{p.ksr}</>
                }
              </td>
              <td className={tdStyle + " text-center px-2"}>
                {edit ?
                  <input
                  type="checkbox"
                  name="coursework"
                  checked = {p.coursework ?? false}
                  onChange={(e) => handleCourseworkChange(p.id, e.target.checked)}
                />
                :
                <>{p.coursework? "есть" : "-"}</>
                }
              </td>
              <td className={tdStyle + " text-center px-2"}>
                {edit ?
                  <select value = {p.exam ? "экзамен" : "зачёт"}
                    onChange={e => handleExamChange(p.id, e.target.value)}
                  >
                    <option key = "зачёт" value = "зачёт">зачёт</option>
                    <option key = "экзамен" value = "экзамен">экзамен</option>
                  </select>
                :
                <>{p.exam ? "экзамен" : "зачёт"}</>
                }
              </td>
              <td className={tdStyle + " border-none"}>
                <button onClick={() => handleSave(p.id)}>
                  <CheckIcon className="w-6 mr-2 ml-2" />
                </button>
              </td>
              <td className={tdStyle + " border-none"}>
                <button onClick={() => handleDelete(p.id)}>
                  <MinusIcon className="w-6 mr-2 ml-2" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
