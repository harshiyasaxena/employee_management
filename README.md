# WorkForge - Workforce Management System

## Project Title

**WorkForge - Workforce Management System**

---

# Objective

A comprehensive Workforce Management System designed to streamline employee management, task assignment, attendance tracking, announcements, and performance monitoring.

The application demonstrates Full Stack Development concepts including:

* Authentication & Authorization using JWT
* Employee Management
* Task Assignment & Tracking
* Attendance Management
* Leave Management
* Role-Based Access Control
* Dashboard Analytics & Reporting
* Database Management using JPA/Hibernate

---

<h2>Screenshots</h2>



<div align="center">
  <img src="readme%20images/Landing.png" alt="Home Screen" width="600">
  <p><strong>Landing Page</strong></p>
</div>

<div align="center">
  <img src="readme%20images/Login.png" alt="Login Screen" width="600">
  <p><strong>Login Page</strong></p>
</div>

<div align="center">
  <img src="readme%20images/Manager%20Dashboard.png" alt="Manager Dashboard Screen" width="600">
  <p><strong>Manager Dashboard</strong></p>
</div>

<div align="center">
  <img src="readme%20images/Task%20Assignment%20Page.png" alt="Task Assignment" width="600">
  <p><strong>Task Assignment</strong></p>
</div>

<div align="center">
  <img src="readme%20images/View%20Attendance.png" alt="Attendance" width="600">
  <p><strong>Attendance</strong></p>
</div>

<div align="center">
  <img src="readme%20images/Employee%20Dashboard.png" alt="Employee Dashboard" width="600">
  <p><strong>Employee Dashboard</strong></p>
</div>


---

# Technologies Used

## Backend

| Technology      | Purpose                           |
| --------------- | --------------------------------- |
| Java 21         | Programming Language              |
| Spring Boot 3   | Backend Framework                 |
| Spring Security | Authentication & Authorization    |
| JWT             | Secure Token-Based Authentication |
| Spring Data JPA | ORM                               |
| Hibernate       | Database Mapping                  |
| Maven           | Dependency Management             |
| MySQL           | Relational Database               |

---

## Frontend

| Technology       | Purpose            |
| ---------------- | ------------------ |
| React.js         | Frontend Framework |
| Vite             | Build Tool         |
| React Router DOM | Routing            |
| Framer Motion    | Animations         |
| Recharts         | Data Visualization |
| Axios            | API Communication  |
| CSS3             | Styling            |

---

## Deployment & Tools

| Tool         | Purpose                 |
| ------------ | ----------------------- |
| Git & GitHub | Version Control         |
| Render       | Backend Deployment      |
| Vercel       | Frontend Deployment     |
| Railway      | Database Hosting        |
| Postman      | API Testing             |
| VS Code      | Development Environment |

---

# Features Implemented

## 1. Authentication & Authorization

* JWT-based authentication
* Secure login system
* User registration
* Password encryption using BCrypt
* Role-based route protection
* Secure API authorization

### Roles Supported

* Manager
* Team Lead
* Employee

---

## 2. Employee Management

Managers can:

* Add employees
* Delete employees
* View employee details
* Filter employees by role
* Filter employees by department
* Search employees

Employee details include:

* Name
* Email
* Department
* Role

---

## 3. Task Management

Managers can:

* Create tasks
* Assign tasks to individual employees
* Assign tasks to multiple employees
* Assign tasks to all employees
* Delete tasks
* Set priorities
* Set deadlines

Task Priorities:

* Low
* Medium
* High
* Critical

Task Status:

* Pending
* Completed
* Overdue

Employees can:

* View assigned tasks
* Search tasks
* Filter tasks
* Mark tasks as completed
* Mark tasks as pending

---

## 4. Attendance Management

Employees can:

* Check In
* Check Out
* Apply Leave
* View attendance history

Attendance Status:

* Present
* Late
* Absent

Managers can:

* View attendance records
* Track employee attendance
* Analyze attendance statistics

---

## 5. Leave Management

Employees can:

### Single Day Leave

Apply leave for a specific date.

### Date Range Leave

Apply leave for multiple days.

System automatically:

* Creates attendance records
* Marks employee absent
* Prevents check-in on approved leave dates

---

## 6. Announcements System

Managers can:

* Create announcements
* Target specific roles
* Broadcast announcements

Announcement Targets:

* All Users
* Employees
* Team Leads
* Managers

Employees receive announcements relevant to their role.

---

## 7. Dashboard Analytics

### Manager Dashboard

Provides:

* Total Employees
* Total Tasks
* Completed Tasks
* Pending Tasks
* Overdue Tasks
* Completion Rate
* Attendance Trends

### Employee Dashboard

Provides:

* Assigned Tasks
* Completed Tasks
* Pending Tasks
* Weekly Performance Reports
* Productivity Analytics

---

# Security Features

* JWT Authentication
* BCrypt Password Encryption
* Protected API Endpoints
* Role-Based Access Control
* Stateless Authentication
* Secure Route Protection

