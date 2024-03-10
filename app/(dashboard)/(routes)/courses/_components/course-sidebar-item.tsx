'use client'

import { cn } from '@/lib/utils'
import { CheckCircle, Lock, PlayCircle } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

interface CourseSidebarItemProps {
  id: string
  title: string
  isCompleted: boolean
  isLocked: boolean
  courseId: string
}

const CourseSidebarItem = ({
  id,
  isCompleted,
  isLocked,
  title,
  courseId,
}: CourseSidebarItemProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle

  const isActive = pathname.includes(id)

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20',
        isActive &&
          'text-slate-700 bg-orange-400/20 hover:bg-orange-600/20 hover:text-slate-700',
        isCompleted && 'text-emerald-700 hover:text-emerald-700',
        isCompleted && isActive && 'bg-emerald-200/20'
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={18}
          className={cn(
            'text-slate-500',
            isActive && 'text-slate-700',
            isCompleted && 'text-emerald-700'
          )}
        />
        {title}
      </div>
      <div
        className={cn(
          'ml-auto opacity-0 border-2 border-orange-600 h-full transition-all',
          isActive && 'opacity-100',
          isCompleted && 'border-emerald-700'
        )}
      />
    </button>
  )
}

export default CourseSidebarItem
