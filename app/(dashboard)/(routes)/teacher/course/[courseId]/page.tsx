import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import TitleForm from './_components/title-form'
import DescriptionForm from './_components/description-form'
import ImageForm from './_components/image-form'
import CategoryForm from './_components/category-form'
import Icon from '@/components/providers/icons-lucide'
import PriceForm from './_components/price-form'
import AttachmentForm from './_components/attachment-form'
import ChaptersForm from './_components/chapters-form'

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId: userId,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: 'desc',
        },
      },
      chapters: {
        orderBy: {
          position: 'asc',
        },
      },
    },
  })

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  if (!course) {
    return redirect('/')
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imgUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `${completedFields}/${totalFields}`

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Course Setup</h1>
          <p className="text-stone-500 text-sm">
            Complete all fields [{completionText}]
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Icon name="PanelsTopLeft" />
            <h2 className="font-semibold">Customize your Course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm initialData={course} courseId={course.id} />
          <ImageForm initialData={course} courseId={course.id} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map((category) => {
              return {
                label: category.name,
                value: category.id,
              }
            })}
          />
        </div>
        <div className="">
          <div className="my-2">
            <div className="flex items-center gap-2">
              <Icon name="ListChecks" />
              <h2 className="font-semibold">Course Chapters</h2>
            </div>
            <ChaptersForm initialData={course} courseId={course.id} />
          </div>
          <div className="my-2">
            <div className="flex items-center gap-2">
              <Icon name="IndianRupee" />
              <h2 className="font-semibold">Sell your Course</h2>
            </div>
            <PriceForm initialData={course} courseId={course.id} />
          </div>
          <div className="my-2">
            <div className="flex items-center gap-2">
              <Icon name="FileSymlink" />
              <h2 className="font-semibold">Resources & Attachments</h2>
            </div>
            <AttachmentForm initialData={course} courseId={course.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseIdPage
