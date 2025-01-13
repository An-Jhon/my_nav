'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LinksPage() {
  const router = useRouter()

  // 验证登录状态
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated')
    if (!isAuthenticated) {
      router.push('/admin')
    }
  }, [router])

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">网址管理</h1>
          <p className="text-gray-500">功能开发中...</p>
        </div>
      </div>
    </div>
  )
} 