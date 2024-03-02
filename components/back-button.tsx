import Link from 'next/link'
import React from 'react'
import Icon from './providers/icons-lucide'

const Back = ({ link }: { link: string }) => {
  return (
    <Link
      href={link}
      className="flex items-center gap-2 font-semibold text-sm border border-gray-300/95 rounded-md p-2 hover:border-gray-500"
    >
      <Icon name="Undo2" size={18} />
      Back
    </Link>
  )
}

export default Back
