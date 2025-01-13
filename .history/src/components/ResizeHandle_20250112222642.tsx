// 创建一个可拖动的分隔条组件
export default function ResizeHandle({ onResize }: { onResize: (width: number) => void }) {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    // 添加拖动时的类名
    e.currentTarget.classList.add('resizing')
    // 添加全局样式
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  const handleMouseMove = (e: MouseEvent) => {
    const newWidth = Math.max(160, Math.min(400, e.clientX))
    onResize(newWidth)
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    // 移除拖动时的类名和全局样式
    const handle = document.querySelector('.resize-handle')
    handle?.classList.remove('resizing')
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }

  return (
    <div
      className={`
        resize-handle
        w-[2px] hover:w-[3px]
        bg-gray-200 hover:bg-gray-300
        cursor-col-resize
        transition-all duration-150 ease-in-out
        group
        relative
        before:content-['']
        before:absolute
        before:top-0
        before:left-[-2px]
        before:right-[-2px]
        before:bottom-0
        before:cursor-col-resize
        [&.resizing]:w-[4px]
        [&.resizing]:bg-gray-400
      `}
      onMouseDown={handleMouseDown}
    />
  )
} 