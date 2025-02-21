
import './App.css';
import { LoginPage } from './components/auth/LoginPage';
import { Sidebar } from './components/layout/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import { PatientsPage } from './components/patients/PatientsPage';
import { useState } from 'react';
import { Header } from './components/layout/Header';
function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Router>
    <div className="flex min-h-screen">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-60'}`}>
        <Header isCollapsed={isCollapsed} />
        <main className="bg-gray-50 mt-16 min-h-[calc(100vh-4rem)]">
          <PatientsPage />
        </main>
      </div>
    </div>
  </Router>
  );
}

export default App;
