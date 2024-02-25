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
import { useState } from 'react'
import toast from 'react-hot-toast'
import Icon from '@/components/providers/icons-lucide'
import { Chapter } from '@prisma/client'
import { Checkbox } from '@/components/ui/checkbox'

interface ChapterAccessFormProps {
  initialData: Chapter
  courseId: string
  chapterId: string
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
})

const ChapterAccessForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterAccessFormProps) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: Boolean(initialData.isFree),
    },
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
      toast.success('Chapter description updated')
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }
  return (
    <div className="mt-6 bg-gray-200 border border-gray-300 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <div className="font-bold">Chapter Access</div>
        <Button
          className="flex gap-2 items-center"
          variant="ghost"
          onClick={toggleEdit}
        >
          {!isEditing ? (
            <>
              <Icon name="Pencil" color="black" size={18} />
              Edit access
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={`font-semibold text-sm italic ${
            !initialData.isFree ? 'text-emerald-500' : 'text-red-500'
          }`}
        >
          {initialData.isFree
            ? '*This chapter is free for preview'
            : '*This chapter can be only be previewed after purchase'}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-2 mt-2">
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0 px-2 py-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    Check this box if you want to make this chapter free for
                    preview
                  </div>
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

export default ChapterAccessForm
