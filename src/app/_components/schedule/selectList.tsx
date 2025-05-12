"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, {useState} from "react"

type resType = {
    id: string,
    name: string
}

export default function SelectList (
  {searchByList, paramString = "selected"}: {searchByList: resType[], paramString?: string}
) {
    const searchParams = useSearchParams()
    const selected = searchParams.get("selected") || ""
    const pathname = usePathname()
    const { replace } = useRouter()

    const [selectedOption, setSelectedOption] = useState<string>(selected)

    let found

    function handleSelectChange(id: string) {
      const params = new URLSearchParams(searchParams)

      found = searchByList.find(l => l.id === id)

      if (found) {
        params.set(paramString, id)
      }
      else {
        params.delete(paramString)
      }

      replace(`${pathname}?${params.toString()}`)

      setSelectedOption(id)
    }
    
    return (
      <>
      <select className = "p-1" defaultValue={selectedOption} onChange = {(e) => handleSelectChange(e.target.value)}>
        <option key = {""} value={""}>[не выбрано]</option>
        {searchByList.map(l => 
          <option key = {l.id} value = {l.id}>{l.name}</option>
        )}
      </select>
      </>
    )
}