import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen } from 'lucide-react'
import formatPrice from '@/lib/format'
import CourseProgress from '@/components/course-progress'

interface CourseCard {
  id: string
  title: string
  imageUrl: string
  chaptersLength: number
  price: number
  progress: number | null
  category: string
}

const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCard) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group-hover:shadow-sm transition overflow-hidden border border-gray-300 bg-gray-100 rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>
        <div className="flex flex-col py-1">
          <div className="text-lg md:text-base font-medium group-hover:text-orange-600">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-2 flex items-center gap-1 text-sm">
            <div className="flex items-center text-gray-500 gap-2">
              <BookOpen color="orange" size={16} />
              <span>
                {chaptersLength}
                {chaptersLength === 1 ? ' Chapter' : ' Chapters'}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              value={progress}
              variant={progress === 100 ? 'success' : 'default'}
              size="sm"
            />
          ) : (
            <p className="text-md font-medium">{formatPrice(price)}</p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
