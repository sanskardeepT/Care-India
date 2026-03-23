import jwt from 'jsonwebtoken';
import pool from '../db/connection.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ? AND deleted_at IS NULL', [decoded.id]);
    
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = rows[0];
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies.token;
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const [rows] = await pool.execute('SELECT * FROM users WHERE id = ? AND deleted_at IS NULL', [decoded.id]);
      
      if (rows.length > 0) {
        req.user = rows[0];
      }
    }
    
    // For guests, create/check session token
    if (!req.user) {
      const sessionToken = req.header('X-Session-Token');
      if (sessionToken) {
        const [rows] = await pool.execute('SELECT * FROM guest_sessions WHERE session_token = ?', [sessionToken]);
        if (rows.length > 0) {
          req.user = { id: null, name: 'Sanskardeep', email: 'guest@care-india.com', isGuest: true };
        }
      }
    }
    
    next();
  } catch (error) {
    next(); // Continue without user
  }
};

