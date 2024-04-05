import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import ToasterProvider from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'
import { useEffect, useState } from 'react'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SkillCraft',
  description: 'Learn skills from anywhere',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        signIn: {
          variables: { colorPrimary: '#FF630B' },
        },
        signUp: {
          variables: { colorPrimary: '#FF630B' },
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ConfettiProvider />
          <ToasterProvider />
          {children}
        </body>
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      </html>
    </ClerkProvider>
  )
}
