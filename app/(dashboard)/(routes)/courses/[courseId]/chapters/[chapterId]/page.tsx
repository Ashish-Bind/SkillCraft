import React from 'react'
import CourseSidebar from '../../../_components/course-sidebar'
import CourseMobileSidebar from '../../../_components/course-mobile-sidebar'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { getChapters } from '@/actions/get-chapters'
import { redirect } from 'next/navigation'
import { Banner } from '@/components/banner'
import VideoPlayer from '../_components/video-player'
import { CourseEnroll } from '../_components/course-enroll'
import { Preview } from '@/components/preview'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { File } from 'lucide-react'
import Icon from '@/components/providers/icons-lucide'

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
        <div className="flex flex-col max-w-4xl mx-auto p-4">
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
        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
          <div className="font-bold text-2xl">{chapter?.title}</div>
          {purchase ? (
            <Badge>Purchased</Badge>
          ) : (
            <CourseEnroll courseId={courseId} price={course?.price} />
          )}
        </div>
        <hr />
        <div>
          <Preview value={chapter?.description} />
        </div>
        <hr />
        {!!attachments?.length && (
          <div className="m-4 grid gap-1">
            <span className="font-semibold">Attachments</span>
            {attachments.map((file) => (
              <div
                key={file.id}
                className="p-2 border rounded-md text-sm flex gap-2 items-center"
              >
                <Icon name="File" size={18} />
                <Link
                  href={file.url}
                  target="_blank"
                  className="hover:text-orange-600 transition"
                >
                  {file.name}
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default ChapterPage
