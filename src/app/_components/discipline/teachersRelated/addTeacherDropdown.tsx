import { HydrateClient } from "~/trpc/server"
import { db } from "~/server/db"
import SearchInput from "~/app/ui/searchInput"
import Pagination from "~/app/ui/pagination"
import { getRole } from "~/app/api/auth/check"
import { Suspense } from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { ArrowLongDownIcon, MinusIcon } from "@heroicons/react/24/outline"
import { AddTeacherTable} from "./addTeacherTable"


export default async function AddTeacherDropdown ({query, disciplineId}:
    {query: string, disciplineId: string}
) {
    return (
        <div className = "border-2 border-gray-500 rounded-lg pl-2">
        <details className = "collapse" tabIndex={0}>
            <summary className = "collapse-title">
                <div className = "flex">
                    <h2><b>Добавить преподавателя</b></h2>
                    <ArrowLongDownIcon className = "w-6" />
                </div>
            </summary>
            <div className = "mb-4 mx-4">
            <SearchInput placeholder = "Найти преподавателя..." />
            </div>
            {query != "" && <Suspense fallback={<div>Загрузка...</div>}>
                <AddTeacherTable query = {query} disciplineId = {disciplineId} />
            </Suspense>
             }
        </details>
        </div>
    )
}