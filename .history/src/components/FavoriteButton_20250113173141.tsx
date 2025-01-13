import React from 'react'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'

interface FavoriteButtonProps {
  id: string
  isFavorite: boolean
  onToggle: (id: string) => void
}

export default function FavoriteButton({ id, isFavorite, onToggle }: FavoriteButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onToggle(id)
  }

  return (
    <button
      onClick={handleClick}
      className={`absolute top-2 right-2 p-1 rounded-full transition-colors
        ${isFavorite 
          ? 'text-yellow-400 hover:text-yellow-500' 
          : 'text-gray-400 hover:text-gray-500'
        }`}
    >
      {isFavorite ? (
        <StarSolidIcon className="h-5 w-5" />
      ) : (
        <StarOutlineIcon className="h-5 w-5" />
      )}
    </button>
  )
} 