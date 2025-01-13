import { NavData } from '@/types'
import path from 'path'
import fs from 'fs/promises'

export async function getNavigationData(): Promise<NavData> {
  try {
    // 在服务器端直接读取 JSON 文件
    const filePath = path.join(process.cwd(), 'public', 'data', 'navigation.json')
    const jsonData = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(jsonData) as NavData
  } catch (error) {
    console.error('Error loading navigation data:', error)
    // 返回空数据结构
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