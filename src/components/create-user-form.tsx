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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
    formState: { errors, isDirty, isValid },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(createUserSchema),
    mode: 'onChange',
    values: {
      name: '',
      email: '',
      password: '',
      image: '',
      role: 'STUDENT'
    }
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
          <div className="flex flex-col space-y-6">
            <MultiStep size={5} currentStep={step} />
            <div className="flex flex-col items-start space-y-4">
              <p className="text-md font-semibold text-slate-900 dark:text-slate-50">
                Primeiro, vamos começar definindo um nome para esse usuário.
              </p>
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input 
                id="name" 
                {...register("name")}
              />
              {errors?.name && (
                <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
              )}
              <Button type='button' onClick={nextStep}>Avançar</Button>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="flex flex-col space-y-6">
            <MultiStep size={5} currentStep={step} />
            <div className="flex flex-col items-start space-y-4">
              <p className="text-md font-semibold text-slate-900 dark:text-slate-50">
                Agora, defina um e-mail.
              </p>
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input 
                id="email"
                type="email" 
                {...register("email")}
              />
              {errors?.email&& (
                <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
              )}
              <div className="flex items-center gap-4">
                <Button onClick={prevStep}>Voltar</Button>
                <Button onClick={nextStep}>Avançar</Button>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="flex flex-col space-y-6">
            <MultiStep size={5} currentStep={step} />
            <div className="flex flex-col items-start space-y-4">
              <p className="text-md font-semibold text-slate-900 dark:text-slate-50">
                Estamos quase lá! Defina uma senha para esse usuário.
              </p>
              <Label htmlFor="password" className="text-right">
                Senha
              </Label>
              <Input 
                id="password"
                type="password"
                {...register("password")}
              />
              <div className="flex items-center gap-4">
                <Button onClick={prevStep}>Voltar</Button>
                <Button onClick={nextStep}>Avançar</Button>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="flex flex-col space-y-6">
            <MultiStep size={5} currentStep={step} />
            <div className="flex flex-col items-start space-y-4">
              <p className="text-md font-semibold text-slate-900 dark:text-slate-50">
                Por último, qual o papel desse usuário no sistema?
              </p>
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
              <div className="flex items-center gap-4">
                <Button onClick={prevStep}>Voltar</Button>
                <Button onClick={nextStep}>Avançar</Button>
              </div>
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
      <SheetContent position="right" size="default">
        <SheetHeader className="mb-4">
          <SheetTitle>Create User</SheetTitle>
          <SheetDescription>
            Create a new user!
          </SheetDescription>
        </SheetHeader>
        <form>
          {formStep()}
        </form>
      </SheetContent>
    </Sheet>
  )
}