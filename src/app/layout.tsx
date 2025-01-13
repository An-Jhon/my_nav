import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// 使用 Inter 字体
const inter = Inter({ subsets: ['latin'] })

// 设置网站的元数据
export const metadata: Metadata = {
  title: '阿白导航',
  description: '一个轻量级的导航网站，为您提供便捷的网址导航服务',
}

// 根布局组件
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
} 