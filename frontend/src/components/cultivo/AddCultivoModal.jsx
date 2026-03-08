import { useState } from "react";
import { Upload, X, ChevronDown } from "lucide-react";
import "./AddCultivoModal.css";

export default function AddCultivoModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    nombre: "",
    ubicacion: "",
    fechaSiembra: "",
    descripcion: "",
    imagen: null,
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const { nombre, fechaSiembra, ubicacion, descripcion, imagen } = formData;
    if (!nombre || !fechaSiembra) return;

    const data = new FormData();
    data.append("nombre", nombre);
    data.append("descripcion", descripcion);
    data.append("ubicacion", ubicacion || "Sin ubicación");
    data.append("fechaSiembra", new Date(fechaSiembra).toISOString());
    data.append("frecuenciaRiego", "2");
    data.append("estado", "activo");
    data.append("userId", "1");
    if (imagen) data.append("imagen", imagen);

    onSave(data);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Nuevo cultivo</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="left-column">
            <div className="image-upload-area">
              <Upload size={32} strokeWidth={1.5} />
              <span>Subir imagen</span>
              <input
                type="file"
                accept="image/*"
                onChange={e => handleChange("imagen", e.target.files[0])}
              />
            </div>
          </div>

          <div className="right-column">
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                className="input-flushed"
                value={formData.nombre}
                onChange={e => handleChange("nombre", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Ubicación</label>
              <div className="select-wrapper">
                <select
                  className="input-flushed"
                  value={formData.ubicacion}
                  onChange={e => handleChange("ubicacion", e.target.value)}
                >
                  <option value="">Seleccionar invernadero</option>
                  <option value="Invernadero A">Invernadero A</option>
                  <option value="Invernadero B">Invernadero B</option>
                  <option value="Campo Abierto">Campo Abierto</option>
                </select>
                <ChevronDown size={16} className="select-arrow" />
              </div>
            </div>

            <div className="form-group">
              <label>Plantado</label>
              <input
                type="date"
                className="input-flushed"
                value={formData.fechaSiembra}
                onChange={e => handleChange("fechaSiembra", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea
                className="textarea-bordered"
                placeholder="Describe el cultivo sembrado"
                value={formData.descripcion}
                onChange={e => handleChange("descripcion", e.target.value)}
              />
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={onClose}>
                Cancelar
              </button>
              <button className="btn-save" onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}