import { promises as fs } from 'fs'
import path from 'path'
import type { NavData } from '@/types'

const DATA_FILE = path.join(process.cwd(), 'data/navigation.json')
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const REPO_OWNER = process.env.GITHUB_OWNER
const REPO_NAME = process.env.GITHUB_REPO
const FILE_PATH = 'data/navigation.json'

// 修改判断逻辑
const useGitHub = Boolean(GITHUB_TOKEN && REPO_OWNER && REPO_NAME)

// 从 GitHub 读取数据
async function readFromGitHub(): Promise<NavData> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        cache: 'no-store'
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch data from GitHub')
    }

    const data = await response.json()
    const content = Buffer.from(data.content, 'base64').toString()
    return JSON.parse(content)
  } catch (error) {
    console.error('Error reading from GitHub:', error)
    return { categories: [], links: [] }
  }
}

// 写入数据到 GitHub
async function writeToGitHub(data: NavData): Promise<void> {
  try {
    // 获取当前文件信息以获取 SHA
    const currentFile = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    ).then(res => res.json())

    const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64')

    await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Update navigation data',
          content,
          sha: currentFile.sha,
        }),
      }
    )
  } catch (error) {
    console.error('Error writing to GitHub:', error)
    throw error
  }
}

// 从本地文件读取数据
async function readFromLocal(): Promise<NavData> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // 如果文件不存在，尝试从 public/data 读取
    try {
      const publicPath = path.join(process.cwd(), 'public/data/navigation.json')
      const publicContent = await fs.readFile(publicPath, 'utf8')
      const data = JSON.parse(publicContent)
      
      // 确保 data 目录存在并写入文件
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
      await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
      
      return data
    } catch {
      return { categories: [], links: [] }
    }
  }
}

// 写入数据到本地文件
async function writeToLocal(data: NavData): Promise<void> {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error writing to local file:', error)
    throw error
  }
}

// 统一的读取接口
export const readData = async (): Promise<NavData> => {
  try {
    if (useGitHub) {
      return await readFromGitHub()
    } else {
      return await readFromLocal()
    }
  } catch (error) {
    console.error('Error reading data:', error)
    return { categories: [], links: [] }
  }
}

// 统一的写入接口
export const writeData = async (data: NavData): Promise<void> => {
  if (useGitHub) {
    await writeToGitHub(data)
  } else {
    await writeToLocal(data)
  }
} 