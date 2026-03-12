import { useState, useEffect } from "react";
import { X, Mail, Shield, Info } from "lucide-react";
import "./EditUsuarioModal.css";

export default function EditUsuarioModal({ isOpen, onClose, onSave, user }) {
  const [form, setForm] = useState({
    email: "",
    role: "USER"
  });

  useEffect(() => {
    if (user) {
      setForm({
        email: user.email || "",
        role: user.role || "USER"
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
          <X size={16} />
        </button>
        
        <h2>Editar usuario</h2>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="left-column">
              <div className="image-upload-area">
                <div className="upload-icon">
                  <Mail size={40} strokeWidth={1.5} />
                </div>
                <span className="upload-text">Foto de perfil</span>
                <span className="upload-hint">
                  <Info size={10} />
                  Sin cambios
                </span>
              </div>
            </div>

            <div className="right-column">
              <div className="form-group">
                <label>
                  <Mail size={12} />
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  className="input-flushed"
                  placeholder="usuario@ejemplo.com"
                  value={form.email}
                  onChange={handleChange}
                />
                <div className="field-hint">
                  <Info size={10} />
                  Email del usuario
                </div>
              </div>

              <div className="form-group">
                <label>
                  <Shield size={12} />
                  Rol del usuario
                </label>
                <div className="select-wrapper">
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                  >
                    <option value="USER">Usuario</option>
                    <option value="ADMIN">Administrador</option>
                  </select>
                  <svg className="select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
                <div className="field-hint">
                  <Info size={10} />
                  Define los permisos del usuario
                </div>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn-save">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}