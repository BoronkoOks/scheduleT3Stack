"use client"

import React, {useState, useEffect} from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"


export default function SearchByRadio (
    {paramString = "searchBy"}: {paramString?: string}
) {
    const searchParams = useSearchParams();
    const searchBy = searchParams.get(paramString) || "group";
    const selected = searchParams.get(paramString) || "selected";
    const pathname = usePathname();
    const { replace } = useRouter();

    const [radio, setRadio] = useState<string>(searchBy)

    function handleRadioChange (rad: string) {
        const params = new URLSearchParams(searchParams)

        params.set(paramString, rad)
        params.delete("selected")

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