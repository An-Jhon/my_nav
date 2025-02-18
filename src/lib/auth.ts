// 新建文件用于处理认证相关逻辑
export function verifyAdminPassword(password: string): boolean {
  const correctPassword = process.env.ADMIN_PASSWORD
  
  // 添加调试日志
  console.log('Attempting password verification:')
  console.log('Input password:', password)
  console.log('Correct password:', correctPassword)
  console.log('Environment:', process.env.NODE_ENV)
  
  if (!correctPassword) {
    console.error('ADMIN_PASSWORD environment variable is not set!')
    return false
  }
  
  return password === correctPassword
} 