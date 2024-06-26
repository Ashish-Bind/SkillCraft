'use client'

import Icon from '@/components/providers/icons-lucide'
import StarRatings from '@/components/star-ratings'
import { Button } from '@/components/ui/button'
import formatPrice from '@/lib/format'
import { Course, Rating } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface CourseCardProps {
  data: Course & { rating: Rating[] }
}

const CourseCard = ({ data }: CourseCardProps) => {
  return (
    <div className="bg-gray-100 border border-gray-300 p-4 rounded-md grid gap-2">
      <div className="relative aspect-video ">
        {data.imgUrl ? (
          <Image
            src={data.imgUrl || ''}
            alt={data.title}
            className="object-cover rounded-md"
            fill
          />
        ) : (
          <div className="bg-zinc-300 h-full w-full rounded-md flex items-center justify-center">
            <Icon name="Ban" color="black" />
          </div>
        )}
      </div>
      <div className="text-lg font-medium line-clamp-2">{data.title}</div>
      <p className="font-medium text-sm">{formatPrice(data.price ?? 0)}</p>
      <p className="font-medium text-sm">
        <StarRatings ratings={data.rating} />
      </p>
      <Button>
        <Link
          href={`/teacher/course/${data.id}`}
          className="flex gap-2 items-center"
        >
          <Icon name="Pen" color="white" size={14} /> Edit course
        </Link>
      </Button>
    </div>
  )
}

export default CourseCard
