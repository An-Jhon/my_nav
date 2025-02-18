import { NextResponse } from 'next/server'
import * as dataManager from '@/lib/dataManager'
import { NavData } from '@/types'

// 批量更新链接
export async function PUT(request: Request) {
  try {
    const { links } = await request.json()
    
    // 读取当前数据
    const data = await dataManager.readData()
    
    // 更新链接
    data.links = links
    
    // 写入数据
    await dataManager.writeData(data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating links:', error)
    return NextResponse.json(
      { error: 'Failed to update links' },
      { status: 500 }
    )
  }
} 