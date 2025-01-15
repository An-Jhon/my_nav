'use client'
import type { NavLink } from '@/types'
import { getFaviconUrl } from '@/utils/favicon'
import FavoriteButton from './FavoriteButton'

interface LinkCardProps {
  link: NavLink
  onToggleFavorite: (id: string) => void
  isFavorite: boolean
}

export default function LinkCard({ link, onToggleFavorite, isFavorite }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 relative h-[80px] flex items-center"
    >
      <FavoriteButton
        id={link.id}
        isFavorite={isFavorite}
        onToggle={onToggleFavorite}
      />

      <div className="flex items-center space-x-3 w-full">
        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
          <img
            src={getFaviconUrl(link.url)}
            alt={`${link.title} icon`}
            width={28}
            height={28}
            className="rounded group-hover:scale-110 transition-transform duration-200 bg-gray-50"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/default-icon.png';
            }}
          />
        </div>

        <div className="min-w-0 flex-1 pr-6">
          <h3 className="font-medium text-sm text-gray-800 truncate group-hover:text-purple-600">
            {link.title}
          </h3>
          <p className="text-sm text-gray-500 truncate group-hover:text-gray-600">
            {link.description || '暂无描述'}
          </p>
        </div>
      </div>
    </a>
  )
} 