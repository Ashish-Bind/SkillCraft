import { getProgress } from '@/actions/get-user-progress'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import CourseSidebar from '../_components/course-sidebar'
import CourseMobileSidebar from '../_components/course-mobile-sidebar'
import Image from 'next/image'

const SingleCourse = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth()

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  })

  if (!course) {
    return redirect('/')
  }

  const progress = await getProgress(userId, params.courseId)

  return (
    <>
      <div className="h-full flex">
        <div className="hidden md:flex h-full w-80 flex-col left-0 z-50">
          <CourseSidebar course={course} />
        </div>
        <div className="md:hidden">
          <CourseMobileSidebar course={course} />
        </div>
        <div className="flex flex-col m-6 grow gap-2">
          <div className="flex">
            <div className="relative w-3/5 aspect-square  overflow-hidden">
              <img
                className="object-center rounded-md"
                alt={course.title}
                src={course.imgUrl || ''}
              />
            </div>
            <div>
              <div className="text-2xl font-bold">{course.title}</div>
            </div>
          </div>
          <div className="text-sm">{course.description}</div>
        </div>
      </div>
    </>
  )
}

export default SingleCourse
