"use client"

import Link from "next/link"
import { getRole } from "~/app/api/auth/check"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import React, {useEffect} from "react"
import { usePathname } from 'next/navigation'

export function Navbar (
    {role} : {role: string}
) {
    const navbarButton = "btn bg-green-400 border-1 rounded-none border-green-600 hover:text-gray-50 hover:bg-green-600"
    const emptyPage = "btn bg-gray-500 border-1 text-gray-300 rounded-none border-gray-600"
    const currentPageButton = "btn bg-gray-100 border-2 rounded-none border-green-700 border-b-0 hover:text-gray-50 hover:bg-green-600"

    const [currentPage, setCurrentPage] = React.useState(usePathname())

    return (
        <div className = "navbar bg-gray-100">
            <Link href = "/" onClick={()=> setCurrentPage("/")}
                className = {currentPage == "/" ? currentPageButton : emptyPage}
            >
                Домой
            </Link>

            <Link href = "/schedule" onClick={()=> setCurrentPage("/schedule")}
                className = {currentPage == "/schedule" ? currentPageButton : emptyPage}
            >
                Расписание
            </Link>

            {role == "ADMIN" &&
            <Link href = "/user" onClick={()=> setCurrentPage("/user")}
                className = {currentPage == "/user" ? currentPageButton : navbarButton}
            >
                Пользователи
            </Link>
            }
            
            <Link href = "/teacher" onClick={()=> setCurrentPage("/teacher")}
                className = {currentPage == "/teacher" ? currentPageButton : navbarButton}
            >
                Преподаватели
            </Link>

            <Link href = "/discipline" onClick={()=> setCurrentPage("/discipline")}
                className = {currentPage == "/discipline" ? currentPageButton : navbarButton}
            >
                Дисциплины
            </Link>

            <Link href = "/group" onClick={()=> setCurrentPage("/group")}
                className = {currentPage == "/group" ? currentPageButton : navbarButton}
            >
                Группы
            </Link>

            <Link href = "/speciality" onClick={()=> setCurrentPage("/speciality")}
                className = {currentPage == "/speciality" ? currentPageButton : navbarButton}
            >
                Специальности
            </Link>

            <Link href = "/classroom" onClick={()=> setCurrentPage("/classroom")}
                className = {currentPage == "/classroom" ? currentPageButton : navbarButton}
            >
                Кабинеты
            </Link>
        </div>
    )
}