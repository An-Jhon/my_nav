export interface NavLink {
  id: string
  title: string
  url: string
  description: string
  category: string
  clicks?: number
  recommended?: boolean
}

export interface Category {
  id: string
  name: string
  icon?: string
  description?: string
}

export interface NavData {
  categories: Category[]
  links: NavLink[]
} 