import { NextResponse } from 'next/server'
import * as dataManager from '@/lib/dataManager'
import { NavData } from '@/types'

// GET 请求处理
export async function GET() {
  try {
    const data = await dataManager.readData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error loading navigation data:', error)
    return NextResponse.json({ error: 'Failed to load navigation data' }, { status: 500 })
  }
} 