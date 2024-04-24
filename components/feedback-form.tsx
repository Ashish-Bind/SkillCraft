'use client'

import ReactStars from 'react-stars'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { auth } from '@clerk/nextjs'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const FeedbackForm = ({
  courseId,
  userId,
}: {
  courseId: string
  userId: string
}) => {
  const router = useRouter()

  const [rating, setRating] = useState<number>(0)
  const [feedback, setFeedback] = useState<string>('')

  const handleFeedback = async () => {
    const data = { rating, feedback, userId }

    if (!feedback) {
      return
    }

    try {
      const res = await axios.post(`/api/courses/${courseId}/feedback`, data)
      console.log(res.data)
      toast.success('Feedback Sent')
      router.refresh()
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  return (
    <div>
      <ReactStars
        count={5}
        value={rating}
        size={24}
        onChange={(val) => setRating(val)}
      />
      <div className="flex flex-col gap-2">
        <label htmlFor="feedback" className="text-sm">
          What you liked about the course?
        </label>
        <textarea
          id="feedback"
          rows={4}
          className="border rounded-sm resize-none outline-gray-300 text-gray-600 p-2 text-sm"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>
        <Button onClick={handleFeedback}>Submit</Button>
      </div>
    </div>
  )
}

export default FeedbackForm
