"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Lessons } from "@prisma/client"

import { courseCreateSchema } from '@/lib/validations/course'
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
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

type FormData = z.infer<typeof courseCreateSchema>

interface CreateCourseFormProps {
  lessons: Pick<Lessons, "id" | "name">[]
}

export function CreateCourseForm({ lessons }: CreateCourseFormProps) {
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  
  const form = useForm<FormData>({
    resolver: zodResolver(courseCreateSchema),
    mode: 'all',
    defaultValues: {
      title: '',
      description: '',
      imageURL: '',
      lessonId: undefined,
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

    if (data.lessonId !== undefined) {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          imageURL: data.imageURL,
          lessonId: data.lessonId,
        })
      })

      if (!response.ok) {
        setIsSaving(false)
        return toast({
          title: "Algo deu errado.",
          description: "O curso não foi criado! Por favor, tente novamente.",
          variant: "destructive"
        })
      }

      toast({
        title: "Curso criado.",
        description: "O curso foi criado! Verifique a página de cursos.",
        variant: 'success'
      })
    } else {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          imageURL: data.imageURL,
        })
      })

      if (!response.ok) {
        setIsSaving(false)
        return toast({
          title: "Algo deu errado.",
          description: "O curso não foi criado! Por favor, tente novamente.",
          variant: "destructive"
        })
      }

      toast({
        title: "Curso criado.",
        description: "O curso foi criado! Verifique a página de cursos.",
        variant: 'success'
      })
    }

    setStep(1)
    form.reset()
    setIsSaving(false)
    
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
                Vamos começar definindo o titulo dessa curso.
              </p>
              <Label htmlFor="title" className="text-right">Titulo</Label>
              <Input 
                {...form.register('title')}
              />
              {form.formState.errors.title && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.title.message}
                </p>
              )}
              <Button
                type="button"
                disabled={form.formState.errors.title ? true : false} 
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
                Adicione uma descrição para essa curso.
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
                Qual o link para a imagem de fundo desse curso?
              </p>
              <Label htmlFor="imageURL" className="text-right">Link</Label>
              <Input
                {...form.register('imageURL')}
              />
              {form.formState.errors.imageURL && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.imageURL.message}
                </p>
              )}
              <div className="flex items-center gap-4">
                <Button onClick={prevStep}>Voltar</Button>
                <Button
                  type="button"
                  disabled={form.formState.errors.imageURL ? true : false}
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
                Por último, você deseja vincular uma aula a esse curso?
              </p>
              <FormField 
                control={form.control}
                name="lessonId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a lesson..."></SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {lessons.map((lesson) => (
                          <SelectItem 
                            key={lesson.id} 
                            value={lesson.id}
                          >
                            {lesson.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> 
              <div className="flex items-center gap-4">
                <Button onClick={prevStep}>Voltar</Button>
                <Button 
                  disabled={form.formState.errors.lessonId ? true : false} 
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
              Verifique as informações do curso. Estão corretas?
            </p>
            <div>
              <h2 className="text-lg text-primary font-medium">Titulo</h2>
              <p>{form.getValues('title')}</p>
            </div>
            <div>
              <h2 className="text-lg text-primary font-medium">Descrição</h2>
              <p>{form.getValues('description')}</p>
            </div>
            <div>
              <h2 className="text-lg text-primary font-medium">Link da Imagem</h2>
              <p>{form.getValues('imageURL')}</p>
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
          Novo curso
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="default">
        <SheetHeader className="mb-4">
          <SheetTitle>Criar curso</SheetTitle>
          <SheetDescription>
            Crie um novo curso!
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