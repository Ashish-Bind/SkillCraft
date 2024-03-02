'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton, useUser } from '@clerk/nextjs'
import Logo from './Logo'
import { Analytics, Course, Teacher } from './Icon'
import { Button } from '@/components/ui/button'

const routes = [
  { name: 'Courses', href: '/courses' },
  { name: 'Teacher', href: '/teacher' },
]

const Navbar = () => {
  const pathname = usePathname()
  const { isSignedIn, user } = useUser()

  return (
    <div className="border border-b-2 p-3 flex justify-between">
      <Link className="flex items-center gap-2" href="/">
        <Logo />
        <p className="font-bold text-xl">
          Skill<span className="font-normal">Craft</span>
        </p>
      </Link>
      <div className="flex items-center gap-4">
        <ul className="flex gap-4">
          {routes.map((route) => {
            return (
              <li
                key={route.name}
                className={`hover:text-black font-medium hover:underline ${
                  pathname.includes(route.href) ? 'text-black' : 'text-gray-400'
                }`}
              >
                <Link href={route.href}>{route.name}</Link>
              </li>
            )
          })}
        </ul>
        {!isSignedIn ? (
          <Link href="/sign-in">
            <Button className="text-sm">Login</Button>
          </Link>
        ) : (
          <UserButton afterSignOutUrl="/" />
        )}
      </div>
    </div>
  )
}

export default Navbar
