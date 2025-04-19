
import Link from "next/link"

export async function Navbar () {
    const navbarButton = "btn bg-green-400 border-1 rounded-none border-green-600 hover:text-gray-50 hover:bg-green-600"
    const emptyPage = "btn bg-gray-500 border-1 text-gray-300 rounded-none border-gray-600"
    const currentPageButton = "btn bg-gray-100 border-2 rounded-none border-green-700 border-b-0 hover:text-gray-50 hover:bg-green-600"

    return (
        <div className = "navbar bg-gray-100">
            <Link href = "/" className = {emptyPage}>
                Домой
            </Link>
            <Link href = "/schedule" className = {emptyPage}>
                Расписание
            </Link>
            <Link href = "/teacher" className = {emptyPage}>
                Преподаватели
            </Link>
            <Link href = "/discipline" className = {navbarButton}>
                Дисциплины
            </Link>
            <Link href = "/group" className = {currentPageButton}>
                Группы
            </Link>
            <Link href = "/speciality" className = {navbarButton}>
                Специальности
            </Link>
            <Link href = "/classroom" className = {navbarButton}>
                Кабинеты
            </Link>
        </div>
    )
}