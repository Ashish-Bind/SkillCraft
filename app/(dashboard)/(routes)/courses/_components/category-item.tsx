'use client'

import Icon from '@/components/providers/icons-lucide'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import React, { useEffect } from 'react'
import { IconType } from 'react-icons'

interface CategoryItemProps {
  label: string
  value?: string
  icon?: IconType
}

const CategoryItem = ({ label, icon: Icon, value }: CategoryItemProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategoryId = searchParams.get('category-id')
  const currentTitle = searchParams.get('search')

  const isSelected = currentCategoryId === value

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          search: currentTitle,
          'category-id': isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    )

    router.push(url)
  }

  return (
    <button
      className={`flex items-center font-semibold border gap-1 border-gray-200 px-3 py-2 rounded-full hover:border-orange-600 transition ${
        isSelected && 'border-orange-600 bg-orange-200/20 text-orange-600'
      }`}
      type="button"
      onClick={onClick}
    >
      {Icon && <Icon />}
      <span className="text-sm text-nowrap">{label}</span>
    </button>
  )
}

export default CategoryItem
