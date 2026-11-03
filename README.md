# 📚 BookNook

> **A modern, full-stack digital library platform for discovering, managing, and borrowing books.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)

---

## 🌐 Live Application

- **Client App:** [https://booknook-frontend-one.vercel.app/](https://booknook-frontend-one.vercel.app/)
- **Backend API:** `https://booknook-server-beta-five.vercel.app/` (Local Express Server)

---

## ✨ Features

- **📖 Interactive Book Catalog & Search:** Browse the complete library collection or quickly discover the latest additions using MongoDB's `addedDate` backend sorting for **New Arrivals**.
- **🔄 Seamless Borrowing Workflow:** Borrow books with real-time state validation, automatically disabling borrow triggers and displaying **"Already Borrowed"** status for active user checkouts.
- **✍️ Community Contributor Dashboard (`My Added Books`):** Logged-in users can view, manage, edit, and delete their own submitted books using interactive Shadcn dialogs.
- **📋 Personal Reading Tracker (`My Borrows`):** Clean tabular view displaying image covers, book details, borrow dates, and estimated return schedules for all currently borrowed titles.
- **🔒 Secure Authentication & Safety:** Custom auth session handling via Next.js App Router headers with robust client and server-side validation to ensure user route privacy.
- **🎨 Elegant Dark-Stone Aesthetic:** Crafted with Tailwind CSS and Shadcn UI, featuring ambient glow effects, responsive card grids, and fine-tuned UI components.

---

## 🛠️ Tech Stack

| Layer              | Technology                                                         |
| :----------------- | :----------------------------------------------------------------- |
| **Frontend**       | Next.js (App Router), React, Tailwind CSS, Shadcn UI, Lucide Icons |
| **Backend**        | Node.js, Express.js, CORS                                          |
| **Database**       | MongoDB                                                            |
| **Authentication** | Custom Next.js Auth API                                            |

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have **Node.js** (v18+) and **MongoDB** configured.

### 2. Installation & Setup

#### Frontend Setup
