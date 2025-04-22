import { auth } from "~/server/auth";
import { SigninLink } from "./_components/signlink"
import React from "react";
import Link from "next/link"
import { updateButtonStyle } from "~/styles/daisystyles"
import { db } from "~/server/db"
import { getRole } from "./api/auth/check"
import { User } from "@prisma/client";


export default async function Home() {
  const session = await auth()
  let user

  if (session) {
    user = await db.user.findUnique({where: {id: session.user.id}}) || null
  }

  return (
    <div className = "pl-4 pt-4">
      {!user ? <SigninLink />
      :
      <div>
        {
          user?.name ? <p>Здравствуйте, {user.name}!</p> : <p>Здравствуйте!</p>
        }
        <p>Вы зашли как {user.role}</p>
        <Link href = "/api/auth/signout" className = {"btn ml-8" + updateButtonStyle}>
          Выйти
        </Link>
      </div>
      }
    </div>
  )
}
