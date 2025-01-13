'use client'
import React, { useState } from 'react'
import Link from 'next/link'
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
  const [sidebarWidth, setSidebarWidth] = useState(240)

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="px-4">
          <div className="flex h-14">
            <Link 
              href="/"
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
              style={{ marginLeft: `${sidebarWidth - 240}px` }}
            >
              <HomeIcon className="h-6 w-6" />
              <span className="ml-2 text-base font-medium">返回首页</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* 侧边栏 */}
        <div 
          className="bg-white shadow-sm h-[calc(100vh-3.5rem)] flex-shrink-0"
          style={{ width: `${sidebarWidth}px` }}
        >
          <nav className="mt-5 px-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-4 py-3 text-base font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  <item.icon
                    className="mr-4 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <ResizeHandle onResize={setSidebarWidth} />

        {/* 主内容区 */}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  )
} 