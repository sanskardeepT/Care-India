import express from 'express';
import pool from '../db/connection.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/health/save - Save health record
router.post('/save', optionalAuth, async (req, res) => {
  try {
    const { record_type, input_data, ai_response, symptoms, possible_causes, recommended_steps, specialist_suggested } = req.body;
    
    if (!record_type || !input_data || !ai_response) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const user_id = req.user?.id || null;

    const [result] = await pool.execute(
      `INSERT INTO health_records (
        user_id, record_type, input_data, ai_response,
        symptoms, possible_causes, recommended_steps, specialist_suggested
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id, record_type, input_data, ai_response,
        symptoms, possible_causes, recommended_steps, specialist_suggested
      ]
    );

    res.status(201).json({ id: result.insertId, message: 'Health record saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save health record' });
  }
});

// GET /api/health/history - Get user health history (protected)
router.get('/history', optionalAuth, async (req, res) => {
  try {
    const user_id = req.user?.id;
    
    if (!user_id && !req.user?.isGuest) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const [records] = await pool.execute(
      'SELECT * FROM health_records WHERE user_id = ? OR (user_id IS NULL AND record_type != "health_profile") ORDER BY created_at DESC LIMIT 50',
      [user_id]
    );

    res.json({ records });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch health history' });
  }
});

export default router;

