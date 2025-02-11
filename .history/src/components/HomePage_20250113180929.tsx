'use client'
import { useState } from 'react'
import { NavLink } from '@/types'
import SearchBar from './SearchBar'
import LinkCard from './LinkCard'

interface HomePageProps {
  links: NavLink[]
}

export default function HomePageContent({ links }: HomePageProps) {
  const [searchResults, setSearchResults] = useState<NavLink[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (results: NavLink[]) => {
    setSearchResults(results)
    setIsSearching(results.length > 0)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">欢迎使用导航站</h1>
      <SearchBar links={links} onSearch={handleSearch} />
      
      <div className="space-y-6">
        {isSearching ? (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">搜索结果</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map(link => (
                <LinkCard key={link.id} link={link} />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">推荐网站</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {links.slice(0, 6).map(link => (
                <LinkCard key={link.id} link={link} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 