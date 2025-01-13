'use client'
import { useState, useEffect, useMemo } from 'react'
import { getNavigationData, groupLinksByCategory } from '@/utils/navigation'
import { getFaviconUrl } from '@/utils/favicon'
import DefaultIcon from '@/components/DefaultIcon'
import ResizeHandle from '@/components/ResizeHandle'
import FavoriteButton from '@/components/FavoriteButton'
import type { NavData, NavLink } from '@/types'

export default function HomePage() {
  const [data, setData] = useState<NavData>({ categories: [], links: [] })
  const [loading, setLoading] = useState(true)
  const [currentCategory, setCurrentCategory] = useState<string>('')
  const [sidebarWidth, setSidebarWidth] = useState(200)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)))
    }

    getNavigationData()
      .then(data => {
        setData(data)
        if (data.categories.length > 0) {
          setCurrentCategory(data.categories[0].id)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const handleToggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(Array.from(newFavorites)))
  }

  const allCategories = [
    {
      id: 'favorites',
      name: '我的收藏',
      description: '收藏的常用网站'
    },
    ...data.categories
  ]

  const currentLinks = useMemo(() => {
    const filteredLinks = currentCategory === 'favorites'
      ? data.links.filter(link => favorites.has(link.id))
      : data.links.filter(link => link.category === currentCategory)
    
    // 返回带有收藏状态的链接
    return filteredLinks
  }, [currentCategory, data.links, favorites])

  // 加载数据
  const loadData = async () => {
    try {
      const response = await fetch('/api/categories')
      const newData = await response.json()
      setData(newData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  // 初始加载和定期刷新
  useEffect(() => {
    loadData()
    // 每 5 秒刷新一次数据
    const interval = setInterval(loadData, 5000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">加载中...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <aside style={{ width: sidebarWidth }} className="flex-shrink-0 bg-white border-r border-gray-200">
        <nav className="sticky top-0 p-3">
          <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">
            导航分类
          </h2>
          <ul className="space-y-1">
            {allCategories.map(category => (
              <li key={category.id}>
                <button
                  onClick={() => setCurrentCategory(category.id)}
                  className={`
                    w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors
                    ${category.id === 'favorites' ? 'font-medium text-orange-600' : ''}
                    ${
                      currentCategory === category.id
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : category.id === 'favorites'
                          ? 'hover:bg-orange-50'
                          : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <ResizeHandle onResize={setSidebarWidth} />

      <main className="flex-1 bg-gray-50">
        <div className="max-w-[2000px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 p-4">
            {currentLinks.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 relative h-[64px]"
              >
                <FavoriteButton
                  id={link.id}
                  isFavorite={favorites.has(link.id)}
                  onToggle={handleToggleFavorite}
                />

                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <img
                      src={getFaviconUrl(link.url)}
                      alt={`${link.title} icon`}
                      width={16}
                      height={16}
                      className="rounded group-hover:scale-110 transition-transform duration-200 bg-gray-50"
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

                  <div className="min-w-0 flex-1 pr-5">
                    <h3 className="font-medium text-xs text-gray-800 truncate group-hover:text-blue-600">
                      {link.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 truncate group-hover:text-gray-600">
                      {link.description || '暂无描述'}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 