import { Search, Plus, Menu } from 'lucide-react';
import './Header.css';

export default function Header({ 
  title, 
  showButton = false, 
  onMenuClick,
  onSearch,
  onAddClick,
  searchValue = '',
  buttonText = 'Añadir cultivo'
}) {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button className="hamburger-btn" onClick={onMenuClick} aria-label="Abrir menú">
          <Menu size={22} />
        </button>
        <h2>{title}</h2>
      </div>

      {onSearch && (
        <div className="header-search">
          <input
            type="text"
            placeholder="Buscar contenido"
            className="search-input"
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
          />
          <span className="search-icon">
            <Search size={18} />
          </span>
        </div>
      )}

      {showButton && onAddClick && (
        <button className="btn-add-header" onClick={onAddClick}>
          <Plus size={18} />
          <span>{buttonText}</span>
        </button>
      )}
    </header>
  );
}