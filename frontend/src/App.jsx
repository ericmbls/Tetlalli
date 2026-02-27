<<<<<<< HEAD
import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CultivosPage from './pages/CultivosPage';
import ReportesPage from './pages/ReportesPage';
import UsuariosPage from './pages/UsuariosPage';
import AjustesPage from './pages/AjustesPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
=======
import { useState, useEffect } from 'react';
import LoginPage from './pages/Auth/LoginPage';
import DashboardPage from './pages/Dashboard/DashboardPage';     
import CultivosPage from './pages/Cultivos/CultivosPage';
import ReportesPage from './pages/Reportes/ReportesPage';        
import UsuariosPage from './pages/Usuarios/UsuariosPage';        
import AjustesPage from './pages/Ajustes/AjustesPage';           
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userRole] = useState('admin');
<<<<<<< HEAD

  const pages = {
    dashboard: DashboardPage,
    cultivos: CultivosPage,
    reportes: ReportesPage,
    usuarios: UsuariosPage,
    ajustes: AjustesPage,
  };

  const headerConfig = {
    dashboard: { title: 'Dashboard', showButton: false },
    cultivos: { title: 'Cultivos', showButton: true },
    reportes: { title: 'Reportes', showButton: false },
    usuarios: { title: 'Usuarios', showButton: false },
    ajustes: { title: 'Ajustes', showButton: false },
  };

  const CurrentPageComponent = pages[currentPage];
  const currentHeader = headerConfig[currentPage];

  if (!isLoggedIn) {
    return <LoginPage setIsLoggedIn={setIsLoggedIn} />;
  }

=======
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
    dashboard: { component: DashboardPage, title: 'Dashboard', showButton: false },
    cultivos: { component: CultivosPage, title: 'Cultivos', showButton: false },
    reportes: { component: ReportesPage, title: 'Reportes', showButton: false },
    usuarios: { component: UsuariosPage, title: 'Usuarios', showButton: false },
    ajustes: { component: AjustesPage, title: 'Ajustes', showButton: false },
  };

  if (!isLoggedIn) {
    return <LoginPage setIsLoggedIn={setIsLoggedIn} setToken={setToken} />;
  }

  const { component: CurrentPage, title, showButton } = pageConfig[currentPage];

>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e
  return (
    <div className="app-layout">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        role={userRole}
      />
<<<<<<< HEAD

      <main className="main-layout">
        <Header
          title={currentHeader.title}
          showButton={currentHeader.showButton}
        />
        <CurrentPageComponent />
=======
      <main className="main-layout">
        <Header title={title} showButton={showButton} />
        <CurrentPage darkMode={darkMode} setDarkMode={setDarkMode} token={token} />
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e
      </main>
    </div>
  );
}

export default App;