import { NextResponse } from 'next/server'
import * as dataManager from '@/lib/dataManager'

export async function GET() {
  try {
    const data = await dataManager.readData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error loading data:', error)
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 })
  }
} 