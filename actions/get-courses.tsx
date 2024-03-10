import { Course } from '@/app/(dashboard)/_components/Icon'
import { db } from '@/lib/db'
import { getProgress } from './get-user-progress'
import { Category } from '@prisma/client'

interface CourseWithCategoryAndProgress {
  category: Category | null
  chapters: { id: string }[]
  progress: number | null
}

interface GetCourses {
  userId: string
  search?: string
  categoryId?: string
}

export const getCourses = async ({
  userId,
  categoryId,
  search,
}: GetCourses): Promise<CourseWithCategoryAndProgress[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: search,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const coursesWithProgress: CourseWithCategoryAndProgress[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchases.length === 0) {
            return { ...course, progress: null }
          }

          const progressPercentage = await getProgress(userId, course.id)

          return {
            ...course,
            progress: progressPercentage,
          }
        })
      )

    return coursesWithProgress
  } catch (err) {
    throw err
  }
}
