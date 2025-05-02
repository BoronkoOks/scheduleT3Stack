import { auth } from "~/server/auth"
import {HydrateClient} from "~/trpc/server"
import {Navbar} from "./navbar"
import { getRole } from "~/app/api/auth/check"

export async function MyApp ({
    children
}: Readonly<{children: React.ReactNode}>) {
    const role = (await getRole())

    return (
        <HydrateClient>
            <header>
                <Navbar role = {role}/>
            </header>
            <main>
                {children}
            </main>
        </HydrateClient>
    )
}