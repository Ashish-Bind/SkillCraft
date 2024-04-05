import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

const MyCourses = async () => {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  return <div>MyCourses</div>
}

export default MyCourses
