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
const PORT = 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Socket.IO
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("disconnect", () => console.log(" Socket disconnected:", socket.id));
});
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorQueueRoutes);       
app.use("/api/doctor-info", doctorInfoRoutes);   
app.use("/api/patients", routesPatients);
app.use("/api/public", publicRoutes);
app.use("/api/user", userProfileRoutes); 

// Root test
app.get("/", (req, res) => {
  res.send("✔️ Backend is running");
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
