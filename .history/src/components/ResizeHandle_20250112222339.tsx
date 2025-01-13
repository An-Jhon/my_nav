import { useState } from 'react'

export default function ResizeHandle({ onResize }: { onResize: (width: number) => void }) {
  const [isResizing, setIsResizing] = useState(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
    document.body.style.cursor = 'col-resize'
    // 添加选择禁用，防止拖动时选中文本
    document.body.style.userSelect = 'none'
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return
    
    requestAnimationFrame(() => {
      // 限制最小和最大宽度
      const newWidth = Math.max(160, Math.min(400, e.clientX))
      onResize(newWidth)
    })
  }

  const handleMouseUp = () => {
    setIsResizing(false)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
    
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  return (
    <div className="group relative flex items-center justify-center">
      {/* 拖动条 */}
      <div
        className={`
          w-1 h-full 
          transition-all duration-200 ease-in-out
          ${isResizing ? 'bg-blue-500 w-1' : 'bg-gray-200 group-hover:bg-blue-400'} 
        `}
      />
      
      {/* 拖动手柄 */}
      <div
        onMouseDown={handleMouseDown}
        className={`
          absolute top-1/2 -translate-y-1/2
          w-4 h-16 
          flex items-center justify-center
          cursor-col-resize
          transition-opacity duration-200
          ${isResizing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
        `}
      >
        <div className="w-0.5 h-4 bg-current mx-px rounded-full" />
        <div className="w-0.5 h-4 bg-current mx-px rounded-full" />
      </div>
    </div>
  )
} 