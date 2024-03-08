'use client'

import { Category } from '@prisma/client'
import React from 'react'
import * as icons from 'react-icons/fc'
import { IconType } from 'react-icons'
import CategoryItem from './category-item'

interface CategoriesProps {
  items: Category[]
}

const iconMap: Record<Category['name'], IconType> = {
  'Computer Science': icons.FcMultipleDevices,
  Music: icons.FcMusic,
  'Video Editing': icons.FcCamera,
  'Social Media': icons.FcTwoSmartphones,
  Business: icons.FcBusinessman,
  Fitness: icons.FcSportsMode,
  Productivity: icons.FcDisplay,
  Marketing: icons.FcServiceMark,
  Photography: icons.FcFilmReel,
}

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto">
      {items.map((category) => (
        <CategoryItem
          key={category.id}
          label={category.name}
          icon={iconMap[category.name]}
          value={category.id}
        />
      ))}
    </div>
  )
}

export default Categories
