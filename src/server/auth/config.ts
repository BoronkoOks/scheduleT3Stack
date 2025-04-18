import { PrismaAdapter } from "@auth/prisma-adapter"
import { $Enums } from "@prisma/client"
import { type DefaultSession, type NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "~/server/db"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: $Enums.Role;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
      id: string
      role: $Enums.Role
  }
}


export const authConfig = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Логин" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const userBD = await db.user.findFirst({
          where: {
            OR: [
              {name: credentials.username},
              {email: credentials.username}
            ]
          }
        })
  
        if (userBD) {
          // проверка пароля
          if (userBD.password == credentials.password) {

            const user = {
              id: userBD.id,
              role: userBD.role
            }

            return user
          }
          else {
            return null
          }
          
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    // async session({session, user}) {
      

      // const session_ = {
      //   sessionToken: "???",
      //   userId: user.id,
      //   expires: ""
      // }
      // await db.session.create({
      //   data: {
      //     sessionToken: "???",
      //     userId: user.id,
      //     expires: ""
      //   }
      // })

      // const session2 = await db.session.findFirst({
      //   where: {userId: user.id}
      // })

      // console.log(session)

    //   const sesssion = {
    //       ...session,
    //       user: {
    //         id: user.id,
    //         role: user.role
    //       },}
    //   return sesssion
    // }
    jwt: async ({ token, user }) => {
      // First time JWT callback is run, user object is available
      if (user && user.id && user.role) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
    cookies: {
      sessionToken: {
        name: "next-auth.session-token",
        options: {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: env.NODE_ENV === "production",
        },
      },
    },
  },
} satisfies NextAuthConfig;
