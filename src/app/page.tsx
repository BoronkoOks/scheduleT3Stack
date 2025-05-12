import { auth } from "~/server/auth"
import React from "react"
import Link from "next/link"
import { updateButtonStyle } from "~/styles/daisystyles"
import { db } from "~/server/db"
import { ForGuest, ForUser } from "./_components/homepage/rolesDescription"


export default async function Home() {
  const session = await auth()
  let user

  if (session) {
    user = await db.user.findUnique({where: {id: session.user.id}}) || null
  }

  return (
    <div className = "pl-4 pt-4">
      {!user ? <ForGuest />
      :
      <div>
        {
          user?.name ? <p>Здравствуйте, {user.name}!</p> : <p>Здравствуйте!</p>
        }
          <ForUser role = {user.role} />
        <Link href = "/api/auth/signout" className = {"btn ml-8" + updateButtonStyle}>
          Выйти
        </Link>
      </div>
      }
    </div>
  )
}
