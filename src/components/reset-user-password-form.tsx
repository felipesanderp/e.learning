'use client'

import * as React from 'react'
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { User } from '@prisma/client'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from '@/components/icons'
import { toast } from '@/hooks/use-toast'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const resetUserPasswordSchema = z.object({
  newPassword: z.string(),
})

type FormData = z.infer<typeof resetUserPasswordSchema>

interface ResetUserPasswordFormProps {
  user: Pick<User, "id">
}

export function ResetUserPasswordForm({ user }: ResetUserPasswordFormProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  const form = useForm<FormData>({
    resolver: zodResolver(resetUserPasswordSchema)
  })

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/users/reset-password/${user.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        newPassword: data.newPassword,
      })
    })

    setIsSaving(false)

    if(!response.ok) {
      return toast({
        title: "Algo deu errado.",
        description: "A senha não foi atualizado! Por favor, tente novamente.",
        variant: "destructive"
      })
    }

    toast({
      description: "A senha do usuário foi atualizado.",
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
        <CardTitle>
          Alterar senha
        </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label>Nova senha</Label>   
          <Input 
            type="password"
            {...form.register('newPassword')}
          />
          <Button
            type="submit"
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className='h-4 w-4 mr-2 animate-spin'/>
            )}
              Alterar
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}