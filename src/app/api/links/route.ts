import { NextResponse } from 'next/server'
import * as dataManager from '@/lib/dataManager'

export async function GET() {
  try {
    const data = await dataManager.readData()
    return NextResponse.json({ links: data.links })
  } catch (error) {
    console.error('Error loading links:', error)
    return NextResponse.json({ error: 'Failed to load links' }, { status: 500 })
  }
} 