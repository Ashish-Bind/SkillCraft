'use client'

import { Rating } from '@prisma/client'
import ReactStars from 'react-stars'
import React from 'react'

interface StarRatings {
  ratings: Rating[]
  size?: number
}

const StarRatings = ({ ratings, size = 24 }: StarRatings) => {
  const users = ratings.length
  const rating = ratings.reduce((acc, val) => {
    return acc + val.rating
  }, 0)

  const averageRating = parseFloat((rating / users).toFixed(1))

  return (
    <div className="flex gap-1 items-center">
      <ReactStars count={5} value={averageRating} size={size} edit={false} />
      <span className="text-sm">({users} ratings)</span>
    </div>
  )
}

export default StarRatings
