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
import { Combobox } from '@/components/ui/combobox'

interface CategoryFormProps {
  initialData: {
    categoryId: string | null
  }
  courseId: string
  options: { label: string; value: string }[]
}

const formSchema = z.object({
  categoryId: z.string().min(1, { message: 'Category is required' }),
})

const CategoryForm = ({
  initialData,
  courseId,
  options,
}: CategoryFormProps) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData.categoryId || '',
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
      toast.success('Category updated')
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

  const selectedOption = options.find(
    (option) => option.value === initialData.categoryId
  )

  return (
    <div className="mt-6 bg-stone-200 border border-stone-200 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <div className="font-bold">Course Category</div>
        <Button
          className="flex gap-2 items-center"
          variant="ghost"
          onClick={toggleEdit}
        >
          {!isEditing ? (
            <>
              <Edit />
              Edit Category
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={`font-normal text-sm ${
            selectedOption?.label || 'font-italic'
          }`}
        >
          {selectedOption?.label || 'No Category'}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-2 mt-2">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={options} {...field} />
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

export default CategoryForm
