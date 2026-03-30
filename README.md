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
Register and login to the system

Join the queue for a specific department or service

Track current position in the queue

View the current turn on a public display

View queue status and estimated wait times

👨‍💼 Admin / Staff Features
Secure admin-only access with role-based authentication

Manage patient queue with an intuitive dashboard

Call the next patient for consultation

View and search for patients in the queue

Reset or control queue flow efficiently

Monitor real-time queue status

🔐 Authentication System
JWT-based authentication for secure access

Role-based access control (User / Admin)

🛠️ Tech Stack
Category	Technology
Frontend	React, HTML, CSS, JavaScript
Backend	Node.js, Express.js
Database	MySQL
Others	JWT Authentication, REST API, Nodemon
⚙️ Local Development Setup
1️⃣ Clone Repository
bash
git clone https://github.com/Heydaraa/hospital_queue_system.git
cd hospital_queue_system
2️⃣ Backend Setup
bash
cd backend
npm install
Create a .env file inside backend/:

text
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_PORT=3306

PORT=5000
JWT_SECRET=your_secret_key
Run backend:

bash
npm start
# or with nodemon for development
nodemon server.js
3️⃣ Database Setup (MySQL)
Start MySQL (XAMPP, MAMP, or Workbench)

Create database:

sql
CREATE DATABASE your_database_name;
Import or create required tables (users, queues, etc.)

4️⃣ Frontend Setup
bash
cd ../client
npm install
npm run dev
▶️ Running the Application
Start MySQL server

Start backend server

Start frontend development server

Open browser: 👉 http://localhost:5173

🔄 System Workflow
text
User → Register/Login → Join Queue
        ↓
System → Assign Queue Number & Position
        ↓
Admin → Call Next Patient
        ↓
System → Update Queue & Display
        ↓
User → Track Position / View Current Turn
📁 Project Structure
text
Hospital Queue System/
│── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│── backend/         # Node.js + Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
📌 Notes
Ensure environment variables are correctly configured

Backend must be running before frontend

MySQL database must be created and connected properly

JWT secret is required for authentication

Admin users must be seeded manually in the database

📄 License
This project is developed for educational and internship purposes.
