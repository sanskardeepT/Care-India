# 🏥 Care India

Care India is a modern healthcare management platform built with React, TypeScript, Express, and MySQL that simplifies patient interaction, appointment booking, authentication, and digital health record management.

The platform is designed to provide a clean, secure, and scalable healthcare experience for patients, clinics, and healthcare startups.

It combines a fast frontend experience with a lightweight backend architecture to create a healthcare system that is simple to use, easy to deploy, and production-ready.

---

# ✨ What Care India Does

Care India helps users:

* Create secure accounts
* Access healthcare services as guests
* Book appointments online
* Store and manage digital health records
* Access patient information securely
* Interact with healthcare systems through a responsive web interface

The project focuses on simplicity, speed, accessibility, and modern web architecture.

---

# 🎯 Core Features

## 🔐 Secure Authentication System

The platform includes a complete authentication flow using:

* JWT-based authentication
* Password hashing with bcrypt
* Protected routes
* Persistent login sessions
* User verification APIs

This ensures patient information remains secure and accessible only to authorized users.

---

## 👤 Guest Access Support

Users can explore the platform without creating an account through guest session support.

Perfect for:

* First-time visitors
* Healthcare inquiries
* Quick appointment access
* Trial usage before signup

Guest sessions are securely managed through backend session handling.

---

## 📅 Appointment Booking System

Patients can:

* Book appointments online
* Store appointment history
* Manage healthcare schedules
* Access appointment details easily

The system is designed to support future scalability for hospitals, clinics, and telemedicine platforms.

---

## 🩺 Digital Health Records

Care India supports structured health record storage for maintaining patient medical information digitally.

Stored information may include:

* Appointment records
* Patient history
* Medical notes
* Treatment details
* Session tracking

This creates a centralized healthcare experience instead of scattered offline records.

---

# ⚡ Tech Stack

## Frontend

* React
* TypeScript
* Vite

## Backend

* Node.js
* Express

## Database

* MySQL
* mysql2

## Authentication

* JWT
* bcrypt

---

# 🏗️ Project Architecture

```bash id="c83t9v"
care-india/
│
├── frontend/
├── backend/
├── database/
├── api/
└── docs/
```

---

# 🚀 Local Development Setup

## Prerequisites

Before starting, install:

* Node.js
* MySQL Server
* npm

---

# 💻 Frontend Setup

## 1️⃣ Configure Environment Variables

Copy:

```bash id="9bdm0w"
.env.example
```

to:

```bash id="e3d7kj"
.env
```

Set:

```env id="r8s1ja"
VITE_API_BASE_URL=
VITE_GEMINI_API_KEY=
```

---

## 2️⃣ Install Dependencies

```bash id="e6b3wx"
npm install
```

---

## 3️⃣ Start Frontend

```bash id="ab20f9"
npm run dev
```

The frontend will run locally using Vite development server.

---

# 🛠️ Backend Setup

## 1️⃣ Configure Backend Environment

Copy:

```bash id="t9n8p1"
backend/.env.example
```

to:

```bash id="o1z7qk"
backend/.env
```

Configure:

```env id="xy34as"
JWT_SECRET=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
CLIENT_URL=
```

---

## 2️⃣ Install Backend Dependencies

```bash id="p4m6zn"
cd backend
npm install
```

---

## 3️⃣ Start Backend Server

```bash id="k5q1bc"
npm run dev
```

---

# 🔐 Authentication API

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| POST   | `/api/register` | Register new user          |
| POST   | `/api/login`    | User login                 |
| GET    | `/api/guest`    | Guest access session       |
| GET    | `/api/auth/me`  | Current authenticated user |

---

# 🗄️ Database System

The backend automatically creates required tables during initialization.

Generated tables:

* users
* appointments
* health_records
* guest_sessions

---

# 👤 Users Table Schema

```sql id="u3o4pw"
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);
```

---

# ☁️ Deployment Guide

## Frontend Deployment (Vercel)

Set these environment variables in Vercel:

```env id="hm6s2d"
VITE_API_BASE_URL=https://your-backend-domain/api
VITE_GEMINI_API_KEY=your_gemini_api_key
```

⚠️ Important:

Do not leave:

```env id="d4w2jc"
VITE_API_BASE_URL=http://localhost
```

in production deployments.

---

# 🚀 Backend Deployment

Deploy the backend to platforms like:

* Render
* Railway
* VPS
* DigitalOcean
* AWS

Required backend environment variables:

```env id="u9x2oe"
PORT=5000
CLIENT_URL=https://your-vercel-app.vercel.app
JWT_SECRET=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

---

# 🌐 Multiple CORS Origins Support

Care India supports multiple frontend origins for local and production environments.

Example:

```env id="g2x7pk"
CLIENT_URL=http://localhost:5173,https://your-vercel-app.vercel.app
```

---

# ✅ Verification & Production Checks

## Frontend Production Build

```bash id="p1v9sh"
npm run build
```

---

## Backend Syntax Check

```bash id="n5t2lw"
cd backend
npm run check
```

---

# 📈 Why Care India Matters

Many healthcare systems still rely on:

* Manual paperwork
* Offline appointment handling
* Fragmented patient records
* Poor digital accessibility

Care India aims to modernize healthcare workflows using lightweight and scalable web technologies.

The platform is intentionally designed to be:

✅ Fast
✅ Secure
✅ Beginner-friendly
✅ Scalable
✅ Mobile-ready
✅ Easy to deploy
✅ Healthcare-focused

---

# 🧠 Future Roadmap

Planned improvements include:

* AI symptom checker
* Video consultation support
* Doctor dashboard
* E-prescriptions
* Medical report uploads
* Notification system
* Health analytics
* AI-powered patient assistant
* Multi-hospital support
* Emergency contact system

---

# 📌 Vision

The vision behind Care India is to build a simple, accessible, and scalable healthcare platform that helps people interact with healthcare services digitally without unnecessary complexity.

The long-term goal is to create an ecosystem where healthcare becomes:

* More connected
* More accessible
* More efficient
* More patient-friendly

---

# 📄 License

This project is built for educational, healthcare innovation, and production-ready development purposes.

---

# ⭐ Support

If you found this project useful:

* Star the repository
* Fork the project
* Suggest improvements
* Open pull requests
* Share feedback

Technology can simplify healthcare when built with purpose ❤️
