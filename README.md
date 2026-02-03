<div align="center">

# 🚀 SocialNext

**A lightweight, modern social media platform built with Next.js 14**

<p align="center">
  <a href="#-english">English</a> | <a href="#-中文">中文</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss" alt="Tailwind">
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma" alt="Prisma">
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql" alt="PostgreSQL">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Clerk-Auth-6C47FF?logo=clerk" alt="Clerk">
  <img src="https://img.shields.io/badge/UploadThing-Storage-EF4444" alt="UploadThing">
  <img src="https://img.shields.io/badge/Radix_UI-Components-111" alt="Radix UI">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel" alt="Deploy">
</p>

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Laptop.png" width="100">

</div>

---

## 🇺🇸 English

> 🎯 **SocialNext** is a full-featured social media platform designed for speed, simplicity, and scalability. Built with the modern web stack, it offers everything you need to launch your own social network in minutes.

### ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Secure user auth powered by [Clerk](https://clerk.dev) |
| 📝 **Posts** | Create, edit, and delete posts with rich content |
| 💬 **Comments** | Engage in threaded discussions |
| ❤️ **Likes** | Like and unlike posts in real-time |
| 👥 **Follow System** | Follow/unfollow users, build your network |
| 🔔 **Notifications** | Get notified for likes, comments, and follows |
| 🖼️ **Media Upload** | Image uploads via [UploadThing](https://uploadthing.com) |
| 👤 **Profiles** | Customizable user profiles with bios, locations, and more |
| 🎨 **Dark Mode** | Built-in dark/light theme support |
| 📱 **Responsive** | Mobile-first, works on all devices |

### 🛠️ Tech Stack

```
Next.js 14 (App Router)     →  React Framework
TypeScript                  →  Type Safety
Tailwind CSS + shadcn/ui    →  Styling
Prisma + PostgreSQL         →  Database
Clerk                       →  Authentication
UploadThing                 →  File Uploads
```

### 🚀 Quick Start

#### Prerequisites

- Node.js 18+
- PostgreSQL database
- Clerk account
- UploadThing account

#### 1. Clone & Install

```bash
git clone https://github.com/yourusername/socialnext.git
cd socialnext
npm install
```

#### 2. Environment Setup

Create a `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/socialnext"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# UploadThing
UPLOADTHING_TOKEN=...
```

#### 3. Database Setup

```bash
npx prisma generate
npx prisma db push
```

#### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

### 📦 Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/socialnext)

The easiest way to deploy is via [Vercel](https://vercel.com). Don't forget to add your environment variables in the Vercel dashboard!

### 📝 License

MIT License - feel free to use this for your own projects!

---

## 🇨🇳 中文

> 🎯 **SocialNext** 是一个功能完整的社交媒体平台，追求速度、简洁和可扩展性。基于现代 Web 技术栈构建，让你在几分钟内就能启动自己的社交网络。

### ✨ 功能特性

| 功能 | 描述 |
|------|------|
| 🔐 **身份认证** | 基于 [Clerk](https://clerk.dev) 的安全用户认证 |
| 📝 **发布帖子** | 创建、编辑和删除富内容帖子 |
| 💬 **评论系统** | 参与话题讨论 |
| ❤️ **点赞** | 实时点赞/取消点赞 |
| 👥 **关注系统** | 关注/取消关注用户，建立社交网络 |
| 🔔 **消息通知** | 点赞、评论、关注的实时通知 |
| 🖼️ **媒体上传** | 通过 [UploadThing](https://uploadthing.com) 上传图片 |
| 👤 **个人主页** | 可自定义的个人资料，包括简介、位置等 |
| 🎨 **暗黑模式** | 内置暗黑/亮色主题切换 |
| 📱 **响应式设计** | 移动优先，适配所有设备 |

### 🛠️ 技术栈

```
Next.js 14 (App Router)     →  React 框架
TypeScript                  →  类型安全
Tailwind CSS + shadcn/ui    →  样式设计
Prisma + PostgreSQL         →  数据库
Clerk                       →  身份认证
UploadThing                 →  文件上传
```

### 🚀 快速开始

#### 前置条件

- Node.js 18+
- PostgreSQL 数据库
- Clerk 账号
- UploadThing 账号

#### 1. 克隆并安装

```bash
git clone https://github.com/yourusername/socialnext.git
cd socialnext
npm install
```

#### 2. 环境配置

创建 `.env.local` 文件：

```env
# 数据库
DATABASE_URL="postgresql://user:password@localhost:5432/socialnext"

# Clerk 认证
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# UploadThing
UPLOADTHING_TOKEN=...
```

#### 3. 数据库初始化

```bash
npx prisma generate
npx prisma db push
```

#### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 🎉

### 📦 部署

[![使用 Vercel 部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/socialnext)

最简单的部署方式是通过 [Vercel](https://vercel.com)。别忘了在 Vercel 控制台中添加环境变量！

### 📝 开源协议

MIT 许可证 - 可自由用于个人或商业项目！

---

<div align="center">

**Made with ❤️ using Next.js**

<p align="center">
  <a href="https://github.com/yourusername/socialnext/stargazers">⭐ Star this repo</a> •
  <a href="https://github.com/yourusername/socialnext/issues">🐛 Report Bug</a> •
  <a href="https://github.com/yourusername/socialnext/pulls">🔀 Contribute</a>
</p>

</div>
