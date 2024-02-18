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
    const { url } = await req.json()

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
      return new NextResponse('Unauthorized access', { status: 401 })
    }

    const attachments = await db.attachment.create({
      data: {
        url,
        name: url.split('/').pop(),
        courseId,
      },
    })

    return NextResponse.json(attachments)
  } catch (err) {
    console.log('[COURSE_ATTACHMENTS_ID]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
