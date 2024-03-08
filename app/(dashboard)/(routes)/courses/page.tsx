import { db } from '@/lib/db'
import React from 'react'
import Categories from './_components/categories'
import SearchInput from './_components/search-input'

const Courses = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return (
    <div className="p-6 flex flex-col gap-4">
      <SearchInput />
      <Categories items={categories} />
    </div>
  )
}

export default Courses
