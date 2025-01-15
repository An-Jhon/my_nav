'use client'
import { useState, useRef, useEffect } from 'react'
import { FolderIcon, BookmarkIcon, AcademicCapIcon, BeakerIcon, CodeBracketIcon, CommandLineIcon, CpuChipIcon, WrenchIcon } from '@heroicons/react/24/outline'

interface IconOption {
  name: string
  displayName: string
  icon: React.ComponentType<any>
}

interface IconSelectProps {
  value: string
  onChange: (value: string) => void
  options: IconOption[]
}

export default function IconSelect({ value, onChange, options }: IconSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find(opt => opt.name === value) || options[0]
  const IconComponent = selectedOption.icon

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
      >
        <div className="flex items-center">
          <IconComponent className="h-5 w-5 text-gray-600" />
          <span className="ml-2">{selectedOption.displayName}</span>
        </div>
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="fixed z-50 bg-white border border-gray-300 rounded-md shadow-lg"
          style={{
            width: '320px',
            maxHeight: '320px',
            overflow: 'auto',
            left: dropdownRef.current ? 
              Math.min(
                dropdownRef.current.getBoundingClientRect().left,
                window.innerWidth - 320 - 20
              ) : 0,
            top: dropdownRef.current ? 
              Math.min(
                dropdownRef.current.getBoundingClientRect().bottom + window.scrollY + 4,
                window.innerHeight - 320 - 20
              ) : 0
          }}
        >
          <div className="grid grid-cols-8 gap-1 p-2">
            {options.map((option) => {
              const OptionIcon = option.icon
              return (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => {
                    onChange(option.name)
                    setIsOpen(false)
                  }}
                  title={option.displayName}
                  className={`flex items-center justify-center p-2 hover:bg-gray-50 rounded-md transition-colors
                    ${value === option.name ? 'bg-purple-50 text-purple-600' : 'text-gray-600'}
                  `}
                >
                  <OptionIcon className="h-5 w-5" />
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
} 