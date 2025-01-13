'use client'
import { useState } from 'react'
import { NavCategory } from '@/types'

interface CategoryManagerProps {
  categories: NavCategory[]
  onAdd: (category: Omit<NavCategory, 'id'>) => void
  onUpdate: (category: NavCategory) => void
  onDelete: (id: string) => void
}

export default function CategoryManager({ 
  categories, 
  onAdd, 
  onUpdate, 
  onDelete 
}: CategoryManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newCategory, setNewCategory] = useState({ name: '', description: '' })
  const [editingCategory, setEditingCategory] = useState<NavCategory | null>(null)

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(newCategory)
    setNewCategory({ name: '', description: '' })
  }

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCategory) {
      onUpdate(editingCategory)
      setEditingId(null)
      setEditingCategory(null)
    }
  }

  const startEdit = (category: NavCategory) => {
    setEditingId(category.id)
    setEditingCategory(category)
  }

  // 检查是否可以提交
  const canSubmit = newCategory.name.trim().length > 0

  return (
    <div className="space-y-6">
      {/* 添加新分类的表单 */}
      <div className="bg-white shadow rounded-lg p-6 max-w-3xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4">添加新分类</h3>
        <form onSubmit={handleSubmitNew} className="space-y-4">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-2">
              <label htmlFor="new-name" className="block text-sm font-medium text-gray-700 mb-1">
                分类名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="new-name"
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                required
              />
            </div>
            <div className="col-span-3">
              <label htmlFor="new-description" className="block text-sm font-medium text-gray-700 mb-1">
                描述（选填）
              </label>
              <input
                type="text"
                id="new-description"
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              disabled={!canSubmit}
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white 
                ${canSubmit 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-gray-400 cursor-not-allowed'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              添加分类
            </button>
          </div>
        </form>
      </div>

      {/* 分类列表 */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                名称
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                描述
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map(category => (
              <tr key={category.id}>
                {editingId === category.id ? (
                  <td colSpan={3} className="px-6 py-4">
                    <form onSubmit={handleSubmitEdit} className="max-w-3xl mx-auto bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="grid grid-cols-5 gap-4">
                        <div className="col-span-2">
                          <label htmlFor={`edit-name-${category.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                            分类名称 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id={`edit-name-${category.id}`}
                            className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={editingCategory?.name || ''}
                            onChange={(e) => setEditingCategory(prev => prev ? { ...prev, name: e.target.value } : null)}
                            required
                            autoFocus
                          />
                        </div>
                        <div className="col-span-3">
                          <label htmlFor={`edit-description-${category.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                            描述（选填）
                          </label>
                          <input
                            type="text"
                            id={`edit-description-${category.id}`}
                            className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={editingCategory?.description || ''}
                            onChange={(e) => setEditingCategory(prev => prev ? { ...prev, description: e.target.value } : null)}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 mt-3">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null)
                            setEditingCategory(null)
                          }}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          取消
                        </button>
                        <button
                          type="submit"
                          disabled={!editingCategory?.name.trim()}
                          className={`inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white 
                            ${editingCategory?.name.trim() 
                              ? 'bg-blue-600 hover:bg-blue-700' 
                              : 'bg-gray-400 cursor-not-allowed'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                          保存
                        </button>
                      </div>
                    </form>
                  </td>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => startEdit(category)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => onDelete(category.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        删除
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 