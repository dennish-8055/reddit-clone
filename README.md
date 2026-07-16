# 🚀 Reddit Clone

![Next.js](https://img.shields.io/badge/Frontend-Next.js-black)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)
![UploadThing](https://img.shields.io/badge/ImageUpload-UploadThing-purple)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)
![Clerk](https://img.shields.io/badge/Auth-Clerk-purple)

---

## 🌐 Live Demo

- **Live Website:** https://reddit-clone-rho-liard.vercel.app

---

## 📌 Introduction

Reddit Clone is a modern full-stack social community platform inspired by Reddit.  
Users can create communities, publish posts, upload images, comment, and vote on content.

The project demonstrates scalable full-stack architecture using Next.js App Router, Prisma ORM, PostgreSQL, Clerk Authentication, and UploadThing.

---

## ✨ Features

- 🔐 Authentication with Clerk
- 👥 Create Communities
- 📝 Create Posts
- 🖼️ Image Uploads
- 💬 Comment System
- 👍 Upvote / 👎 Downvote
- 🔎 Search Functionality
- 👤 User Profiles
- ✏️ Edit & Delete Posts
- 🚀 Production Deployment on Vercel

---

## 🧠 Use Cases

- Community discussion platforms  
- Social media applications  
- Developer learning projects  
- Full-stack SaaS architecture practice  

---

## 🏗 Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS  
- **Backend:** Next.js API Routes  
- **Database:** PostgreSQL  
- **ORM:** Prisma  
- **Authentication:** Clerk  
- **Image Uploads:** UploadThing  
- **Deployment:** Vercel  

---

## 📸 Screenshots

### 🏠 Home Feed
<p align="center">
  <img src="https://github.com/dennish-8055/reddit-clone/raw/main/Screenshots/Home%20Feed.png" width="900"/>
</p>

### 👥 Communities
<p align="center">
  <img src="https://github.com/dennish-8055/reddit-clone/raw/main/Screenshots/Communities.png" width="900"/>
</p>

### 📝 Create Post
<p align="center">
  <img src="https://github.com/dennish-8055/reddit-clone/raw/main/Screenshots/Create%20Post.png" width="900"/>
</p>

### 💬 Comments Section
<p align="center">
  <img src="https://github.com/dennish-8055/reddit-clone/raw/main/Screenshots/Comments.png" width="900"/>
</p>

### 👤 User Profile
<p align="center">
  <img src="https://github.com/dennish-8055/reddit-clone/raw/main/Screenshots/User%20Profile.png" width="900"/>
</p>

---

## 🔄 Flow

**Authentication Flow**  
User → Clerk Authentication → Session → Protected Routes  

**Post Flow**  
User → Create Post → Prisma → PostgreSQL → Feed Update  

**Voting Flow**  
User → Vote → API Route → Database → Updated Score  

---

## 🎯 Industry Value

- Demonstrates modern full-stack development  
- Real-world Reddit-style architecture  
- Covers authentication, database, uploads, APIs, deployment  
- Useful for social media & SaaS applications  

---

## 👤 Roles

- **User:** Create communities, posts, comments, votes  
- **System:** Authentication, database management, content handling  

---

## ⚙️ Installation

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
Generate Prisma client:

```bash
npx prisma generate
```

Run development server:

```bash
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file:

```env
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=

UPLOADTHING_TOKEN=
```

---

## 🚀 Deployment

This project is deployed using **Vercel**.

---

## 📌 Conclusion

This Reddit Clone demonstrates a complete production-ready full-stack application with authentication, database management, image uploads, and deployment workflows.

---

## 👨‍💻 Author

**Dennish Yadav**  
GitHub: https://github.com/dennish-8055

## 📄 License
This project is licensed under the MIT License.