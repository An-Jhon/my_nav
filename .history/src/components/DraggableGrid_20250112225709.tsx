import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import type { DropResult } from 'react-beautiful-dnd'
import type { NavLink } from '@/types'
import { getFaviconUrl } from '@/utils/favicon'
import DefaultIcon from '@/components/DefaultIcon'
import FavoriteButton from '@/components/FavoriteButton'

interface DraggableGridProps {
  links: NavLink[]
  onReorder: (links: NavLink[]) => void
  onToggleFavorite: (id: string) => void
}

export default function DraggableGrid({ links, onReorder, onToggleFavorite }: DraggableGridProps) {
  // 处理拖拽结束事件
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(links)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onReorder(items)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="favorites" direction="vertical">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-3"
            style={{
              display: 'grid', // 确保 grid 布局生效
              gridAutoFlow: 'row dense', // 优化网格填充
            }}
          >
            {links.map((link, index) => (
              <Draggable key={link.id} draggableId={link.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                      ...provided.draggableProps.style,
                      gridColumn: 'span 1',
                    }}
                  >
                    <div
                      {...provided.dragHandleProps}
                      className={`
                        group relative
                        ${snapshot.isDragging ? 'z-50' : ''}
                        cursor-grab active:cursor-grabbing
                      `}
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          block p-3.5 bg-white rounded-lg border
                          hover:shadow-md transition-all duration-200
                          hover:border-blue-200 min-h-[80px]
                          ${snapshot.isDragging ? 'shadow-lg border-blue-300 rotate-2 scale-105' : ''}
                        `}
                        onClick={(e) => snapshot.isDragging && e.preventDefault()}
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
                              className="rounded-full group-hover:scale-110 transition-transform duration-200 bg-gray-50"
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
                            <h3 className="font-medium text-sm text-gray-800 truncate group-hover:text-blue-600">
                              {link.title}
                            </h3>
                            <p className="text-xs text-gray-500 truncate mt-1 group-hover:text-gray-600">
                              {link.description}
                            </p>
                          </div>
                        </div>
                      </a>
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
  )
} 