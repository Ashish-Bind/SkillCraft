import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { Chapter, Course, UserProgress } from '@prisma/client'
import React from 'react'
import CourseSidebarItem from './course-sidebar-item'
import Link from 'next/link'
import CourseProgress from '@/components/course-progress'

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & { userProgress: UserProgress[] | null })[]
  }
  progressCount: number
}

const CourseSidebar = async ({ course, progressCount }: CourseSidebarProps) => {
  const { userId } = auth()

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  })

  return (
    <div className="h-full border-r border-r-gray-300 flex flex-col shadow-sm">
      <div className="p-4 flex flex-col border-b">
        <Link
          href={`/courses/${course.id}`}
          className="font-bold text-orange-600"
        >
          {course.title}
        </Link>
        {purchase && (
          <div className="my-4">
            <CourseProgress value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => {
          return (
            <CourseSidebarItem
              key={chapter.id}
              id={chapter.id}
              title={chapter.title}
              isCompleted={!!chapter?.userProgress?.[0]?.isCompleted}
              courseId={course.id}
              isLocked={!chapter.isFree && !purchase}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CourseSidebar
