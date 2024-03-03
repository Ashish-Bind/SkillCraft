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

import { Textarea } from '@/components/ui/textarea'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Edit } from '@/app/(dashboard)/_components/Icon'
import Icon from '@/components/providers/icons-lucide'
import { Input } from '@/components/ui/input'
import { Course, Chapter } from '@prisma/client'
import ChaptersList from './chapters-list'
import { Loader2 } from 'lucide-react'

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] }
  courseId: string
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'Chapter title is required' }),
})

const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  })

  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [isUpdating, setIsUpdating] = useState<boolean>(false)

  const toggleCreate = () => {
    setIsCreating((prev) => !prev)
  }

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post(`/api/courses/${courseId}/chapters`, values)
      toast.success('Chapter created')
      toggleCreate()
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

  const onReorder = async (updatedData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true)
      const res = await axios.patch(
        `/api/courses/${courseId}/chapters/reorder`,
        updatedData
      )
      toast.success('Chapter reordered')
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setIsUpdating(false)
    }
  }

  const onEdit = (id: string) => {
    router.push(`/teacher/course/${courseId}/chapters/${id}`)
  }

  const onDelete = async (id: string) => {
    try {
      setIsUpdating(true)
      const res = await axios.delete(`/api/courses/${courseId}/chapters/${id}`)
      toast.success('Chapter Deleted')
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="mt-4 bg-gray-100 border border-gray-300 rounded-md p-4 relative">
      {isUpdating && (
        <div className="w-full h-full bg-gray-500/20 top-0 right-0 flex items-center justify-center absolute">
          <Loader2 className="animate-spin" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        <div className="font-bold">Chapters</div>
        <Button
          className="flex gap-2 items-center"
          variant="ghost"
          onClick={toggleCreate}
        >
          {!isCreating ? (
            <>
              <Icon name="PlusCircle" color="black" size={18} />
              Add a Chapter
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {!isCreating && (
        <div className={`text-sm ${!initialData.chapters.length && 'italic'}`}>
          {!initialData.chapters.length ? (
            'No chapters'
          ) : (
            <ChaptersList
              onEdit={onEdit}
              onReorder={onReorder}
              onDelete={onDelete}
              items={initialData.chapters || []}
            />
          )}
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-gray-400 mt-2">Drag to re-order chapters</p>
      )}
      {isCreating && (
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
                      placeholder="Add chapter title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <div className="mt-2">
              <Button disabled={isSubmitting || !isValid} type="submit">
                Create
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export default ChaptersForm
