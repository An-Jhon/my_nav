'use client'
import React, { useState, useRef, useEffect } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

interface IconOption {
  name: string
  displayName: string
  icon: React.ElementType
}

interface IconSelectProps {
  value: string
  onChange: (value: string) => void
  options: IconOption[]
}

export default function IconSelect({ value, onChange, options }: IconSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const selectedOption = options.find(opt => opt.name === value) || options[0]
  const Icon = selectedOption.icon

  // 处理点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7E57C2]"
      >
        <div className="flex items-center">
          <Icon className="h-5 w-5 text-gray-600 mr-2" />
          <span className="text-gray-900">{selectedOption.displayName}</span>
        </div>
        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
          {options.map((option) => {
            const IconComponent = option.icon
            return (
              <button
                key={option.name}
                type="button"
                className={`w-full text-left px-3 py-2 text-sm flex items-center hover:bg-gray-100 ${
                  option.name === value ? 'bg-purple-50 text-purple-600' : 'text-gray-900'
                }`}
                onClick={() => {
                  onChange(option.name)
                  setIsOpen(false)
                }}
              >
                <IconComponent className="h-5 w-5 mr-2" />
                {option.displayName}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
} 