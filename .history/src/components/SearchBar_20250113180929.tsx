'use client'
import { useState } from 'react'
import { NavLink } from '@/types'

interface SearchBarProps {
  links: NavLink[]
  onSearch: (results: NavLink[]) => void
}

export default function SearchBar({ links, onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (!term.trim()) {
      onSearch([])
      return
    }

    const results = links.filter(link => 
      link.title.toLowerCase().includes(term.toLowerCase()) ||
      link.description.toLowerCase().includes(term.toLowerCase()) ||
      link.url.toLowerCase().includes(term.toLowerCase())
    )
    onSearch(results)
  }

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="搜索网站、描述或网址..."
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  )
} 