import React from 'react'
import Link from 'next/link'
import { HomeIcon, FolderIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: '分类管理', href: '/admin/dashboard', icon: FolderIcon },
  { name: '网址管理', href: '/admin/links', icon: GlobeAltIcon },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14">
            <div className="flex">
              <Link 
                href="/"
                className="flex items-center px-2 py-2 text-gray-600 hover:text-gray-900"
              >
                <HomeIcon className="h-5 w-5" />
                <span className="ml-2">返回首页</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* 侧边栏 */}
        <div className="w-64 bg-white shadow-sm h-[calc(100vh-3.5rem)] flex-shrink-0">
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  <item.icon
                    className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* 主内容区 */}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  )
} 