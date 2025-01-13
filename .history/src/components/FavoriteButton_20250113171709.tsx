import React from 'react'

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
          ? 'text-orange-500 hover:text-orange-600' 
          : 'text-gray-400 hover:text-gray-500'
        }`}
    >
      <StarIcon className="h-5 w-5" />
    </button>
  )
} 