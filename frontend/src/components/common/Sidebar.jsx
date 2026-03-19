import { LayoutDashboard, Sprout, BarChart3, Users, Settings, LogOut } from 'lucide-react';
import Swal from 'sweetalert2';
import './Sidebar.css';
import logo from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ currentPage, onNavigate, role = 'admin', isOpen, onClose, onLogout }) {
  const { logout } = useAuth();
  const menu = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'cultivos', label: 'Cultivos', icon: <Sprout size={20} /> },
    { id: 'reportes', label: 'Reportes', icon: <BarChart3 size={20} /> },
  ];

  if (role === 'admin') {
    menu.push({ id: 'usuarios', label: 'Usuarios', icon: <Users size={20} /> });
  }

  menu.push({ id: 'ajustes', label: 'Ajustes', icon: <Settings size={20} /> });

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <button
            onClick={() => window.location.href = '/'}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <img src={logo} alt="Xihuitl" className="sidebar-logo" />
            <h1 style={{ color: 'var(--landing-title)', fontWeight: 800 }}>Xihuitl</h1>
          </button>
        </div>

        <nav className="sidebar-nav">
          {menu.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
              type="button"
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          <div style={{ margin: '1rem 1rem 0', height: '1px', background: 'var(--landing-border)' }}></div>
          <button
            className="nav-item"
            style={{ marginTop: '1rem' }}
            onClick={() => window.location.href = '/'}
            type="button"
          >
            <span className="nav-icon"><LayoutDashboard size={20} /></span>
            <span>Volver al inicio</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '10px' }}>
            <div className="user-avatar">U1</div>
            <div className="user-meta" style={{ flex: 1 }}>
              <span className="user-name">Usuario1</span>
              <span className="user-role">Administrador</span>
            </div>
          </div>
          <button
            className="nav-item"
            style={{ color: '#d33', marginTop: '10px', width: '100%' }}
            onClick={() => {
              Swal.fire({
                title: '¿Cerrar sesión?',
                text: "Saldrás de tu cuenta actual.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, salir',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                  logout();
                  if (onLogout) onLogout();
                }
              });
            }}
          >
            <span className="nav-icon"><LogOut size={20} /></span>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}