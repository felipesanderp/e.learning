"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { createUserSchema } from '@/lib/validations/user'
import { MultiStep } from '@ignite-ui/react'
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Icons } from "./icons"
import { cn } from "@/lib/utils"

type FormData = z.infer<typeof createUserSchema>

const rolesEnum = z.enum(['ADMIN', 'PROFESSOR', 'STUDENT'])

type roles = z.infer<typeof rolesEnum>

export function CreateUserForm() {
  const [step, setStep] = useState(1)
  const [isSaving, setIsSaving] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(createUserSchema),
  })

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep= () => {
    setStep(step - 1)
  }

  const formStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <MultiStep size={5} currentStep={step} />
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input 
                id="name" 
                className="col-span-2"
                {...register("name")}
              />
              <Button onClick={nextStep}>Proximo passo</Button>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="flex flex-col gap-4">
            <MultiStep size={5} currentStep={step} />
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Email
              </Label>
              <Input 
                id="email"
                type="email" 
                className="col-span-2"
                {...register("email")}
              />
              <Button onClick={prevStep}>Voltar</Button>
              <Button onClick={nextStep}>Proximo passo</Button>
            </div>
          </div>
        )
      default:
        return null
    }
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
        <SheetHeader className="mb-4">
          <SheetTitle>Create User</SheetTitle>
          <SheetDescription>
            Create a new user!
          </SheetDescription>
        </SheetHeader>
        {formStep()}
      </SheetContent>
    </Sheet>
  )
}