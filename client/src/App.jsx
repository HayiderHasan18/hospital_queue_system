import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorDashboard from './Components/Doctor/DoctorDashboard';
import PatientDashboard from './Components/Patient/PatientDashboard';
import AdminDashboard from './Components/Admin/AdminDashboard';
import LandingPage from './Components/LandingPage/LandingPage';
import AuthMode from './Components/Autentication/AuthMode'; 
function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<LandingPage />} />

        <Route path="/auth" element={<AuthMode />} />
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
export default App;
