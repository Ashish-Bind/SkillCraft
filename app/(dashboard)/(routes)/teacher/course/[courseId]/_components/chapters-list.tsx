'use client'

import { Chapter } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd'
import Icon from '@/components/providers/icons-lucide'
import { Badge } from '@/components/ui/badge'

interface ChaptersListProps {
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onReorder: (updateData: { id: string; position: number }[]) => void
  items: Chapter[]
}

const ChaptersList = ({
  onEdit,
  onReorder,
  items,
  onDelete,
}: ChaptersListProps) => {
  const [chapters, setChapters] = useState(items)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  })

  useEffect(() => {
    setChapters(items)
  }, [items])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const items = Array.from(chapters)
    const [reorderedItem] = items.splice(result.source.index, 1) // removing element from SRC index
    items.splice(result.destination.index, 0, reorderedItem) // adding element at the DEST index

    const startIndex = Math.min(result.source.index, result.destination.index)
    const endIndex = Math.max(result.source.index, result.destination.index)

    const updatedChapters = items.slice(startIndex, endIndex + 1)

    setChapters(items)

    const bulkUpdateData = updatedChapters.map((chapter, i) => {
      return {
        id: chapter.id,
        position: items.findIndex((item) => item.id === chapter.id),
      }
    })

    onReorder(bulkUpdateData)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => {
          return (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {chapters.map((chapter, i) => (
                <Draggable key={chapter.id} index={i} draggableId={chapter.id}>
                  {(provided) => (
                    <div
                      className="flex items-center gap-2 bg-zinc-300 my-2 rounded-md font-medium"
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <div
                        className={`px-2 py-3 hover:bg-zinc-400 rounded-l-md ${
                          chapter.isPublished &&
                          'border-r-sky-200 hover:bg-sky-200'
                        }`}
                        {...provided.dragHandleProps}
                      >
                        <Icon name="GripVertical" size={18} color="black" />
                      </div>
                      {chapter.title}
                      <div className="ml-auto flex items-center mr-3 gap-2">
                        {chapter.isFree && <Badge>Free</Badge>}
                        <Badge
                          className={`${
                            !chapter.isPublished
                              ? 'bg-gray-500 hover:bg-gray-400 '
                              : 'bg-orange-500 hover:bg-orange-400 '
                          }`}
                        >
                          {chapter.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                        <div
                          className="cursor-pointer hover:opacity-70 transition"
                          onClick={() => onEdit(chapter.id)}
                        >
                          <Icon name="Pencil" size={16} color="black" />
                        </div>
                        <div
                          className="cursor-pointer hover:opacity-70 transition"
                          onClick={() => onDelete(chapter.id)}
                        >
                          <Icon name="Trash2" size={16} color="black" />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </DragDropContext>
  )
}

export default ChaptersList
