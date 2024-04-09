import React from 'react'
import SectionCard from './sections-card'

const Sections = () => {
  const sections = [
    { name: 'Marketing', icon: 'File', description: '' },
    { name: 'Coding', icon: 'Laptop', description: '' },
    { name: 'Business', icon: 'Briefcase', description: '' },
    { name: 'Photography', icon: 'Camera', description: '' },
    { name: 'Fitness', icon: 'Dumbbell', description: '' },
    { name: 'Lifestyle', icon: 'NotebookText', description: '' },
  ]

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Learn at your own convinience.
          </h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">
            Here at SkillCraft we focus on learning, innovation, and building
            skills that can unlock long-term value and drive economic growth.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          {sections.map(({ name, icon }) => (
            <SectionCard key={name} name={name} icon={icon} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Sections
