import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
  const form = useForm()

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

              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </form>
      </Form>
    </AlertDialog>
  )
}