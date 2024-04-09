import Icon from '@/components/providers/icons-lucide'
import Link from 'next/link'
import React from 'react'

const SectionCard = ({ name, icon }: { name: string; icon: string }) => {
  return (
    <div className="p-4 border grid gap-3 rounded-md">
      <div className="flex justify-center gap-2">
        <Icon name={icon} size={32} />
      </div>
      <h3 className="mb-2 text-2xl font-bold text-orange-600 text-center">
        {name}
      </h3>
      <p className="text-gray-500 text-sm text-center">
        Plan it, create it, launch it. Collaborate seamlessly with all the
        organization and hit your marketing goals every month with our marketing
        plan.
      </p>
      <Link href={'/'} className="text-center underline">
        Browse More
      </Link>
    </div>
  )
}

export default SectionCard
