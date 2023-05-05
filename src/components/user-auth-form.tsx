"use client"

import * as React from "react"
import { signIn } from 'next-auth/react'

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { buttonVariants } from "@/components/ui/button"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { userAuthSchema } from "@/lib/validations/auth"

import { Icons } from "./icons"
import { toast } from "@/hooks/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema)
  })


  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function handleSignIn(data: FormData) {
    try {
      setIsLoading(true);

      const { email, password } = data;

      const signInResult = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (signInResult?.ok) {
        window.location.replace('/dashboard')
      }

      setIsLoading(false)

      if (!signInResult?.ok) {
        return toast({
          title: "Something went wrong.",
          description: "Your sign in request failed. Please try again.",
          variant: "destructive",
        })
      }  
    } catch {
      setIsLoading(false)
      return toast({
        title: "Erro no Login!",
        description: "Verifique seu e-mail ou senha e tente novamente!",
        variant: "destructive"
      })
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <div className="grid gap-2">
          <div className="grid gap-4">
            <Label className="sr-only" htmlFor="email">
              E-mail
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register("email")}
            />

            <Label className="sr-only" htmlFor="password">
              Senha
            </Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              autoCapitalize="none"
              autoComplete="none"
              autoCorrect="off"
              {...register("password")}
            />
          </div>
          <button
            className={cn(buttonVariants(), "bg-purple-500 hover:bg-purple-700")}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </button>
        </div>
      </form>
    </div>
  )
}