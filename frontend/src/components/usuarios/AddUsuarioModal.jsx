import { useState } from "react";
import { X } from "lucide-react";
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
        <div className="modal-header">
          <h2>Nuevo Usuario</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => handleChange("email", e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={formData.password}
              onChange={e => handleChange("password", e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Rol</label>
            <select
              value={formData.role}
              onChange={e => handleChange("role", e.target.value)}
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className="form-group">
            <label>Nombre de la granja</label>
            <input
              type="text"
              value={formData.farmName}
              onChange={e => handleChange("farmName", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Ubicación</label>
            <input
              type="text"
              value={formData.location}
              onChange={e => handleChange("location", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Idioma</label>
            <select
              value={formData.language}
              onChange={e => handleChange("language", e.target.value)}
            >
              <option value="es">Español</option>
              <option value="en">Inglés</option>
            </select>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Crear Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}