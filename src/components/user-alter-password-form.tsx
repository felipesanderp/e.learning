'use client'

import * as React from 'react'
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from "@prisma/client";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { userAlterPassword } from '@/lib/validations/user'
import { toast } from "@/hooks/use-toast";
import { Icons } from './icons';

type FormData = z.infer<typeof userAlterPassword>

interface UserAlterPasswordFormProps {
  user: Pick<User, 'id'>
}

export function UserAlterPasswordForm({ user }: UserAlterPasswordFormProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  const form = useForm<FormData>({
    resolver: zodResolver(userAlterPassword),
    mode: 'all',
  })

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const dataParse = userAlterPassword.parse(data)
    
    const response = await fetch(`/api/users/me/${user.id}/reset-password`, {
      method: "PATCH",
      body: JSON.stringify({
        password: dataParse.password,
        newPassword: dataParse.newPassword,
        confirmPassword: dataParse.confirmPassword,
      })
    })

    setIsSaving(false)

    if(response.status === 403 && response.statusText === 'Password does not match!') {
      return toast({
        title: "Algo deu errado.",
        description: "A senha antiga não confere. Por favor, tente novamente.",
        variant: "destructive",
      })
    }

    if(!response.ok) {
      return toast({
        title: "Algo deu errado.",
        description: "Sua senha não foi atualizada. Por favor, tente novamente.",
        variant: "destructive",
      })
    }

    toast({
      description: "Senha atualizada com sucesso.",
    })

    form.reset()
    router.refresh()
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)} 
      className="space-y-4 md:col-span-2"
    >
      <Card>
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
        </CardHeader>
        <CardContent>
          <section className="fle flex-col space-y-4">
            <div className="space-y-2">
              <Label>Senha antiga</Label>
              <Input
                className="" 
                type="password"
                {...form.register('password')}
              />
              {form.formState.errors.password && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Nova Senha</Label>
              <Input
                className="" 
                type="password"
                {...form.register('newPassword')}
              />
              {form.formState.errors.newPassword && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Confirmar Senha</Label>
              <Input
                className="" 
                type="password"
                {...form.register('confirmPassword')}
              />
              {form.formState.errors.confirmPassword && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              disabled={isSaving}
              type="submit"
            >
              {isSaving && (
                <Icons.spinner className="h-4 w-4 mr-2 animate-spin" />
              )}
              Alterar Senha
            </Button>
          </section>
        </CardContent>
      </Card>
    </form>
  )
}