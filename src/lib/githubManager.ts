import type { NavData } from '@/types'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const REPO_OWNER = process.env.GITHUB_OWNER
const REPO_NAME = process.env.GITHUB_REPO
const FILE_PATH = 'data/navigation.json'

// 读取数据
export async function readData(): Promise<NavData> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
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

// 写入数据
export async function writeData(data: NavData): Promise<void> {
  try {
    // 首先获取当前文件信息以获取 SHA
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