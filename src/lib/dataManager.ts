import { promises as fs } from 'fs'
import path from 'path'
import type { NavData } from '@/types'

const DATA_FILE = path.join(process.cwd(), 'data/navigation.json')

// 读取数据
export const readData = async (): Promise<NavData> => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading data file:', error)
    // 如果文件不存在或读取失败，返回空数据结构
    return {
      categories: [],
      links: []
    }
  }
}

// 写入数据
export const writeData = async (data: NavData): Promise<void> => {
  try {
    // 确保目录存在
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
    // 格式化 JSON 以便于阅读
    const jsonString = JSON.stringify(data, null, 2)
    await fs.writeFile(DATA_FILE, jsonString, 'utf-8')
  } catch (error) {
    console.error('Error writing data file:', error)
    throw error
  }
} 