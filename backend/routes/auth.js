import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import pool from '../db/connection.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, date_of_birth, gender, blood_group } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, phone, date_of_birth, gender, blood_group) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, phone, date_of_birth, gender, blood_group]
    );

    const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    const [userRows] = await pool.execute('SELECT id, name, email, phone, date_of_birth, gender, blood_group, created_at FROM users WHERE id = ?', [result.insertId]);
    
    res.json({
      token,
      user: userRows[0]
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ? AND deleted_at IS NULL', [email]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// POST /api/auth/guest
router.post('/guest', async (req, res) => {
  try {
    const sessionToken = crypto.randomUUID();
    
    await pool.execute(
      'INSERT INTO guest_sessions (session_token) VALUES (?)',
      [sessionToken]
    );
    
    res.json({
      token: sessionToken,
      user: {
        id: null,
        name: 'Sanskardeep',
        email: 'guest@care-india.com',
        isGuest: true
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Guest login failed' });
  }
});

// GET /api/auth/me (protected)
router.get('/me', authMiddleware, async (req, res) => {
  const { password, ...userWithoutPassword } = req.user;
  res.json({ user: userWithoutPassword });
});

export default router;

