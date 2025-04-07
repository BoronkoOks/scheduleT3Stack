// "use client"

// import {type Session} from "next-auth"
import Link from "next/link"
// import { navbarButton } from "~/styles/daisystyles";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

export async function Navbar ( //{session} : {session: Session}
    // {currPage} : {currPage: string}
    ) {
        const navbarButton = "btn bg-green-400 border-1 rounded-none border-green-600 hover:text-gray-50 hover:bg-green-600"
        const emptyPage = "btn bg-gray-500 border-1 text-gray-300 rounded-none border-gray-600"
        const currentPageButton = "btn bg-gray-100 border-2 rounded-none border-green-700 border-b-0 hover:text-gray-50 hover:bg-green-600"

        // const [currPage, setCurrPage] = useState("/")

    return (
        <div className = "navbar bg-gray-100">
            <Link href = "/" className = {emptyPage}>
                Домой
            </Link>
            <Link href = "/teacher" className = {emptyPage}
                // onClick = {() => setCurrPage("/teacher")}
                >
                Преподаватели
            </Link>
            <Link href = "/discipline" className = {emptyPage}>
                Дисциплины
            </Link>
            <Link href = "/group" className = {emptyPage}>
                Группы
            </Link>
            <Link href = "/classroom" className = {emptyPage}>
                Кабинеты
            </Link>
            <Link href = "/speciality" className = {emptyPage}>
                Специальности
            </Link>
            <Link href = "/schedule" className = {emptyPage}>
                Расписание
            </Link>
        </div>
    )
}