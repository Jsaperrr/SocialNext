<div align="center">

# 🚀 SocialNext

**A lightweight, modern social media platform built with Next.js 14**

<p align="center">
  🌐 <b>English</b> | <a href="./README.zh-CN.md">中文</a>
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

## 🎯 Overview

SocialNext is a full-featured social media platform designed for **speed**, **simplicity**, and **scalability**. Built with the modern web stack, it offers everything you need to launch your own social network in minutes.

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

## 🛠️ Tech Stack

```
Next.js 14 (App Router)     →  React Framework
TypeScript                  →  Type Safety
Tailwind CSS + shadcn/ui    →  Styling
Prisma + PostgreSQL         →  Database
Clerk                       →  Authentication
UploadThing                 →  File Uploads
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Clerk account
- UploadThing account

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/socialnext.git
cd socialnext
npm install
```

### 2. Environment Setup

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

### 3. Database Setup

```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 📦 Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/socialnext)

The easiest way to deploy is via [Vercel](https://vercel.com). Don't forget to add your environment variables in the Vercel dashboard!

## 📝 License

MIT License - feel free to use this for your own projects!

---

<div align="center">

**Made with ❤️ using Next.js**

<p align="center">
  <a href="https://github.com/yourusername/socialnext/stargazers">⭐ Star this repo</a> •
  <a href="https://github.com/yourusername/socialnext/issues">🐛 Report Bug</a> •
  <a href="https://github.com/yourusername/socialnext/pulls">🔀 Contribute</a>
</p>

</div>
