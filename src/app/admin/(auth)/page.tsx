'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  // 修改登录页面的输入框聚焦样式
  const inputStyles = `
    appearance-none rounded relative block w-full px-3 py-2 border 
    border-gray-300 placeholder-gray-500 text-gray-900 
    focus:outline-none focus:ring-[#7E57C2] focus:border-[#7E57C2] focus:z-10 
    sm:text-sm
  `

  // 修改登录按钮样式
  const buttonStyles = `
    group relative w-full flex justify-center py-2 px-4 border 
    border-transparent text-sm font-medium rounded-md text-white 
    bg-[#7E57C2] hover:bg-[#6A45B0] 
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7E57C2]
  `

  // 验证密码
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') {
      localStorage.setItem('adminAuthenticated', 'true')
      router.push('/admin/dashboard')
    } else {
      setError('密码错误')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* 装饰图案 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 左上角装饰 */}
        <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full bg-[#7E57C2] opacity-5"></div>
        <div className="absolute left-32 top-32 w-40 h-40 rounded-full bg-[#7E57C2] opacity-10"></div>
        
        {/* 右下角装饰 */}
        <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-lg transform rotate-12 bg-[#7E57C2] opacity-5"></div>
        <div className="absolute right-32 bottom-32 w-40 h-40 rounded-lg transform -rotate-12 bg-[#7E57C2] opacity-10"></div>
        
        {/* 右上角小圆点 */}
        <div className="absolute right-60 top-28 w-8 h-8 rounded-full bg-[#7E57C2] opacity-20"></div>
        <div className="absolute right-80 top-44 w-6 h-6 rounded-full bg-[#7E57C2] opacity-15"></div>
        
        {/* 左下角小圆点 */}
        <div className="absolute left-60 bottom-28 w-8 h-8 rounded-full bg-[#7E57C2] opacity-20"></div>
        <div className="absolute left-80 bottom-44 w-6 h-6 rounded-full bg-[#7E57C2] opacity-15"></div>
      </div>

      {/* 登录框 */}
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow -mt-32 relative z-10">
        <div>
          <h2 className="text-center text-2xl font-bold text-gray-900">管理员登录</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            请输入管理密码进行访问
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">
              密码
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className={inputStyles}
              placeholder="请输入管理密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className={buttonStyles}
            >
              登录
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 