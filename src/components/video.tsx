'use client'

import { useEffect, useState } from 'react'

import { VideoPlayer } from '@/hooks/use-video'
import { ArrowRight, File, Lightbulb, Slack } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Icons } from '@/components/icons'

type Lesson = {
  id: string
  name: string
  description: string
  video_id: string
  user: {
    name: string
    image: string
    bio: string
  }
}

interface VideoProps {
  lessonSlug: string
}

export function Video({ lessonSlug }: VideoProps) {
  const [lesson, setLesson] = useState<Lesson>()

  useEffect(() => {
    async function getLesson() {
      const response = await fetch(`/api/lessons/${lessonSlug}`, {
        method: 'GET',
      })
        
     setLesson(await response.json())
    }
    getLesson()
  }, [lessonSlug])

  return (
    <div className="flex-1">
      <div className="flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video border border-primary">
          {lesson && <VideoPlayer key="1" videoUrl={lesson.video_id} />}
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {lesson?.name}
            </h1>

            <div className="flex items-center gap-4 mt-6">
              <Avatar>
                {lesson?.user.image ? (
                  <AvatarImage alt="Picture" src={lesson.user.image} />
                ): (
                  <AvatarFallback>
                    <span className="sr-only">{lesson?.user.name}</span>
                    <Icons.user className="h-4 w-4" />
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="flex flex-col leading-relaxed">
                <strong className="font-bold text-lg">{lesson?.user.name}</strong>
                {lesson?.user.bio && (
                  <span className="text-sm text-muted-foreground">{lesson.user.bio}</span>
                )}
              </div>
            </div>
            <div className="mt-8">
              <div className="border-b border-b-primary">
                <h2 className="text-primary pb-2 font-medium border-b-2 border-purple-500 max-w-fit">
                  Descrição
                </h2>
              </div>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {lesson?.description}
              </p>
            </div>
          </div>
{/* 
          <div className="flex flex-col gap-4">
            <a href="#" className="text-secondary p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors">
              <Slack />
              Comunidade Discord
            </a>

            <a href="#" className="text-secondary p-4 text-sm bg-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-700 transition-colors">
              <Lightbulb />
              Acesse o desafio
            </a>
          </div> */}
        </div>

        {/* <div className="gap-8 mt-20 grid grid-cols-2">
          <a 
            href="#" 
            className="bg-accent rounded overflow-hidden flex items-stretch gap-6 transition-colors border border-accent-foreground hover:bg-card"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <File className="stroke-accent" />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl text-primary">Material Complementar</strong>
              <p className="text-sm text-primary/80 mt-2">
                Acesse o material complementar para acelerar o seu desenvolvimento
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <ArrowRight />
            </div>
          </a>

          <a 
            href="#" 
            className="bg-accent rounded overflow-hidden flex items-stretch gap-6 transition-colors border border-accent-foreground hover:bg-card"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <File className="stroke-accent" />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl text-primary">Material Complementar</strong>
              <p className="text-sm text-primary/80 mt-2">
                Acesse o material complementar para acelerar o seu desenvolvimento
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <ArrowRight />
            </div>
          </a>
        </div> */}
      </div>
    </div>
  )
}