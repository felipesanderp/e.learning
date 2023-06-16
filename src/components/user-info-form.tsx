"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mePatchSchema } from "@/lib/validations/user"
import { Icons } from "@/components/icons"
import { toast } from "@/hooks/use-toast"
import Uploader from "./uploader"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Textarea } from "./ui/textarea"
import { UserAlterPasswordForm } from "./user-alter-password-form"

interface UserInfoFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: {
    id: string,
    name: string,
    email: string,
    image: string,
    imageKey: string,
    bio: string
  }
}

type UserImage = {
  fileUrl: string,
  fileKey: string
}

type FormData = z.infer<typeof mePatchSchema>

export function UserInfoForm({ user }: UserInfoFormProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(mePatchSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      image: user?.image || "",
      bio: user.bio || "",
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [userImage, setUserImage] = React.useState<UserImage>()

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    // if (user.imageKey !== userImage?.fileKey) {
    //   await fetch('https://www.uploadthing.com/api/deleteFile', {
    //     method: 'POST',
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       "x-uploadthing-api-key": 'sk_live_780619c122636bbb33d07e2f8f8745f44ac39ea9569328cf9e4eefff95b939e4',
    //     },
    //     mode: 'no-cors',
    //     body: JSON.stringify({
    //       fileKeys: [user.imageKey],
    //     })
    //   })
    // }

    const response = await fetch(`/api/users/me/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        image: userImage?.fileUrl,
        imageKey: userImage?.fileKey,
        bio: data.bio,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Algo deu errado.",
        description: "Seu perfil não foi atualizado. Por favor, tente novamente.",
        variant: "destructive",
      })
    }

    toast({
      description: "Perfil atualizado com sucesso.",
    })

    router.refresh()
  }

  return (
    <div className="grid max-w-screen-2xl grid-cols-1 gap-4 md:grid-cols-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:col-span-4"
      >
        <Card>
          <CardHeader>
            <CardTitle>Suas informações</CardTitle>
            <CardDescription>
              Por favor, entre com suas novas informações. 
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-2 mb-4">
              <Avatar className="h-32 w-32">
                {user.image ? (
                  <AvatarImage alt="Picture" src={user.image} />
                ) : (
                  <AvatarFallback>
                    <span className="sr-only">{user.name}</span>
                    <Icons.user className="h-4 w-4" />
                  </AvatarFallback>
                )}
              </Avatar>
              <Uploader 
                setUserImage={setUserImage}
                userImage={userImage}
              />
            </div>
              
            <section className="space-y-4">
              <div className="grid grid-cols-2 items-end gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    className="w-[400px]"
                    size={32}
                    {...register("name")}
                  />
                  {/* {errors?.name && (
                    <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
                  )} */}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="w-[400px]"
                    size={32}
                    {...register("email")}
                  />
                  {/* {errors?.name && (
                    <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
                  )} */}
                </div>
              </div>
            </section>

            <div className="mt-2 space-y-2">
              <Label>Bio</Label>
              <Textarea 
                {...register('bio')}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={isSaving}
              variant={'default'}
            >
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Salvar</span>
            </Button>
          </CardFooter>
        </Card>
      </form>

      <UserAlterPasswordForm />
    </div>
  )
}