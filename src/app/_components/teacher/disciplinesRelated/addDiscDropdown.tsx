
import SearchInput from "~/app/ui/searchInput"
import { Suspense } from "react"
import { ArrowLongDownIcon } from "@heroicons/react/24/outline"
import { AddDiscTable } from "./addDiscTable"


export default async function AddDiscDropdown({query, teacherId}:
    {query: string, teacherId: string}
) {
    return (
        <div className = "border-2 border-gray-500 rounded-lg pl-2">
        <details className = "collapse" tabIndex={0}>
            <summary className = "collapse-title">
                <div className = "flex">
                    <h2><b>Добавить дисциплину</b></h2>
                    <ArrowLongDownIcon className = "w-6" />
                </div>
            </summary>
            <div className = "mb-4 mx-4">
            <SearchInput placeholder = "Найти дисциплину..." />
            </div>
            {query != "" && <Suspense fallback={<div>Загрузка...</div>}>
                <AddDiscTable query = {query} teacherId = {teacherId} />
            </Suspense>
             }
        </details>
        </div>
    )
}



