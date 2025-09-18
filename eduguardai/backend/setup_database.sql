-- EduGuard.ai Database Setup Script
-- Run this script after installing MySQL

-- Create database
CREATE DATABASE IF NOT EXISTS eduguardai;
USE eduguardai;

-- Create students table
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_rollno VARCHAR(255) NOT NULL,
    parent_mentor VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipent_id INT NOT NULL,
    student_id INT NOT NULL,
    priority_id INT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    channel VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id)
);

-- Insert sample students data
INSERT INTO students (name_rollno, parent_mentor) VALUES
('Mohan Kumar (CS2021001)', 'Dr. Rakesh Sharma'),
('Arjun Mehta (EE2021045)', 'Prof. Neha Sharma'),
('Aisha Khan (ME2021089)', 'Dr. Manish Brown'),
('Rohan Verma (CS2021156)', 'Prof. Neha Sharma'),
('Neha Sharma (BT2021234)', 'Dr. Rakesh Sharma'),
('Vikram Singh (CE2021078)', 'Dr. Manish Brown'),
('Karan Gupta (EC2021092)', 'Prof. Neha Sharma');

-- Show tables
SHOW TABLES;
SELECT 'Database setup completed successfully!' as Status;
