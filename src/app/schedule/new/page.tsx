import React from "react"
import { db } from "~/server/db"
import {pageHeaderStyle} from "~/styles/daisystyles"
import { AddScheduleGroup } from "~/app/_components/schedule/addScheduleGroup"
import { isAdmin, isAdminOrSelectedTeacher } from "~/app/api/auth/check"
import { AddScheduleTeacher } from "~/app/_components/schedule/addScheduleTeacher"
import {Err_403, Err_404, Err_418} from "~/app/_components/errorsMessages/errorMessages"

export default async function Page (props: {searchParams: 
    Promise<{forWho?: string, id?: string; evenWeek?: string; day?: number; lesson?: number}>}
) {
    const params = await props.searchParams

    const forWho = params.forWho || "group"
    const id = params.id || ""
    const evenWeek = params.evenWeek == "true" ? true : false
    const day = params.day || 1
    const lesson = params.lesson || 1


    // Проверить права доступа

    let allowed = false

    switch (forWho) {
        case "group": {
            allowed = await isAdmin()
        };
        break;

        case "teacher": {
            allowed = await isAdminOrSelectedTeacher(id)
        };
        break;

        case "classroom": {
            return (
                <Err_418 />
            )
        };
        break;

        default: {
            return (
                <Err_404 message = {"Занятие для \"" + forWho + "\" не может быть создано"} />
            )
        }; break;
    }

    if (!allowed) {
        return (
            <Err_403 />
        )
    }


    // Проверить допустимость номера дня

    if (day < 1 || day > 6) {
        return (
            <Err_404 message = "Невозможно создать занятие в указанный день." />
        )
    }


    // Проверить допустимость номера пары

    if (lesson < 1 || lesson > 6) {
        return (
            <Err_404 message = "Невозможно создать занятие для указанной пары." />
        )
    }


    // Определиться с заголовком страницы

    let pageTitle = ""

    switch (forWho) {
        case "group": {
            const group = await db.group.findFirst({
                where: {id: id}
            })
    
            if (!group) {
                return (
                    <Err_404 message = "Группа не найдена." />
                )
            }
    
            pageTitle = "Занятие группы " + group?.name
        };
        break;

        case "teacher": {
            const teacher = await db.teacher.findFirst({
                where: { id: id }
            })
    
            if (!teacher) {
                return (
                    <Err_404 message = "Преподаватель не найден." />
                )
            }
    
            pageTitle = "Занятие преподавателя: " + teacher?.surname + " " + teacher?.name + " " + teacher?.fathername    
        };
        break;

        default: {
            return (
                <Err_404 message = "Занятие с указанными параметрами не может быть создано" />
            )
        }; break;
    }
    

    return (
        <main>
            <h2 className = {pageHeaderStyle}>{pageTitle}</h2>
            <div className = "mt-4 ml-2 mb-6 mr-2">
                {
                    forWho == "group" ?
                    <AddScheduleGroup />
                    :
                    <AddScheduleTeacher />
                }
                </div>
        </main>
    )
}
