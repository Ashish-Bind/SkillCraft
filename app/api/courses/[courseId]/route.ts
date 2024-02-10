import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth()
    const {courseId} = params
    const values = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized access', { status: 401 })
    }

    const course = await db.course.update({
      where:{
        userId,
        id:courseId
      },
      data:{
        ...values
      }
    })

    return NextResponse.json(course)
  } catch (err) {
    console.log('[COURSE_ID]', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
