import { useState, useEffect } from 'react';
import LoginPage from './pages/Auth/LoginPage';
<<<<<<< HEAD
import DashboardPage from './pages/Dashboard/DashboardPage';     
import CultivosPage from './pages/Cultivos/CultivosPage';
import ReportesPage from './pages/Reportes/ReportesPage';        
import UsuariosPage from './pages/Usuarios/UsuariosPage';        
import AjustesPage from './pages/Ajustes/AjustesPage';           
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import LandingPage from './pages/Landing/LandingPage';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
=======
import DashboardPage from './pages/Dashboard/DashboardPage';
import CultivosPage from './pages/Cultivos/CultivosPage';
import ReportesPage from './pages/Reportes/ReportesPage';
import UsuariosPage from './pages/Usuarios/UsuariosPage';
import AjustesPage from './pages/Ajustes/AjustesPage';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import LandingPage from './pages/Landing/LandingPage';
import CultivoDetallePage from "./pages/Cultivos/CultivoDetallePage";
import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCultivo, setSelectedCultivo] = useState(null);
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole] = useState('admin');
  const [darkMode, setDarkMode] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const pageConfig = {
<<<<<<< HEAD
    dashboard: { component: DashboardPage, title: 'Dashboard', showButton: false },
    cultivos: { component: CultivosPage, title: 'Cultivos', showButton: false },
    reportes: { component: ReportesPage, title: 'Reportes', showButton: false },
    usuarios: { component: UsuariosPage, title: 'Usuarios', showButton: false },
    ajustes: { component: AjustesPage, title: 'Ajustes', showButton: false },
=======
    dashboard: {
      component: DashboardPage,
      title: 'Dashboard',
      showButton: false
    },
    cultivos: {
      component: CultivosPage,
      title: 'Cultivos',
      showButton: false
    },
    cultivoDetalle: {
      component: CultivoDetallePage,
      title: 'Detalle del Cultivo',
      showButton: false
    },
    reportes: {
      component: ReportesPage,
      title: 'Reportes',
      showButton: false
    },
    usuarios: {
      component: UsuariosPage,
      title: 'Usuarios',
      showButton: false
    },
    ajustes: {
      component: AjustesPage,
      title: 'Ajustes',
      showButton: false
    }
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
  };

  if (showLanding && !isLoggedIn) {
    return <LandingPage onLoginClick={() => setShowLanding(false)} />;
  }

  if (!isLoggedIn) {
<<<<<<< HEAD
    return <LoginPage setIsLoggedIn={setIsLoggedIn} setToken={setToken} />;
=======
    return (
      <LoginPage
        setIsLoggedIn={setIsLoggedIn}
        setToken={setToken}
      />
    );
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
  }

  const { component: CurrentPage, title, showButton } = pageConfig[currentPage];

  return (
    <div className="app-layout">
<<<<<<< HEAD
=======

>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
      <Sidebar
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          setIsSidebarOpen(false);
        }}
        role={userRole}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
<<<<<<< HEAD
      <main className="main-layout">
        <Header 
          title={title} 
          showButton={showButton} 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />
        <CurrentPage darkMode={darkMode} setDarkMode={setDarkMode} token={token} />
      </main>
=======

      <main className="main-layout">

        <Header
          title={title}
          showButton={showButton}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <CurrentPage
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          token={token}
          cultivo={selectedCultivo}
          onOpenCultivo={(cultivo) => {
            setSelectedCultivo(cultivo);
            setCurrentPage('cultivoDetalle');
          }}
        />

      </main>

>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
    </div>
  );
}

export default App;