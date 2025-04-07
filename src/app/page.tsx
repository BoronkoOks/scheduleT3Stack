import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Navbar } from "./_components/navbar";
import { SigninLink } from "./_components/signlink"
import SignForm from "~/app/_components/signform"
import React from "react";
import Link from "next/link"
import { updateButtonStyle } from "~/styles/daisystyles";


export default async function Home() {
  const session = await auth()
  const role = session?.user?.role ?? "GUEST"

  return (
    <div className = "pl-4 pt-4">
      {role === "GUEST" ?
      <SignForm />
      
      :
      <div>
        <p>Здравствуйте, User!<br/>Вы зашли как {role}</p>
        <Link href = "/api/auth/signout" className = {"btn ml-8" + updateButtonStyle}>
          Выйти
        </Link>
      </div>
      }
    </div>
  )
}
