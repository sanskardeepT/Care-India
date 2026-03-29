import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'care_india',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const initializeDatabase = async () => {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(255)
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NULL,
      user_name VARCHAR(100),
      user_email VARCHAR(100),
      user_phone VARCHAR(20),
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
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS health_records (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NULL,
      record_type ENUM('symptom_check', 'medicine_lookup', 'specialist_recommendation', 'health_profile') NOT NULL,
      input_data TEXT NOT NULL,
      ai_response TEXT NOT NULL,
      symptoms TEXT,
      possible_causes TEXT,
      recommended_steps TEXT,
      specialist_suggested VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS guest_sessions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      session_token VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

export default pool;
