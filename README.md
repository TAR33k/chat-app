<div align="center">

  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square w-5 h-5 text-primary" aria-hidden="true">
    <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>
  </svg>

  <h1>
    <font style="font-weight: bold;">ChatApp</font>
    <br>
    <font size="5">Real-time Messaging Platform</font>
  </h1>

  Full-stack real-time chat application.

  <p>
    <img alt="Frontend" src="https://img.shields.io/badge/Frontend-React%20%7C%20Vite-blue.svg?style=for-the-badge&logo=react"/>
    <img alt="Styling" src="https://img.shields.io/badge/UI-TailwindCSS%20%7C%20daisyUI-38B2AC.svg?style=for-the-badge&logo=tailwindcss"/>
    <img alt="Backend" src="https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933.svg?style=for-the-badge&logo=nodedotjs"/>
    <img alt="Database" src="https://img.shields.io/badge/Database-MongoDB-47A248.svg?style=for-the-badge&logo=mongodb"/>
    <img alt="Realtime" src="https://img.shields.io/badge/Realtime-Socket.io-black.svg?style=for-the-badge&logo=socketdotio"/>
    <img alt="Cache" src="https://img.shields.io/badge/Cache-Redis-DC382D.svg?style=for-the-badge&logo=redis"/>
  </p>

</div>

---

## About ChatApp

**ChatApp** is a full-stack real-time messaging application. It focuses on:

- **Clean authentication** with email/password and Google Login (Google Identity Services).
- **Real-time messaging** with Socket.io, including typing indicators and online presence.
- **Reliable state management** in the frontend via Zustand and in the backend via MongoDB and Redis.
- **A polished UI** using React, TailwindCSS, and daisyUI.
- **Theme support** allows users to switch between 30+ daisyUI themes.

### Core Capabilities

- **User Authentication**
  - Email & password signup / login.
  - Secure JWT-based auth stored in httpOnly cookies.
  - Google Login ("Sign in with Google") using ID tokens.
  - Profile management.

- **Real-time Chat**
  - One-to-one messaging between registered users.
  - Live message delivery via Socket.io.
  - Typing indicators.
  - Online presence tracking using Redis.
  - Unread message badges.

- **Media Support**
  - Image uploads in chat messages.
  - Profile avatar upload.

> **Note:** Images uploaded to Cloudinary

---

## Tech Stack Overview

### Frontend

- **Framework:** React 19 with Vite
- **Styling:** TailwindCSS v3 + daisyUI
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Realtime:** Socket.io client
- **Auth:**
  - Cookie-based JWT sessions
  - Google Identity Services

### Backend

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:**
  - JWT
  - Bcrypt for password hashing
- **Realtime Layer:**
  - Socket.io server
  - Redis-backed online user tracking
- **File/Media Storage:** Cloudinary for image uploads

---

## Configuration & Environment

### Backend `.env`

The backend expects a `.env` file (example in `backend/.env.example`) with values such as:

```env
PORT=5001
NODE_ENV=development
REDIS_URL=redis://localhost:6379
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
GOOGLE_CLIENT_ID=<your-google-oauth-client-id>
```

### Frontend `.env`

The frontend uses Vite environment variables (example in `frontend/.env.example`):

```env
VITE_GOOGLE_CLIENT_ID=<your-google-oauth-client-id>
```

> Make sure the Google Client ID matches between frontend and backend.

---

## Running the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/TAR33k/chat-app.git
cd chat-app
```

### 2. Start Redis (recommended via Docker)

```bash
docker run -p 6379:6379 -d redis:8.0-rc1
```

Or use any other Redis deployment and adjust `REDIS_URL` accordingly.

### 3. Configure Environment Variables

- Create `backend/.env` from `backend/.env.example` and fill in all required values (MongoDB, JWT_SECRET, Cloudinary, Google Client ID, etc.).
- Create `frontend/.env` from `frontend/.env.example` and set `VITE_GOOGLE_CLIENT_ID`.

### 4. Install Dependencies

From the project root:

```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 5. Run in Development Mode

In two terminals:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Then open the frontend in your browser:

- **http://localhost:5173/**

---

## Production Build

Update `backend/.env` NODE_ENV:
```bash
NODE_ENV=production
```

From the project root:

```bash
npm run build
npm start
```