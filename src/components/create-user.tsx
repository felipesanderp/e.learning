"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { createUserSchema } from '@/lib/validations/user'
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Icons } from "./icons"

type FormData = z.infer<typeof createUserSchema>

const rolesEnum = z.enum(['ADMIN', 'PROFESSOR', 'STUDENT'])

type roles = z.infer<typeof rolesEnum>

export function CreateUser() {
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(createUserSchema),
    mode: 'onChange'
  })
  
  async function onSubmit(data: FormData) {
    setIsSaving(true)

    console.log(data)
    
    const response = await fetch('/api/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.image,
        role: data.role,
      })
    })
    
    reset()
    setIsSaving(false)

    console.log(response.status)
    
    if (!response.ok) {
      return toast({
        title: "Something went wrong.",
        description: "The user was not created! Please, try again.",
        variant: "destructive"
      })
    }
    
    toast({
      title: "User created.",
      description: "The was created! Check the users page.",
      variant: 'success'
    })
    
    router.refresh()
  }
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          className={cn(
          buttonVariants()
          )}
        >
          <Icons.add className="mr-2 h-4 w-4" />
          New User
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="lg">
        <SheetHeader>
        <SheetTitle>Create User</SheetTitle>
        <SheetDescription>
          Create a new user!
        </SheetDescription>
      </SheetHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input 
              id="name" 
              className="col-span-3"
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input 
              id="email"
              type="email"
              className="col-span-3"
              {...register("email")}
            />
            {/* {errors?.description && (
              <p className="px-1 text-xs text-red-600">{errors.description.message}</p>
            )} */}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input 
              id="password"
              type="password"
              className="col-span-3"
              {...register("password")}
            />
            {/* {errors?.description && (
              <p className="px-1 text-xs text-red-600">{errors.description.message}</p>
            )} */}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <Input 
              id="image"
              className="col-span-3"
              {...register("image")}
            />
            {/* {errors?.imageURL && (
              <p className="px-1 text-xs text-red-600">{errors.imageURL.message}</p>
            )} */}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select
              {...register("role")}
              onValueChange={(value: roles) => setValue("role", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="PROFESSOR">Professor</SelectItem>
                <SelectItem value="STUDENT">Student</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isSaving}
          >
          {isSaving && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
            Create
          </button>
        </SheetFooter>
      </form>
    </SheetContent>
  </Sheet>            
  )
}