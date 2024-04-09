import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import CourseCard from './_components/course-card'
import { getProgress } from '@/actions/get-user-progress'

const MyCourses = async () => {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  const purchases = await db.purchase.findMany({
    where: { userId },
    select: {
      courseId: true,
    },
  })

  const purchased = purchases.map(({ courseId }) => courseId)

  const courses = await db.course.findMany({
    where: {
      id: { in: purchased },
    },
    include: {
      chapters: true,
      category: true,
    },
  })

  return (
    <div className="p-6 grid gap-4">
      <div className="font-bold text-2xl">Your Purchases</div>
      <div>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map(async (item) => {
            const progress = await getProgress(userId, item.id)
            return (
              <CourseCard
                key={item.id}
                category={item.category?.name!}
                chaptersLength={item.chapters.length}
                id={item.id}
                imageUrl={item.imgUrl!}
                price={item.price!}
                progress={progress}
                title={item.title}
              />
            )
          })}
        </div>
        {courses.length === 0 && (
          <div className="text-center text-sm text-muted-foreground mt-10">
            No courses found
          </div>
        )}
      </div>
    </div>
  )
}

export default MyCourses
