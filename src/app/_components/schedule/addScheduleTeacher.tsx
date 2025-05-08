"use client"

import { updateButtonStyle, divForm } from "~/styles/daisystyles"
import { api } from "~/trpc/react"
import { useState } from "react"
import { Classroom,  Schedule } from "@prisma/client"
import { useSearchParams } from "next/navigation"

export function AddScheduleTeacher () {
    const params = useSearchParams()

    const teacherId = params.get("id") || ""
    const evenWeek = params.get("evenWeek") == "true" ? true : false
    const day = Number(params.get("day")) || 1
    const lesson = Number(params.get("lesson")) || 1
    const labelStyle = "mx-4"

    const [newlesson, setNewLesson] = useState<Schedule>({
        id: "new",
        evenWeek: evenWeek,
        day: day,
        lesson: lesson,
        teacherId: teacherId,

        lessontype: "лек",
        subgroup: null,
        disciplineId: "",
        groupId: "",
        classroomID: ""
    })

    const [classroom, setClassroom] = useState<Classroom | undefined>()

    const disciplines = api.discipline.getListByTeacherId.useQuery({teacherId: teacherId})
    const groups = api.group.getByDisciplineId.useQuery({disciplineId: newlesson.disciplineId})
    const classrooms = api.classroom.getFreeAtThisTime.useQuery(
        {query: "", evenWeek: evenWeek, day: day, lesson: lesson})
    
    
    const addLessonMutation = api.schedule.addLesson.useMutation()
    const utils = api.useUtils()

    const [errMessage, setErrMessage] = useState<string>("")


    let dayName = ""

    switch (Number(day)) {
        case 1: dayName = "Понедельник"; break;
        case 2: dayName = "Вторник"; break;
        case 3: dayName = "Среда"; break;
        case 4: dayName = "Четверг"; break;
        case 5: dayName = "Пятница"; break;
        case 6: dayName = "Суббота"; break;
        default: dayName = "???"; break;
    }


    function handleLessonTypeChange(lessonType: string){
        if (lessonType == "лек") {
            setNewLesson({...newlesson, lessontype: lessonType, groupId: "", subgroup: null})
        }
        else {
            setNewLesson({...newlesson, lessontype: lessonType})
        }
    }

    function handleSubgroupChange(sg: number | string) {
        if (Number(sg)) {
            setNewLesson({...newlesson, subgroup: Number(sg)})
        }
        else {
            setNewLesson({...newlesson, subgroup: null})
        }
    }

    function handleClassroomChange(id: string) {
        setNewLesson({...newlesson, classroomID: id})
        setClassroom(classrooms.data?.find(c => c.id == id))
    }


    const handleSave = () => {
        // console.log("\n\n", handleSave, "\n\n")
            setErrMessage("handleSave")

        if (newlesson.lessontype == "лек") {
            setErrMessage("лек")
            for (let i = 0; i < (groups.data?.length || 0); i++) {
                addLessonMutation.mutate({
                        evenWeek: evenWeek,
                        day: Number(day),
                        lesson: Number(lesson),
                        teacherId: teacherId,
                        
                        lessontype: newlesson.lessontype,
                        groupId: groups.data[i]?.id ?? "",
                        subgroup: newlesson.subgroup || undefined,
                        disciplineId: newlesson.disciplineId,
                        classroomID: newlesson.classroomID
                    },
                    {
                        onSuccess: () => {
                            utils.schedule.getForDayByTeacherId.invalidate()
                            setErrMessage("")
                        },
                        onError(error, variables, context) {
                            setErrMessage(JSON.stringify(error))
                        },
                    }
                )
            }
        }
        else {
            addLessonMutation.mutate({
                evenWeek: evenWeek,
                day: Number(day),
                lesson: Number(lesson),
                teacherId: teacherId,
                
                lessontype: newlesson.lessontype,
                groupId: newlesson.groupId,
                subgroup: newlesson.subgroup || undefined,
                disciplineId: newlesson.disciplineId,
                classroomID: newlesson.classroomID
                },
                {
                    onSuccess: () => {
                        utils.schedule.getForDayByTeacherId.invalidate()
                        // setErrMessage("")
                    },
                    onError(error, variables, context) {
                        setErrMessage(JSON.stringify(error))
                    },
                }
            )
        }
    }

    return (
        <div className="flex">
        <div className = "">
            <div>
                <div className = "mt-4">
                    <label className = {labelStyle}><b>Неделя:</b> {evenWeek? "чётная" : "нечётная"} </label>
                    <label className = {labelStyle}><b>День:</b> {dayName}</label>
                    <label className = {labelStyle}><b>Пара:</b> {lesson}</label>
                </div>

                <div className = "mt-4">
                    <label className = {labelStyle}><b>Дисциплина:</b> </label>
                    {disciplines.status == "pending" ? <>загрузка...</>
                    :
                    <select defaultValue = "" onChange = {(e) => setNewLesson({...newlesson, disciplineId: e.target.value})}
                    >
                        <option key = "" value = "">[не выбрано]</option>
                        { disciplines.data &&
                            disciplines.data.map(d =>
                                <option key = {d.discipline.id} value = {d.discipline.id}>
                                    {d.discipline.name}
                                </option>
                            )
                        }
                    </select>
                    }
                </div>

                <div className = "mt-4">
                    <label className = {labelStyle}><b>Тип занятия:</b> </label>
                    <select value = {newlesson.lessontype}
                        onChange={(e) => handleLessonTypeChange(e.target.value)}
                    >
                        <option value = "лек">лекция</option>
                        <option value = "пр">практика</option>
                        <option value = "лаб">лабораторная</option>
                        <option value = "кср">кср</option>
                        <option value = "крб">крб</option>
                        <option value = "пр">кпр</option>
                    </select>
                </div>

                <div className = "mt-4">
                    <label className = {labelStyle}><b>Группа:</b> </label>
                    {
                        newlesson.disciplineId == "" ? <>(выберите дисциплину)</>
                        :
                        <>
                        {disciplines.status == "pending" ? <>загрузка...</>
                            :
                            <>
                            {
                                newlesson.lessontype == "лек" ?
                                <>
                                {
                                    groups.status == "pending" ? <>загрузка...</>
                                    :
                                    <>
                                    {
                                        groups.data?.slice(1).reduce(
                                            (acc, curr) => acc + ", " + curr.name,
                                            groups.data[0]?.name
                                        )
                                    
                                    }
                                    </>
                                }
                                </>
                                :
                                <>
                                <select value = {newlesson.groupId}
                                    onChange={e => setNewLesson({...newlesson, groupId: e.target.value})}
                                >
                                    <option key = "" value = "">[не выбрано]</option>
                                    {
                                        groups.data?.map(g =>
                                            <option key = {g.id} value={g.id}>{g.name}</option>
                                        )
                                    }
                                </select>
                                </>
                            }
                            </>
                        }
                        </>
                    }
                </div>

                <div className = "mt-4">
                    <label className = {labelStyle}><b>Подгруппа:</b> </label>
                    {
                        groups.status == "pending" ? <>загрузка...</>
                        :
                        <>
                        {
                            newlesson.lessontype == "лек" ? <>все</>
                            :
                            <>
                            {
                                newlesson.groupId == "" ? <>(выберите группу)</>
                                :
                                <select value = {newlesson.subgroup ?? "все"}
                                    onChange={(e) => {handleSubgroupChange(e.target.value)}}
                                >
                                    <option key = "все" value = "все">все</option>
                                    <option key = {1} value = {1}>1</option>
                                    <option key = {2} value = {2}>2</option>
                                </select>
                            }
                            </>
                        }
                        </>
                    }
                </div>

                <div className = "mt-4 flex">
                    <label className = {labelStyle}><b>Кабинет:</b> </label>
                    {
                        classrooms.status == "pending" ? <>загрузка...</>
                        :
                        <select value = {newlesson.classroomID}
                            onChange={(e) => handleClassroomChange(e.target.value)}
                        >
                            <option value = "">[не выбрано]</option>
                            {
                                classrooms.data &&
                                classrooms.data.map(c =>
                                    <option key = {c.id} value = {c.id}>{c.name}</option>
                                )
                            }
                        </select>
                    }
                    <label className = "ml-4">
                        {classroom && 
                            <>
                                <b>Проектор:</b> {classroom.projector ? "есть" : "-"} <b className="ml-2">Мест:</b> {classroom.seats} <b className="ml-2">Компьютеров:</b> {classroom.computers}
                            </>
                        }
                    </label>
                </div>

                {
                    newlesson.disciplineId != "" && newlesson.classroomID != "" &&
                    (newlesson.lessontype == "лек" || newlesson.groupId != "") &&
                    <div className = "mt-4">
                        <div>
                            <button className = {updateButtonStyle + " w-1/2"} onClick={handleSave}>
                                Сохранить
                            </button>
                        </div>
                        <div>
                        {/* {
                            errMessage != "" && errMessage != "{}" &&
                            <label className="text-red-500">{errMessage}</label>
                        } */}
                        </div>
                    </div>
                }
            </div>
        </div>
        {/* {
            teacherLessons.status == "pending" ? <>загрузка...</>
            :
            <div className="ml-6">
            {
                newlesson.teacherId != "" && teacherLessons.data && 
                <ScheduleForDay schedule={teacherLessons.data ?? []} forWho = {"teacher"} day = {day} lesson = {lesson} />
            }
            </div>
        } */}
        </div>
    )
}