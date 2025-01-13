// 导航链接的类型定义
export interface NavLink {
  id: string;
  title: string;
  url: string;
  description?: string;
  icon?: string;
  category: string;
}

// 分类的类型定义
export interface Category {
  id: string;
  name: string;
  description?: string;
}

// 完整的导航数据类型
export interface NavData {
  categories: Category[];
  links: NavLink[];
} 