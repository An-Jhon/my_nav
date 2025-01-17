import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'
import { NavData } from '@/types'

// 使用正确的数据文件路径
const dataFilePath = path.join(process.cwd(), 'data/navigation.json')

// 读取数据文件
async function getData(): Promise<NavData> {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf8')
    return JSON.parse(fileContent)
  } catch (error) {
    // 如果文件不存在，尝试从 public/data 读取
    const publicPath = path.join(process.cwd(), 'public/data/navigation.json')
    const publicContent = await fs.readFile(publicPath, 'utf8')
    const data = JSON.parse(publicContent)
    
    // 确保 data 目录存在
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true })
    // 复制文件到新位置
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
    
    return data
  }
}

// GET 请求处理
export async function GET() {
  try {
    const data = await getData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error loading navigation data:', error)
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 })
  }
} 