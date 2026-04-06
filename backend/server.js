require('dotenv').config();

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error('❌ Missing required environment variables: MONGO_URI or JWT_SECRET');
  process.exit(1);
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

const authRoutes    = require('./routes/auth');
const contentRoutes = require('./routes/content');
const userRoutes    = require('./routes/user');

const app = express();

// ── Security & Middleware ─────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Global rate limiter – 100 requests / 15 min per IP
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests. Please try again later.' },
}));

// Auth rate limiter – 5 requests / 15 min per IP for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many authentication attempts. Please try again later.' },
  skipSuccessfulRequests: true,
});

// ── Routes ────────────────────────────────────────────────────
app.use('/api/auth',    authLimiter, authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/user',    userRoutes);

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// Serve React / static frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (_req, res) =>
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  );
}

// ── Global Error Handler ──────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  const isDev = process.env.NODE_ENV === 'development';
  res.status(err.status || 500).json({
    error: isDev ? err.message : 'An error occurred. Please try again.',
  });
});

// ── Database & Start ──────────────────────────────────────────
async function startServer() {
  try {
    let mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      console.log('✅  Using in-memory MongoDB instance');
    }

    await mongoose.connect(mongoUri);
    console.log('✅  MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀  Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌  MongoDB connection error:', err.message);
    process.exit(1);
  }
}

startServer();
