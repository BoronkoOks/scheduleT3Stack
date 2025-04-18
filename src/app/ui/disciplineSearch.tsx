import React from "react";
import SearchInput from "./searchInput";
import { db } from "~/server/db";
// import { addUserToGroup } from "../api/action/group";

export default function DisciplineSearch({
  query,
  id_teacher,
}: {
  query: string;
  id_teacher: string;
}) {
  return (
    <>
      <SearchInput placeholder="Найти дисциплину..." />
      {query && <p>query</p>}
      {id_teacher}
    <DisciplineToAdd query={query} id_teacher={id_teacher} />
    </>
  );
}

async function DisciplineToAdd({
  query,
  id_teacher,
}: {
  query: string;
  id_teacher: string;
}) {
  const disciplines = await db.discipline.findMany({
    include: {
      discTeacher: true
    },
    where: {
      AND: [
        {name: { startsWith: query, mode: 'insensitive' }},
        {discTeacher: {
          none: { teacherId: id_teacher } // Исключаем дисциплины, связанные с указанным преподавателем
        }}
        // {NOT: {discTeacher.teacherId: id_teacher}}
      ]
    }
  });
  if (!disciplines) return <div></div>;
  return (
      <>
      {disciplines.map(d=><p>{d.name} {d.discTeacher.id}</p>) }
      </>
    // <form action={addUserToGroup}
    // className="form-control">
    //   <div className="flex max-w-xs flex-col space-y-2">
    //     <input type="hidden" name="id_student" defaultValue={user.id} />
    //     <input type="hidden" name="id_group" defaultValue={id_group} />
    //     <button type="submit" className="btn btn-primary">
    //       Добавить в группу {user.firstname} {user.surname}
    //     </button>
    //   </div>
    // </form>
  );
}
