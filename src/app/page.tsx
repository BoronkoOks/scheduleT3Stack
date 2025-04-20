import { auth } from "~/server/auth";
import { SigninLink } from "./_components/signlink"
import React from "react";
import Link from "next/link"
import { updateButtonStyle } from "~/styles/daisystyles"
import { db } from "~/server/db"
import { getRole } from "./api/auth/check"


export default async function Home() {
  const role = await getRole()

  return (
    <div className = "pl-4 pt-4">
      {role === "GUEST" ?
      <SigninLink />
      :
      <div>
        <p>Здравствуйте!<br/>Вы зашли как {role}</p>
        <Link href = "/api/auth/signout" className = {"btn ml-8" + updateButtonStyle}>
          Выйти
        </Link>
      </div>
      }
    </div>
  )
}
