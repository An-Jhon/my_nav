'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LinkManager from '@/components/admin/LinkManager'
import type { NavLink, NavCategory } from '@/types'

export default function LinksPage() {
  const router = useRouter()
  const [links, setLinks] = useState<NavLink[]>([])
  const [categories, setCategories] = useState<NavCategory[]>([])
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // 验证登录状态
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated')
    if (!isAuthenticated) {
      router.push('/admin')
    }
  }, [router])

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/navigation')
        const data = await response.json()
        const sortedLinks = [...data.links].sort((a, b) => 
          (b.createdAt || 0) - (a.createdAt || 0)
        )
        setLinks(sortedLinks)
        setCategories(data.categories)
      } catch (error) {
        console.error('Error loading data:', error)
        showMessage('error', '加载数据失败')
      }
    }
    loadData()
  }, [])

  // 显示消息
  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 1000)
  }

  // 处理添加链接
  const handleAddLink = async (link: Omit<NavLink, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(link),
      })

      if (!response.ok) {
        throw new Error('Failed to add link')
      }

      const newLink = await response.json()
      setLinks(prev => [newLink, ...prev])
      showMessage('success', '网址添加成功')
    } catch (error) {
      console.error('Error adding link:', error)
      showMessage('error', '添加网址失败')
    }
  }

  // 处理更新链接
  const handleUpdateLink = async (link: NavLink) => {
    try {
      const response = await fetch('/api/links', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(link),
      })

      if (!response.ok) {
        throw new Error('Failed to update link')
      }

      setLinks(prev => prev.map(l => l.id === link.id ? link : l))
      showMessage('success', '网址更新成功')
    } catch (error) {
      console.error('Error updating link:', error)
      showMessage('error', '更新网址失败')
    }
  }

  // 处理删除链接
  const handleDeleteLink = async (id: string) => {
    try {
      const response = await fetch('/api/links', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete link')
      }

      setLinks(prev => prev.filter(l => l.id !== id))
      showMessage('success', '网址删除成功')
    } catch (error) {
      console.error('Error deleting link:', error)
      showMessage('error', '删除网址失败')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {message && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div 
            className={`px-6 py-3 rounded-lg shadow-sm backdrop-blur-sm transition-opacity duration-300 ${
              message.type === 'success' 
                ? 'bg-[#F3E8FF] text-[#6941C6]' 
                : 'bg-red-50 text-red-700'
            }`}
          >
            <div className="flex items-center justify-center text-sm font-medium">
              {message.text}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <LinkManager
            categories={categories}
            links={links}
            onAdd={handleAddLink}
            onUpdate={handleUpdateLink}
            onDelete={handleDeleteLink}
          />
        </div>
      </div>
    </div>
  )
} 