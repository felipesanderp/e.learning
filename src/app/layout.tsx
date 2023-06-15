import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Roboto  } from "next/font/google"

import { cn } from '@/lib/utils';

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster"

const roboto = Roboto({
 weight: ['400', '500', '700'],
 subsets: ['latin'],
 display: 'swap',
 variable: '--font-roboto'
})
interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background font-sans antialiased",
          roboto.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex min-h-screen flex-col">
            <div className="min-h-screen">
              {children}
              <Toaster />
            </div>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html >
  )
}
