import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const { title } = await req.json()

    if (!userId) {
      return new NextResponse('Unauthorized user', { status: 401 })
    }

    const course = await db.course.create({
      data: {
        title,
        userId,
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log('[COURSES]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthorized user', { status: 401 })
    }

    const createdCourses = await db.course.findMany({
      where: {
        userId,
      },
      include: {
        rating: true,
      },
    })

    return NextResponse.json(createdCourses)
  } catch (error) {
    console.log('[COURSES]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
