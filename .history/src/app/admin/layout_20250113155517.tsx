import React from 'react'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14">
            <div className="flex">
              <Link 
                href="/"
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                返回首页
              </Link>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500">管理后台</span>
            </div>
          </div>
        </div>
      </nav>
      
      {/* 主要内容区域 */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
} 