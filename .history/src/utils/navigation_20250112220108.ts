import { NavData } from '@/types'

export async function getNavigationData(): Promise<NavData> {
  // 在实际项目中，你可能需要处理错误情况
  const response = await fetch('/data/navigation.json')
  const data = await response.json()
  return data as NavData
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