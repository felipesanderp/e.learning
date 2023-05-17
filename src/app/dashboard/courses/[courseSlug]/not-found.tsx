import Link from "next/link";

import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mt-8">
      <EmptyPlaceholder className="mx-auto max-w-[800px]">
        <EmptyPlaceholder.Icon name="warning" />
        <EmptyPlaceholder.Title>Uh oh! Not Found</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          This course could not be found. Please try again.
        </EmptyPlaceholder.Description>
        <Link href="/dashboard" className={buttonVariants({ variant: "ghost" })}>
          Go to Dashboard
        </Link>
      </EmptyPlaceholder>
    </div>
  )
}