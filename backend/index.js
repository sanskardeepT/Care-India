import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db/connection.js';
import authRoutes from './routes/auth.js';
import appointmentRoutes from './routes/appointments.js';
import healthRoutes from './routes/health.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/health', healthRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Auto-create tables on startup
async function createTables() {
  const tables = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(15),
      date_of_birth DATE,
      gender ENUM('Male', 'Female', 'Other'),
      blood_group VARCHAR(5),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      user_name VARCHAR(100),
      user_email VARCHAR(100),
      user_phone VARCHAR(15),
      hospital_name VARCHAR(200) NOT NULL,
      hospital_address TEXT,
      department VARCHAR(100) NOT NULL,
      doctor_name VARCHAR(100),
      appointment_date DATE NOT NULL,
      appointment_time VARCHAR(20) NOT NULL,
      reason TEXT,
      status ENUM('Pending', 'Confirmed', 'Cancelled') DEFAULT 'Pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS health_records (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      record_type ENUM('symptom_check', 'medicine_lookup', 'specialist_recommendation', 'health_profile') NOT NULL,
      input_data TEXT NOT NULL,
      ai_response TEXT NOT NULL,
      symptoms TEXT,
      possible_causes TEXT,
      recommended_steps TEXT,
      specialist_suggested VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS guest_sessions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      session_token VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.execute(tables);
    console.log('✅ All tables created/verified');
  } catch (error) {
    console.error('❌ Database setup error:', error);
  }
}

createTables().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

export default app;

