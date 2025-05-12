"use client"

import React, {useState} from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"


export default function SearchByRadio () {
    const searchParams = useSearchParams()
    const searchBy = searchParams.get("searchBy") || "group"
    const pathname = usePathname()
    const { replace } = useRouter()

    const [radio, setRadio] = useState<string>(searchBy)

    function handleRadioChange (rad: string) {
        const params = new URLSearchParams(searchParams)

        params.set("searchBy", rad)
        params.delete("selected") // очистить selected при переключении

        replace(`${pathname}?${params.toString()}`)
        setRadio(rad)
    }
    
    return (
        <>
        <label className = "ml-4">
            <input type = "radio"  className = "mr-2"
            checked = {radio == "group"} onChange={(e) => {if (e.target.checked) handleRadioChange("group")}}
        />Расписание группы
        </label>
        <label className = "ml-4">
            <input type = "radio"  className = "mr-2"
            checked = {radio == "teacher"} onChange={(e) => {if (e.target.checked) handleRadioChange("teacher")}}
            />Расписание преподавателя
        </label>
        <label className = "ml-4">
            <input type = "radio"  className = "mr-2"
            checked = {radio == "classroom"} onChange={(e) => {if (e.target.checked) handleRadioChange("classroom")}}
            />Расписание кабинета
        </label>
        </>
    )
}