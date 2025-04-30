# 🖼️ AI-Powered Background Removal App

An end-to-end full-stack web application that lets users **remove image backgrounds using AI**, powered by **Clipdrop API**. It features **Clerk authentication**, a **credit-based image processing model**, **Razorpay integration for payments**, and **real-time webhooks**. Built with the **MERN stack** and deployed via **Vercel**.

---

## 🚀 Features

- 🔐 User Authentication with **Clerk**
- 🧠 AI Background Removal using **Clipdrop API**
- 💳 Secure Payments via **Razorpay**
- 🎯 Credit-Based Access System
- 🔁 Webhook Integration with **Svix**
- 🖼️ Image Upload and Background Processing
- 📦 Clean, Scalable Project Structure
- 🌐 Deployed on **Vercel**

---

## ⚙️ Technologies Used

### Frontend:
- **React.js**
- **Tailwind CSS**
- **Axios**
- **Clerk Auth**
- **React Router DOM**
- **React Toastify** / **Hot Toast**
- **Razorpay Checkout.js**
- **Vercel** (Deployment)

### Backend:
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** (Token parsing for Clerk)
- **Razorpay SDK**
- **Clipdrop API** (Image Background Removal)
- **Multer** (Image Upload Handling)
- **Svix** (Webhook Processing)
- **Dotenv** (Environment Management)

---

## 🗂️ Project Structure

### Backend:
backend/ ├── Controllers/ │ ├── authController.js │ ├── userController.js │ └── imageController.js ├── Models/ │ ├── UserModel.js │ └── TransactionModel.js ├── Routes/ │ ├── authRoutes.js │ ├── userRoutes.js │ └── imageRoutes.js ├── Middleware/ │ └── authUser.js ├── Webhooks/ │ └── clerkWebhook.js ├── server.js └── .env



### Frontend:
frontend/ ├── components/ │ ├── UploadImage.jsx │ ├── PricingPlans.jsx │ └── Navbar.jsx ├── pages/ │ ├── Home.jsx │ ├── Dashboard.jsx │ └── PaymentSuccess.jsx ├── api/ │ └── SummaryAPI.js ├── utils/ │ └── AxiosToastError.js ├── App.jsx └── main.jsx



---

## 📦 Installation & Running Locally

### Prerequisites
- Node.js
- MongoDB Atlas account
- Clerk & Razorpay account
- Clipdrop API key


### Backend
-cd backend
-npm install
-npm run dev


### Frontend

-cd frontend
-npm install
-npm run dev
```bash

