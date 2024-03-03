'use client'

import { ConfirmModal } from '@/components/modals/confirm-modal'
import Icon from '@/components/providers/icons-lucide'
import { Button } from '@/components/ui/button'
import { useConfettiStore } from '@/hooks/use-confetti-store'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface CourseActionsProps {
  disabled: boolean
  courseId: string
  isPublished: boolean
}

const CourseActions = ({
  courseId,
  disabled,
  isPublished,
}: CourseActionsProps) => {
  const router = useRouter()
  const confetti = useConfettiStore()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const togglePublish = async (id: string) => {
    try {
      setIsLoading(true)
      if (isPublished) {
        const res = await axios.patch(`/api/courses/${id}/publish`, {
          value: !isPublished,
        })
        toast.success('Course Unpublished')
      } else {
        const res = await axios.patch(`/api/courses/${id}/publish`, {
          value: !isPublished,
        })
        toast.success('Course Published')
        confetti.onOpen()
      }

      router.refresh()
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async (id: string) => {
    try {
      setIsLoading(true)
      const res = await axios.delete(`/api/courses/${id}`)
      toast.success('Course deleted')
      router.push(`/teacher`)
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        disabled={disabled || isLoading}
        onClick={() => {
          togglePublish(courseId)
        }}
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </Button>

      <ConfirmModal
        onConfirm={() => {
          onDelete(courseId)
        }}
      >
        <Button disabled={isLoading}>
          <Icon name="Trash2" color="white" size={18} />
        </Button>
      </ConfirmModal>
    </div>
  )
}

export default CourseActions
