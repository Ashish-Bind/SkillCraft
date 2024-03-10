import React from 'react'
import CourseSidebar from '../../../_components/course-sidebar'
import CourseMobileSidebar from '../../../_components/course-mobile-sidebar'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { getChapters } from '@/actions/get-chapters'
import { redirect } from 'next/navigation'
import { Banner } from '@/components/banner'
import VideoPlayer from '../_components/video-player'

const ChapterPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string }
}) => {
  const { courseId, chapterId } = params
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  })

  const {
    chapter,
    videoUrl,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapters({ userId, courseId, chapterId })

  const isLocked = !chapter?.isFree && !purchase
  const completeOnEnd = !!purchase && !userProgress?.isCompleted

  return (
    <div className="h-full md:flex">
      <div className="hidden md:flex h-full w-96 flex-col left-0 z-50">
        <CourseSidebar course={course} />
      </div>
      <div className="md:hidden border-b border-gray-300">
        <CourseMobileSidebar course={course} />
      </div>
      <main className="h-full w-full">
        <div>
          {userProgress?.isCompleted && (
            <Banner
              variant={'success'}
              label="You have already completed this chapter"
            />
          )}
          {isLocked && (
            <Banner
              variant={'warning'}
              label="You need to purchase this course to watch this chapter"
            />
          )}
        </div>
        <div className="flex flex-col max-w-4xl mx-auto pb-20 p-4">
          <VideoPlayer
            chapterId={chapterId}
            title={chapter?.title!}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id!}
            videoUrl={videoUrl!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
      </main>
    </div>
  )
}

export default ChapterPage
