# 🏥 Hospital Queue Management System

**Efficient Queue Tracking and Management for Hospitals**

---

## 🧠 Overview

A full-stack web application designed to simplify hospital queue management.
It allows patients to track their position in the queue while enabling staff to efficiently manage and call patients in order.

---

## 🚀 Live Demo

- 🌐 Application: https://queueheydaraa.netlify.app 
    

---

## ✨ Key Features

### 👤 Patient Features
- Register and login
- Join hospital queue
- Track real-time queue position
- View current turn on public display screen

### 👨‍💼 Admin / Staff Features
- Manage patient queue
- Call next patient
- Monitor queue status
- Control and update queue flow
  
---

## 🛠️ Tech Stack

| Category   | Technology |
|-----------|------------|
| Frontend  | React,  CSS, JavaScript |
| Backend   | Node.js, Express.js |
| Database  | MySQL |
| Others    | AI API, Nodemailer, Axios, dotenv, CORS |

---

## ⚙️ Local Development Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Heydaraa/hospital_queue_system.git
cd hospital_queue_system

2️⃣ Backend Setup
cd backend
npm install
nodemon server.js

Create a .env file inside backend/:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_PORT=3306

PORT=5000
JWT_SECRET=your_secret_key

3️⃣ Database Setup (MySQL)
Start MySQL (XAMPP or Workbench)
Create database:
CREATE DATABASE your_database_name;
Import or create required tables
4️⃣ Frontend Setup
cd ../client
npm install
npm run dev
▶️ Running the Application
Start MySQL server
Start backend server
Start frontend development server
Open browser:

👉 http://localhost:5173

🔄 System Workflow
Patient → Register/Login → Join Queue
            ↓
System → Assign Queue Number
            ↓
Admin → Call Next Patient
            ↓
Patient → Track Status / View Turn
📁 Project Structure
Complaint-Support/
│── client/     # React client
│── backend/      # Node.js + Express API

---

📌 Notes
- Ensure environment variables are correctly configured
- Backend must be running before frontend
- MySQL database must be created and connected properly
📄 License

This project is developed for educational and internship purposes.
