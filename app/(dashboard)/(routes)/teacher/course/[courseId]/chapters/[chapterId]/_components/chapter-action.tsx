'use client'

import { ConfirmModal } from '@/components/modals/confirm-modal'
import Icon from '@/components/providers/icons-lucide'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface ChapterActionsProps {
  disabled: boolean
  courseId: string
  chapterId: string
  isPublished: boolean
}

const ChapterActions = ({
  chapterId,
  courseId,
  disabled,
  isPublished,
}: ChapterActionsProps) => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const togglePublish = async (id: string) => {
    try {
      setIsLoading(true)
      if (isPublished) {
        const res = await axios.patch(
          `/api/courses/${courseId}/chapters/${id}/publish`,
          { value: !isPublished }
        )
        toast.success('Chapter Unpublished')
      } else {
        const res = await axios.patch(
          `/api/courses/${courseId}/chapters/${id}/publish`,
          { value: !isPublished }
        )
        toast.success('Chapter Published')
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
      const res = await axios.delete(`/api/courses/${courseId}/chapters/${id}`)
      toast.success('Chapter deleted')
      router.push(`/teacher/course/${courseId}`)
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
          togglePublish(chapterId)
        }}
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </Button>

      <ConfirmModal
        onConfirm={() => {
          onDelete(chapterId)
        }}
      >
        <Button disabled={isLoading}>
          <Icon name="Trash2" color="white" size={18} />
        </Button>
      </ConfirmModal>
    </div>
  )
}

export default ChapterActions
