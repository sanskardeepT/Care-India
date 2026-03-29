import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import pool from '../db/connection.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

const sanitizeEmail = (email) => String(email || '').trim().toLowerCase();
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Name, email and password are required' });
    }

    const normalizedEmail = sanitizeEmail(email);

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({ success: false, error: 'Enter a valid email address' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [String(name).trim(), normalizedEmail, hashedPassword],
    );

    const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({
      success: true,
      message: 'Registered successfully',
      token,
      user: {
        id: result.insertId,
        name: String(name).trim(),
        email: normalizedEmail,
        isGuest: false,
      },
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, error: 'Email already exists' });
    }

    return res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    if (!isValidEmail(sanitizeEmail(email))) {
      return res.status(400).json({ success: false, error: 'Enter a valid email address' });
    }

    const [rows] = await pool.execute('SELECT id, name, email, password FROM users WHERE email = ?', [sanitizeEmail(email)]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const passwordMatches = await bcrypt.compare(String(password), user.password);

    if (!passwordMatches) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isGuest: false,
      },
    });
  } catch {
    return res.status(500).json({ success: false, error: 'Login failed' });
  }
});

const handleGuest = async (_req, res) => {
  try {
    const sessionToken = crypto.randomUUID();

    await pool.execute('INSERT INTO guest_sessions (session_token) VALUES (?)', [sessionToken]);

    return res.json({
      success: true,
      token: sessionToken,
      user: {
        id: null,
        name: 'Sanskardeep',
        email: 'guest@care-india.com',
        isGuest: true,
      },
    });
  } catch {
    return res.status(500).json({ success: false, error: 'Guest login failed' });
  }
};

router.get('/guest', handleGuest);
router.post('/guest', handleGuest);

router.get('/me', authMiddleware, async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      isGuest: req.user.isGuest,
    },
  });
});

router.get('/admin/users', async (_req, res) => {
  try {
    const [rows] = await pool.execute('SELECT id, name, email FROM users ORDER BY id DESC');

    res.json({
      success: true,
      count: rows.length,
      users: rows,
    });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
});

router.get('/admin/users/count', async (_req, res) => {
  try {
    const [rows] = await pool.execute('SELECT COUNT(*) AS totalUsers FROM users');

    res.json({
      success: true,
      count: rows[0]?.totalUsers || 0,
    });
  } catch {
    res.status(500).json({ success: false, error: 'Failed to fetch user count' });
  }
});

export default router;
