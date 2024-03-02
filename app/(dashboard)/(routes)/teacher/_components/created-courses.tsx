'use client'

import { Course } from '@prisma/client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import CourseCard from './course-card'
import { Loader2 } from 'lucide-react'

const CreatedCourses = () => {
  const [createdCourses, setCreatedCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    axios
      .get('/api/courses')
      .then((res) => setCreatedCourses(res.data))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return loading === true ? (
    <div className="flex items-center justify-center mt-6">
      <Loader2
        className="animate-spin text-orange-400 mx-auto text-2xl"
        size={48}
      />
    </div>
  ) : createdCourses.length === 0 ? (
    <div className="text-center font-semibold text-xl mt-6">
      You haven&apos;t created any course
    </div>
  ) : (
    <>
      <div className="text-center font-semibold text-xl mt-6">You courses</div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 mx-auto">
        {createdCourses.map((course) => {
          return <CourseCard data={course} key={course.id} />
        })}
      </div>
    </>
  )
}

export default CreatedCourses
