'use client'
import { useState, useEffect, useMemo } from 'react'
import { getNavigationData, groupLinksByCategory } from '@/utils/navigation'
import { getFaviconUrl } from '@/utils/favicon'
import DefaultIcon from '@/components/DefaultIcon'
import ResizeHandle from '@/components/ResizeHandle'
import FavoriteButton from '@/components/FavoriteButton'
import LinkCard from '@/components/LinkCard'
import type { NavData, NavLink } from '@/types'
import HomePageContent from '@/components/HomePageContent'
import { 
  FolderIcon, BookmarkIcon, AcademicCapIcon, BeakerIcon, 
  CodeBracketIcon, CommandLineIcon, CpuChipIcon, WrenchIcon,
  GlobeAltIcon, LinkIcon, DocumentIcon, DocumentTextIcon,
  CloudIcon, ServerIcon, ShieldCheckIcon, CubeIcon,
  RocketLaunchIcon, PuzzlePieceIcon, LightBulbIcon, FireIcon,
  HashtagIcon, QueueListIcon, WindowIcon, Square3Stack3DIcon,
  CircleStackIcon, ComputerDesktopIcon, DevicePhoneMobileIcon,
  VideoCameraIcon, ArchiveBoxIcon, BoltIcon, BuildingLibraryIcon,
  CalculatorIcon, CalendarIcon, ChartBarIcon, ChatBubbleLeftIcon,
  ClockIcon, CloudArrowUpIcon, CogIcon, CurrencyDollarIcon,
  EnvelopeIcon, FilmIcon, FingerPrintIcon, GiftIcon,
  HeartIcon, HomeIcon, InboxIcon, KeyIcon,
  LanguageIcon, MapIcon, MegaphoneIcon, MicrophoneIcon,
  MusicalNoteIcon, NewspaperIcon, PaintBrushIcon, PhotoIcon,
  PrinterIcon, QrCodeIcon, QuestionMarkCircleIcon, RadioIcon,
  ScaleIcon, ShoppingBagIcon, ShoppingCartIcon, SignalIcon,
  SpeakerWaveIcon, StarIcon, SunIcon, TableCellsIcon,
  TagIcon, TicketIcon, TrophyIcon, TvIcon,
  UserGroupIcon, UserIcon, UsersIcon, WifiIcon,
  WrenchScrewdriverIcon, XMarkIcon
} from '@heroicons/react/24/outline'

// 图标映射对象
const iconMap: { [key: string]: React.ComponentType } = {
  'FolderIcon': FolderIcon,
  'BookmarkIcon': BookmarkIcon,
  'AcademicCapIcon': AcademicCapIcon,
  'BeakerIcon': BeakerIcon,
  'CodeBracketIcon': CodeBracketIcon,
  'CommandLineIcon': CommandLineIcon,
  'CpuChipIcon': CpuChipIcon,
  'WrenchIcon': WrenchIcon,
  'GlobeAltIcon': GlobeAltIcon,
  'LinkIcon': LinkIcon,
  'DocumentIcon': DocumentIcon,
  'DocumentTextIcon': DocumentTextIcon,
  'CloudIcon': CloudIcon,
  'ServerIcon': ServerIcon,
  'ShieldCheckIcon': ShieldCheckIcon,
  'CubeIcon': CubeIcon,
  'RocketLaunchIcon': RocketLaunchIcon,
  'PuzzlePieceIcon': PuzzlePieceIcon,
  'LightBulbIcon': LightBulbIcon,
  'FireIcon': FireIcon,
  'HashtagIcon': HashtagIcon,
  'QueueListIcon': QueueListIcon,
  'WindowIcon': WindowIcon,
  'Square3Stack3DIcon': Square3Stack3DIcon,
  'CircleStackIcon': CircleStackIcon,
  'ComputerDesktopIcon': ComputerDesktopIcon,
  'DevicePhoneMobileIcon': DevicePhoneMobileIcon,
  'VideoCameraIcon': VideoCameraIcon,
  'ArchiveBoxIcon': ArchiveBoxIcon,
  'BoltIcon': BoltIcon,
  'BuildingLibraryIcon': BuildingLibraryIcon,
  'CalculatorIcon': CalculatorIcon,
  'CalendarIcon': CalendarIcon,
  'ChartBarIcon': ChartBarIcon,
  'ChatBubbleLeftIcon': ChatBubbleLeftIcon,
  'ClockIcon': ClockIcon,
  'CloudArrowUpIcon': CloudArrowUpIcon,
  'CogIcon': CogIcon,
  'CurrencyDollarIcon': CurrencyDollarIcon,
  'EnvelopeIcon': EnvelopeIcon,
  'FilmIcon': FilmIcon,
  'FingerPrintIcon': FingerPrintIcon,
  'GiftIcon': GiftIcon,
  'HeartIcon': HeartIcon,
  'HomeIcon': HomeIcon,
  'InboxIcon': InboxIcon,
  'KeyIcon': KeyIcon,
  'LanguageIcon': LanguageIcon,
  'MapIcon': MapIcon,
  'MegaphoneIcon': MegaphoneIcon,
  'MicrophoneIcon': MicrophoneIcon,
  'MusicalNoteIcon': MusicalNoteIcon,
  'NewspaperIcon': NewspaperIcon,
  'PaintBrushIcon': PaintBrushIcon,
  'PhotoIcon': PhotoIcon,
  'PrinterIcon': PrinterIcon,
  'QrCodeIcon': QrCodeIcon,
  'QuestionMarkCircleIcon': QuestionMarkCircleIcon,
  'RadioIcon': RadioIcon,
  'ScaleIcon': ScaleIcon,
  'ShoppingBagIcon': ShoppingBagIcon,
  'ShoppingCartIcon': ShoppingCartIcon,
  'SignalIcon': SignalIcon,
  'SpeakerWaveIcon': SpeakerWaveIcon,
  'StarIcon': StarIcon,
  'SunIcon': SunIcon,
  'TableCellsIcon': TableCellsIcon,
  'TagIcon': TagIcon,
  'TicketIcon': TicketIcon,
  'TrophyIcon': TrophyIcon,
  'TvIcon': TvIcon,
  'UserGroupIcon': UserGroupIcon,
  'UserIcon': UserIcon,
  'UsersIcon': UsersIcon,
  'WifiIcon': WifiIcon,
  'WrenchScrewdriverIcon': WrenchScrewdriverIcon,
  'XMarkIcon': XMarkIcon
}

