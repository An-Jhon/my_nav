# 项目介绍

一个超级轻量的纯静态导航网站，使用 Next.js、TypeScript 和 Tailwind CSS 构建。

## 特性

- 🚀 纯静态网站，无需后端服务
- 📱 响应式设计，支持移动端和桌面端
- ⚡ 轻量快速，性能优异
- 🛠 简单的管理界面
- 💾 JSON 文件数据存储
- 🌟 支持收藏夹功能
- 🎨 自动获取网站图标
- 📋 分类管理功能
- 🔍 网址管理功能
- 📊 可调节侧边栏宽度

## 技术栈

- Next.js 14.0.4
- TypeScript 5.3.3
- Tailwind CSS 3.4.0
- React 18.2.0
- Heroicons 2.2.0

# 使用
## 本地运行
- 克隆本项目并下载项目到本地
- 安装依赖
    ```bash
    npm install
    ```
- 运行项目
    ```bash
    npm run dev
    ```
- 访问 http://localhost:3000 即可看到项目

## 部署使用
- 克隆本项目到自己的仓库
- 在 vercel 中添加并部署本项目
- 访问 vercel 地址即可看到项目

## 数据管理
- 网站数据存储在 `/public/data/navigation.json` 文件中
- 可以通过管理界面 `/admin` 进行数据管理
- 支持添加、编辑、删除分类和网址
- 支持网址收藏功能，收藏数据保存在本地
