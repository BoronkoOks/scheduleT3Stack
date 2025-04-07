import Link from "next/link"
import { auth } from "~/server/auth"
import { api, HydrateClient } from "~/trpc/server"
import {pageHeaderStyle} from "~/styles/daisystyles"
import { db } from "~/server/db"
import SpecialityTable from "../_components/speciality/specialityTable"
import {AddSpeciality} from "~/app/_components/speciality/addSpeciality"

export default async function Home() {
  const session = await auth()
  const role = session?.user?.role ?? "ADMIN"

  const specialities = await db.speciality.findMany()

  return (
    <HydrateClient>
      <main>
        {role}
        <h2 className = {pageHeaderStyle}>Специальности</h2>
        {/* <div className = "inline-flex"> */}
        <table>
          <tbody>
          <tr>
            <td className = "align-top">
          <SpecialityTable specialities = {specialities} mode = {role} />
          </td>
          <td>
          {role === "ADMIN" && <AddSpeciality />}
          </td>
        {/* </div> */}
        </tr>
        </tbody>
        </table>
      </main>
    </HydrateClient>
  );
}
