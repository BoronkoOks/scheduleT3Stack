import Link from "next/link"

export function SigninLink() {
  return (
    <Link href = "/api/auth/signin" className = "btn bg-green-500 border-2 border-green-700 mt-3 hover:text-gray-50 hover:bg-green-700">
      Войти
    </Link>
  )
}