import { LucideIcon, icons } from 'lucide-react'
import React from 'react'

interface IconProps {
  name: string
  color?: string
  size?: number
}

const Icon = ({ name, color = '#ff630b', size = 24 }: IconProps) => {
  const LucideIcon = icons[name]

  return <LucideIcon color={color} size={size} />
}

export default Icon
