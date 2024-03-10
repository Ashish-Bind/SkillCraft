import { db } from '@/lib/db'
import { Attachment } from '@prisma/client'

interface GetChaptersProps {
  userId: string
  courseId: string
  chapterId: string
}

export const getChapters = async ({
  chapterId,
  courseId,
  userId,
}: GetChaptersProps) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    })

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    })

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    })

    if (!chapter || !course) {
      throw new Error('Chapter or course not found')
    }

    let videoUrl = null
    let attachments: Attachment[] = []
    let nextChapter = null

    if (purchase) {
      attachments = await db.attachment.findMany({
        where: { courseId: courseId },
      })
    }

    if (chapter.isFree || purchase) {
      videoUrl = chapter.videoUrl

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: 'asc',
        },
      })
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    })

    return {
      chapter,
      course,
      videoUrl,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    }
  } catch (err) {
    console.log('[GET_  CHAPTER]', err)
    return {
      chapter: null,
      course: null,
      videoUrl: null,
      attachments: null,
      nextChapter: null,
      userProgress: null,
      purchase: null,
    }
  }
}
