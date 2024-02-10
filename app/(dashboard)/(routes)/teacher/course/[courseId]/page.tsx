import { Carousel } from '@/app/(dashboard)/_components/Icon'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import TitleForm from './_components/title-form'
import DescriptionForm from './_components/description-form'
import ImageForm from './_components/image-form'

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
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
      <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
        <div>
          <div className="flex items-center gap-2">
            <Carousel />
            <h2>Customize your course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm initialData={course} courseId={course.id}/>
          <ImageForm initialData={course} courseId={course.id}/>
        </div>
      </div>
    </div>
  )
}

export default CourseIdPage
