"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
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

interface UserInfoFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: {
    id: string,
    name: string,
    email: string,
    image: string,
  }
}

type FormData = z.infer<typeof mePatchSchema>

export function UserInfoForm({ user, className, ...props }: UserInfoFormProps) {
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
      image: user?.image || ''
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      console.log(e.target.files[0])
    }
  }

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/users/me/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        image: data.image
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your profile was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your profile has been updated.",
    })

    router.refresh()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Infos</CardTitle>
          <CardDescription>
            Please enter your new infos or what you are comfortable with. 
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">
              Name
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

            <Label htmlFor="name">
              Image
            </Label>
            <Input
              id="image"
              type="file"
              className="w-[400px]"
              size={32}
              onChange={(e) => handleFile(e)}
            />
            {/* {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )} */}
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants(), className)}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  )
}