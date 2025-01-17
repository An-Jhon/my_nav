import { NavData } from '@/types'

export async function getNavigationData(): Promise<NavData> {
  try {
    // 改用 API 路由获取数据
    const response = await fetch('/api/navigation')
    if (!response.ok) {
      throw new Error('Failed to fetch navigation data')
    }
    return response.json()
  } catch (error) {
    console.error('Error loading navigation data:', error)
    return {
      categories: [],
      links: []
    }
  }
}

export function groupLinksByCategory(data: NavData) {
  return data.links.reduce((acc, link) => {
    if (!acc[link.category]) {
      acc[link.category] = []
    }
    acc[link.category].push(link)
    return acc
  }, {} as Record<string, typeof data.links>)
} 