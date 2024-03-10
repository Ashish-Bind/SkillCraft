import React from 'react'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Chapter, Course, UserProgress } from '@prisma/client'
import { Menu } from 'lucide-react'
import CourseSidebar from './course-sidebar'

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & { userProgress: UserProgress[] | null })[]
  }
  progressCount: number
}

const CourseMobileSidebar = ({
  course,
  progressCount,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden p-4 hover:opacity-75">
        <Menu />
      </SheetTrigger>
      <SheetContent className="p-0 bg-white w-72" side={'left'}>
        <CourseSidebar
          key={course.id}
          course={course}
          progressCount={progressCount}
        />
      </SheetContent>
    </Sheet>
  )
}

export default CourseMobileSidebar