---

## Prerequisites

| Software | Version | Download |
|-----------|----------|----------|
| JDK | 21+ | https://adoptium.net |
| Maven | 3.9+ | https://maven.apache.org/download.cgi |
| Node.js | 18+ | https://nodejs.org |
| MySQL | 8+ | https://dev.mysql.com/downloads |
| Git | Latest | https://git-scm.com/downloads |
| VS Code | Latest | https://code.visualstudio.com |

# Database Design

## Entities

### User

Stores:

* Employee Information
* Manager Information
* Team Lead Information

### Task

Stores:

* Task Details
* Deadline
* Status
* Priority
* Assignment Information

### Attendance

Stores:

* Check In Time
* Check Out Time
* Leave Records
* Attendance Status

### Announcement

Stores:

* Title
* Message
* Target Audience
* Creation Timestamp

---

# Project Structure

```text
workforce-management-system
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   │   ├── common
│   │   │   └── manager
│   │   ├── layouts
│   │   ├── pages
│   │   │   ├── manager
│   │   │   └── EmployeeDashboard.jsx
│   │   ├── images
│   │   └── App.jsx
│   │
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── src/main/java/com/workforce
│   │   ├── config
│   │   ├── controller
│   │   ├── dto
│   │   ├── entity
│   │   ├── repository
│   │   ├── scheduler
│   │   ├── security
│   │   └── service
│   │
│   ├── src/main/resources
│   ├── pom.xml
│   ├── Dockerfile
│   └── mvnw
│
├── database
│   └── schema.sql
│
├── .gitignore
└── README.md
```

---

# Steps to Run Locally

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/workforce-management-system.git

cd workforce-management-system
```

---

## 2. Configure Database

Create a MySQL database:

```sql
CREATE DATABASE workforce_db;
```

Update backend configuration in application.properties:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/workforce_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

---

## 3. Run Backend

```bash
cd backend

./mvnw clean package

./mvnw spring-boot:run
```

Backend:

```text
http://localhost:8080
```

---

## 4. Run Frontend

Open a new terminal:

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# Deployment on Render + Railway + Vercel (Free Tier)

## Part A: Create Railway Database

### 1. Create Railway Account

* Visit https://railway.app
* Sign in using GitHub

### 2. Create MySQL Database

* Click **New Project**
* Select **Provision MySQL**
* Wait for database creation

After creation, open the database dashboard and note down:

```text
MYSQLHOST
MYSQLPORT
MYSQLDATABASE
MYSQLUSER
MYSQLPASSWORD
```

These values will be required for backend deployment.

---

## Part B: Deploy Backend on Render

### 1. Create Render Account

* Visit https://render.com
* Sign in using GitHub

### 2. Create Web Service

Dashboard → New → Web Service

Connect your GitHub repository.

### 3. Configure Service

```text
Name: workforge-backend
Root Directory: backend
Runtime: Docker
Dockerfile Path: ./Dockerfile
Docker Build Context Directory: .
Plan: Free
```

### 4. Add Environment Variables

Navigate to:

```text
Settings → Environment Variables
```

Add:

| Key               | Value                                               |
| ----------------- | --------------------------------------------------- |
| DATABASE_URL      | jdbc:mysql://MYSQLHOST:MYSQLPORT/MYSQLDATABASE      |
| DATABASE_USERNAME | MYSQLUSER                                           |
| DATABASE_PASSWORD | MYSQLPASSWORD                                       |
| JWT_SECRET        | Your Secret Key (minimum 32 characters recommended) |
| FRONTEND_URL      | Vercel URL (add after frontend deployment)          |

Example:

```text
DATABASE_URL=jdbc:mysql://mysql.railway.internal:3306/railway
DATABASE_USERNAME=root
DATABASE_PASSWORD=********
JWT_SECRET=workforge-secret-key-example-123456
```

### 5. Deploy Backend

Click:

```text
Create Web Service
```

Render will:

* Build Docker image
* Run Maven build
* Start Spring Boot application

The first deployment may take:

```text
5 - 10 minutes
```

Once deployment is complete, note your backend URL:

```text
https://workforge-backend.onrender.com
```

Verify deployment:

```text
https://workforge-backend.onrender.com/api/dashboard/stats
```

(or any protected endpoint after authentication)

---

## Part C: Deploy Frontend on Vercel

### 1. Update Environment Variable

Inside:

```text
frontend/.env
```

Add:

```env
VITE_API_BASE_URL=https://workforge-backend.onrender.com
```

Replace with your actual Render backend URL.

Commit and push changes:

```bash
git add .
git commit -m "Updated production API URL"
git push
```

---

### 2. Create Vercel Account

* Visit https://vercel.com
* Sign in using GitHub

### 3. Import Repository

```text
Add New → Project
```

Select:

```text
WorkForge Repository
```

### 4. Configure Project

```text
Root Directory: frontend
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

### 5. Add Environment Variable

