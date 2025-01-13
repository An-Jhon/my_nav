'use client'
import { useState, useEffect } from 'react'
import { getNavigationData, groupLinksByCategory } from '@/utils/navigation'
import { getFaviconUrl } from '@/utils/favicon'
import DefaultIcon from '@/components/DefaultIcon'
import type { NavData } from '@/types'

export default function HomePage() {
  const [data, setData] = useState<NavData>({ categories: [], links: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getNavigationData()
      .then(setData)
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        导航站点
      </h1>
      
      <div className="grid gap-8">
        {data.categories.map(category => (
          <section key={category.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
            <p className="text-gray-600 mb-4">{category.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {linksByCategory[category.id]?.map(link => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start p-4 border rounded-lg hover:shadow-md transition-shadow"
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
          </section>
        ))}
      </div>
    </div>
  )
} 