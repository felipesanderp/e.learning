import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { User } from "@prisma/client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Icons } from "@/components/icons"

const createEnrollmentSchema = z.object({
  userId: z.string(),
})

type FormData = z.infer<typeof createEnrollmentSchema> 

interface CreateEnrollmentFormParams {
  courseId: string
  showCreateEnrollmentAlert: boolean
  setShowCreateEnrollmentAlert: Dispatch<SetStateAction<boolean>>
}

export function CreateEnrollmentForm({
  courseId,
  setShowCreateEnrollmentAlert, 
  showCreateEnrollmentAlert
}: CreateEnrollmentFormParams) {
  const router = useRouter()
  const [students, setStudents] = useState<Pick<User, "id" | "name">[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<FormData>({
    resolver: zodResolver(createEnrollmentSchema),
    mode: 'all',
  })

  useEffect(() => {
    async function getStudents() {
      const response = await fetch('/api/users/students', {
        method: 'GET',
      })

      setStudents(await response.json())
    }

    getStudents()
  }, [])

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const response = await fetch('/api/enrollments', {
      method: 'POST',
      body: JSON.stringify({
        courseId: courseId,
        userId: data.userId,
      })
    })

    if (!response?.ok) {
      return toast({
        title: "Algo deu errado.",
        description: "O aluno não foi inscrito nesse curso! Por favor, tente novamente.",
        variant: "destructive"
      })
    }
    
    if(response.ok) {
      setIsLoading(false)
      setShowCreateEnrollmentAlert(false)
      router.refresh()
    }
  } 

  return (
    <AlertDialog open={showCreateEnrollmentAlert} onOpenChange={setShowCreateEnrollmentAlert}>
      <Form {...form}>
        <form>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Selecione uma aluno para adicionar a este curso.
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div>
              <div>
                <FormField 
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aluno</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um estudante..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {students?.map((student) => (
                            <SelectItem
                              key={student.id}
                              value={student.id}
                            >
                              {student.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={form.handleSubmit(onSubmit)}
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.add className="mr-2 h-4 w-4" />
                )}
                Adicionar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </form>
      </Form>
    </AlertDialog>
  )
}