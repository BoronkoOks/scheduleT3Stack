import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { db } from "~/server/db"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        login: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null
 
        const userBD = await db.user.findFirst({
            where: {
              OR: [
                {name: credentials.login},
                {email: credentials.login}
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
      },
    }),
  ],
})