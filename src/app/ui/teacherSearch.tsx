import React from "react";
import SearchInput from "./searchInput";
import { db } from "~/server/db";

export default function TeacherSearch({
  query,
  id_discipline,
}: {
  query: string;
  id_discipline?: string;
}) {
  return (
    <>
      <SearchInput placeholder="Найти преподавателя..." />
      {query}
      {id_discipline}
    {/* <DisciplineToAdd query={query} id_teacher={id_teacher} /> */}
    </>
  );
}