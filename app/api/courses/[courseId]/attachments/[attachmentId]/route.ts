import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string; attachmentId: string } }
) {
  try {
    const { userId } = auth()
    const { courseId, attachmentId } = params

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

    const attach = await db.attachment.delete({
      where: {
        id: attachmentId,
        courseId,
      },
    })

    return NextResponse.json(attach)
  } catch (err) {
    console.log('[COURSE_ATTACHMENTS_ID]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
