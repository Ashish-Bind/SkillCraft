'use client'

import axios from 'axios'
import * as z from 'zod'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FileUpload } from '@/components/file-upload'
import Icon from '@/components/providers/icons-lucide'
import { Attachment, Course } from '@prisma/client'
import { Loader2 } from 'lucide-react'

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] }
  courseId: string
}

const formSchema = z.object({
  url: z.string().min(1),
})

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const router = useRouter()

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<string>('')

  const toggleEdit = () => {
    setIsEditing((prev) => !prev)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post(
        `/api/courses/${courseId}/attachments`,
        values
      )
      toast.success('Attachments updated')
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

  const onDelete = async (id: string) => {
    try {
      setDeleteId(id)
      const res = await axios.delete(
        `/api/courses/${courseId}/attachments/${id}`
      )
      toast.success('Attachments updated')
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setDeleteId('')
    }
  }

  return (
    <div className="my-4 bg-gray-200 border border-gray-300 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <div className="font-bold">Course Attachments</div>
        <Button
          className="flex gap-2 items-center"
          variant="ghost"
          onClick={toggleEdit}
        >
          {!isEditing ? (
            <div className="flex items-center gap-2">
              <Icon name="PlusCircle" color="black" size={18} />
              Add new File
            </div>
          ) : (
            'Cancel'
          )}
        </Button>
      </div>

      {!isEditing &&
        (initialData.attachments.length === 0 ? (
          <div className="mt-2 italic text-sm">No attachments yet</div>
        ) : (
          <div className="grid gap-2">
            {initialData.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center gap-2 border border-orange-300 p-2 rounded-md"
              >
                <Icon name="File" size={16} />
                <p className="text-sm line-clamp-1 text-orange-500">
                  {attachment.name}
                </p>
                {deleteId === attachment.id ? (
                  <div className="ml-auto">
                    <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
                  </div>
                ) : (
                  <div
                    className="ml-auto hover:opacity-75"
                    onClick={() => onDelete(attachment.id)}
                  >
                    <Icon name="Trash" size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url })
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            You can choose multiple file
          </div>
        </div>
      )}
    </div>
  )
}

export default AttachmentForm
