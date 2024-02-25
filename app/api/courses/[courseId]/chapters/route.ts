import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth()
    const { courseId } = params
    const { title } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized access', { status: 401 })
    }

    const courseOwner = await db.course.findUnique({
      where: {
        userId,
        id: courseId,
      },
    })

    if (!courseOwner) {
      return new NextResponse('Unauthorized access', { status: 501 })
    }

    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId,
      },
      orderBy: {
        position: 'desc',
      },
    })

    const newPosition = lastChapter ? lastChapter.position + 1 : 1

    const chapter = await db.chapter.create({
      data: {
        title,
        courseId: courseId,
        position: newPosition,
      },
    })

    return NextResponse.json(chapter)
  } catch (err) {
    console.log('[COURSE_ID]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
