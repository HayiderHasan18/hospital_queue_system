🏥 Hospital Queue Management System
<p align="center"> <b>Efficient Queue Tracking and Management for Hospitals</b> </p>
🧠 Overview

A full-stack web application designed to simplify hospital queue management.
It allows patients to track their position in the queue while enabling staff to efficiently manage and call patients in order.

🚀 Live Demo
🌐 Application: https://queueheydaraa.netlify.app
✨ Features
👤 User Features
Register and login
Join hospital queue
Track real-time queue position
View current turn on public display screen
👨‍💼 Admin / Staff Features
Manage patient queue
Call next patient
Monitor queue status
Control and update queue flow
🛠️ Tech Stack
Category	Technology
Frontend	React, HTML, CSS, JavaScript
Backend	Node.js, Express.js
Database	MySQL
Other	JWT Authentication, REST API
⚙️ Local Development Setup
1️⃣ Clone Repository
git clone https://github.com/Heydaraa/hospital_queue_system.git
cd hospital_queue_system
2️⃣ Backend Setup
cd backend
npm install
nodemon server.js

Make sure your backend is properly configured before running.

3️⃣ Frontend Setup
cd ../client
npm install
npm run dev
🔐 Environment Variables

Create a .env file in the backend directory:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_PORT=3306

JWT_SECRET=your_secret_key
PORT=5000
▶️ Running the Application
Start MySQL server
Run backend server
Run frontend application
Open browser:

👉 http://localhost:5173
 (or your frontend port)

🔄 System Workflow
Patient → Register/Login → Join Queue
            ↓
System → Assign Queue Number
            ↓
Admin → Call Next Patient
            ↓
Patient → Track Status / View Turn
📁 Project Structure
hospital_queue_system/
│── client/      # React frontend
│── backend/     # Node.js + Express API
👨‍💻 Author

Hayider Hasan
GitHub: https://github.com/Heydaraa

📌 Notes
Ensure environment variables are correctly configured
Backend must be running before frontend
MySQL database must be created and connected properly
