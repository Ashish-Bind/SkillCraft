import { getProgress } from '@/actions/get-user-progress'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import CourseSidebar from '../_components/course-sidebar'
import CourseMobileSidebar from '../_components/course-mobile-sidebar'
import { CourseEnroll } from './chapters/_components/course-enroll'
import FeedbackForm from '@/components/feedback-form'

const SingleCourse = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth()

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
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
      purchases: {
        where: { userId },
      },
      attachments: true,
      rating: true,
    },
  })

  if (!course) {
    return redirect('/')
  }

  const progress = await getProgress(userId, params.courseId)

  const userRating = course.rating.filter((rate) => rate.userId === userId)

  return (
    <>
      <div className="h-full md:flex">
        <div className="hidden md:flex h-full w-80 flex-col left-0 z-50">
          <CourseSidebar course={course} progressCount={progress} />
        </div>
        <div className="md:hidden border-b border-gray-300">
          <CourseMobileSidebar course={course} progressCount={progress} />
        </div>
        <section className="dark:bg-gray-100 dark:text-gray-800 grow">
          <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-12 lg:flex-row lg:justify-between">
            <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
              <h1 className="text-3xl font-bold leading-none">
                {course.title}
              </h1>
              <p className="my-4 text-sm sm:mb-12 text-gray-500">
                {course.description}
              </p>
              <div className="">
                <div className="px-6 py-3 border rounded-sm grid gap-2">
                  <div className="text-orange-600 font-bold">
                    What's in the course
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    {course.chapters.length} Chapters
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    {course?.attachments?.length} Attachments
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    {course?.purchases.length > 0 ? (
                      <>
                        Already Purchased on{' '}
                        {new Date(
                          `${course?.purchases[0]?.createdAt}`
                        ).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </>
                    ) : (
                      <CourseEnroll courseId={course.id} price={course.price} />
                    )}
                  </div>
                </div>
                {course?.purchases.length > 0 && userRating.length == 0 ? (
                  <div className="border px-4 py-2 my-2 rounded-md">
                    <div className="text-orange-600 font-bold">
                      Give us a feedback
                    </div>
                    <FeedbackForm courseId={course.id} userId={userId!} />
                  </div>
                ) : (
                  course?.purchases.length > 0 && (
                    <div className="my-2 text-orange-600 font-medium text-sm">
                      *Already filled feedback
                    </div>
                  )
                )}
                <div className="border px-4 py-2 my-2 rounded-md">
                  <div className="text-orange-600 font-bold">
                    Recent reviews and feedbacks
                  </div>
                  {course?.rating.map((rate, i) => (
                    <div key={rate.id} className="text-sm text-gray-600">
                      {i + 1}. {rate.feedback}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 ">
              <img
                src={course.imgUrl}
                alt=""
                className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 rounded-md"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default SingleCourse
