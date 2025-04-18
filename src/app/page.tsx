import { auth } from "~/server/auth";
import { SigninLink } from "./_components/signlink"
import React from "react";
import Link from "next/link"
import { updateButtonStyle } from "~/styles/daisystyles"
import { db } from "~/server/db"


export default async function Home() {
  const session = await auth()
  const role = session?.user.role ?? "GUEST"
  const user = "Гость"

  // if (session) {
  //   const userDB = db.user.findFirst({
  //     where: {id: session.user.id}
  //   })

  //   user = userDB.name
  // }

  return (
    <div className = "pl-4 pt-4">
      {role === "GUEST" ?
      <SigninLink />
      :
      <div>
        <p>Здравствуйте, {session?.user?.name}<br/>Вы зашли как {role}</p>
        <Link href = "/api/auth/signout" className = {"btn ml-8" + updateButtonStyle}>
          Выйти
        </Link>
      </div>
      }
    </div>
  )
}
