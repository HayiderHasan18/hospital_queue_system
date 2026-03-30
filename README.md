🏥 Hospital Queue Management System

Smart Queue Handling for Efficient Hospital Operations

🧠 Overview

A full-stack web application that helps hospitals manage patient queues efficiently.

The system allows:

Patients to join and track their position in the queue
Staff/admin to manage and call patients in order
Real-time monitoring of queue status
🚀 Live Demo
🌐 Frontend: https://queueheydaraa.netlify.app
✨ Key Features
👤 User Features
Register and login
Join the queue
Track queue position in real time
View current turn on public screen
👨‍💼 Admin / Staff Features
Secure admin-only access
Manage patient queue
Call next patient
Monitor and control queue status
🔐 Authentication System
JWT-based authentication for secure access
Role-based access control (User / Admin)
🛠️ Tech Stack
Category	Technology
Frontend	React, HTML, CSS, JavaScript
Backend	Node.js, Express.js
Database	MySQL
Others	JWT Authentication, REST API
⚙️ Local Development Setup
1️⃣ Clone Repository
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
Start MySQL (XAMPP or MySQL Workbench)
Create database:
CREATE DATABASE your_database_name;
Import or create required tables based on your schema
4️⃣ Frontend Setup
cd ../client
npm install
npm run dev
▶️ Running the Application
Start MySQL server
Start backend server
Start frontend application
Open browser:

👉 http://localhost:5173

🔄 System Workflow
User → Register/Login → Join Queue
        ↓
System → Assign Queue Number
        ↓
Admin → Call Next Patient
        ↓
User → Track Position / View Turn
📁 Project Structure
hospital_queue_system/
│── client/      # React frontend
│── backend/     # Node.js + Express API
📌 Notes
Ensure environment variables are correctly configured
Backend must be running before frontend
MySQL database must be created and connected properly
JWT secret is required for authentication
📄 License

This project is developed for educational and internship purposes.
