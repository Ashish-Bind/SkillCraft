import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth()
    const { courseId, chapterId } = params
    const { isPublished, ...values } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized access', { status: 401 })
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    })

    if (!courseOwner) {
      return new NextResponse('Unauthorized access', { status: 401 })
    }

    const updateChapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId,
      },
      data: {
        ...values,
      },
    })

    return NextResponse.json(updateChapter)
  } catch (err) {
    console.log('[CHAPTER_ID]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
