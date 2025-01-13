'use client'
import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import type { DropResult } from 'react-beautiful-dnd'
import type { NavLink } from '@/types'
import { getFaviconUrl } from '@/utils/favicon'
import DefaultIcon from '@/components/DefaultIcon'
import FavoriteButton from '@/components/FavoriteButton'
import DragDropWrapper from './DragDropWrapper'

interface DraggableGridProps {
  links: NavLink[]
  onReorder: (links: NavLink[]) => void
  onToggleFavorite: (id: string) => void
}

export default function DraggableGrid({ links, onReorder, onToggleFavorite }: DraggableGridProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(links)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    onReorder(items)
  }

  return (
    <DragDropWrapper>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="favorites">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-wrap gap-3"
            >
              {links.map((link, index) => (
                <Draggable key={link.id} draggableId={link.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        width: 'calc(16.666% - 12px)', // 对应 6 列布局
                        '@media (max-width: 1536px)': {
                          width: 'calc(20% - 12px)', // 5 列
                        },
                        '@media (max-width: 1280px)': {
                          width: 'calc(25% - 12px)', // 4 列
                        },
                        '@media (max-width: 1024px)': {
                          width: 'calc(33.333% - 12px)', // 3 列
                        },
                        '@media (max-width: 640px)': {
                          width: 'calc(50% - 8px)', // 2 列
                        },
                      }}
                    >
                      <div
                        className={`
                          bg-white rounded-lg border p-3.5 min-h-[80px]
                          ${snapshot.isDragging ? 'shadow-lg border-blue-300 rotate-2 scale-105' : 'hover:shadow-md hover:border-blue-200'}
                          transition-all duration-200 relative
                        `}
                      >
                        <FavoriteButton
                          id={link.id}
                          isFavorited={true}
                          onToggle={onToggleFavorite}
                        />
                        
                        <div className="flex items-center">
                          <div className="mr-3 w-10 h-10 flex-shrink-0 flex items-center justify-center">
                            <img
                              src={getFaviconUrl(link.url)}
                              alt={`${link.title} icon`}
                              width={40}
                              height={40}
                              className="rounded-full transition-transform duration-200 bg-gray-50"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.parentElement?.querySelector('.default-icon')?.classList.remove('hidden');
                              }}
                            />
                            <div className="default-icon hidden">
                              <DefaultIcon />
                            </div>
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-sm text-gray-800 truncate">
                              {link.title}
                            </h3>
                            <p className="text-xs text-gray-500 truncate mt-1">
                              {link.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </DragDropWrapper>
  )
} 