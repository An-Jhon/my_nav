import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'
import { NavData } from '@/types'

// 获取 navigation.json 文件的路径
const dataFilePath = path.join(process.cwd(), 'public/data/navigation.json')

// 读取数据文件
async function getData(): Promise<NavData> {
  const fileContent = await fs.readFile(dataFilePath, 'utf8')
  return JSON.parse(fileContent)
}

// 写入数据文件
async function writeData(data: NavData) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
}

// GET 请求处理
export async function GET() {
  try {
    const data = await getData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 })
  }
}

// POST 请求处理（添加新分类）
export async function POST(request: Request) {
  try {
    const data = await getData()
    const newCategory = await request.json()
    
    data.categories.push(newCategory)
    await writeData(data)
    
    return NextResponse.json(newCategory)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add category' }, { status: 500 })
  }
}

// PUT 请求处理（更新分类）
export async function PUT(request: Request) {
  try {
    const data = await getData()
    const updatedCategory = await request.json()
    
    data.categories = data.categories.map(category => 
      category.id === updatedCategory.id ? updatedCategory : category
    )
    
    await writeData(data)
    return NextResponse.json(updatedCategory)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

// DELETE 请求处理（删除分类）
export async function DELETE(request: Request) {
  try {
    const data = await getData()
    const { id } = await request.json()
    
    data.categories = data.categories.filter(category => category.id !== id)
    await writeData(data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
} 