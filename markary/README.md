# 🎬 Markary — Streaming Platform

A full-stack Netflix-style streaming web app built with **React** (frontend) and **Node.js / Express / MongoDB** (backend).

---

## 📁 Project Structure

```
markary/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── contentController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Content.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── content.js
│   │   └── user.js
│   ├── .env.example
│   ├── package.json
│   ├── seed.js
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContentCard.js + .module.css
│   │   │   ├── ContentRow.js  + .module.css
│   │   │   ├── Hero.js        + .module.css
│   │   │   └── Navbar.js      + .module.css
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Auth.module.css
│   │   │   ├── Browse.js      + .module.css
│   │   │   ├── Home.js        + .module.css
│   │   │   ├── Login.js
│   │   │   ├── MyList.js      + .module.css
│   │   │   ├── Register.js
│   │   │   └── Watch.js       + .module.css
│   │   ├── api.js
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   └── package.json
│
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account (for the database)

---

## 🚀 Getting Started

### 1. Clone or unzip the project

```bash
cd markary
```

### 2. Install all dependencies

```bash
npm run install:all
```

This installs packages for both backend and frontend.

### 3. Set up environment variables

```bash
cp backend/.env.example backend/.env
```

Open `backend/.env` and fill in:

```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/markary
JWT_SECRET=some_very_long_random_secret_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

**How to get your MongoDB URI:**
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a free cluster (M0)
3. Click **Connect → Drivers** and copy the connection string
4. Replace `<username>` and `<password>` with your Atlas credentials

### 4. Seed the database

```bash
npm run seed
```

This populates your database with 12 sample shows/movies and creates a demo user:
- **Email:** demo@markary.com
- **Password:** demo1234

### 5. Run the development servers

Open **two terminal windows**:

**Terminal 1 – Backend:**
```bash
npm run dev:backend
```
Runs on: http://localhost:5000

**Terminal 2 – Frontend:**
```bash
npm run dev:frontend
```
Runs on: http://localhost:3000

Open your browser at **http://localhost:3000** and sign in with the demo credentials.

---

## 🌐 Deploying Online

### Option A — Render (free, recommended for beginners)

**Backend:**
1. Push code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your repo, set root to `backend/`
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add environment variables from your `.env`

**Frontend:**
1. Go to [render.com](https://render.com) → New → Static Site
2. Connect your repo, set root to `frontend/`
3. Build command: `npm install && npm run build`
4. Publish directory: `build`
5. Add environment variable: `REACT_APP_API_URL=https://your-backend.onrender.com/api`

### Option B — Vercel (frontend) + Railway (backend)

**Frontend on Vercel:**
```bash
cd frontend
npx vercel --prod
```
Set env var: `REACT_APP_API_URL=https://your-backend-url/api`

**Backend on Railway:**
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Set root to `backend/`, add env vars
4. Railway auto-detects Node.js

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET  | `/api/auth/me` | Get current user (protected) |

### Content
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/content/featured` | Get hero/featured content |
| GET | `/api/content/trending` | Get trending content |
| GET | `/api/content/all` | Get all content (supports `?genre=&type=&page=`) |
| GET | `/api/content/search?q=` | Full-text search |
| GET | `/api/content/:id` | Get single content item |

### User (all protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/user/mylist` | Get user's saved list |
| POST   | `/api/user/mylist/:id` | Add to list |
| DELETE | `/api/user/mylist/:id` | Remove from list |
| GET    | `/api/user/history` | Get watch history |
| PATCH  | `/api/user/history/:id` | Update watch progress |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios, CSS Modules |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Auth | JWT (JSON Web Tokens) + bcryptjs |
| Security | Helmet, CORS, express-rate-limit |

---

## 📝 Notes

- Video playback requires you to add a `videoUrl` field to content items pointing to an MP4/HLS stream URL (e.g. from AWS S3 or Cloudflare Stream).
- Poster and backdrop images can be added by setting `poster` and `backdrop` fields to image URLs.
- The frontend shows mock data automatically if the backend is unreachable, so the UI always looks complete.
