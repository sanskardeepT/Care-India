import jwt from 'jsonwebtoken';
import pool from '../db/connection.js';

const getToken = (req) => req.header('Authorization')?.replace('Bearer ', '').trim() || '';

const findGuestSession = async (token) => {
  if (!token) {
    return null;
  }

  const [rows] = await pool.execute('SELECT session_token FROM guest_sessions WHERE session_token = ?', [token]);
  return rows[0] || null;
};

const findUserById = async (id) => {
  const [rows] = await pool.execute('SELECT id, name, email FROM users WHERE id = ?', [id]);
  return rows[0] || null;
};

export const authMiddleware = async (req, res, next) => {
  try {
    const token = getToken(req);

    if (!token) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }

    const guestSession = await findGuestSession(token);
    if (guestSession) {
      req.user = {
        id: null,
        name: 'Sanskardeep',
        email: 'guest@care-india.com',
        isGuest: true,
        token,
      };
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }

    req.user = {
      ...user,
      isGuest: false,
      token,
    };
    next();
  } catch {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

export const optionalAuth = async (req, _res, next) => {
  try {
    const token = getToken(req);

    if (!token) {
      return next();
    }

    const guestSession = await findGuestSession(token);
    if (guestSession) {
      req.user = {
        id: null,
        name: 'Sanskardeep',
        email: 'guest@care-india.com',
        isGuest: true,
        token,
      };
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(decoded.id);

    if (user) {
      req.user = {
        ...user,
        isGuest: false,
        token,
      };
    }

    next();
  } catch {
    next();
  }
};
