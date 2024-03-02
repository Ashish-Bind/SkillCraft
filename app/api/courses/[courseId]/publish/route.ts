import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth()
    const { courseId } = params
    const { value } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized access', { status: 401 })
    }

    const course = await db.course.findUnique({
      where: {
        userId,
        id: courseId,
      },
      include: {
        chapters: true,
      },
    })

    if (
      course?.chapters.some(
        (chapter) => chapter.isPublished === true && chapter.isFree === true
      )
    ) {
      const publishedCourse = await db.course.update({
        where: {
          userId,
          id: courseId,
        },
        data: {
          isPublished: value,
        },
      })
      return NextResponse.json(publishedCourse)
    } else {
      return new NextResponse('Minimum criteria not met', { status: 400 })
    }
  } catch (err) {
    console.log('[COURSE_ID]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
