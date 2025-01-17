import { NextResponse } from 'next/server'
import { readData, writeData } from '@/lib/dataManager'

export async function POST(request: Request) {
  try {
    const { id } = await request.json()
    const data = await readData()
    
    // 更新点击次数
    const linkIndex = data.links.findIndex(link => link.id === id)
    if (linkIndex !== -1) {
      data.links[linkIndex].clicks = (data.links[linkIndex].clicks || 0) + 1
      await writeData(data)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating click count:', error)
    return NextResponse.json({ error: 'Failed to update click count' }, { status: 500 })
  }
} 