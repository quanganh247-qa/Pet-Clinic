import './App.css';
import { LoginPage } from './components/auth/LoginPage';
import { Sidebar } from './components/layout/Sidebar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PatientsPage } from './components/patients/PatientsPage';
import { useState } from 'react';
import { Header } from './components/layout/Header';
import { FlowboardPage } from './components/flowboard/FlowboardPage';
import { AppointmentPage } from './components/appointments/AppointmentPage';
import { PatientDetailPage } from './components/patients/PatientDetailPage';
function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Router>
    <div className="flex min-h-screen">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-60'}`}>
        <Header isCollapsed={isCollapsed} />
        <main className="bg-gray-50 mt-16 min-h-[calc(100vh-4rem)]">
        <Routes>
              <Route path="/patients" element={<PatientsPage />} />
                <Route path="/patients/:id" element={<PatientDetailPage />} />
                <Route path="/flowboard" element={<FlowboardPage />} />
              <Route path="/appointments" element={<AppointmentPage />} />
        </Routes>        
        </main>
      </div>
    </div>
  </Router>
  );
}

export default App;
