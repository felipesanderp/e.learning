"use client"

import * as React from "react";

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";

interface PostCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  title: string;
  href: string;
}

export function CreateButton({ title, href, className, ...props }: PostCreateButtonProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  return (
    <button
      className={cn(
        buttonVariants(),
        {
          "cursor-not-allowed opacity-80": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      New {title}
    </button>
  )
}