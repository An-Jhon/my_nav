'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CategoryManager from '@/components/admin/CategoryManager'
import type { NavLink, NavCategory } from '@/types'

export default function DashboardPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<NavCategory[]>([])
  const [links, setLinks] = useState<NavLink[]>([])
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{
    categoryId: string;
    linksCount: number;
  } | null>(null)

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
        setCategories(data.categories)
        setLinks(data.links)
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
    setTimeout(() => setMessage(null), 3000)
  }

  // 处理删除分类
  const handleDeleteCategory = async (id: string) => {
    // 检查分类下是否有链接
    const categoryLinks = links.filter(link => link.category === id)
    if (categoryLinks.length > 0) {
      setDeleteConfirm({
        categoryId: id,
        linksCount: categoryLinks.length
      })
      return
    }

    // 如果没有链接，直接删除分类
    await deleteCategoryAndLinks(id, false)
  }

  // 删除分类和可能的链接
  const deleteCategoryAndLinks = async (categoryId: string, deleteLinks: boolean) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: categoryId,
          deleteLinks 
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete category')
      }

      setCategories(prev => prev.filter(c => c.id !== categoryId))
      if (deleteLinks) {
        setLinks(prev => prev.filter(l => l.category !== categoryId))
      }
      showMessage('success', '分类删除成功')
    } catch (error) {
      console.error('Error deleting category:', error)
      showMessage('error', '删除分类失败')
    } finally {
      setDeleteConfirm(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {message && (
        <div className={`mb-4 p-4 rounded-md ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* 删除确认弹窗 */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              确认删除
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              该分类下有 {deleteConfirm.linksCount} 个网址。是否同时删除这些网址？
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                取消
              </button>
              <button
                onClick={() => deleteCategoryAndLinks(deleteConfirm.categoryId, false)}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md"
              >
                仅删除分类
              </button>
              <button
                onClick={() => deleteCategoryAndLinks(deleteConfirm.categoryId, true)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                全部删除
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6">
        <CategoryManager
          categories={categories}
          onAdd={handleAddCategory}
          onUpdate={handleUpdateCategory}
          onDelete={handleDeleteCategory}
        />
      </div>
    </div>
  )
} 