import Icon from '@/components/providers/icons-lucide'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import ChapterTitleForm from './_components/chapter-title-form'
import ChapterDescriptionForm from './_components/chapter-description-form'
import ChapterAccessForm from './_components/chapter-access-form'
import ChapterVideoForm from './_components/chapter-video-form'
import { Banner } from '@/components/banner'
import ChapterActions from './_components/chapter-action'

const ChapterPage = async ({
  params,
}: {
  params: { chapterId: string; courseId: string }
}) => {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  })

  if (!chapter) {
    redirect('/')
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `${completedFields}/${totalFields}`

  const isComplete = requiredFields.every(Boolean)

  return (
    <>
      {chapter.isPublished ? (
        <Banner
          label="This chapter is published. It will be visible in the course."
          variant={'success'}
        />
      ) : (
        <Banner
          label="This chapter is unpublished. It will not be visible in the course."
          variant={'warning'}
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl">Chapter Setup</h1>
          </div>
          <div className="flex gap-4">
            <ChapterActions
              disabled={!isComplete}
              courseId={params.courseId}
              chapterId={params.chapterId}
              isPublished={chapter.isPublished}
            />
            <Link
              href={`/teacher/course/${params.courseId}`}
              className="flex items-center gap-2 font-semibold text-sm border border-gray-300/95 rounded-md p-2 hover:border-gray-500"
            >
              <Icon name="Undo2" size={18} />
              Back
            </Link>
          </div>
        </div>
        <p className="text-stone-500 text-sm">
          Complete all fields [{completionText}]
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Icon name="LayoutDashboard" />
              <h2 className="font-semibold">Customize your Chapter</h2>
            </div>
            <ChapterTitleForm
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
            <ChapterDescriptionForm
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
            <div className="flex gap-2 pt-2">
              <Icon name="Eye" />
              <h2 className="font-semibold">Access Settings</h2>
            </div>
            <ChapterAccessForm
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Icon name="Video" />
              <h2 className="font-semibold">Upload Video Tutorial</h2>
            </div>
            <ChapterVideoForm
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChapterPage
