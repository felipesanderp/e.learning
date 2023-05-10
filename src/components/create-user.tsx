"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { courseCreateSchema } from '@/lib/validations/course'
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
import { cn } from "@/lib/utils"
import { Icons } from "./icons"

type FormData = z.infer<typeof courseCreateSchema>

export function CreateUser() {
  const router = useRouter()
  // const [isSaving, setIsSaving] = React.useState<boolean>(false)
  
  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors },
  //   reset,
  // } = useForm<FormData>({
  //   resolver: zodResolver(courseCreateSchema),
  // })
  
  // async function onSubmit(data: FormData) {
  //   setIsSaving(true)
    
  //   const response = await fetch('/api/courses', {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       title: data.title,
  //       description: data.description,
  //       imageURL: data.imageURL,
  //     })
  //   })
    
  //   reset()
  //   setIsSaving(false)
    
  //   if (!response.ok) {
  //     return toast({
  //       title: "Something went wrong.",
  //       description: "The course was not created! Please, try again.",
  //       variant: "destructive"
  //     })
  //   }
    
  //   toast({
  //     title: "Course created.",
  //     description: "Your course was created! Check the courses page.",
  //     variant: 'success'
  //   })
    
  //   router.refresh()
  // }
  
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
      <form>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input 
              id="title" 
              className="col-span-3"
            />
            {/* {errors?.title && (
              <p className="px-1 text-xs text-red-600">{errors.title.message}</p>
            )} */}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Description
            </Label>
            <Input 
              id="title"
              type="text"
              className="col-span-3"
            />
            {/* {errors?.description && (
              <p className="px-1 text-xs text-red-600">{errors.description.message}</p>
            )} */}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageURL" className="text-right">
              Image
            </Label>
            <Input 
              id="imageURL"
              className="col-span-3"
            />
            {/* {errors?.imageURL && (
              <p className="px-1 text-xs text-red-600">{errors.imageURL.message}</p>
            )} */}
          </div>
        </div>
        <SheetFooter>
          <button
            type="submit"
            className={cn(buttonVariants())}
          >
          {/* {isSaving && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )} */}
            Create
          </button>
        </SheetFooter>
      </form>
    </SheetContent>
  </Sheet>            
  )
}