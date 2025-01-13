'use client'
import React, { useState } from 'react'
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
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id)
    e.currentTarget.classList.add('opacity-50')
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move'
    }
  }

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('opacity-50')
    setDraggedItem(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (!draggedItem || draggedItem === targetId) return

    const draggedIndex = links.findIndex(link => link.id === draggedItem)
    const targetIndex = links.findIndex(link => link.id === targetId)
    
    const newLinks = [...links]
    const [draggedLink] = newLinks.splice(draggedIndex, 1)
    newLinks.splice(targetIndex, 0, draggedLink)
    
    onReorder(newLinks)
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-3">
      {links.map(link => (
        <div
          key={link.id}
          draggable
          onDragStart={(e) => handleDragStart(e, link.id)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, link.id)}
          className="relative group"
        >
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-move">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <circle cx="9" cy="5" r="1" />
              <circle cx="9" cy="12" r="1" />
              <circle cx="9" cy="19" r="1" />
              <circle cx="15" cy="5" r="1" />
              <circle cx="15" cy="12" r="1" />
              <circle cx="15" cy="19" r="1" />
            </svg>
          </div>

          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              block p-3.5 bg-white rounded-lg border 
              hover:shadow-md transition-all duration-200 relative 
              hover:border-blue-200 min-h-[80px]
              ${draggedItem === link.id ? 'shadow-lg border-blue-300' : ''}
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
                <h3 className="font-medium text-sm text-gray-800 truncate hover:text-blue-600">
                  {link.title}
                </h3>
                <p className="text-xs text-gray-500 truncate mt-1">
                  {link.description}
                </p>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  )
} 