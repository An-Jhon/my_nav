export function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname
    // 使用 Google 的 favicon 服务
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
  } catch {
    // 如果 URL 解析失败，返回一个默认图标
    return '/default-favicon.png'
  }
} 