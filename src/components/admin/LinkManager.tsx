'use client'
import { useState } from 'react'
import type { NavLink, Category } from '@/types'

interface LinkManagerProps {
  links: NavLink[]
  categories: Category[]
  onAdd: (link: Omit<NavLink, 'id'>) => void
  onUpdate: (link: NavLink) => void
  onDelete: (id: string) => void
}

export default function LinkManager({
  links,
  categories,
  onAdd,
  onUpdate,
  onDelete
}: LinkManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newLink, setNewLink] = useState({ title: '', url: '', description: '', category: '' })
  const [editingLink, setEditingLink] = useState<NavLink | null>(null)

  const inputStyles = `
    block w-full px-3 py-2 rounded-md border border-gray-300 
    shadow-sm focus:border-[#7E57C2] focus:ring-[#7E57C2] 
    focus:ring-1 focus:ring-opacity-50 sm:text-sm
    focus:outline-none
  `

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(newLink)
    setNewLink({ title: '', url: '', description: '', category: '' })
  }

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingLink) {
      onUpdate(editingLink)
      setEditingId(null)
      setEditingLink(null)
    }
  }

  const startEdit = (link: NavLink) => {
    setEditingId(link.id)
    setEditingLink(link)
  }

  const canSubmit = newLink.title.trim().length > 0 && 
                   newLink.url.trim().length > 0 && 
                   newLink.category.trim().length > 0

  return (
    <div className="space-y-6">
      {/* 添加新链接的表单 */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">添加新网址</h3>
        <form onSubmit={handleSubmitNew} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="new-title" className="block text-sm font-medium text-gray-700 mb-1">
                网站名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="new-title"
                className={inputStyles}
                value={newLink.title}
                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="new-url" className="block text-sm font-medium text-gray-700 mb-1">
                网址 <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="new-url"
                className={inputStyles}
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="new-description" className="block text-sm font-medium text-gray-700 mb-1">
              描述（选填）
            </label>
            <input
              type="text"
              id="new-description"
              className={inputStyles}
              value={newLink.description}
              onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="new-category" className="block text-sm font-medium text-gray-700 mb-1">
              所属分类 <span className="text-red-500">*</span>
            </label>
            <select
              id="new-category"
              className={inputStyles}
              value={newLink.category}
              onChange={(e) => setNewLink({ ...newLink, category: e.target.value })}
              required
            >
              <option value="">选择分类</option>
              {categories
                .filter(category => category.id !== 'favorites')
                .map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <button
              type="submit"
              disabled={!canSubmit}
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white 
                ${canSubmit 
                  ? 'bg-[#7E57C2] hover:bg-[#6A45B0]' 
                  : 'bg-gray-400 cursor-not-allowed'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7E57C2]`}
            >
              添加网址
            </button>
          </div>
        </form>
      </div>

      {/* 链接列表 */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                网站名称
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                网址
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                描述
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                分类
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {links.map(link => (
              <tr key={link.id}>
                {editingId === link.id ? (
                  <td colSpan={5} className="px-6 py-4">
                    <form onSubmit={handleSubmitEdit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            网站名称 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className={inputStyles}
                            value={editingLink?.title || ''}
                            onChange={(e) => setEditingLink(prev => prev ? { ...prev, title: e.target.value } : null)}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            网址 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="url"
                            className={inputStyles}
                            value={editingLink?.url || ''}
                            onChange={(e) => setEditingLink(prev => prev ? { ...prev, url: e.target.value } : null)}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          描述（选填）
                        </label>
                        <input
                          type="text"
                          className={inputStyles}
                          value={editingLink?.description || ''}
                          onChange={(e) => setEditingLink(prev => prev ? { ...prev, description: e.target.value } : null)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          所属分类 <span className="text-red-500">*</span>
                        </label>
                        <select
                          className={inputStyles}
                          value={editingLink?.category || ''}
                          onChange={(e) => setEditingLink(prev => prev ? { ...prev, category: e.target.value } : null)}
                          required
                        >
                          <option value="">请选择分类</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null)
                            setEditingLink(null)
                          }}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7E57C2]"
                        >
                          取消
                        </button>
                        <button
                          type="submit"
                          disabled={!editingLink?.title.trim() || !editingLink?.url.trim() || !editingLink?.category.trim()}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#7E57C2] hover:bg-[#6A45B0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7E57C2]"
                        >
                          保存
                        </button>
                      </div>
                    </form>
                  </td>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {link.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {link.url}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {link.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {categories.find(c => c.id === link.category)?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => startEdit(link)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => onDelete(link.id)}
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