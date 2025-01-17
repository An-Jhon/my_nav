'use client'
import { useState } from 'react'
import type { NavLink } from '@/types'
import { getFaviconUrl } from '@/utils/favicon'
import FavoriteButton from './FavoriteButton'

interface LinkCardProps {
  link: NavLink
  onToggleFavorite: (id: string) => void
  isFavorite: boolean
}

export default function LinkCard({ link, onToggleFavorite, isFavorite }: LinkCardProps) {
  const handleClick = async () => {
    try {
      await fetch('/api/links/click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: link.id }),
      })
    } catch (error) {
      console.error('Failed to update click count:', error)
    }
  }

  // 获取网站图标
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${new URL(link.url).hostname}&sz=128`

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="block group relative bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-100 transition-all duration-200 p-2"
    >
      <div className="flex items-center space-x-3">
        {/* 左侧圆形图标 */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-50 border border-gray-100">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url(${faviconUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>

        {/* 右侧内容 */}
        <div className="flex-1 min-w-0">
          {/* 标题和收藏按钮 */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-purple-600 transition-colors">
                {link.title}
              </h3>
              <p className="text-sm text-gray-500 truncate mt-0.5">
                {link.description || '暂无描述'}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onToggleFavorite(link.id)
              }}
              className="flex-shrink-0 ml-1 p-1 rounded-full hover:bg-purple-50 transition-colors"
            >
              <svg
                className={`w-6 h-6 ${
                  isFavorite ? 'text-yellow-400 fill-current' : 'text-gray-400 hover:text-purple-500'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={isFavorite ? '0' : '1.5'}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          </div>

          {/* 底部访问信息 */}
          <div className="mt-2 flex items-center text-xs text-gray-400">
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {link.clicks || 0} 次访问
            </span>
          </div>
        </div>
      </div>
    </a>
  )
} 