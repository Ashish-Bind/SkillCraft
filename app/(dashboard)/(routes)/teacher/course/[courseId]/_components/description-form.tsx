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

interface DescriptionFormProps {
  initialData: {
    description: string | null
  }
  courseId: string
}

const formSchema = z.object({
  description: z.string().min(1, { message: 'Description is required' }),
})

const DescriptionForm = ({ initialData, courseId }: DescriptionFormProps) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.description || '',
    },
  })

  const [isEditing, setIsEditing] = useState<boolean>(false)

  const toggleEdit = () => {
    setIsEditing((prev) => !prev)
  }

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(`/api/courses/${courseId}`, values)
      toast.success('Description updated')
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }
  return (
    <div className="mt-6 bg-gray-200 border border-gray-300 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <div className="font-bold">Course Description</div>
        <Button
          className="flex gap-2 items-center"
          variant="ghost"
          onClick={toggleEdit}
        >
          {!isEditing ? (
            <>
              <Icon name="Pencil" color="black" size={18} />
              Edit Description
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="font-normal text-sm">
          {initialData.description || 'No description'}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-2 mt-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Describe about your course"
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

export default DescriptionForm