| Key               | Value              |
| ----------------- | ------------------ |
| VITE_API_BASE_URL | Render Backend URL |

Example:

```text
VITE_API_BASE_URL=https://workforge-backend.onrender.com
```

### 6. Deploy

Click:

```text
Deploy
```

Deployment generally completes within:

```text
1 - 3 minutes
```

After deployment, note your frontend URL:

```text
https://workforge.vercel.app
```

---

## Part D: Update Render CORS Configuration

After Vercel deployment:

Go to Render:

```text
Settings → Environment Variables
```

Update:

```text
FRONTEND_URL=https://workforge.vercel.app
```

Save changes.

Render will automatically redeploy.

---
## WorkForge System Architecture

```text
┌─────────────────────────────────────────────┐
│              React Frontend                 │
│                  (Vercel)                   │
│                                             │
│  Dashboard • Tasks • Employees • Profile   │
│  Attendance • Announcements                 │
└──────────────────┬──────────────────────────┘
                   │
                   │ REST API + JWT
                   ▼
┌─────────────────────────────────────────────┐
│          Spring Boot Backend                │
│                 (Render)                    │
│                                             │
│  Authentication (JWT)                       │
│  Employee Management                        │
│  Task Management                            │
│  Attendance & Leave Management              │
│  Announcement Service                       │
│  Dashboard Analytics                        │
│  Scheduled Task Reminders (@Scheduled)      │
└──────────────────┬──────────────────────────┘
                   │
                   │ JPA / Hibernate
                   ▼
┌─────────────────────────────────────────────┐
│             MySQL Database                  │
│                (Railway)                    │
│                                             │
│  Users                                      │
│  Tasks                                      │
│  Attendance                                 │
│  Announcements                              │
└─────────────────────────────────────────────┘
```

### Key Architecture Concepts

- React + Vite Frontend
- Spring Boot REST APIs
- JWT Authentication & Authorization
- Role-Based Access Control (Manager / Employee)
- MySQL Database Integration
- JPA / Hibernate ORM
- Attendance & Leave Management
- Task Assignment & Tracking
- Dashboard Analytics & Reporting
- Scheduled Task Reminder System
- Cloud Deployment (Vercel + Render + Railway)

---

# Application URLs

```text
Frontend: https://employee-management-gules-theta.vercel.app/

```

🎉 WorkForge is now deployed and accessible globally.

---

# API Modules

## Authentication

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/login`    | Login user        |
| POST   | `/api/auth/register` | Register employee |


## Employees

| Method | Endpoint                 | Description                |
| ------ | ------------------------ | -------------------------- |
| GET    | `/api/employees`         | Get all employees          |
| POST   | `/api/employees`         | Add employee               |
| GET    | `/api/employees/{id}`    | Get employee by ID         |
| DELETE | `/api/employees/{id}`    | Delete employee            |
| GET    | `/api/employees/profile` | Get logged-in user profile |
| PUT    | `/api/employees/profile` | Update profile             |


## Tasks

| Method | Endpoint                 | Description                  |
| ------ | ------------------------ | ---------------------------- |
| GET    | `/api/tasks`             | Get all tasks                |
| POST   | `/api/tasks`             | Assign task                  |
| DELETE | `/api/tasks/{id}`        | Delete task                  |
| PUT    | `/api/tasks/{id}/status` | Update task status           |
| GET    | `/api/tasks/my`          | Get assigned tasks           |
| GET    | `/api/tasks/my/stats`    | Get employee task statistics |


## Attendance

| Method | Endpoint                                | Description                |
| ------ | --------------------------------------- | -------------------------- |
| GET    | `/api/attendance`                       | Get all attendance records |
| GET    | `/api/attendance/my`                    | Get employee attendance    |
| POST   | `/api/attendance/checkin/{employeeId}`  | Employee check-in          |
| POST   | `/api/attendance/checkout/{employeeId}` | Employee check-out         |
| POST   | `/api/attendance/leave/{employeeId}`    | Apply leave                |


## Announcements

| Method | Endpoint                         | Description               |
| ------ | -------------------------------- | ------------------------- |
| POST   | `/api/announcements`             | Create announcement       |
| GET    | `/api/announcements`             | Get all announcements     |
| GET    | `/api/announcements/role/{role}` | Get announcements by role |


## Dashboard

| Method | Endpoint                          | Description           |
| ------ | --------------------------------- | --------------------- |
| GET    | `/api/dashboard/stats`            | Dashboard statistics  |
| GET    | `/api/dashboard/attendance-chart` | Attendance chart data |


# Future Enhancements

* Team Lead Dashboard
* Approval-Based Leave Workflow
* Real-Time Notifications
* Employee Performance Reviews
* Payroll Integration
* Document Management
* Mobile Application
* Advanced Reporting & Analytics
* AI chatbot integration
* Smart Task prioritization

---

# Author

**Harshiya Saxena**
Software Engineer Apprentice @Boeing

WorkForge - Workforce Management System
