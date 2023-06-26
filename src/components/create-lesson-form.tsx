"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { User } from "@prisma/client"

import { lessonCreateSchema } from '@/lib/validations/lesson'
import { MultiStep } from '@ignite-ui/react'
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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

type FormData = z.infer<typeof lessonCreateSchema>

interface CreateLessonFormProps {
  professors: Pick<User, "id" | "name">[]
}

export function CreateLessonForm({ professors }: CreateLessonFormProps) {
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  
  const form = useForm<FormData>({
    resolver: zodResolver(lessonCreateSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      description: '',
      video_id: '',
      user_id: '',
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

    const response = await fetch('/api/lessons', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        video_id: data.video_id,
        user_id: data.user_id,
      })
    })

    setStep(1)
    form.reset()
    setIsSaving(false)

    if (!response.ok) {
      return toast({
        title: "Algo deu errado.",
        description: "A aula não foi criada! Por favor, tente novamente.",
        variant: "destructive"
      })
    }
    
    toast({
      title: "Aula criada.",
      description: "A aula foi criada! Verifique a página das aulas.",
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
                Vamos começar definindo o titulo dessa aula.
              </p>
              <Label htmlFor="name" className="text-right">Titulo</Label>
              <Input 
                {...form.register('name')}
              />
              {form.formState.errors.name && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
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
                Adicione uma descrição para essa aula.
              </p>
              <Label htmlFor="description" className="text-right">Descrição</Label>
              <Textarea  
                {...form.register('description')}
              />
              {form.formState.errors.description && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.description.message}
                </p>
              )}
              <div className="flex items-center gap-4">
                <Button onClick={prevStep}>Voltar</Button>
                <Button
                  type="button"
                  disabled={form.formState.errors.description ? true : false} 
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
            <MultiStep size={5} currentStep={step}/>
            <div className="flex flex-col items-start space-y-4">
              <p className="text-md font-semibold text-slate-900 dark:text-slate-50">
                Qual o link do vídeo dessa aula?
              </p>
              <Label htmlFor="video_id" className="text-right">Link</Label>
              <Input
                {...form.register('video_id')}
              />
              {form.formState.errors.video_id && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.video_id.message}
                </p>
              )}
              <div className="flex items-center gap-4">
                <Button onClick={prevStep}>Voltar</Button>
                <Button
                  type="button"
                  disabled={form.formState.errors.video_id ? true : false} 
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
                Por ultimo, adicione o professor.
              </p>
              <FormField 
                control={form.control}
                name="user_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professor</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a professor..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {professors.map((professor) => (
                          <SelectItem
                            key={professor.id}
                            value={professor.id}
                          >
                            {professor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-4">
                <Button onClick={prevStep}>Voltar</Button>
                <Button 
                  disabled={form.formState.errors.user_id ? true : false} 
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
          <div className="flex flex-col gap-4">
            <p className="text-md font-semibold text-slate-900 dark:text-slate-50">
              Verifique as informações da aula. Estão corretas?
            </p>
            <div>
              <h2 className="text-lg text-primary font-medium">Nome</h2>
              <p>{form.getValues('name')}</p>
            </div>
            <div>
              <h2 className="text-lg text-primary font-medium">Descrição</h2>
              <p>{form.getValues('description')}</p>
            </div>
            <div>
              <h2 className="text-lg text-primary font-medium">URL da video aula</h2>
              <p>{form.getValues('video_id')}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={prevStep}>Voltar</Button>
              <Button 
                type="submit"
              >
                {isSaving && (
                  <Icons.spinner className="h-4 m-4 mr-2" />
                )}
                Enviar
              </Button>
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
          Nova aula
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="default">
        <SheetHeader className="mb-4">
          <SheetTitle>Crie Aula</SheetTitle>
          <SheetDescription>
            Crie uma nova aula!
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