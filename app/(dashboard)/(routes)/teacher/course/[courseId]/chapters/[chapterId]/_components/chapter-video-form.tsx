'use client'

import axios from 'axios'
import * as z from 'zod'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FileUpload } from '@/components/file-upload'
import Icon from '@/components/providers/icons-lucide'
import { Chapter, MuxData } from '@prisma/client'

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null }
  courseId: string
  chapterId: string
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
})

const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const router = useRouter()

  const [isEditing, setIsEditing] = useState<boolean>(false)

  const toggleEdit = () => {
    setIsEditing((prev) => !prev)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      )
      toast.success('Video uploaded')
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

  return (
    <div className="mt-6 bg-gray-200 border border-gray-300 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <div className="font-bold">Chapter Video</div>
        <Button
          className="flex gap-2 items-center"
          variant="ghost"
          onClick={toggleEdit}
        >
          {!isEditing ? (
            !initialData.videoUrl ? (
              <>
                <Icon name="PlusCircle" color="black" size={18} />
                Add new Video
              </>
            ) : (
              <>
                <Icon name="Pencil" color="black" size={18} />
                Edit video
              </>
            )
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center bg-gray-300 h-56 rounded-md mt-2">
            <Icon name="MonitorPlay" color="black" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <video
              src={initialData.videoUrl}
              controls
              className="rounded-md"
            ></video>
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url })
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div>Video can take longer to process</div>
      )}
    </div>
  )
}

export default ChapterVideoForm
