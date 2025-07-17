# 🐾 Petsera - Pet Adoption Platform

A full-featured pet adoption platform built with the MERN stack that connects loving individuals with pets in need of homes. Users can adopt pets, create donation campaigns, donate with Stripe, and manage everything from a user or admin dashboard. The goal is to use technology for a meaningful cause—helping animals find forever homes.

---

## 🔗 Live Website
**🌐** [Petsera Live Site](https://petsera.netlify.app/)

## 📂 Repositories
- **Client Side:** [GitHub - Petsera Client](https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-azijulhakimbd)
- **Server Side:** [GitHub - Petsera Server](https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-azijulhakimbd)

---

## 💡 Purpose

Petsera is designed to simplify the pet adoption and donation process. It allows users to:
- View and adopt pets from various categories
- Launch and donate to campaigns for pets in need
- Manage their added pets and donations
- Admins can manage users, pets, and donation campaigns

---

## 🚀 Key Features

### 🔐 Authentication
- Firebase Authentication (Email/Password, Google, GitHub)
- JWT-based route protection with secure token storage
- Banned users cannot log in

### 🏠 Home Page
- Banner, Categories, Call to Action, About Us
- Pet Categories like Dog, Cat, Rabbit, Fish, etc.
- Additional sections for Testimonials and Adoption Process

### 🐶 Pet Listings
- Infinite scrolling with filtering and searching
- Pet details page with “Adopt” modal and request system

### 💸 Donations
- Create campaigns with deadline and max amount
- Donate securely via Stripe
- View and track donation progress
- View recommended donation campaigns

### 👤 User Dashboard
- Add pets using imgbb API with react-hook-form
- Manage user’s pets (Update, Delete, Mark as Adopted)
- Manage personal donations (refund, track)
- Create/edit donation campaigns with Markdown editor

### 🛠️ Admin Dashboard
- Promote user to admin
- Ban users from accessing the system
- Manage all pets and donations added by users

---

## 🧱 Tech Stack

### Frontend
- **React** + **Vite**
- **React Router DOM**
- **Tailwind CSS** + **shadcn/ui**
- **TanStack Query**
- **React Hook Form**
- **React Loading Skeleton**
- **Framer Motion**
- **Stripe React Elements**
- **React-Quill** (for WYSIWYG editor)
- **Firebase Auth**
- **Axios**

### Backend
- **Node.js** + **Express.js**
- **MongoDB Atlas**
- **Firebase Admin SDK**
- **JWT Authentication**
- **Stripe Payment API**
- **CORS**, **dotenv**, **cookie-parser**

---

## 🛡️ Security

- Firebase config & MongoDB credentials secured via `.env`
- JWT tokens stored in HTTP-only cookies
- Protected admin/user-only routes
- Role-based access control

---

## 🎯 Challenges Implemented

- ✅ Infinite scrolling (pets and donations)
- ✅ Markdown editor (React-Quill)
- ✅ Skeleton loader (react-loading-skeleton)
- ✅ Formik/React Hook Form for form handling
- ✅ Admin vs User Dashboard access
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Dark/Light Mode toggle

---



