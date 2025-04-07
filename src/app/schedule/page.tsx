import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import {pageHeaderStyle} from "~/styles/daisystyles"
import ScheduleTable from "../_components/schedule/scheduleTable";
import SearchInput from "../ui/searchInput";


export default async function Home() {
  const session = await auth()
  const role = session?.user?.role ?? "GUEST"

  let radio = 2

  return (
    <HydrateClient>
      <main>
        {role}
        <h2 className = {pageHeaderStyle}>Расписание</h2>
        <div className = "mt-4 mb-6 ml-10">
          <label className = "ml-4"
          >
            <input type = "radio"  className = "mr-2" defaultChecked = {true} />Расписание группы
          </label>
          <label className = "ml-4">
            <input type = "radio"  className = "mr-2" checked = {false} />Расписание преподавателя
          </label>
          <label className = "ml-4">
            <input type = "radio"  className = "mr-2" checked = {false}/>Расписание кабинета
          </label>
        </div>
        <div  className = "mt-4 mb-6 ml-16">
          <SearchInput placeholder = "Найти..."/>
          <select className = "mt-4 ml-4">
            <option>[Результаты поиска]</option>
          </select>
        </div>
        <div  className = "mt-4 mb-6 ml-10">
          <ScheduleTable schedule = "group" mode = {role}/>
        </div>
      </main>
    </HydrateClient>
  );
}
