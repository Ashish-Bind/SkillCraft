import React from 'react'
import { Progress } from './ui/progress'
import { cn } from '@/lib/utils'

interface CourseProgressProps {
  value: number
  variant?: 'default' | 'success'
  size?: 'default' | 'sm'
}

const colorByVariant = {
  default: 'text-sky-600',
  success: 'text-emarald-700',
}

const sizeByVariant = {
  default: 'text-sm ',
  sm: 'text-xs',
}

const CourseProgress = ({ value, variant, size }: CourseProgressProps) => {
  return (
    <div>
      <Progress className="h-2 bg-gray-200" value={value} variant={variant} />
      <p
        className={cn(
          'font-medium mt-2 text-sky-700',
          colorByVariant[variant || 'default'],
          sizeByVariant[size || 'default']
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </div>
  )
}

export default CourseProgress
