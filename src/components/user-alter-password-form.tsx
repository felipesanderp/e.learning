'use client'

import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { userAlterPassword } from '@/lib/validations/user'

type FormData = z.infer<typeof userAlterPassword>

export function UserAlterPasswordForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(userAlterPassword),
    mode: 'all',
  })

  async function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)} 
      className="space-y-4 md:col-span-2"
    >
      <Card>
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
        </CardHeader>
        <CardContent>
          <section className="fle flex-col space-y-4">
            <div className="space-y-2">
              <Label>Senha antiga</Label>
              <Input
                className="" 
                type="password"
                {...form.register('password')}
              />
              {form.formState.errors.password && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Nova Senha</Label>
              <Input
                className="" 
                type="password"
                {...form.register('newPassword')}
              />
              {form.formState.errors.newPassword && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Confirmar Senha</Label>
              <Input
                className="" 
                type="password"
                {...form.register('confirmPassword')}
              />
              {form.formState.errors.confirmPassword && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
              {form.formState.errors.root && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.root.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
            >
              Alterar Senha
            </Button>
          </section>
        </CardContent>
      </Card>
    </form>
  )
}