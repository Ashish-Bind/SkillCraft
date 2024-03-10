import { db } from '@/lib/db'
import React from 'react'
import Categories from './_components/categories'
import SearchInput from './_components/search-input'
import { getCourses } from '@/actions/get-courses'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import CoursesList from '@/components/courses-list'

interface Params {
  searchParams: {
    'category-id': string
    search: string
  }
}

const Courses = async ({ searchParams }: Params) => {
  const { userId } = auth()

  if (!userId) {
    return redirect('/')
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  const courses = await getCourses({
    userId,
    search: searchParams.search,
    categoryId: searchParams['category-id'],
  })

  return (
    <div className="p-6 flex flex-col gap-4">
      <SearchInput />
      <Categories items={categories} />
      <CoursesList items={courses} />
    </div>
  )
}

export default Courses
