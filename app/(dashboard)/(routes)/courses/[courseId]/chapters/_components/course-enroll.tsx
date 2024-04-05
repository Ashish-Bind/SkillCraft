'use client'

import { Button } from '@/components/ui/button'
import formatPrice from '@/lib/format'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface CourseEnrollProps {
  courseId: string
  price: number
}

export const CourseEnroll = ({ courseId, price }: CourseEnrollProps) => {
  const router = useRouter()
  const handleEnroll = async () => {
    const { data } = await axios.post(`/api/courses/${courseId}/checkout`)

    /**
     * {
    "id": "order_NusmGuAVZDHNub",
    "entity": "order",
    "amount": 50000,
    "amount_paid": 0,
    "amount_due": 50000,
    "currency": "INR",
    "receipt": "receipt#1",
    "offer_id": null,
    "status": "created",
    "attempts": 0,
    "notes": [],
    "created_at": 1712307345
}
     */

    const options = {
      key: 'rzp_test_UTYhML6A0CAMsn', // Enter the Key ID generated from the Dashboard
      amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'SkillCraft', //your business name
      description: 'Test Transaction',
      image: 'http://localhost:3000/logo.svg',
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            'http://localhost:3000/api/courses/payment/verify',
            { ...response, courseId }
          )
          console.log(data)
          router.refresh()
        } catch (error) {
          console.log(error)
        }
      },

      prefill: {
        contact: '9000090000', //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    }
    var rzp1 = new window.Razorpay(options)
    rzp1.open()
    console.log(data)
  }

  return (
    <Button className="w-full md:w-auto" onClick={handleEnroll}>
      Enroll for {formatPrice(price)}
    </Button>
  )
}
