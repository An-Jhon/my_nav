import { NextResponse } from 'next/server'
import * as dataManager from '@/lib/dataManager'
import { NavData } from '@/types'

// GET 请求处理
export async function GET() {
  try {
    const data = await dataManager.readData()
    
    // 添加禁用缓存的响应头
    const response = NextResponse.json(data)
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (error) {
    console.error('Error loading data:', error)
    return NextResponse.json(
      { error: 'Failed to load data' }, 
      { status: 500 }
    )
  }
} 