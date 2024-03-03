import { Rating } from '@prisma/client'
import ReactStars from 'react-stars'
import React from 'react'

interface StarRatings {
  ratings: Rating[]
}

const StarRatings = ({ ratings }: StarRatings) => {
  const users = ratings.length
  const rating = ratings.reduce((acc, val) => {
    return acc + val.rating
  }, 0)

  const averageRating = parseFloat((rating / users).toFixed(1))

  return (
    <div className="flex gap-1 items-center">
      <ReactStars count={5} value={averageRating} size={24} edit={false} />
      <span>({users} ratings)</span>
    </div>
  )
}

export default StarRatings
