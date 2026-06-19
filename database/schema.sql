-- ============================================
-- Workforce Management System Database Script
-- Database: MySQL
-- ============================================

-- Note:
-- This application uses Hibernate/JPA for ORM and
-- automatic schema generation.
--
-- The tables below are included for reference and
-- documentation purposes. Hibernate can create
-- these tables automatically based on the entity
-- classes present in the application.
--
-- Sample data is included for demonstration.

-- ============================================
-- USERS
-- ============================================

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (
        role IN ('MANAGER', 'TEAM_LEAD', 'EMPLOYEE')
    ),
    department VARCHAR(255)
);

-- ============================================
-- TASKS
-- ============================================

CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(50) NOT NULL CHECK (
        priority IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')
    ),
    status VARCHAR(50) NOT NULL CHECK (
        status IN ('PENDING', 'COMPLETED')
    ),
    deadline DATE,
    assigned_to BIGINT,
    assigned_by BIGINT,
    created_at TIMESTAMP,

    CONSTRAINT fk_tasks_assigned_to
        FOREIGN KEY (assigned_to)
        REFERENCES users(id),

    CONSTRAINT fk_tasks_assigned_by
        FOREIGN KEY (assigned_by)
        REFERENCES users(id)
);

-- ============================================
-- ATTENDANCE
-- ============================================

CREATE TABLE IF NOT EXISTS attendance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    date DATE NOT NULL,
    check_in TIMESTAMP NULL,
    check_out TIMESTAMP NULL,
    status VARCHAR(50) NOT NULL CHECK (
        status IN ('PRESENT', 'ABSENT', 'LATE')
    ),

    CONSTRAINT fk_attendance_employee
        FOREIGN KEY (employee_id)
        REFERENCES users(id)
);

-- ============================================
-- ANNOUNCEMENTS
-- ============================================

CREATE TABLE IF NOT EXISTS announcements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    target VARCHAR(50) NOT NULL CHECK (
        target IN (
            'ALL',
            'EMPLOYEES',
            'TEAM_LEADS',
            'MANAGERS'
        )
    ),
    created_at TIMESTAMP
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_users_email
ON users(email);

CREATE INDEX idx_tasks_assigned_to
ON tasks(assigned_to);

CREATE INDEX idx_tasks_deadline
ON tasks(deadline);

CREATE INDEX idx_attendance_employee
ON attendance(employee_id);

CREATE INDEX idx_attendance_date
ON attendance(date);

CREATE INDEX idx_announcements_target
ON announcements(target);

-- ============================================
-- SAMPLE USERS
-- ============================================

-- NOTE:
-- Passwords are stored using BCrypt encryption
-- in the application.
--
-- It is recommended to create users through the
-- Registration page or Employee Management module
-- so that passwords are automatically encrypted.
--
-- If creating users directly through SQL,
-- BCrypt-hashed passwords must be used.
--
-- By default, users registering through the
-- application are assigned the EMPLOYEE role.
--
-- One account can later be promoted to MANAGER
-- by updating its role.

INSERT INTO users (
    name,
    email,
    password,
    role,
    department
)
VALUES
(
    'John Manager',
    'manager@workforge.com',
    '$2a$10$samplehashedpassword',
    'MANAGER',
    'Software'
),
(
    'Rahul Sharma',
    'rahul@workforge.com',
    '$2a$10$samplehashedpassword',
    'EMPLOYEE',
    'Software'
),
(
    'Priya Patel',
    'priya@workforge.com',
    '$2a$10$samplehashedpassword',
    'EMPLOYEE',
    'Software'
),
(
    'Amit Kumar',
    '$2a$10$samplehashedpassword',
    'TEAM_LEAD',
    'IPC'
),
(
    'Sneha Reddy',
    'sneha@workforge.com',
    '$2a$10$samplehashedpassword',
    'EMPLOYEE',
    'IPC'
);

-- ============================================
-- SAMPLE TASKS
-- ============================================

INSERT INTO tasks (
    title,
    description,
    priority,
    status,
    deadline,
    assigned_to,
    assigned_by,
    created_at
)
VALUES
(
    'Complete Dashboard UI',
    'Finish employee dashboard implementation.',
    'HIGH',
    'PENDING',
    '2026-06-25',
    2,
    1,
    NOW()
),
(
    'Fix Authentication Bugs',
    'Resolve JWT authentication issues.',
    'CRITICAL',
    'COMPLETED',
    '2026-06-15',
    3,
    1,
    NOW()
),
(
    'Prepare Monthly Report',
    'Generate project progress report.',
    'MEDIUM',
    'PENDING',
    '2026-06-28',
    4,
    1,
    NOW()
);

-- ============================================
-- SAMPLE ATTENDANCE
-- ============================================

INSERT INTO attendance (
    employee_id,
    date,
    check_in,
    check_out,
    status
)
VALUES
(
    2,
    '2026-06-16',
    '2026-06-16 08:55:00',
    '2026-06-16 17:10:00',
    'PRESENT'
),
(
    3,
    '2026-06-16',
    '2026-06-16 09:20:00',
    '2026-06-16 17:00:00',
    'LATE'
),
(
    5,
    '2026-06-16',
    NULL,
    NULL,
    'ABSENT'
);

-- ============================================
-- SAMPLE ANNOUNCEMENTS
-- ============================================

INSERT INTO announcements (
    title,
    message,
    target,
    created_at
)
VALUES
(
    'Welcome to WorkForge',
    'Welcome to the Workforce Management System.',
    'ALL',
    NOW()
),
(
    'Monthly Review Meeting',
    'Managers are requested to complete monthly reviews before Friday.',
    'MANAGERS',
    NOW()
),
(
    'Development Sprint',
    'All employees are requested to update task status daily.',
    'EMPLOYEES',
    NOW()
);

-- ============================================
-- MANAGER ACCOUNT NOTE
-- ============================================

-- Users created through the application are
-- assigned the EMPLOYEE role by default.
--
-- To promote a user to manager:

-- UPDATE users
-- SET role = 'MANAGER'
-- WHERE email = 'manager@workforge.com';

-- ============================================
-- END OF SCRIPT
-- ============================================