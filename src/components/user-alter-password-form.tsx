'use client'

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function UserAlterPasswordForm() {
  return (
    <form className="space-y-4 md:col-span-2">
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
              />
            </div>

            <div className="space-y-2">
              <Label>Nova Senha</Label>
              <Input
                className="" 
                type="password"
              />
            </div>

            <div className="space-y-2">
              <Label>Confirmar Senha</Label>
              <Input
                className="" 
                type="password"
              />
            </div>

            <Button>
              Alterar Senha
            </Button>
          </section>
        </CardContent>
      </Card>
    </form>
  )
}