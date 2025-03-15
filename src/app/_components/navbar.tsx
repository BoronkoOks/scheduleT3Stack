// import {type Session} from "next-auth"
import Link from "next/link"
// import { navbarButton } from "~/styles/daisystyles";

export async function Navbar ( //{session} : {session: Session}
    ) {
        const navbarButton = "btn bg-green-400 border-1 rounded-none border-green-600 hover:text-gray-50 hover:bg-green-600"
        const emptyPage = "btn bg-gray-500 border-1 text-gray-300 rounded-none border-gray-600"

    return (
        <div className = "navbar bg-green-200">
            <Link href = "/" className = {emptyPage}>
                Домой
            </Link>
            <Link href = "/teacher" className = {navbarButton}>
                Преподаватели
            </Link>
            <Link href = "/schedule" className = {emptyPage}>
                Расписание
            </Link>
            <Link href = "/classroom" className = {emptyPage}>
                Кабинеты
            </Link>
            <Link href = "/discipline" className = {emptyPage}>
                Дисциплины
            </Link>
            <Link href = "/group" className = {emptyPage}>
                Группы
            </Link>
            <Link href = "/specialities" className = {emptyPage}>
                Специальности
            </Link>
        </div>
    )
}