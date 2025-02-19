'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CategoryManager from '@/components/admin/CategoryManager'
import type { NavLink, Category } from '@/types'

export default function DashboardPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
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
    setTimeout(() => setMessage(null), 1000)
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

  // 修改处理添加分类的函数
  const handleAddCategory = async (category: Omit<Category, 'id'>) => {
    try {
      // 检查分类名称是否已存在
      const nameExists = categories.some(
        existingCategory => existingCategory.name.toLowerCase() === category.name.toLowerCase()
      )
      
      if (nameExists) {
        showMessage('error', '分类名称已存在')
        return
      }

      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add category')
      }

      const newCategory = await response.json()
      setCategories(prev => [...prev, newCategory])
      showMessage('success', '分类添加成功')
    } catch (error) {
      console.error('Error adding category:', error)
      showMessage('error', `添加分类失败: ${error instanceof Error ? error.message : '未知错误'}`)
    }
  }

  // 添加处理更新分类的函数
  const handleUpdateCategory = async (category: Category) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      })

      if (!response.ok) {
        throw new Error('Failed to update category')
      }

      setCategories(prev => prev.map(c => c.id === category.id ? category : c))
      showMessage('success', '分类更新成功')
    } catch (error) {
      console.error('Error updating category:', error)
      showMessage('error', '更新分类失败')
    }
  }

  // 添加处理链接更新的函数
  const handleUpdateLinks = async (updatedLinks: NavLink[]) => {
    try {
      const response = await fetch('/api/links/batch', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ links: updatedLinks }),
      })

      if (!response.ok) {
        throw new Error('Failed to update links')
      }

      setLinks(updatedLinks)
      showMessage('success', '网址更新成功')
    } catch (error) {
      console.error('Error updating links:', error)
      showMessage('error', '更新网址失败')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 消息提示 - 修改颜色为主题色 */}
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

      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <CategoryManager
            categories={categories}
            links={links}
            onAdd={handleAddCategory}
            onUpdate={handleUpdateCategory}
            onDelete={handleDeleteCategory}
            onUpdateLinks={handleUpdateLinks}
          />
        </div>

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
                  className="px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-md"
                >
                  仅删除分类
                </button>
                <button
                  onClick={() => deleteCategoryAndLinks(deleteConfirm.categoryId, true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#7E57C2] hover:bg-[#6A45B0] rounded-md"
                >
                  全部删除
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 