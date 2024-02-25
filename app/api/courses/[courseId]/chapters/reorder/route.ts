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
    const updatedData = await req.json()

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

    for (let item of updatedData) {
      await db.chapter.update({
        where: { id: item.id },
        data: {
          position: item.position,
        },
      })
    }

    return new NextResponse('Success', { status: 200 })
  } catch (err) {
    console.log('[COURSE_REORDER]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
