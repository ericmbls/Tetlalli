import { useState } from 'react';
import './EditCultivoModal.css';

export default function EditCultivoModal({ isOpen, onClose, cultivo, onSave }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    nombre: cultivo?.nombre || '',
    fechaSiembra: cultivo?.fechaSiembra ? cultivo.fechaSiembra.split('T')[0] : '',
    frecuenciaRiego: cultivo?.frecuenciaRiego || '',
    estado: cultivo?.estado || '',
    imagen: cultivo?.imagen || '',
    file: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imagen: URL.createObjectURL(file), file });
    }
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append('nombre', formData.nombre);
    data.append('fechaSiembra', new Date(formData.fechaSiembra).toISOString());
    data.append('frecuenciaRiego', formData.frecuenciaRiego);
    data.append('estado', formData.estado);
    if (formData.file) {
      data.append('imagen', formData.file);
    }

    await onSave(cultivo.id, data);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{formData.nombre || 'Editar cultivo'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="cultivo-details">
            <div className="cultivo-image">
              <div className="image-container">
                <img
                  src={formData.imagen || 'https://via.placeholder.com/200'}
                  alt={formData.nombre}
                  className="preview-img"
                />
              </div>
              <label className="btn-edit-image">
                🖼️ Cambiar imagen
                <input type="file" accept="image/*" onChange={handleFileChange} hidden />
              </label>
            </div>

            <div className="info-section">
              <h3>Información del cultivo</h3>
              <div className="info-badges">
                <div className="info-item">
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div className="info-item">
                  <label>Fecha de siembra</label>
                  <input
                    type="date"
                    name="fechaSiembra"
                    value={formData.fechaSiembra}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div className="info-item">
                  <label>Frecuencia de riego (días)</label>
                  <input
                    type="number"
                    name="frecuenciaRiego"
                    value={formData.frecuenciaRiego}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div className="info-item">
                  <label>Estado del cultivo</label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                    <option value="cosechado">Cosechado</option>
                    <option value="perdido">Perdido</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-guardar" onClick={handleSave}>💾 Guardar cambios</button>
        </div>
      </div>
    </div>
  );
}