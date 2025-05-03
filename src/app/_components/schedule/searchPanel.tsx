"use client"

import React from "react"
import SearchInput from "~/app/ui/searchInput"
import SearchByRadio from "./searchByRadio"
import SelectList from "./selectList"
import { updateButtonStyle } from "~/styles/daisystyles"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type resType = {
    id: string,
    name: string
}

export default function SearchPanel({searchByList, edit = false}:
    {searchByList: resType[], edit: boolean}
) {
    const searchParams = useSearchParams()
    const searchBy = searchParams.get("searchBy") || "group"
    const selected = searchParams.get("selected") || ""

    return (
        <>
            <div>
                <SearchByRadio />
            </div>
            <div className = "mt-4 ml-8">
                <SearchInput placeholder = "Найти..."/>
            </div>
            <div className = "mt-4 mb-6 ml-10 flex">
                <div className = "mt-4">
                    <SelectList searchByList={searchByList}/>
                </div>
                
                {edit && selected != "" &&
                <Link href={`/schedule/edit?searchBy=${searchBy}&id=${selected}`}>
                    <button className = {updateButtonStyle + " ml-4"}>Редактировать -></button>
                </Link>
                }
            </div>
        </>
    )
}
