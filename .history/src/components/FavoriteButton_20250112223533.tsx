import React from 'react'

interface FavoriteButtonProps {
  id: string
  isFavorited: boolean
  onToggle: (id: string) => void
}

export default function FavoriteButton({ id, isFavorited, onToggle }: FavoriteButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault() // 防止触发卡片的点击事件
        onToggle(id)
      }}
      className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
      aria-label={isFavorited ? '取消收藏' : '添加收藏'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={isFavorited ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${isFavorited ? 'text-yellow-500' : 'text-gray-400'}`}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </button>
  )
} 