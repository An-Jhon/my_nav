import { NextResponse } from 'next/server'
import * as dataManager from '@/lib/dataManager'

// 批量更新链接
export async function PUT(request: Request) {
  try {
    const data = await dataManager.readData()
    const { links } = await request.json()
    
    // 更新链接数据
    data.links = links
    await dataManager.writeData(data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating links:', error)
    return NextResponse.json({ error: 'Failed to update links' }, { status: 500 })
  }
} 