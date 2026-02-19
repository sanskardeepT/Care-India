<div align="center">

# 🏥 Care India – AI Health Intelligence Platform

AI-powered healthcare assistance web application built using React, TypeScript, and Generative AI.

</div>

---

## 🚀 Overview

Care India is a modern AI-based health assistance platform that provides:

- 🩺 AI Symptom Analysis (Dr.AI)
- 💊 Generic Medicine Alternatives Finder
- 🏥 Specialist Recommendation
- 📊 Health Dashboard Interface
- 🔐 Secure API-based AI Integration

The application is designed with modular architecture and production-ready deployment support.

---

## 🛠️ Tech Stack

### Frontend
- React (Functional Components + Hooks)
- TypeScript
- Vite
- Tailwind CSS
- Modern ES Modules

### AI Integration
- Generative AI Model: `gemini-3-flash-preview`
- Structured Prompt Engineering
- JSON Schema Enforcement (for medicine lookup)

### Tooling & Deployment
- Node.js
- npm
- Git
- Vercel (Production Deployment)

---

## 🧠 Core Features

### 1️⃣ Dr.AI – Symptom Checker

Provides:
- Brief health summary
- 3 possible causes
- 2 recommended steps
- Standard medical disclaimer

---

### 2️⃣ Generic Medicine Finder

Returns:
- Brand confirmation
- 2–3 generic alternatives
- Usage description
- Approximate price (INR)

Structured AI output using JSON schema validation.

---

### 3️⃣ Specialist Recommendation

Analyzes symptoms and suggests the most relevant medical specialist category.

---
React Frontend
↓
AI Service Layer (geminiService.ts)
↓
Generative AI Model API


Environment variables securely manage API access.

 📁 Project Structure



## 🏗️ Architecture

