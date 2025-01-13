// 创建一个可拖动的分隔条组件
export default function ResizeHandle({ onResize }: { onResize: (width: number) => void }) {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    // 限制最小和最大宽度
    const newWidth = Math.max(160, Math.min(400, e.clientX))
    onResize(newWidth)
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  return (
    <div
      className="w-1 hover:w-1.5 bg-gray-200 hover:bg-blue-400 cursor-col-resize transition-all duration-200 active:bg-blue-500"
      onMouseDown={handleMouseDown}
    />
  )
} 