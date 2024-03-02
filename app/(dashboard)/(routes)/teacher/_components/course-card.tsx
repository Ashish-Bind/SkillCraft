'use client'

import Icon from '@/components/providers/icons-lucide'
import { Button } from '@/components/ui/button'
import formatPrice from '@/lib/format'
import { Course } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface CourseCardProps {
  data: Course
}

const CourseCard = ({ data }: CourseCardProps) => {
  return (
    <div className="bg-gray-200 border border-gray-300 p-4 rounded-md grid gap-2">
      <div className="text-lg font-bold line-clamp-2">{data.title}</div>
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
      <p className="font-medium text-sm">{formatPrice(data.price ?? 0)}</p>
      <Button>
        <Link
          href={`/teacher/course/${data.id}`}
          className="flex gap-2 items-center"
        >
          <Icon name="Pen" color="white" size={14} /> Edit this course
        </Link>
      </Button>
    </div>
  )
}

export default CourseCard
