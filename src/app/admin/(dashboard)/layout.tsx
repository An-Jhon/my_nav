'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  Squares2X2Icon, 
  StarIcon, 
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline'

const navItems = [
  { href: '/admin/dashboard', label: '分类管理', icon: Squares2X2Icon },
  { href: '/admin/links', label: '网址管理', icon: HomeIcon },
  { href: '/admin/recommendations', label: '推荐管理', icon: StarIcon },
]

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 左侧导航栏 */}
      <div className="fixed inset-y-0 left-0 w-56 bg-white shadow-md">
        <div className="flex flex-col h-full">
          {/* Logo区域 */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">管理后台</h1>
          </div>
          
          {/* 导航菜单 */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    w-full text-left px-3 py-2 rounded-md text-base transition-colors flex items-center
                    ${isActive
                      ? 'bg-purple-50 text-purple-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* 底部按钮区域 */}
          <div className="p-4 space-y-2 border-t border-gray-200">
            <Link
              href="/"
              className="w-full flex items-center px-3 py-2 text-base text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              返回首页
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem('adminAuthenticated')
                window.location.href = '/admin'
              }}
              className="w-full flex items-center px-3 py-2 text-base text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
              退出登录
            </button>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="pl-56">
        {children}
      </div>
    </div>
  )
} 