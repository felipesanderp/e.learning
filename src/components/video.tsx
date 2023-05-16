"use client"

import { VideoPlayer } from '@/hooks/use-video'
import Image from 'next/image'

export function Video() {
  return (
    <div className="flex-1">
      <div className="bg-slate-400 flex justify-center">
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
            <p className="mt-4 text-gray-200 leading-relaxed">
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

              <div className="leading-relaxed">
                <strong>Diego Fernandes</strong>
                <span>founder founder founder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}