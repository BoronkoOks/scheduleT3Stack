import SearchInput from "~/app/ui/searchInput"
import SearchByRadio from "./searchByRadio"
import SelectList from "./selectList"

type resType = {
    id: string,
    name: string
}

export default function SearchPanel({searchByList}:
    {searchByList: resType[]}
) {
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
            </div>
        </>
    )
}
