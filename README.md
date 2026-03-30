🏥 Hospital Queue Management System

Smart Queue Handling for Efficient Hospital Operations

🧠 Overview

A full-stack web application that helps hospitals manage patient queues efficiently.

The system allows users to join queues, track their position, and view real-time updates, while enabling staff to manage and call patients in order.

It also includes an admin-controlled workflow for managing queue operations.

🚀 Live Demo
🌐 Frontend: https://queueheydaraa.netlify.app
✨ Key Features
👤 User Features
Register and login
Join the queue
Track queue position
View current turn on public display
👨‍💼 Admin / Staff Features
Secure admin-only access
Manage patient queue
Call next patient
Monitor queue status
Control queue flow efficiently
🔐 Authentication System
JWT-based authentication for secure access
Role-based access (User / Admin)
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

Run backend:

npm start
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

User → Register/Login → Join Queue
↓
System → Assign Queue Number
↓
Admin → Call Next Patient
↓
User → Track Position / View Turn

📁 Project Structure

Hospital Queue System
│── client/ # React frontend
│── backend/ # Node.js + Express API

📌 Notes
Ensure environment variables are correctly configured
Backend must be running before frontend
MySQL database must be created and connected properly
JWT secret is required for authentication
📄 License

This project is developed for educational and internship purposes.
