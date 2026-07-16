# 🚀 Reddit Clone

![Next.js](https://img.shields.io/badge/Frontend-Next.js-black)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748)
![Neon](https://img.shields.io/badge/Database-Neon%20PostgreSQL-00E599)
![UploadThing](https://img.shields.io/badge/ImageUpload-UploadThing-purple)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)
![Clerk](https://img.shields.io/badge/Auth-Clerk-purple)

---

# 🌐 Live Demo

**Live Website:**  
https://reddit-clone-nu-virid.vercel.app/

---

# 📌 Introduction

Reddit Clone is a modern full-stack social community platform inspired by Reddit.

Users can create communities, publish posts, upload images, comment, vote on content, and interact with other users.

The project demonstrates a modern full-stack architecture built with the **Next.js App Router**, Prisma ORM, **Neon PostgreSQL**, Clerk Authentication, and UploadThing.

---

# ✨ Features

- 🔐 Authentication with Clerk
- 👥 Create Communities
- 📝 Create Posts
- 🖼️ Image Uploads
- 💬 Comment System
- 👍 Upvote / 👎 Downvote
- 🔎 Search Functionality
- 👤 User Profiles
- ✏️ Edit & Delete Posts
- 📱 Responsive UI
- 🚀 Production Deployment on Vercel

---

# 🧠 Use Cases

- Community discussion platforms
- Social media applications
- Developer learning projects
- Full-stack SaaS architecture practice

---

# 🏗 Tech Stack

**Frontend**
- Next.js
- TypeScript
- Tailwind CSS

**Backend**
- Next.js API Routes

**Database**
- Neon PostgreSQL

**ORM**
- Prisma

**Authentication**
- Clerk

**Image Uploads**
- UploadThing

**Deployment**
- Vercel

---

# 📸 Screenshots

## 🏠 Home Feed

<p align="center">
  <img src="https://github.com/dennish-8055/reddit-clone/raw/main/Screenshots/Home%20Feed.png" width="900"/>
</p>

## 👥 Communities

<p align="center">
  <img src="https://github.com/dennish-8055/reddit-clone/raw/main/Screenshots/Communities.png" width="900"/>
</p>

## 📝 Create Post

<p align="center">
  <img src="https://github.com/dennish-8055/reddit-clone/raw/main/Screenshots/Create%20Post.png" width="900"/>
</p>

## 💬 Comments Section

<p align="center">
  <img src="https://github.com/dennish-8055/reddit-clone/raw/main/Screenshots/Comments.png" width="900"/>
</p>

## 👤 User Profile

<p align="center">
  <img src="https://github.com/dennish-8055/reddit-clone/raw/main/Screenshots/User%20Profile.png" width="900"/>
</p>

---

# 🔄 Application Flow

### Authentication Flow

User → Clerk Authentication → Session → Protected Routes

### Post Flow

User → Create Post → Prisma → Neon PostgreSQL → Feed Update

### Voting Flow

User → Vote → API Route → Database → Updated Score

---

# 🎯 Industry Value

- Demonstrates modern full-stack development
- Real-world Reddit-style architecture
- Covers authentication, database, image uploads, APIs, and deployment
- Suitable for social media and SaaS applications

---

# 👤 User Roles

### User

- Create communities
- Create posts
- Upload images
- Add comments
- Vote on posts
- Manage own content

### System

- Authentication
- Database management
- Content storage
- Image handling

---

# ⚙️ Prerequisites

Before running the project, make sure you have:

- Node.js 18+
- npm
- Neon PostgreSQL database
- Clerk account
- UploadThing account

---

# ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/dennish-8055/reddit-clone.git
```

Move into the project directory:

```bash
cd reddit-clone
```

Install dependencies:

```bash
npm install
```

Generate Prisma Client:

```bash
npx prisma generate
```

Create the database tables:

```bash
npx prisma db push
```

Run the development server:

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=

UPLOADTHING_TOKEN=
```

> Replace the placeholder values with your own Neon, Clerk, and UploadThing credentials before running the project.

---

# 🚀 Deployment

The application is deployed using **Vercel**.

---

# 📌 Conclusion

This Reddit Clone demonstrates a production-ready full-stack application featuring authentication, community management, image uploads, database integration, and deployment using modern web technologies.

---

# 👨‍💻 Author

**Dennish Yadav**

GitHub: https://github.com/dennish-8055

---

# 📄 License

This project is licensed under the MIT License.