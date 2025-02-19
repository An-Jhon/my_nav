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
    const data = await dataManager.readData()
    const { id } = await request.json()
    
    data.links = data.links.filter(link => link.id !== id)
    await dataManager.writeData(data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting link:', error)
    return NextResponse.json({ error: 'Failed to delete link' }, { status: 500 })
  }
}

// POST 请求处理（添加新链接）
export async function POST(request: Request) {
  try {
    const data = await dataManager.readData()
    const newLink = await request.json()
    
    // 生成新的 ID 和创建时间
    newLink.id = Math.random().toString(36).substr(2, 9)
    newLink.createdAt = Date.now()
    
    // 将新链接添加到数组中
    data.links.unshift(newLink) // 添加到数组开头
    await dataManager.writeData(data)
    
    return NextResponse.json(newLink)
  } catch (error) {
    console.error('Error adding link:', error)
    return NextResponse.json({ error: 'Failed to add link' }, { status: 500 })
  }
}

// PUT 请求处理（更新链接）
export async function PUT(request: Request) {
  try {
    const data = await dataManager.readData()
    const updatedLink = await request.json()
    
    data.links = data.links.map(link => 
      link.id === updatedLink.id ? updatedLink : link
    )
    
    await dataManager.writeData(data)
    return NextResponse.json(updatedLink)
  } catch (error) {
    console.error('Error updating link:', error)
    return NextResponse.json({ error: 'Failed to update link' }, { status: 500 })
  }
} 