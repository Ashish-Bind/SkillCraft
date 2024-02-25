'use client'

import axios from 'axios'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormDescription,
  FormItem,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Edit } from '@/app/(dashboard)/_components/Icon'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Icon from '@/components/providers/icons-lucide'
import { Chapter } from '@prisma/client'

interface ChapterTitleFormProps {
  initialData: Chapter
  chapterId: string
  courseId: string
}

const formSchema = z.object({
  title: z.string().min(1),
})

const ChapterTitleForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterTitleFormProps) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  const [isEditing, setIsEditing] = useState<boolean>(false)

  const toggleEdit = () => {
    setIsEditing((prev) => !prev)
  }

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      )
      toast.success('Title updated')
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

  return (
    <div className="mt-6 bg-gray-200 border border-gray-300 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <div className="font-bold">Chapter Title</div>
        <Button
          className="flex gap-2 items-center"
          variant="ghost"
          onClick={toggleEdit}
        >
          {!isEditing ? (
            <>
              <Icon name="Pencil" color="black" size={18} />
              Edit Title
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {!isEditing && <div className="text-sm">{initialData.title}</div>}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-2 mt-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Introduction to the course"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <div className="mt-2">
              <Button disabled={isSubmitting || !isValid} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export default ChapterTitleForm
