'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CategoryManager from '@/components/admin/CategoryManager'
import { NavCategory } from '@/types'

export default function DashboardPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<NavCategory[]>([])

  // 验证登录状态
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated')
    if (!isAuthenticated) {
      router.push('/admin')
    }
  }, [router])

  // 加载分类数据
  useEffect(() => {
    const loadCategories = async () => {
      const response = await fetch('/data/navigation.json')
      const data = await response.json()
      setCategories(data.categories)
    }
    loadCategories()
  }, [])

  // 处理分类操作
  const handleAddCategory = async (category: Omit<NavCategory, 'id'>) => {
    const newCategory = {
      ...category,
      id: Math.random().toString(36).substr(2, 9)
    }
    
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      })

      if (!response.ok) {
        throw new Error('Failed to add category')
      }

      setCategories(prev => [...prev, newCategory])
    } catch (error) {
      console.error('Error adding category:', error)
      // TODO: 添加错误提示
    }
  }

  const handleUpdateCategory = async (category: NavCategory) => {
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
    } catch (error) {
      console.error('Error updating category:', error)
      // TODO: 添加错误提示
    }
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete category')
      }

      setCategories(prev => prev.filter(c => c.id !== id))
    } catch (error) {
      console.error('Error deleting category:', error)
      // TODO: 添加错误提示
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">分类管理</h1>
          <CategoryManager
            categories={categories}
            onAdd={handleAddCategory}
            onUpdate={handleUpdateCategory}
            onDelete={handleDeleteCategory}
          />
        </div>
      </div>
    </div>
  )
} 