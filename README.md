# 🚀 JajStack

**JajStack** is a modern fullstack starter template built with **Next.js**, **Tailwind CSS**, **Prisma**, and a **custom authentication system**, all written in **TypeScript**. It’s designed to help you launch landing pages, SaaS products, and internal tools with speed, style, and scalability.

---

## 🧩 Tech Stack

- ⚡️ **Next.js** – App router, server components, API routes
- 🎨 **Tailwind CSS** – Utility-first styling
- 🧱 **shadcn/ui** – Beautiful, accessible UI components
- 🛠️ **Prisma** – Type-safe database ORM
- 🔐 **Custom Auth** – Simple and flexible authentication logic
- 💙 **TypeScript** – Static typing across the stack

---

## 📦 Features

- 🔥 Beautiful, responsive landing page
- 🔐 Full authentication flow (sign up, sign in, protected routes)
- 🧱 Scalable project structure
- ⚙️ Pre-configured Prisma with database schema
- 🎯 Type-safe everything
- 🧪 Ready for testing and production

---

## 🛠️ Getting Started

### 1. Clone the repo

```sh
git clone https://github.com/jajproduction/jajstack.git
cd jajstack
```

### 2. Install dependencies

```sh
npm install
```

### 3. Set up environment variables

Create a `.env` file:

```sh
DATABASE_URL=postgresql://your-db-url
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Setup the database

```sh
npx prisma generate
npx prisma db push
```

### 5. Run the dev server

```sh
npm run dev
```

## 🧪 Custom Auth

This template includes a custom authentication system built from scratch — no external auth libraries. It supports:

- 🔐 Credential-based login/signup

- 🔐 Session handling via secure cookies

- 🔐 Protected API and server components

Easily customizable to fit your business logic or integrate third-party auth providers if needed.

## 📄 License

MIT License. Feel free to use and modify for your projects.

## 🤝 Credits

Built with ❤️ by [Jaj](https://jajdollesin.com)
