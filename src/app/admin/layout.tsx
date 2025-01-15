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
  const pathname = usePathname()

  return (
    <div className="min-h-screen">
      <header className="bg-[#7E57C2] text-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-white">导航管理</h1>
            </div>
            <div>
              <Link 
                href="/"
                className="text-white hover:text-gray-200 transition-colors"
              >
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        <aside className="w-56 bg-white shadow-md fixed h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="p-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-base transition-colors
                    ${pathname === item.href
                      ? 'bg-purple-50 text-purple-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </aside>

        <main className="flex-1 ml-56">
          {children}
        </main>
      </div>
    </div>
  )
} 