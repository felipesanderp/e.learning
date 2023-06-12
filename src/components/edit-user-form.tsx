'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROLE } from '@prisma/client';

import { userPatchSchema } from '@/lib/validations/user';

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Icons } from "@/components/icons";

type FormData = z.infer<typeof userPatchSchema>

interface EditeUserFormProps {
  user: {
    id: string
    name: string
    email: string
    role: ROLE
    enrollments: {
      course: {
        title: string
      }
    }[]
  }
}

export function EditUseForm({ user }: EditeUserFormProps) {
  const router = useRouter()

  const [isSaving, setIsSaving] = useState<boolean>(false)

  const form = useForm({
    resolver: zodResolver(userPatchSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
      newPassword: undefined,
    }
  })

  async function onSubmit(data: FormData) {
    if (data.newPassword !== undefined) {
      setIsSaving(true)
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          image: data.image,
          password: data.newPassword,
          role: data.role,
        })
      })

      setIsSaving(false)

      if (!response.ok) {
        return toast({
          title: "Algo deu errado.",
          description: "O usuário não foi atualizado! Por favor, tente novamente.",
          variant: "destructive"
        })
      }

      toast({
        description: "O usuário foi atualizado.",
      })

      router.refresh()
    } else {
      setIsSaving(true)
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          image: data.image,
          role: data.role,
        })
      })

      setIsSaving(false)

      if (!response.ok) {
        return toast({
          title: "Algo deu errado.",
          description: "O usuário não foi atualizado! Por favor, tente novamente.",
          variant: "destructive"
        })
      }

      toast({
        description: "O usuário foi atualizado.",
      })

      router.refresh()
    }
  }

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid max-w-screen-2xl grid-cols-1 gap-4 md:grid-cols-6"
      >
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Detalhes</CardTitle>
          </CardHeader>
          <CardContent>
            <section className="space-y-4">
              <div className="grid grid-cols-2 items-end gap-6">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input 
                    type="text"
                    {...form.register('name')}
                  />
                </div>
                <div className="space-y-2">
                  <Label>E-mail</Label>
                  <Input 
                    type="email"
                    {...form.register('email')}
                  />
                </div>
                {/* <div className="space-y-2">
                  <Label>Nova senha</Label>
                  <Input 
                    type="password"
                    {...form.register('newPassword')}
                  />
                </div> */}
              </div>
            </section>
          </CardContent>
        </Card>
        <div className="space-y-4 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                Cursos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.enrollments.map((course) => (
                <h1 key={course.course.title}>
                  {course.course.title}
                </h1>
              ))}
            </CardContent>
          </Card>
        </div>
        <div>
          <Button
            disabled={isSaving}
            type="submit"
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Atualizar usuário
          </Button>
        </div>
      </form>
    </>
  )
}