"use client"
import { signIn } from "next-auth/react"
 
export default function SignIn() {
  const credentialsAction = (formData: FormData) => {
    signIn("credentials", formData)
  }
 
  return (
    <form action={credentialsAction}>
      <label htmlFor="credentials-email">
        Email
        <input type="text" id="credentials-email" name="email" />
      </label>
      <label htmlFor="credentials-password">
        Password
        <input type="password" id="credentials-password" name="password" />
      </label>
      <input type="submit" value="Sign In" />
    </form>
  )
}








// import { updateButtonStyle, divForm } from "~/styles/daisystyles"
// import { auth } from "~/server/auth";


// export default async function Home () {
//     const session = await auth()

//     const inputClassStyle = " border-2 border-green-500 rounded-md px-1"
//     const divStyle = divForm + " rounded-md absolute p-4 text-center transform -translate-x-1/2 -translate-y-1/2 border top-1/2 left-1/2"

//     return (
//         <main>
//             {!session ?
//                         <form className = "align-middle w-full"
//                         // action = 
//                         > 
//                         <div className = {divStyle}
//                         >
//                             <label className = "mr-2 mb-2"><b>Вход</b></label>
//                             <div className= "mx-auto flex align-middle mb-4">
//                                 <label className = "mr-4">Логин</label>
//                                 <input
//                                     type="name"
//                                     name="name"
//                                     required
//                                     className={inputClassStyle + " w-52 ml-1"}
//                                 />
//                             </div>
//                             <div className= "flex align-middle">
//                                 <label className = "mr-2">Пароль</label>
//                                 <input
//                                     type="password"
//                                     name="password"
//                                     required
//                                     className={inputClassStyle + " w-52 mb-4"}
//                                 />
//                             </div>
//                             {/* <div> */}
//                                 <button type="submit" className={updateButtonStyle + " mt-2"}>
//                                     Войти
//                                 </button>
//                             {/* </div> */}
//                         </div>
//                 </form>
//                 :
//                 <>Вы уже вошли</>
//             }
//         </main>
//     )
// }