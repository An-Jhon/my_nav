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
      if (newWidth >= 280 && newWidth <= 400) {  // 增加最小宽度到 280px
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