'use client'

import Icon from '@/components/providers/icons-lucide'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import formatPrice from '@/lib/format'
import { Course } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import Link from 'next/link'

export type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = parseInt(row.getValue('price')) || 0
      return <div className="font-medium">{formatPrice(price)}</div>
    },
  },
  {
    accessorKey: 'isPublished',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isPublished = row.getValue('isPublished') || false
      return isPublished === true ? (
        <Badge className="bg-orange-500 hover:bg-orange-400 ">Published</Badge>
      ) : (
        <Badge className="bg-gray-500 hover:bg-gray-400 ">Draft</Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <Link href={`/teacher/course/${row.original.id}`}>
          <Icon name="Pen" color="black" size={16} />
        </Link>
      )
    },
  },
]
