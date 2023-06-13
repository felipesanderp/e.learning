'use client'

import { useState, useEffect } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from '../icons';

export function StudentAnalytics() {


  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Cursos em Progresso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            1
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Cursos Completos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
           0
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Tarafes Concluídas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
           1
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Certificados Ganhos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            1
          </div>
        </CardContent>
      </Card>
    </div> 
  )
}