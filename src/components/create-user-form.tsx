"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

type FormData = z.infer<typeof createUserSchema>

const rolesEnum = z.enum(['ADMIN', 'PROFESSOR', 'STUDENT'])

type roles = z.infer<typeof rolesEnum>

export function CreateUserForm() {
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [isSaving, setIsSaving] = useState<boolean>(false)

  const form = useForm<FormData>({
    resolver: zodResolver(createUserSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'STUDENT'
    }
  })

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep= () => {
    setStep(step - 1)
  }

  async function onSubmit(data: FormData) {
    setIsSaving(true)
    
    const response = await fetch('/api/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      })
    })
    
    setStep(1)
    form.reset()
    setIsSaving(false)
    
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
                {...form.register('name')}
              />
              {form.formState.errors.name && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
              {/* <FormField 
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right">Nome</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <Button
                type="button"
                disabled={form.formState.errors.name ? true : false} 
                onClick={nextStep}
              >
                Avançar
              </Button>
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
                type="email"
                {...form.register('email', { required: true })}
              />
              {form.formState.errors.email && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
              {/* <FormField 
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right">E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <div className="flex items-center gap-4">
                <Button onClick={prevStep}>Voltar</Button>
                <Button
                  type="button"
                  disabled={form.formState.errors.email ? true : false} 
                  onClick={nextStep}
                >
                  Avançar
                </Button>
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
                type="password"
                autoFocus
                {...form.register('password')}
              />
              {form.formState.errors.password && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}
              {/* <FormField 
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-right">Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <div className="flex items-center gap-4">
                <Button onClick={prevStep}>Voltar</Button>
                <Button
                  type="button"
                  disabled={form.formState.errors.password ? true : false}
                  onClick={nextStep}
                >
                  Avançar
                </Button>
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
              <FormField 
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="PROFESSOR">Professor</SelectItem>
                        <SelectItem value="STUDENT">Student</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> 
              <div className="flex items-center gap-4">
                <Button onClick={prevStep}>Voltar</Button>
                <Button 
                  disabled={form.formState.errors.role ? true : false} 
                  onClick={nextStep}
                >
                  Avançar
                </Button>
              </div>
            </div>
          </div>
        )
      case 5:
        return (
          <div>
            <h1>{form.getValues('name')}</h1>
            <h1>{form.getValues('email')}</h1>
            <h1>{form.getValues('password')}</h1>
            <h1>{form.getValues('role')}</h1>
            <Button 
              type="submit"
              disabled={isSaving}
            >
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Enviar
            </Button>
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {formStep()}
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}