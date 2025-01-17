'use client'
import { useState, useEffect, useMemo } from 'react'
import type { NavLink } from '@/types'

export default function RecommendationsPage() {
  const [links, setLinks] = useState<NavLink[]>([])
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const MAX_RECOMMENDATIONS = 12

  // 计算推荐数量 - 使用 useMemo 优化性能
  const currentRecommendationsCount = useMemo(() => 
    links.filter(link => link.recommended).length,
    [links]
  )

  // 加载所有链接
  const loadLinks = async () => {
    try {
      const response = await fetch('/api/links')
      if (!response.ok) {
        throw new Error('Failed to load links')
      }
      const data = await response.json()
      setLinks(data.links)
    } catch (error) {
      console.error('Error loading links:', error)
      showMessage('error', '加载数据失败')
    }
  }

  useEffect(() => {
    loadLinks()
  }, [])

  // 显示消息
  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 1000)
  }

  // 切换推荐状态
  const toggleRecommendation = async (linkId: string) => {
    try {
      const link = links.find(l => l.id === linkId)
      // 如果已经有6个推荐网站，且当前操作是添加新的推荐，则显示提示消息
      if (currentRecommendationsCount >= MAX_RECOMMENDATIONS && !link?.recommended) {
        showMessage('success', '推荐位已满，请先取消一些推荐')
        return
      }

      const response = await fetch('/api/links/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: linkId }),
      })

      if (!response.ok) {
        throw new Error('Failed to update recommendation')
      }

      // 重新加载链接列表
      loadLinks()
      showMessage('success', '更新推荐状态成功')
    } catch (error) {
      console.error('Error updating recommendation:', error)
      showMessage('error', '更新推荐状态失败')
    }
  }

  // 对链接进行排序：推荐的在前，未推荐的在后，同组内按标题排序
  const sortedLinks = useMemo(() => {
    return [...links].sort((a, b) => {
      // 首先按推荐状态排序
      if (a.recommended && !b.recommended) return -1
      if (!a.recommended && b.recommended) return 1
      // 如果推荐状态相同，则按标题字母顺序排序
      return a.title.localeCompare(b.title)
    })
  }, [links])

  // 处理推荐按钮点击
  const handleRecommendClick = (link: NavLink) => {
    // 如果已经有6个推荐网站，且当前操作是添加新的推荐，则显示提示消息
    if (currentRecommendationsCount >= MAX_RECOMMENDATIONS && !link.recommended) {
      showMessage('success', '推荐位已满，请先取消一些推荐')
      return
    }
    toggleRecommendation(link.id)
  }

  return (
    <div className="min-h-screen bg-gray-100">
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">推荐管理</h1>
              <p className="mt-2 text-sm text-gray-700">
                管理首页显示的推荐网站，最多可以推荐 {MAX_RECOMMENDATIONS} 个网站。
                当前已推荐 {currentRecommendationsCount} 个网站。
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">网站名称</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">描述</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">推荐状态</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {sortedLinks.map(link => (
                  <tr key={link.id} className={link.recommended ? 'bg-purple-50' : ''}>
                    <td className="px-6 py-4 text-sm text-gray-900">{link.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{link.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {link.recommended ? '已推荐' : '未推荐'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleRecommendClick(link)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          link.recommended
                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                            : currentRecommendationsCount >= MAX_RECOMMENDATIONS
                            ? 'bg-gray-100 text-gray-500 cursor-pointer'
                            : 'bg-[#F3E8FF] text-[#6941C6] hover:bg-purple-100'
                        }`}
                      >
                        {link.recommended ? '取消推荐' : '推荐'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 