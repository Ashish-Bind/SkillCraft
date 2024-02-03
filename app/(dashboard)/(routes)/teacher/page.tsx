import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Teacher = () => {
  return (
    <div className="flex items-center gap-2 p-4 justify-center">
      <Link href="/teacher/create">
        <Button>New Course</Button>
      </Link>
      <Link href="/teacher/analytics">
        <Button>Analytics</Button>
      </Link>
    </div>
  )
}

export default Teacher
