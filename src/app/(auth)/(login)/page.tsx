import { Icons } from "@/components/icons";
import { UserAuthForm } from "@/components/user-auth-form";
import Image from "next/image";
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"

export const metadata = {
  title: 'Login | e.learning',
}

export default async function IndexPage() {
  const user = await getCurrentUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="hidden h-full bg-purple-500 lg:flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Image src="/person.png" width={180} height={180} alt="" />
          <h2 className="text-rose-400 mt-8 text-3xl">
            Aprenda da melhor forma
          </h2>
          <span className="text-violet-100">
            Entre na plataforma e
            acesse cursos de diversas áreas
            de conhecimento.
          </span>
        </div>
      </div>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.graduationCap className="mx-auto h-10 w-10 stroke-purple-500" />
          <h1>
            Bem-vindo de volta!
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Insira seu e-mail e senha para entrar na sua conta
          </p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  )
}