'use client'

import axios from 'axios'
import * as z from 'zod'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Edit, Plus, ImageIcon } from '@/app/(dashboard)/_components/Icon'
import Image from 'next/image'
import { FileUpload } from '@/components/file-upload'
import Icon from '@/components/providers/icons-lucide'

interface ImageFormProps {
  initialData: {
    imgUrl: string | null
  }
  courseId: string
}

const formSchema = z.object({
  imgUrl: z.string().min(1, { message: 'Image is required' }),
})

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const router = useRouter()

  const [isEditing, setIsEditing] = useState<boolean>(false)

  const toggleEdit = () => {
    setIsEditing((prev) => !prev)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(`/api/courses/${courseId}`, values)
      toast.success('Image updated')
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

  return (
    <div className="mt-6 bg-gray-100 border border-gray-300 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <div className="font-bold">Course Thumbnail</div>
        <Button
          className="flex gap-2 items-center"
          variant="ghost"
          onClick={toggleEdit}
        >
          {!isEditing ? (
            !initialData.imgUrl ? (
              <>
                <Icon name="PlusCircle" color="black" size={18} />
                Add new Image
              </>
            ) : (
              <>
                <Icon name="Pencil" color="black" size={18} />
                Edit Thumbnail
              </>
            )
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.imgUrl ? (
          <div className="flex items-center justify-center bg-zinc-300 h-56 rounded-md mt-2">
            <ImageIcon />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              fill
              alt="Thumbnail"
              className="object-cover rounded-md"
              src={initialData.imgUrl}
            />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseThumbnail"
            onChange={(url) => {
              if (url) {
                onSubmit({ imgUrl: url })
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 Aspect Ratio Recommended
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageForm
