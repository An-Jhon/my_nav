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

  const currentLinks = useMemo(() => {
    const filteredLinks = currentCategory === 'favorites'
      ? data.links.filter(link => favorites.has(link.id))
      : data.links.filter(link => link.category === currentCategory)
    
    // 返回带有收藏状态的链接
    return filteredLinks
  }, [currentCategory, data.links, favorites])

  // 加载数据
  const loadData = async () => {
    try {
      const response = await fetch('/api/categories')
      const newData = await response.json()
      setData(prevData => {
        // 保持链接的顺序与之前一致，避免不必要的重新渲染
        const mergedLinks = newData.links.map((link: { id: string }) => {
          const existingLink = prevData.links.find(l => l.id === link.id)
          return existingLink || link
        })
        return {
          ...newData,
          links: mergedLinks
        }
      })
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  // 初始加载和定期刷新
  useEffect(() => {
    loadData()
    // 每 5 秒刷新一次数据
    const interval = setInterval(loadData, 5000)
    return () => clearInterval(interval)
  }, [])

  // 设置默认分类为 home
  useEffect(() => {
    setCurrentCategory('home')
  }, [])

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
    if (currentCategory === 'home') {
      return (
        <HomePageContent 
          links={data.links} 
          onToggleFavorite={handleToggleFavorite}
          favorites={favorites}
        />
      )
    }

    // 原有的分类内容渲染逻辑
    const categoryLinks = currentCategory === 'favorites'
      ? data.links.filter(link => favorites.has(link.id))
      : data.links.filter(link => link.category === currentCategory)

    return (
      <div className="max-w-[2000px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 p-4">
          {categoryLinks.map(link => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 relative h-[80px] flex items-center"
            >
              <FavoriteButton
                id={link.id}
                isFavorite={favorites.has(link.id)}
                onToggle={handleToggleFavorite}
              />

              <div className="flex items-center space-x-3 w-full">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={getFaviconUrl(link.url)}
                    alt={`${link.title} icon`}
                    width={28}
                    height={28}
                    className="rounded group-hover:scale-110 transition-transform duration-200 bg-gray-50"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const defaultIcon = document.createElement('div');
                        defaultIcon.className = 'w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-gray-400';
                        defaultIcon.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>`;
                        parent.appendChild(defaultIcon);
                      }
                    }}
                  />
                  <div className="default-icon hidden">
                    <DefaultIcon />
                  </div>
                </div>

                <div className="min-w-0 flex-1 pr-6">
                  <h3 className="font-medium text-sm text-gray-800 truncate group-hover:text-blue-600">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-500 truncate group-hover:text-gray-600">
                    {link.description || '暂无描述'}
                  </p>
                </div>
              </div>
            </a>
          ))}
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">加载中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部导航栏 */}
      <header className="bg-[#7E57C2] text-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => {
                  setCurrentCategory('home')
                  setSearchQuery('')
                  setSearchResults([])
                }}
                className="text-3xl font-bold hover:text-purple-200 transition-colors cursor-pointer"
              >
                要你命三千
              </button>
            </div>
            <nav className="flex space-x-4">
              <button 
                onClick={() => {
                  setCurrentCategory('home')
                  // 滚动到搜索框位置
                  const searchInput = document.querySelector('.search-input')
                  if (searchInput) {
                    searchInput.scrollIntoView({ behavior: 'smooth' })
                    ;(searchInput as HTMLInputElement).focus()
                  }
                }}
                className="p-2 rounded-full hover:bg-purple-600 transition-colors flex items-center justify-center"
                title="搜索"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* 主体内容区域 */}
      <div className="flex pt-16"> {/* 添加 pt-16 为顶部导航栏留出空间 */}
        {/* 左侧分类导航 */}
        <aside className="w-56 bg-white shadow-md fixed h-[calc(100vh-4rem)] overflow-y-auto"> {/* 从 w-64 改为 w-56 */}
          <nav className="p-4">
            <div className="space-y-2">
              <button
                onClick={() => setCurrentCategory('favorites')}
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
                // 使用默认图标作为后备方案
                const IconComponent = category.icon && iconMap[category.icon] ? iconMap[category.icon] : FolderIcon
                return (
                  <button
                    key={category.id}
                    onClick={() => setCurrentCategory(category.id)}
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
        <main className="flex-1 ml-56"> {/* 从 ml-64 改为 ml-56 */}
          {currentCategory === 'home' ? (
            <>
              {/* 搜索区域 - 仅在首页显示 */}
              <div className="pt-20 pb-32 px-4">
                <div className="max-w-4xl mx-auto text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-8">搜索导航</h1>
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
            </>
          ) : (
            // 分类页面不显示搜索框，添加一些上边距
            <div className="pt-8" />
          )}

          {/* 网站展示区域 */}
          <div className="max-w-7xl mx-auto px-4 pb-12">
            {searchQuery ? (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">搜索结果</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {searchResults.map(link => (
                    <LinkCard key={link.id} link={link} onToggleFavorite={handleToggleFavorite} isFavorite={favorites.has(link.id)} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {currentCategory === 'home' ? '推荐网站' : 
                   currentCategory === 'favorites' ? '我的收藏' :
                   data.categories.find(c => c.id === currentCategory)?.name || '所有网站'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentLinks.map(link => (
                    <LinkCard key={link.id} link={link} onToggleFavorite={handleToggleFavorite} isFavorite={favorites.has(link.id)} />
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
} 