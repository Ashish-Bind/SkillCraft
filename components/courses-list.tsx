import { Course, Category } from '@prisma/client'
import CourseCard from './course-card'

interface CoursesWithProgressAndCategory {
  category: Category | null
  chapters: { id: string }[]
  progress: number | null
}

interface CoursesProps {
  items: CoursesWithProgressAndCategory[]
}

const CoursesList = ({ items }: CoursesProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          return (
            <CourseCard
              key={item.id}
              category={item.category?.name!}
              chaptersLength={item.chapters.length}
              id={item.id}
              imageUrl={item.imgUrl}
              price={item.price}
              progress={item.progress}
              title={item.title}
            />
          )
        })}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  )
}

export default CoursesList
