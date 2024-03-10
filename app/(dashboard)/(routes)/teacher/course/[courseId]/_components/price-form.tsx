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
import { useState } from 'react'
import toast from 'react-hot-toast'
import Icon from '@/components/providers/icons-lucide'
import formatPrice from '@/lib/format'
import { Course } from '@prisma/client'

interface PriceFormProps {
  initialData: Course
  courseId: string
}

const formSchema = z.object({
  price: z.coerce.number(),
})

const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData?.price!,
  })

  const [isEditing, setIsEditing] = useState<boolean>(false)

  const toggleEdit = () => {
    setIsEditing((prev) => !prev)
  }

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.patch(`/api/courses/${courseId}`, values)
      toast.success('Price updated')
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

  return (
    <div className="my-4 bg-gray-100 border border-gray-300 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <div className="font-bold">Price</div>
        <Button
          className="flex gap-2 items-center"
          variant="ghost"
          onClick={toggleEdit}
        >
          {!isEditing ? (
            <>
              <Icon name="Pencil" color="black" size={18} />
              Edit Price
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className={`text-sm ${!initialData.price && 'italic'}`}>
          {initialData.price ? formatPrice(initialData.price) : 'No price'}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-2 mt-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step="10"
                      disabled={isSubmitting}
                      placeholder="e.g ₹1,000"
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

export default PriceForm
