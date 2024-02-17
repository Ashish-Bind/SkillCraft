const { PrismaClient } = require('@prisma/client')

const database = new PrismaClient()

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: 'Computer Science' },
        { name: 'Business' },
        { name: 'Photography' },
        { name: 'Fitness' },
        { name: 'Productivity' },
        { name: 'Social Media' },
        { name: 'Marketing' },
        { name: 'Video Editing' },
        { name: 'Music' },
      ],
    })

    console.log('success')
  } catch (error) {
    console.log(error)
  } finally {
    await database.$disconnect()
  }
}

main()
