import React from 'react'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300">
      <div className="w-full max-w-screen-xl mx-auto py-2 px-2 md:py-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Logo />
            <span className="self-center text-lg font-semibold whitespace-nowrap">
              SkillCraft
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6"></a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-4" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © {new Date().getFullYear()} SkillCraft™ . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
