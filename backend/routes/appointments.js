import express from 'express';
import pool from '../db/connection.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/appointments - Book appointment (auth optional)
router.post('/', optionalAuth, async (req, res) => {
  try {
    const {
      hospital_name, hospital_address, department, doctor_name,
      appointment_date, appointment_time, reason,
      user_name, user_email, user_phone
    } = req.body;

    if (!hospital_name || !department || !appointment_date || !appointment_time) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const user_id = req.user?.id || null;

    const [result] = await pool.execute(
      `INSERT INTO appointments (
        user_id, user_name, user_email, user_phone,
        hospital_name, hospital_address, department, doctor_name,
        appointment_date, appointment_time, reason
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id, user_name || req.user?.name, user_email || req.user?.email,
        user_phone || req.user?.phone, hospital_name, hospital_address,
        department, doctor_name, appointment_date, appointment_time, reason
      ]
    );

    const [appt] = await pool.execute(
      'SELECT * FROM appointments WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({ appointment: appt[0], message: 'Appointment booked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});

// GET /api/appointments/my - User's appointments (protected)
router.get('/my', optionalAuth, async (req, res) => {
  try {
    const user_id = req.user?.id;
    
    if (!user_id && !req.user?.isGuest) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const [appointments] = await pool.execute(
      'SELECT * FROM appointments WHERE user_id = ? OR (user_email = ? AND user_name = ?) ORDER BY created_at DESC',
      [user_id, req.user?.email || 'guest@care-india.com', req.user?.name || 'Sanskardeep']
    );

    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// GET /api/appointments/all - All appointments
router.get('/all', async (req, res) => {
  try {
    const [appointments] = await pool.execute(
      'SELECT * FROM appointments ORDER BY created_at DESC LIMIT 50'
    );
    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// PUT /api/appointments/:id/cancel
router.put('/:id/cancel', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user?.id;

    const [existing] = await pool.execute(
      'SELECT * FROM appointments WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    const appt = existing[0];
    if (user_id && appt.user_id !== user_id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await pool.execute(
      'UPDATE appointments SET status = "Cancelled" WHERE id = ?',
      [id]
    );

    res.json({ message: 'Appointment cancelled' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel appointment' });
  }
});

export default router;

