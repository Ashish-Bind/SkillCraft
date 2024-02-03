'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import Logo from './Logo'
import { Analytics, Course, Teacher } from './Icon'

const routes = [
  { name: 'Course', href: '/course' },
  { name: 'Teacher', href: '/teacher' },
]

const Navbar = () => {
  const pathname = usePathname()

  return (
    <div className="border border-b-2 p-3 flex justify-between">
      <Link className="flex items-center gap-2" href="/">
        <Logo />
        <p className="font-bold text-xl">
          Skill<span className="font-normal">Craft</span>
        </p>
      </Link>
      <div className="flex items-center gap-2">
        <ul className="flex gap-2">
          {routes.map((route) => {
            return (
              <li
                key={route.name}
                className={`hover:text-black font-medium hover:underline ${
                  pathname.includes(route.href)
                    ? 'text-black underline'
                    : 'text-gray-400'
                }`}
              >
                <Link href={route.href}>{route.name}</Link>
              </li>
            )
          })}
        </ul>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}

export default Navbar
