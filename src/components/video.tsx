"use client"

import { VideoPlayer } from '@/hooks/use-video'
import { ArrowRight, File, Lightbulb, Slack } from 'lucide-react'
import Image from 'next/image'

export function Video() {
  return (
    <div className="flex-1">
      <div className="flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <VideoPlayer key="1" videoUrl="https://www.youtube.com/watch?v=3He7tLmtyrg" />
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              ReactJS
            </h1>
            <p className="mt-4 text-primary leading-relaxed">
              ReactJS Course for people who want to dominate the new tools of the front-end development.
            </p>

            <div className="flex items-center gap-4 mt-6">
              <Image 
                src="https://github.com/diego3g.png"
                height='64'
                width='64'
                alt="professor"
                className='rounded-full border-2 border-blue-500'
              />

              <div className="flex flex-col leading-relaxed">
                <strong>Diego Fernandes</strong>
                <span>founder founder founder</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <a href="#" className="text-secondary p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors">
              <Slack />
              Comunidade Discord
            </a>

            <a href="#" className="text-secondary p-4 text-sm bg-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-700 transition-colors">
              <Lightbulb />
              Acesse o desafio
            </a>
          </div>
        </div>

        <div className="gap-8 mt-20 grid grid-cols-2">
          <a href="#" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <File />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl text-secondary">Material Complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu desenvolvimento
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <ArrowRight />
            </div>
          </a>

          <a href="#" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <File />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl text-secondary">Material Complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu desenvolvimento
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <ArrowRight />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}