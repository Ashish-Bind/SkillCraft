import React from 'react'
import Navbar from './_components/Navbar'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  )
}
