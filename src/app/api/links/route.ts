import { NextResponse } from 'next/server'
import * as dataManager from '@/lib/dataManager'
import type { NavLink } from '@/types'

export async function GET() {
  try {
    const data = await dataManager.readData()
    return NextResponse.json({ links: data.links })
  } catch (error) {
    console.error('Error loading links:', error)
    return NextResponse.json({ error: 'Failed to load links' }, { status: 500 })
  }
}

// DELETE 请求处理（删除链接）
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    const data = await dataManager.readData()
    
    // 过滤掉要删除的链接
    data.links = data.links.filter(link => link.id !== id)
    
    // 写入更新后的数据
    await dataManager.writeData(data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting link:', error)
    return NextResponse.json(
      { error: 'Failed to delete link' }, 
      { status: 500 }
    )
  }
}

// POST 请求处理（添加新链接）
export async function POST(request: Request) {
  try {
    const newLink = await request.json()
    const data = await dataManager.readData()
    
    // 生成新的链接 ID 和创建时间
    const link: NavLink = {
      ...newLink,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
      clicks: 0
    }
    
    // 添加新链接到数组中
    data.links = [link, ...data.links]
    
    // 写入更新后的数据
    await dataManager.writeData(data)
    
    return NextResponse.json(link)
  } catch (error) {
    console.error('Error adding link:', error)
    return NextResponse.json(
      { error: 'Failed to add link' }, 
      { status: 500 }
    )
  }
} 