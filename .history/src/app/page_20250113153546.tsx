'use client'
import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { getNavigationData, groupLinksByCategory } from '@/utils/navigation'
import { getFaviconUrl } from '@/utils/favicon'
import DefaultIcon from '@/components/DefaultIcon'
import ResizeHandle from '@/components/ResizeHandle'
import FavoriteButton from '@/components/FavoriteButton'
import type { NavData, NavLink } from '@/types'

export default function HomePage() {
  const [data, setData] = useState<NavData>({ categories: [], links: [] })
  const [loading, setLoading] = useState(true)
  const [currentCategory, setCurrentCategory] = useState<string>('')
  const [sidebarWidth, setSidebarWidth] = useState(200)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [favoriteOrder, setFavoriteOrder] = useState<string[]>([])

  useEffect(() => {
    console.log('Component mounted')
    const savedFavorites = localStorage.getItem('favorites')
    let favoriteSet = new Set<string>()
    
    if (savedFavorites) {
      favoriteSet = new Set(JSON.parse(savedFavorites))
      setFavorites(favoriteSet)
      console.log('Loaded favorites:', favoriteSet)
    }

    const savedOrder = localStorage.getItem('favoriteOrder')
    if (savedOrder) {
      const order = JSON.parse(savedOrder)
      const validOrder = order.filter((id: string) => favoriteSet.has(id))
      const missingItems = Array.from(favoriteSet).filter(id => !validOrder.includes(id))
      const finalOrder = [...validOrder, ...missingItems]
      setFavoriteOrder(finalOrder)
      console.log('Initialized favorite order:', finalOrder)
    } else {
      setFavoriteOrder(Array.from(favoriteSet))
      console.log('Created initial favorite order:', Array.from(favoriteSet))
    }

    getNavigationData()
      .then(data => {
        console.log('Loaded navigation data:', data)
        setData(data)
        if (data.categories.length > 0) {
          setCurrentCategory(data.categories[0].id)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
        setFavoriteOrder(current => current.filter(item => item !== id))
        console.log('Removed from favorites:', id)
      } else {
        newFavorites.add(id)
        setFavoriteOrder(current => [...current, id])
        console.log('Added to favorites:', id)
      }
      localStorage.setItem('favorites', JSON.stringify([...newFavorites]))
      return newFavorites
    })
  }

  const getCurrentLinks = (): NavLink[] => {
    if (currentCategory === 'favorites') {
      console.log('Getting favorite links')
      const favoriteLinks = data.links.filter(link => favorites.has(link.id))
      console.log('Favorite links count:', favoriteLinks.length)
      console.log('Favorite links IDs:', favoriteLinks.map(link => link.id))
      
      const sortedLinks = favoriteLinks.sort((a, b) => {
        const indexA = favoriteOrder.indexOf(a.id)
        const indexB = favoriteOrder.indexOf(b.id)
        return indexA - indexB
      })
      
      console.log('Sorted links IDs:', sortedLinks.map(link => link.id))
      return sortedLinks
    }
    return data.links.filter(link => link.category === currentCategory)
  }

  const handleDragEnd = (result: any) => {
    console.log('Drag ended with full result:', JSON.stringify(result, null, 2))
    if (!result.destination) {
      console.log('No destination, drag cancelled')
      return
    }
    
    console.log('Source index:', result.source.index)
    console.log('Destination index:', result.destination.index)
    console.log('Dragged item ID:', result.draggableId)
    
    const items = Array.from(favoriteOrder)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    
    console.log('New order:', items)
    setFavoriteOrder(items)
    localStorage.setItem('favoriteOrder', JSON.stringify(items))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">加载中...</div>
      </div>
    )
  }

  const links = getCurrentLinks()

  return (
    <div className="flex min-h-screen">
      <aside style={{ width: sidebarWidth }} className="flex-shrink-0 bg-white border-r border-gray-200">
        <nav className="sticky top-0 p-3">
          <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">
            导航分类
          </h2>
          <ul className="space-y-1">
            {data.categories.map(category => (
              <li key={category.id}>
                <button
                  onClick={() => setCurrentCategory(category.id)}
                  className={`
                    w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors
                    ${category.id === 'favorites' ? 'font-medium' : ''}
                    ${
                      currentCategory === category.id
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : category.id === 'favorites'
                          ? 'text-orange-600 hover:bg-orange-50'
                          : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <ResizeHandle onResize={setSidebarWidth} />

      <main className="flex-1 p-4 bg-gray-50">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            {data.categories.find(c => c.id === currentCategory)?.name || '导航站点'}
          </h1>
          
          {currentCategory === 'favorites' ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="favorites">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`
                      grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-3
                      p-4 min-h-[200px]
                      ${snapshot.isDraggingOver ? 'bg-blue-50/50 rounded-lg' : ''}
                    `}
                  >
                    {links.map((link, index) => {
                      console.log('Rendering draggable for link:', link.id, 'at index:', index)
                      return (
                        <Draggable key={link.id} draggableId={link.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`
                                transition-all duration-200
                                ${snapshot.isDragging ? 'shadow-lg scale-105' : ''}
                                cursor-move
                              `}
                            >
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block bg-white rounded-lg border hover:shadow-md transition-all duration-200 relative hover:border-blue-200"
                                onClick={(e) => snapshot.isDragging && e.preventDefault()}
                              >
                                <div className="flex items-center p-3.5 min-h-[80px]">
                                  <FavoriteButton
                                    id={link.id}
                                    isFavorited={favorites.has(link.id)}
                                    onToggle={handleToggleFavorite}
                                  />
                                  
                                  <div className="mr-3 w-10 h-10 flex-shrink-0 flex items-center justify-center">
                                    <img
                                      src={getFaviconUrl(link.url)}
                                      alt={`${link.title} icon`}
                                      width={40}
                                      height={40}
                                      className="rounded-full group-hover:scale-110 transition-transform duration-200 bg-gray-50"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.parentElement?.querySelector('.default-icon')?.classList.remove('hidden');
                                      }}
                                    />
                                    <div className="default-icon hidden">
                                      <DefaultIcon />
                                    </div>
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <h3 className="font-medium text-sm text-gray-800 truncate group-hover:text-blue-600">
                                      {link.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 truncate mt-1 group-hover:text-gray-600">
                                      {link.description}
                                    </p>
                                  </div>
                                </div>
                              </a>
                            </div>
                          )}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-3">
              {links.map(link => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center p-3.5 bg-white rounded-lg border hover:shadow-md transition-all duration-200 relative hover:border-blue-200 min-h-[80px]"
                >
                  <FavoriteButton
                    id={link.id}
                    isFavorited={favorites.has(link.id)}
                    onToggle={handleToggleFavorite}
                  />
                  
                  <div className="mr-3 w-10 h-10 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={getFaviconUrl(link.url)}
                      alt={`${link.title} icon`}
                      width={40}
                      height={40}
                      className="rounded-full group-hover:scale-110 transition-transform duration-200 bg-gray-50"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement?.querySelector('.default-icon')?.classList.remove('hidden');
                      }}
                    />
                    <div className="default-icon hidden">
                      <DefaultIcon />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-sm text-gray-800 truncate group-hover:text-blue-600">
                      {link.title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate mt-1 group-hover:text-gray-600">
                      {link.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 