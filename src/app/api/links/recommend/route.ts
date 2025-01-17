import { NextResponse } from 'next/server'
import * as dataManager from '@/lib/dataManager'

export async function POST(request: Request) {
  try {
    const { id } = await request.json()
    const data = await dataManager.readData()
    
    // 更新推荐状态
    const linkIndex = data.links.findIndex(link => link.id === id)
    if (linkIndex !== -1) {
      data.links[linkIndex].recommended = !data.links[linkIndex].recommended
      await dataManager.writeData(data)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating recommendation status:', error)
    return NextResponse.json({ error: 'Failed to update recommendation status' }, { status: 500 })
  }
} 