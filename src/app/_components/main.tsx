import { auth } from "~/server/auth"
import {HydrateClient} from "~/trpc/server"
import {Navbar} from "./navbar"
import {SigninLink} from "./signlink"
// import {useState} from "react"

export async function MyApp ({
    children
}: Readonly<{children: React.ReactNode}>) {
    const session = await auth()
    // const [currPage, setCurrPage] = useState("/")

    return (
        <HydrateClient>
            <header>
                <Navbar/>
            </header>
            <main>
            {/* {session ? <div>{JSON.stringify(session)}</div> : <div>no session</div>} */}
                {children}
            </main>
        </HydrateClient>
    )
}