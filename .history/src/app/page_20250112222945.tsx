'use client'
import { useState, useEffect } from 'react'
import { getNavigationData, groupLinksByCategory } from '@/utils/navigation'
import { getFaviconUrl } from '@/utils/favicon'
import DefaultIcon from '@/components/DefaultIcon'
import ResizeHandle from '@/components/ResizeHandle'
import type { NavData } from '@/types'

export default function HomePage() {
  const [data, setData] = useState<NavData>({ categories: [], links: [] })
  const [loading, setLoading] = useState(true)
  const [currentCategory, setCurrentCategory] = useState<string>('')
  const [sidebarWidth, setSidebarWidth] = useState(200)

  useEffect(() => {
    getNavigationData()
      .then(data => {
        setData(data)
        if (data.categories.length > 0) {
          setCurrentCategory(data.categories[0].id)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const linksByCategory = groupLinksByCategory(data)

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
          <h2 className="text-base font-semibold text-gray-700 mb-4 px-2">
            导航分类
          </h2>
          <ul className="space-y-1">
            {data.categories.map(category => (
              <li key={category.id}>
                <button
                  onClick={() => setCurrentCategory(category.id)}
                  className={`w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors ${
                    currentCategory === category.id
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <ResizeHandle onResize={setSidebarWidth} />

      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            {data.categories.find(c => c.id === currentCategory)?.name || '导航站点'}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {linksByCategory[currentCategory]?.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="mr-3 w-8 h-8 flex items-center justify-center">
                  <img
                    src={getFaviconUrl(link.url)}
                    alt={`${link.title} icon`}
                    width={32}
                    height={32}
                    className="rounded"
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
                <div>
                  <h3 className="font-medium">{link.title}</h3>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 