import DefaultIcon from '@/components/DefaultIcon'

export function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname
    // 使用 Google 的 favicon 服务
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
  } catch {
    // 返回一个空字符串，这样会触发 img 的 onError 事件
    return ''
  }
} 