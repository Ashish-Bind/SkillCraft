'use client'

import { Button } from '@/components/ui/button'
import { useConfettiStore } from '@/hooks/use-confetti-store'
import axios from 'axios'
import { CheckCircle, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface CourseProgressButton {
  courseId: string
  chapterId: string
  isCompleted?: boolean
  nextChapterId?: boolean
}

const CourseProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId,
}: CourseProgressButton) => {
  const router = useRouter()
  const useConfetti = useConfettiStore()
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    try {
      setLoading(true)
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        { isCompleted: !isCompleted }
      )

      if (!isCompleted && !nextChapterId) {
        useConfetti.onOpen()
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${chapterId}`)
      }

      toast.success('Progress Updated')
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const Icon = isCompleted ? XCircle : CheckCircle

  return (
    <Button className="flex gap-2 items-center" onClick={onClick}>
      {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
      <Icon size={16} />
    </Button>
  )
}

export default CourseProgressButton
