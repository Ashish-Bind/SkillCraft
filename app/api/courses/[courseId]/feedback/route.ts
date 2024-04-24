import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth()
    const { rating, feedback } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized access', { status: 401 })
    }

    const feedbackResult = await db.rating.create({
      data: {
        userId,
        rating,
        feedback,
        courseId: params.courseId,
      },
    })

    return NextResponse.json(feedbackResult)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
