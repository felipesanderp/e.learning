'use client'

import { useState, useEffect } from 'react'
import { User } from '@prisma/client'

import { ArrowRight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'

type users = Pick<User, "id" | "name" | "email" | "image" | "role">

export function LatestCreatedUsers() {
  const [latestUsers, setLatestUsers] = useState<users[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    async function getLatestUsers() {
      setIsLoading(true)

      const response = await fetch('/api/users/latest-created', {
        method: 'GET',
        next: { revalidate: 3600 }
      })
      setLatestUsers(await response.json())
      setIsLoading(false)
    }

    getLatestUsers()
  }, [])

  return (
    <div className="space-y-8">
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
      ) : (
        latestUsers?.map((user) => (
          <div className="flex items-center" key={user.id}>
            <Avatar className="h-9 w-9">
              {user.image && (
                <AvatarImage src={user.image} alt="Avatar" />
              )}
              <AvatarFallback>
                <span className="sr-only">{user.name}</span>
                <Icons.user className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-sm text-muted-foreground">
                {user.email}
              </p>
            </div>
            <Badge className="ml-auto font-medium">
              {user.role}
            </Badge>
          </div>
        ))
      )}
    </div>
  )
}