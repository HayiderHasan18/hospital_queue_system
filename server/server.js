require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path"); 

// Route imports
const publicRoutes = require('./routes/PublicRoutes/publicRoutes');
const routesPatients = require('./routes/PatientRoutes/routesPatient');
const adminRoutes = require('./routes/AdminRoutes/adminRoutes');
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/PatientRoutes/patientRoutes");
const doctorInfoRoutes = require('./routes/DoctorRoutes/doctorRoutes'); 
const doctorQueueRoutes = require('./routes/DoctorRoutes/doctor');   
const userProfileRoutes = require('./routes/profileRouter'); 

const app = express();

// Use dynamic port for Render or fallback to 5000
const PORT = process.env.PORT || 5000;

// ===================
// Middleware
// ===================
app.use(express.json());

// CORS - allow local and deployed frontend
app.use(cors({
  origin: [
    "http://localhost:5173",                 // local dev
    "https://queueheydaraa.netlify.app"     // deployed Netlify frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// ===================
// Socket.IO setup
// ===================
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://queueheydaraa.netlify.app"
    ],
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("disconnect", () => console.log("Socket disconnected:", socket.id));
});

// Make io accessible in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ===================
// Routes
// ===================
app.use("/api/admin", adminRoutes);
app.use("/api/users", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorQueueRoutes);       
app.use("/api/doctor-info", doctorInfoRoutes);   
app.use("/api/patients", routesPatients);
app.use("/api/public", publicRoutes);
app.use("/api/user", userProfileRoutes); 

// ===================
// Test route
// ===================
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is online!" });
});

// Root route
app.get("/", (req, res) => {
  res.send("✔️ Backend is running");
});

// Start server
// ===================
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});