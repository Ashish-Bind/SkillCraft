import React from 'react'
import Navbar from './_components/Navbar'
import Footer from './_components/Footer'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  )
}
