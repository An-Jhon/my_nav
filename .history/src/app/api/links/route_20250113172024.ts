import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'
import { NavData } from '@/types'

// 获取 navigation.json 文件的路径
const dataFilePath = path.join(process.cwd(), 'public/data/navigation.json')

// 读取数据文件
async function getData(): Promise<NavData> {
  const fileContent = await fs.readFile(dataFilePath, 'utf8')
  return JSON.parse(fileContent)
}

// 写入数据文件
async function writeData(data: NavData) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
}

// POST 请求处理（添加新链接）
export async function POST(request: Request) {
  try {
    const data = await getData()
    const newLink = await request.json()
    
    // 生成新的 ID（如果没有提供）
    if (!newLink.id) {
      newLink.id = Math.random().toString(36).substr(2, 9)
    }
    
    data.links.push(newLink)
    await writeData(data)
    
    return NextResponse.json(newLink)
  } catch (error) {
    console.error('Error adding link:', error)
    return NextResponse.json({ error: 'Failed to add link' }, { status: 500 })
  }
}

// PUT 请求处理（更新链接）
export async function PUT(request: Request) {
  try {
    const data = await getData()
    const updatedLink = await request.json()
    
    data.links = data.links.map(link => 
      link.id === updatedLink.id ? updatedLink : link
    )
    
    await writeData(data)
    return NextResponse.json(updatedLink)
  } catch (error) {
    console.error('Error updating link:', error)
    return NextResponse.json({ error: 'Failed to update link' }, { status: 500 })
  }
}

// DELETE 请求处理（删除链接）
export async function DELETE(request: Request) {
  try {
    const data = await getData()
    const { id } = await request.json()
    
    data.links = data.links.filter(link => link.id !== id)
    await writeData(data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting link:', error)
    return NextResponse.json({ error: 'Failed to delete link' }, { status: 500 })
  }
} 