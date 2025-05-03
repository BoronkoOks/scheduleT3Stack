"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, {useState} from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

type resType = {
    id: string,
    name: string
}

export default function SelectList (
  {searchByList, paramString = "selected"}: {searchByList: resType[], paramString?: string}
) {

    const searchParams = useSearchParams();
    const selected = searchParams.get(paramString) || "";
    const pathname = usePathname();
    const { replace } = useRouter();

    const [selectedOption, setSelectedOption] = useState<string>(selected)

    let found

    function handleSelectChange(id: string) {
      const params = new URLSearchParams(searchParams)

      found = searchByList.find(l => l.id === id)

      console.log("\n\n, found: ", found, "\n\n")

      if (found) {
        params.set(paramString, id)
      }
      else {
        params.delete(paramString)
      }

      replace(`${pathname}?${params.toString()}`)

      setSelectedOption(id)
    }

    // const queryClient = useQueryClient()
    // const [list, setList] = useState<resType[]>([])
    // const url = "/api/scheduleSelectList?searchBy=" + searchBy + "&query=" + query

    // const { isPending, isError, data, error } = useQuery({
    //     queryKey: ["scheduleSelectList", "searchBy", "query"],
        
    //     queryFn: async () => {
    //         const results = await fetch(url).then((res) => res.json())
            
    //         setList(results.map((u: resType) => u))

    //         return results
    //     },
    // })



    // if (isPending) {
    //   return (
    //     <div className="m-4">Загрузка...</div>
    //   )
    // }
  
    // if (isError) {
    //   return (
    //     <div className="m-4">Ошибка: {JSON.stringify(error)}
    //     /
    //     {JSON.stringify(list)}
    //     searchBy = {searchBy}, query = {query}
    //     </div>
    //   )
    // }
    
    return (
      <>
      <select className = "p-1" defaultValue={selectedOption} onChange = {(e) => handleSelectChange(e.target.value)}>
        <option key = {""} value={""}>[не выбрано]</option>
        {searchByList.map(l => 
          <option key = {l.id} value = {l.id}>{l.name}</option>
        )}
      </select>
      {JSON.stringify(found)}
      </>
    )
}