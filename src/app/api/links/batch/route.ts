import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'
import { NavData } from '@/types'

const dataFilePath = path.join(process.cwd(), 'data/navigation.json')

// 批量更新链接
export async function PUT(request: Request) {
  try {
    const { links } = await request.json()
    
    // 读取当前数据
    const fileContent = await fs.readFile(dataFilePath, 'utf8')
    const data: NavData = JSON.parse(fileContent)
    
    // 更新链接
    data.links = links
    
    // 写入文件
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating links:', error)
    return NextResponse.json(
      { error: 'Failed to update links' },
      { status: 500 }
    )
  }
} 