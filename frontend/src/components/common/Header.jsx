import { Search, Plus, Menu } from 'lucide-react';
import './Header.css';

export default function Header({ title, showButton, onMenuClick }) {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button className="hamburger-btn" onClick={onMenuClick} aria-label="Abrir menú">
          <Menu size={22} />
        </button>
        <h2>{title}</h2>
      </div>

      <div className="header-search">
        <input
          type="text"
          placeholder="Buscar contenido"
          className="search-input"
        />
        <span className="search-icon">
          <Search size={18} />
        </span>
      </div>

      {showButton && (
        <button className="btn-add-cultivo">
          <span><Plus size={18} /></span>
          Añadir cultivo
        </button>
      )}
    </header>
  );
}