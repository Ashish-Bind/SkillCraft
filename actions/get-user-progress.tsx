import { db } from '@/lib/db'

export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    })

    const publishedChaptersId = publishedChapters.map((chapter) => chapter.id)

    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: publishedChaptersId,
        },
        isCompleted: true,
      },
    })

    const progressPercentage =
      (validCompletedChapters / publishedChaptersId.length) * 100

    return progressPercentage
  } catch (err) {
    console.log('COURSE_PROGRESS', err)
  }
}
