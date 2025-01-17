import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'
import { NavData } from '@/types'

// 修改数据文件路径，添加错误处理
const dataFilePath = path.join(process.cwd(), 'data/navigation.json')

// 读取数据文件
async function getData(): Promise<NavData> {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf8')
    return JSON.parse(fileContent)
  } catch (error) {
    // 如果文件不存在，尝试从 public/data 读取
    const publicPath = path.join(process.cwd(), 'public/data/navigation.json')
    const publicContent = await fs.readFile(publicPath, 'utf8')
    const data = JSON.parse(publicContent)
    
    // 确保 data 目录存在
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true })
    // 复制文件到新位置
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
    
    return data
  }
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
    
    // 生成新的 ID
    newCategory.id = Math.random().toString(36).substr(2, 9)
    
    // 将新分类添加到数组中
    data.categories.push(newCategory)
    await writeData(data)
    
    return NextResponse.json(newCategory)
  } catch (error) {
    console.error('Error adding category:', error)
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
    console.error('Error updating category:', error)
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

// DELETE 请求处理（删除分类）
export async function DELETE(request: Request) {
  try {
    const data = await getData()
    const { id, deleteLinks } = await request.json()
    
    // 删除分类
    data.categories = data.categories.filter(category => category.id !== id)
    
    // 如果需要，同时删除该分类下的所有链接
    if (deleteLinks) {
      data.links = data.links.filter(link => link.category !== id)
    }
    
    await writeData(data)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
} 