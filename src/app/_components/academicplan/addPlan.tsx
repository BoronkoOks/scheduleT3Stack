"use client"

import {ClipboardDocumentListIcon, PlusIcon} from "@heroicons/react/16/solid"
import {updateButtonStyle} from "~/styles/daisystyles"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import React, {useState} from "react"
import { AcademicPlan } from "@prisma/client"


export function AddPlan ({specDiscId}: {specDiscId: string}) {
    const divField = "flex align-middle"
    const inputClassStyle = "input border-2 boder-dashed"

    const queryClient = useQueryClient()
    const [plan, setPlan] = useState<AcademicPlan>({
            id: "",
            specDiscId: specDiscId,
            semester: 1,
            lectures: 0,
            practise: 0,
            labs: 0,
            ksr: 0,
            coursework: false,
            exam: false
        })

    const url = "/api/academicplan?specDiscId=" + specDiscId

    const postMutation = useMutation({
        mutationFn: async (plan: AcademicPlan) => {
          const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(plan)
          })
    
          if (!response.ok) {
            throw new Error("Не получилось")
          }
          
          return response.json()
        },
        onSuccess: () => {
          queryClient.invalidateQueries(["academicplan", "specDiscId"])
        },
      })


    function handleSemesterChange(semester: string){
        if (Number(semester)) {
            setPlan({...plan, semester: Number(semester)})
        }
    }

    function handleLecturesChange(lectures: string){
        if (Number(lectures)) {
            setPlan({...plan, lectures: Number(lectures)})
        }
    }

    function handlePractiseChange(practise: string){
        if (Number(practise)) {
            setPlan({...plan, practise: Number(practise)})
        }
    }

    function handleLabsChange(labs: string){
        if (Number(labs)) {
            setPlan({...plan, labs: Number(labs)})
        }
    }

    function handleKsrChange(ksr: string){
        if (Number(ksr)) {
            setPlan({...plan, ksr: Number(ksr)})
        }
    }

    function handleCourseworkChange(coursework: boolean){
        setPlan({...plan, coursework: coursework})
    }

    function handleExamChange(exam: boolean){
        setPlan({...plan, exam: exam})
    }


    function handleAdd() {
        postMutation.mutate(plan)
    }
    

    return (
        <div className = "border-2 border-green-700 bg-white rounded-lg">
        <details className = "collapse" tabIndex={0}>
            <summary className = "collapse-title text-xl font-medium">
                <div className = "flex">
                    <PlusIcon  className = "w-6" />
                    <ClipboardDocumentListIcon className = "w-6" />
                </div>
            </summary>
            <div className = "collapse-content " >
                <div className = {divField}>
                    <label className = "mt-2 mr-2">Семестр</label>
                    <input
                        type="number"
                        min = "1"
                        max = "10"
                        name = "semester"
                        required
                        className={inputClassStyle + " w-16 mb-1"}
                        value={plan.semester}
                        onChange={(e) => handleSemesterChange(e.target.value)}
                    />
                </div>
                <div className = {divField + " mt-2"}>
                    <label className = "mt-2 mr-2">Лекций</label>
                    <input
                        type="number"
                        min = "0"
                        name = "lectures"
                        required
                        className={inputClassStyle + " w-16 mb-1"}
                        value={plan.lectures}
                        onChange={(e) => handleLecturesChange(e.target.value)}
                    />
                    <label className = "mt-2 mr-2 ml-10">Практик</label>
                    <input
                        type="number"
                        min = "0"
                        name = "practise"
                        required
                        className={inputClassStyle + " w-16 mb-1"}
                        value={plan.practise}
                        onChange={(e) => handlePractiseChange(e.target.value)}
                    />
                </div>
                <div className = {divField + " mt-2"}>
                    <label className = "mt-2 mr-2">Лабораторных</label>
                    <input
                        type="number"
                        min = "0"
                        name = "labs"
                        required
                        className={inputClassStyle + " w-16 mb-1"}
                        value={plan.labs}
                        onChange={(e) => handleLabsChange(e.target.value)}
                    />
                    <label className = "mt-2 mr-2 ml-4">КСР</label>
                    <input
                        type="number"
                        min = "0"
                        name = "ksr"
                        required
                        className={inputClassStyle + " w-16 mb-1"}
                        value={plan.ksr}
                        onChange={(e) => handleKsrChange(e.target.value)}
                    />
                </div>
                <div className = {divField}>
                    <label className = "mt-1  mb-4">Курсовая</label>
                    <input
                        type="checkbox"
                        name="coursework"
                        className = "mt-2 ml-2 mb-4"
                        checked = {plan.coursework ?? false}
                        onChange={(e) => handleCourseworkChange(e.target.checked)}
                    />
                </div>
                <div className = {divField}>
                    <label className = "mb-4">Форма аттестации:</label>
                    <div>
                        <label className = "ml-4"
                        >
                            <input type = "radio"  className = "mr-2"
                                checked = {!plan.exam} onChange = {(e) => handleExamChange(!e.target.checked)}/>
                            Зачёт
                        </label>
                        <label className = "ml-2"
                        >
                            <input type = "radio"  className = "mr-2"
                                checked = {plan.exam ?? false} onChange = {(e) => handleExamChange(e.target.checked)}/>
                            Экзамен
                        </label>
                    </div>
                </div>
                <div className = "mb-1">
                    <button onClick={() => handleAdd()} className={updateButtonStyle + " w-full"}>
                        Добавить
                    </button>
                </div>
            </div>
        </details>
        </div>
    )
}
