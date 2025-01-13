import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'
import { NavData } from '@/types'

// 获取 navigation.json 文件的路径
const dataFilePath = path.join(process.cwd(), 'public/data/navigation.json')

// GET 请求处理
export async function GET() {
  try {
    // 读取数据文件
    const fileContent = await fs.readFile(dataFilePath, 'utf8')
    const data: NavData = JSON.parse(fileContent)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error loading navigation data:', error)
    return NextResponse.json(
      { error: 'Failed to load navigation data' }, 
      { status: 500 }
    )
  }
} 