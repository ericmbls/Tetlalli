import { useState } from "react";
<<<<<<< HEAD
import { X, User, Mail, Lock, Shield, Building2, MapPin, Globe, Info } from "lucide-react";
=======
import { X, User, Mail, Lock, Shield, Building2, MapPin, Globe, Info, Eye, EyeOff } from "lucide-react";
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
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

<<<<<<< HEAD
=======
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

<<<<<<< HEAD
=======
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
    handleChange("avatar", file);
  };

>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
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
<<<<<<< HEAD
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
=======
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
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
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
<<<<<<< HEAD
                <label>
=======
                <label htmlFor="user-name">
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                  <User size={12} />
                  Nombre completo
                </label>
                <input
<<<<<<< HEAD
=======
                  id="user-name"
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                  type="text"
                  className="input-flushed"
                  placeholder="Ej: Juan Pérez"
                  value={formData.name}
                  onChange={e => handleChange("name", e.target.value)}
<<<<<<< HEAD
=======
                  autoComplete="name"
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                  required
                />
              </div>

              <div className="form-group">
<<<<<<< HEAD
                <label>
=======
                <label htmlFor="user-email">
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                  <Mail size={12} />
                  Correo electrónico
                </label>
                <input
<<<<<<< HEAD
=======
                  id="user-email"
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                  type="email"
                  className="input-flushed"
                  placeholder="usuario@ejemplo.com"
                  value={formData.email}
                  onChange={e => handleChange("email", e.target.value)}
<<<<<<< HEAD
=======
                  autoComplete="email"
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                  required
                />
              </div>

<<<<<<< HEAD
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
=======
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
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                <div className="field-hint">
                  <Info size={10} />
                  Mínimo 8 caracteres
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
<<<<<<< HEAD
                  <label>
=======
                  <label htmlFor="user-role">
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                    <Shield size={12} />
                    Rol
                  </label>
                  <div className="select-wrapper">
                    <select
<<<<<<< HEAD
=======
                      id="user-role"
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
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
<<<<<<< HEAD
                  <label>
=======
                  <label htmlFor="user-language">
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                    <Globe size={12} />
                    Idioma
                  </label>
                  <div className="select-wrapper">
                    <select
<<<<<<< HEAD
=======
                      id="user-language"
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
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
<<<<<<< HEAD
                <label>
=======
                <label htmlFor="user-farm">
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                  <Building2 size={12} />
                  Nombre de la granja
                </label>
                <input
<<<<<<< HEAD
=======
                  id="user-farm"
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                  type="text"
                  className="input-flushed"
                  placeholder="Ej: Granja El Rosal"
                  value={formData.farmName}
                  onChange={e => handleChange("farmName", e.target.value)}
<<<<<<< HEAD
=======
                  autoComplete="organization"
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                />
              </div>

              <div className="form-group">
<<<<<<< HEAD
                <label>
=======
                <label htmlFor="user-location">
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                  <MapPin size={12} />
                  Ubicación
                </label>
                <input
<<<<<<< HEAD
=======
                  id="user-location"
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                  type="text"
                  className="input-flushed"
                  placeholder="Ej: Antioquia, Colombia"
                  value={formData.location}
                  onChange={e => handleChange("location", e.target.value)}
<<<<<<< HEAD
=======
                  autoComplete="address-level1"
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
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