export default function HomePage() {
  const [data, setData] = useState<NavData>({ categories: [], links: [] })
  const [loading, setLoading] = useState(true)
  const [currentCategory, setCurrentCategory] = useState<string>('')
  const [sidebarWidth, setSidebarWidth] = useState(200)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<NavLink[]>([])
  const [initialLoading, setInitialLoading] = useState(true)
  const [contentLoading, setContentLoading] = useState(false)

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites')
    console.log('Loaded favorites from localStorage:', savedFavorites)
    
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites)
        console.log('Parsed favorites:', parsedFavorites)
        
        if (Array.isArray(parsedFavorites)) {
          const newFavorites = new Set(parsedFavorites)
          console.log('Created Set from favorites:', Array.from(newFavorites))
          setFavorites(newFavorites)
        } else {
          console.log('Invalid favorites format, resetting')
          setFavorites(new Set())
          localStorage.setItem('favorites', '[]')
        }
      } catch (error) {
        console.error('Error parsing favorites:', error)
        setFavorites(new Set())
        localStorage.setItem('favorites', '[]')
      }
    } else {
      console.log('No favorites found in localStorage')
      localStorage.setItem('favorites', '[]')
    }
  }, [])

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      const favoritesArray = Array.from(newFavorites)
      localStorage.setItem('favorites', JSON.stringify(favoritesArray))
      return newFavorites
    })
  }

  const allCategories = [
    {
      id: 'favorites',
      name: '我的收藏',
      description: '收藏的常用网站'
    },
    ...data.categories
  ]

  // 获取热门网站（点击量前12的网站）- 移到组件顶层
  const hotLinks = useMemo(() => {
    return [...data.links]
      .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
      .slice(0, 12)
  }, [data.links])

  // 获取推荐网站
  const recommendedLinks = useMemo(() => {
    return data.links.filter(link => link.recommended)
  }, [data.links])

  // 获取当前分类的链接
  const currentLinks = useMemo(() => {
    if (currentCategory === 'home') {
      return recommendedLinks
    }
    if (currentCategory === 'favorites') {
      return data.links.filter(link => favorites.has(link.id))
    }
    return data.links.filter(link => link.category === currentCategory)
  }, [currentCategory, data.links, favorites, recommendedLinks])

  // 加载数据
  const loadData = async (silent = false) => {
    try {
      if (!silent) setContentLoading(true)
      
      const response = await fetch('/api/data')
      if (!response.ok) {
        throw new Error('Failed to load data')
      }
      const newData = await response.json()
      
      setData(prevData => {
        // 如果数据没有变化，返回之前的状态
        if (JSON.stringify(prevData) === JSON.stringify(newData)) {
          return prevData
        }
        return newData
      })
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setInitialLoading(false)
      if (!silent) setContentLoading(false)
    }
  }

  // 初始加载和定期刷新
  useEffect(() => {
    loadData()
    
    // 只在首页时启动轮询，且使用静默加载
    const refreshInterval = setInterval(() => {
      if (currentCategory === 'home') {
        loadData(true) // 使用静默加载
      }
    }, 5000) // 增加刷新间隔到 5 秒

    return () => clearInterval(refreshInterval)
  }, [currentCategory])

  // 设置默认分类为 home
  useEffect(() => {
    setCurrentCategory('home')
  }, [])

  // 处理分类切换
  const handleCategoryChange = (categoryId: string) => {
    setCurrentCategory(categoryId)
    setSearchQuery('') // 清除搜索关键词
    setSearchResults([]) // 清除搜索结果
  }

  // 计算每个分类的链接数量
  const getCategoryLinkCount = (categoryId: string) => {
    if (categoryId === 'favorites') {
      // 计算实际的收藏数量并确保不会显示负数
      const actualFavorites = data.links.filter(link => favorites.has(link.id))
      return Math.max(actualFavorites.length, 0)
    }
    return data.links.filter(link => link.category === categoryId).length
  }

  // 渲染主内容区域
  const renderMainContent = () => {
    return (
      <div className="flex-1 pl-56">
        <div className="max-w-7xl mx-auto px-4 pb-12 pt-8">
          {searchQuery ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">搜索结果</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map(link => (
                  <LinkCard key={link.id} link={link} onToggleFavorite={handleToggleFavorite} isFavorite={favorites.has(link.id)} />
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-20">
              {currentCategory === 'home' && (
                <>
                  {/* 推荐网站区域 */}
                  <div className="pt-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">推荐网站</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {recommendedLinks.map(link => (
                        <LinkCard 
                          key={link.id} 
                          link={link} 
                          onToggleFavorite={handleToggleFavorite} 
                          isFavorite={favorites.has(link.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* 热门网站区域 */}
                  <div className="pt-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">热门网站</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {hotLinks.map(link => (
                        <LinkCard 
                          key={link.id} 
                          link={link} 
                          onToggleFavorite={handleToggleFavorite}
                          isFavorite={favorites.has(link.id)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* 其他分类的网站 */}
              {currentCategory !== 'home' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    {currentCategory === 'favorites' ? '我的收藏' :
                     data.categories.find(c => c.id === currentCategory)?.name || '所有网站'}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentLinks.map(link => (
                      <LinkCard 
                        key={link.id} 
                        link={link} 
                        onToggleFavorite={handleToggleFavorite} 
                        isFavorite={favorites.has(link.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    const results = data.links.filter(link => 
      link.title.toLowerCase().includes(query.toLowerCase()) ||
      link.description?.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(results)
  }

  // 添加一个函数来处理搜索按钮点击
  const handleSearchClick = () => {
    const scrollToSearch = () => {
      // 改为查找搜索区域的容器，而不是直接查找搜索框
      const searchContainer = document.querySelector('.search-container')
      if (searchContainer) {
        // 获取顶部导航栏的高度
        const headerHeight = document.querySelector('header')?.offsetHeight || 0
        
        // 获取搜索区域容器的位置
        const containerRect = searchContainer.getBoundingClientRect()
        const scrollTop = window.pageYOffset + containerRect.top - headerHeight - 20
        
        // 滚动到搜索区域
        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        })
        
        // 聚焦搜索框
        const searchInput = searchContainer.querySelector('.search-input') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
        }
      }
    }

    // 如果已经在首页
    if (currentCategory === 'home') {
      scrollToSearch()
    } else {
      // 如果不在首页，先切换到首页
      setCurrentCategory('home')
      // 等待渲染完成后再滚动
      setTimeout(scrollToSearch, 100)
    }
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">加载中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* 左侧分类导航 */}
      <aside className="w-56 bg-white shadow-md fixed h-screen overflow-y-auto">
        {/* 修改标题区域，添加居中样式 */}
        <div className="p-4 border-b border-gray-200 flex justify-center">
          <h1 className="text-3xl font-bold text-[#7E57C2] hover:text-purple-500 transition-colors cursor-pointer"
              onClick={() => {
                setCurrentCategory('home')
                setSearchQuery('')
                setSearchResults([])
              }}
          >
            要你命三千
          </h1>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            <button
              onClick={() => handleCategoryChange('favorites')}
              className={`
                w-full text-left px-3 py-2 rounded-md text-base transition-colors flex items-center
                ${currentCategory === 'favorites'
                  ? 'bg-purple-50 text-purple-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              <StarIcon className="w-5 h-5 mr-2" />
              <span>我的收藏</span>
              <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {getCategoryLinkCount('favorites')}
              </span>
            </button>
            {data.categories.map(category => {
              const IconComponent = category.icon && iconMap[category.icon] ? iconMap[category.icon] : FolderIcon
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`
                    w-full text-left px-3 py-2 rounded-md text-base transition-colors flex items-center
                    ${currentCategory === category.id
                      ? 'bg-purple-50 text-purple-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <IconComponent className="w-5 h-5 mr-2" />
                  <span>{category.name}</span>
                  <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {getCategoryLinkCount(category.id)}
                  </span>
                </button>
              )
            })}
          </div>
        </nav>
      </aside>

      {/* 主内容区域 */}
      <main className="flex-1 ml-56">
        {currentCategory === 'home' && (
          <div className="search-container pt-32 pb-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-[#7E57C2] mb-8">搜索三千导航</h1>
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      handleSearch(e.target.value)
                    }}
                    placeholder="请输入关键词搜索..."
                    className="search-input w-full px-4 py-3 rounded-full border-2 border-purple-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 text-lg"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 网站展示区域 - 添加 pt-8 类来增加顶部间距 */}
        <div className="max-w-[1200px] mx-auto px-12 pb-12 pt-16">
          {searchQuery ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">搜索结果</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map(link => (
                  <LinkCard key={link.id} link={link} onToggleFavorite={handleToggleFavorite} isFavorite={favorites.has(link.id)} />
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-24">
              {currentCategory === 'home' && (
                <>
                  {/* 推荐网站区域 */}
                  <div className="pt-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">推荐网站</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {recommendedLinks.map(link => (
                        <LinkCard 
                          key={link.id} 
                          link={link} 
                          onToggleFavorite={handleToggleFavorite} 
                          isFavorite={favorites.has(link.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* 热门网站区域 */}
                  <div className="pt-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">热门网站</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {hotLinks.map(link => (
                        <LinkCard 
                          key={link.id} 
                          link={link} 
                          onToggleFavorite={handleToggleFavorite}
                          isFavorite={favorites.has(link.id)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* 其他分类的网站 */}
              {currentCategory !== 'home' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    {currentCategory === 'favorites' ? '我的收藏' :
                     data.categories.find(c => c.id === currentCategory)?.name || '所有网站'}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentLinks.map(link => (
                      <LinkCard 
                        key={link.id} 
                        link={link} 
                        onToggleFavorite={handleToggleFavorite} 
                        isFavorite={favorites.has(link.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 