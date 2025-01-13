import React from 'react'

interface ResizeHandleProps {
  onResize: (width: number) => void
}

export default function ResizeHandle({ onResize }: ResizeHandleProps) {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.pageX
    const startWidth = document.querySelector('.admin-sidebar')?.clientWidth || 240

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + e.pageX - startX
      if (newWidth >= 200 && newWidth <= 400) {  // 限制最小和最大宽度
        onResize(newWidth)
      }
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div
      className="w-1 bg-gray-200 hover:bg-blue-400 cursor-col-resize transition-colors"
      onMouseDown={handleMouseDown}
    />
  )
} 