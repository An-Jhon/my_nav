'use client'
import { NavLink } from '@/types'
import { getFaviconUrl } from '@/utils/favicon'

interface LinkCardProps {
  link: NavLink
}

export default function LinkCard({ link }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 flex-shrink-0">
          <img
            src={getFaviconUrl(link.url)}
            alt={`${link.title} favicon`}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {link.title}
          </h3>
          {link.description && (
            <p className="text-sm text-gray-500 truncate">
              {link.description}
            </p>
          )}
        </div>
      </div>
    </a>
  )
} 