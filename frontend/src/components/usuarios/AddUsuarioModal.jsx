import { useState } from "react";
import { X, User, Mail, Lock, Shield, Building2, MapPin, Globe, Info, Eye, EyeOff } from "lucide-react";
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

  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
    handleChange("avatar", file);
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
              <div className={`image-upload-area ${avatarPreview ? 'has-image' : ''}`}>
                {avatarPreview ? (
                  <img src={avatarPreview} alt="avatar preview" className="avatar-preview" />
                ) : (
                  <>
                    <User className="upload-icon" size={40} strokeWidth={1.5} />
                    <span className="upload-text">Foto de perfil</span>
                    <span className="upload-hint">
                      <Info size={10} />
                      Opcional
                    </span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
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
                <label htmlFor="user-name">
                  <User size={12} />
                  Nombre completo
                </label>
                <input
                  id="user-name"
                  type="text"
                  className="input-flushed"
                  placeholder="Ej: Juan Pérez"
                  value={formData.name}
                  onChange={e => handleChange("name", e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="user-email">
                  <Mail size={12} />
                  Correo electrónico
                </label>
                <input
                  id="user-email"
                  type="email"
                  className="input-flushed"
                  placeholder="usuario@ejemplo.com"
                  value={formData.email}
                  onChange={e => handleChange("email", e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-group password-field">
                <label htmlFor="user-password">
                  <Lock size={12} />
                  Contraseña
                </label>
                <div className="password-input-wrapper">
                  <input
                    id="user-password"
                    type={showPassword ? "text" : "password"}
                    className="input-flushed password-input"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => handleChange("password", e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                <div className="field-hint">
                  <Info size={10} />
                  Mínimo 8 caracteres
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="user-role">
                    <Shield size={12} />
                    Rol
                  </label>
                  <div className="select-wrapper">
                    <select
                      id="user-role"
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
                  <label htmlFor="user-language">
                    <Globe size={12} />
                    Idioma
                  </label>
                  <div className="select-wrapper">
                    <select
                      id="user-language"
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
                <label htmlFor="user-farm">
                  <Building2 size={12} />
                  Nombre de la granja
                </label>
                <input
                  id="user-farm"
                  type="text"
                  className="input-flushed"
                  placeholder="Ej: Granja El Rosal"
                  value={formData.farmName}
                  onChange={e => handleChange("farmName", e.target.value)}
                  autoComplete="organization"
                />
              </div>

              <div className="form-group">
                <label htmlFor="user-location">
                  <MapPin size={12} />
                  Ubicación
                </label>
                <input
                  id="user-location"
                  type="text"
                  className="input-flushed"
                  placeholder="Ej: Antioquia, Colombia"
                  value={formData.location}
                  onChange={e => handleChange("location", e.target.value)}
                  autoComplete="address-level1"
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