"use client"

import { updateButtonStyle, divForm } from "~/styles/daisystyles"
import { api } from "~/trpc/react"
import { useState } from "react"
import { Classroom, Schedule } from "@prisma/client"
import ScheduleForDay from "./scheduleForDay"

export function AddScheduleGroup ({groupId, evenWeek, day, lesson} :
{groupId: string, evenWeek: boolean, day: number, lesson: number}
) {
    const labelStyle = "mx-4"

    const [newlesson, setNewLesson] = useState<Schedule>({
        id: "new",
        evenWeek: evenWeek,
        day: day,
        lesson: lesson,
        groupId: groupId,

        lessontype: "пр",
        subgroup: null,
        disciplineId: "",
        teacherId: "",
        classroomID: ""
    })

    const [classroom, setClassroom] = useState<Classroom | undefined>()

    const disciplines = api.discipline.getListByGroupId.useQuery({groupId: groupId})
    const teachers = api.teacherDiscipline.getByDisciplineId.useQuery({disciplineId: newlesson.disciplineId})
    const teacherLessons = api.schedule.getForDayByTeacherId.useQuery(
        {teacherId: newlesson.teacherId, evenWeek: evenWeek, day: Number(day)})
    const classrooms = api.classroom.getList.useQuery({query: ""})
    
    const addLessonMutation = api.schedule.addLesson.useMutation()
    const utils = api.useUtils()

    const [errMessage, setErrMessage] = useState<string>("")


    function handleTeacherSelect (id: string) {
        setNewLesson({...newlesson, teacherId: id})
    }

    function handleClassroomChange(id: string) {
        setNewLesson({...newlesson, classroomID: id})
        setClassroom(classrooms.data?.find(c => c.id == id))
    }


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


    function handleSubgroupChange(sg: number | string) {
        if (Number(sg)) {
            setNewLesson({...newlesson, subgroup: Number(sg)})
        }
        else {
            setNewLesson({...newlesson, subgroup: null})
        }
    }


    const handleSave = () => {
            addLessonMutation.mutate({
            evenWeek: evenWeek,
            day: Number(day),
            lesson: Number(lesson),
            groupId: groupId,

            lessontype: newlesson.lessontype,
            subgroup: newlesson.subgroup || undefined,
            disciplineId: newlesson.disciplineId,
            teacherId: newlesson.teacherId,
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
                                <option key = {d.id} value = {d.id}>{d.name}</option>
                            )
                        }
                    </select>
                    }
                </div>

                <div className = "mt-4">
                    <label className = {labelStyle}><b>Преподаватель:</b> </label>
                    {teachers.status == "pending" ?  <>загрузка...</>
                    :
                    <select defaultValue = {newlesson.teacherId || ""} onChange={(e) => handleTeacherSelect(e.target.value)}>
                        <option value = "">[не выбрано]</option>
                        {
                            teachers.data &&
                            teachers.data.map(t => 
                                <option key = {t.teacher.id} value = {t.teacher.id}>
                                    {t.teacher.surname + " " + t.teacher.name + " " + t.teacher.fathername}
                                </option>
                            )
                        }
                    </select>
                    }
                </div>

                <div className = "mt-4">
                    <label className = {labelStyle}><b>Тип занятия:</b> </label>
                    <select value = {newlesson.lessontype}
                        onChange={(e) => setNewLesson({...newlesson, lessontype: e.target.value})}
                    >
                        <option value = "пр">практика</option>
                        <option value = "лаб">лабораторная</option>
                        <option value = "кср">кср</option>
                        <option value = "крб">крб</option>
                        <option value = "пр">кпр</option>
                    </select>
                    {/* <select defaultValue = {lectures ? "лек" : "пр"}>
                        {lectures && <option value = "лек">лекция</option>}
                        { subgroups != "-" && <option value = "пр">практика</option>}
                        { subgroups != "-" && <option value = "лаб">лабораторная</option>}
                        { subgroups != "-" && <option value = "кср">кср</option>}
                        <option value = "крб">крб</option>
                        <option value = "пр">кпр</option>
                    </select> */}
                </div>

                <div className = "mt-4">
                    <label className = {labelStyle}><b>Подгруппа:</b> </label>
                    {teachers.status == "pending" || newlesson.teacherId == "" ?  <>(выберите преподавателя)</>
                    :
                        <>
                        <select value = {newlesson.subgroup ?? "все"}
                            onChange={(e) => {handleSubgroupChange(e.target.value)}}
                        >
                            <option key = "все" value = "все">все</option>
                            <option key = {1} value = {1}>1</option>
                            <option key = {2} value = {2}>2</option>
                        </select>
                        {/* {subgroups == "все" ?
                            <select>
                                <option value = "все">Все</option>
                                <option value = "1">1</option>
                                <option value = "2">2</option>
                            </select>
                            :
                            <select>
                                <option value = {subgroups == "-" ? "все" : subgroups}>
                                    {subgroups == "-" ? "все" : subgroups}
                                </option>
                            </select>
                        } */}
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
                    newlesson.disciplineId != "" && newlesson.teacherId != "" && newlesson.classroomID != "" &&
                    !teacherLessons.data?.find(tl => tl.lesson == lesson) &&
                    <div className = "mt-4">
                        <div>
                            <button className = {updateButtonStyle + " w-1/2"} onClick={handleSave}>
                                Сохранить
                            </button>
                        </div>
                        <div>
                        {
                            errMessage != "" && errMessage != "{}" &&
                            <label className="text-red-500">{errMessage}</label>
                        }
                        </div>
                    </div>
                }
            </div>
        </div>
        {
            teacherLessons.status == "pending" ? <>загрузка...</>
            :
            <div className="ml-6">
            {
                newlesson.teacherId != "" && teacherLessons.data && 
                <ScheduleForDay schedule={teacherLessons.data ?? []} forWho = {"teacher"} day = {day} lesson = {lesson} />
            }
            </div>
        }
        </div>
    )
}