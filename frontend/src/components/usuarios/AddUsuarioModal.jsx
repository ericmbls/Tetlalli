import { useState } from "react";
import { X, User, Mail, Lock, Shield, Building2, MapPin, Globe, Info } from "lucide-react";
import "./AddUsuarioModal.css";

export default function AddUsuarioModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    farmName: "",
    location: "",
    language: "es",
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
          <X size={16} />
        </button>
        
        <h2>Nuevo Usuario</h2>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="left-column">
              <div className="image-upload-area">
                <User className="upload-icon" size={40} strokeWidth={1.5} />
                <span className="upload-text">Foto de perfil</span>
                <span className="upload-hint">
                  <Info size={10} />
                  Opcional
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleChange("avatar", e.target.files[0])}
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    opacity: 0, 
                    cursor: 'pointer',
                    width: '100%',
                    height: '100%'
                  }}
                />
              </div>
            </div>

            <div className="right-column">
              <div className="form-group">
                <label>
                  <User size={12} />
                  Nombre completo
                </label>
                <input
                  type="text"
                  className="input-flushed"
                  placeholder="Ej: Juan Pérez"
                  value={formData.name}
                  onChange={e => handleChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <Mail size={12} />
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="input-flushed"
                  placeholder="usuario@ejemplo.com"
                  value={formData.email}
                  onChange={e => handleChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <Lock size={12} />
                  Contraseña
                </label>
                <input
                  type="password"
                  className="input-flushed"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => handleChange("password", e.target.value)}
                  required
                />
                <div className="field-hint">
                  <Info size={10} />
                  Mínimo 8 caracteres
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <Shield size={12} />
                    Rol
                  </label>
                  <div className="select-wrapper">
                    <select
                      value={formData.role}
                      onChange={e => handleChange("role", e.target.value)}
                    >
                      <option value="user">Usuario</option>
                      <option value="admin">Administrador</option>
                    </select>
                    <svg className="select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    <Globe size={12} />
                    Idioma
                  </label>
                  <div className="select-wrapper">
                    <select
                      value={formData.language}
                      onChange={e => handleChange("language", e.target.value)}
                    >
                      <option value="es">Español</option>
                      <option value="en">Inglés</option>
                    </select>
                    <svg className="select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <Building2 size={12} />
                  Nombre de la granja
                </label>
                <input
                  type="text"
                  className="input-flushed"
                  placeholder="Ej: Granja El Rosal"
                  value={formData.farmName}
                  onChange={e => handleChange("farmName", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>
                  <MapPin size={12} />
                  Ubicación
                </label>
                <input
                  type="text"
                  className="input-flushed"
                  placeholder="Ej: Antioquia, Colombia"
                  value={formData.location}
                  onChange={e => handleChange("location", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn-save">
              Crear Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}