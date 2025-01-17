'use client'
import { useState } from 'react'
import type { NavLink } from '@/types'
import SearchBar from './SearchBar'
import LinkCard from './LinkCard'

interface HomePageProps {
  links: NavLink[]
  onToggleFavorite: (id: string) => void
  favorites: Set<string>
}

export default function HomePageContent({ links, onToggleFavorite, favorites }: HomePageProps) {
  const [searchResults, setSearchResults] = useState<NavLink[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (results: NavLink[]) => {
    setSearchResults(results)
    setIsSearching(results.length > 0)
  }

  // 获取热门网站（点击量前12的网站）
  const hotLinks = [...links]
    .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
    .slice(0, 12)

  // 获取推荐网站
  const recommendedLinks = links.filter(link => link.recommended)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">欢迎使用导航站</h1>
      <SearchBar links={links} onSearch={handleSearch} />
      
      <div className="space-y-12">
        {isSearching ? (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">搜索结果</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {searchResults.map(link => (
                <LinkCard 
                  key={link.id} 
                  link={link} 
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites.has(link.id)}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* 推荐网站区域 */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">推荐网站</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {recommendedLinks.map(link => (
                  <LinkCard 
                    key={link.id} 
                    link={link}
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={favorites.has(link.id)}
                  />
                ))}
              </div>
            </div>

            {/* 热门网站区域 */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                热门网站
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {hotLinks.map(link => (
                  <LinkCard 
                    key={link.id} 
                    link={link}
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={favorites.has(link.id)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
} 