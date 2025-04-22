import { auth } from "~/server/auth"
import {HydrateClient} from "~/trpc/server"
import {Navbar} from "./navbar"

export async function MyApp ({
    children
}: Readonly<{children: React.ReactNode}>) {
    const session = await auth()

    return (
        <HydrateClient>
            <header>
                {session && <Navbar role = {session?.user.role ?? "STUDENT"}/>}
            </header>
            <main>
                {children}
            </main>
        </HydrateClient>
    )
}