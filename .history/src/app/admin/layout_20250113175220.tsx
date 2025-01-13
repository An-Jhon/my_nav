'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, FolderIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import ResizeHandle from '@/components/ResizeHandle'

const navigation = [
  { name: '分类管理', href: '/admin/dashboard', icon: FolderIcon },
  { name: '网址管理', href: '/admin/links', icon: GlobeAltIcon },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarWidth, setSidebarWidth] = useState(280)
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      <aside style={{ width: sidebarWidth }} className="admin-sidebar flex-shrink-0 bg-white border-r border-gray-200">
        <div className="sticky top-0 p-4">
          <Link 
            href="/" 
            className={`
              flex items-center space-x-2 px-2 py-1.5 rounded-md mb-6 text-sm
              ${pathname === '/' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}
            `}
          >
            <HomeIcon className="h-5 w-5" />
            <span>返回首页</span>
          </Link>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center space-x-2 px-2 py-1.5 rounded-md text-sm transition-colors
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      <ResizeHandle onResize={setSidebarWidth} />

      <main className="flex-1 bg-gray-50 p-6">
        {children}
      </main>
    </div>
  )
} 