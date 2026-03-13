import { useState } from "react";
import { Upload, X, ChevronDown, MapPin, Calendar, FileText, Info } from "lucide-react";
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
      <div className="modal-content cultivo-card" onClick={e => e.stopPropagation()}>
        
        <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
          <X size={16} />
        </button>

        <div className="cultivo-card-header">
          <h2>Nuevo cultivo</h2>
          <span className="cultivo-badge">Registro</span>
        </div>

        <div className="modal-body">

          <div className="left-column">
            <div className={`image-upload-area ${formData.imagen ? "has-image" : ""}`}>
              
              {formData.imagen ? (
                <img
                  src={URL.createObjectURL(formData.imagen)}
                  alt="preview"
                />
              ) : (
                <>
                  <Upload className="upload-icon" size={40} strokeWidth={1.5} />
                  <span className="upload-text">Subir imagen</span>
                  <span className="upload-hint">
                    <Info size={10} />
                    PNG, JPG hasta 5MB
                  </span>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={e => handleChange("imagen", e.target.files[0])}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>

          <div className="right-column">

            <div className="form-group">
              <label>
                <FileText size={12} />
                Nombre del cultivo
              </label>
              <input
                type="text"
                className="input-flushed"
                placeholder="Ej: Tomates Cherry"
                value={formData.nombre}
                onChange={e => handleChange("nombre", e.target.value)}
              />
              <div className="field-hint">
                <Info size={10} />
                Máximo 50 caracteres
              </div>
            </div>

            <div className="form-group">
              <label>
                <MapPin size={12} />
                Ubicación
              </label>
              <div className="select-wrapper">
                <select
                  value={formData.ubicacion}
                  onChange={e => handleChange("ubicacion", e.target.value)}
                >
                  <option value="">Seleccionar invernadero</option>
                  <option value="Invernadero A">Invernadero A</option>
                  <option value="Invernadero B">Invernadero B</option>
                  <option value="Campo Abierto">Campo Abierto</option>
                </select>
                <ChevronDown className="select-arrow" size={14} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <Calendar size={12} />
                  Fecha siembra
                </label>
                <input
                  type="date"
                  className="input-flushed"
                  value={formData.fechaSiembra}
                  onChange={e => handleChange("fechaSiembra", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>
                  <Calendar size={12} />
                  Tipo
                </label>
                <div className="select-wrapper">
                  <select defaultValue="hortaliza">
                    <option value="hortaliza">Hortaliza</option>
                    <option value="fruta">Fruta</option>
                    <option value="verdura">Verdura</option>
                    <option value="flor">Flor</option>
                  </select>
                  <ChevronDown className="select-arrow" size={14} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>
                <FileText size={12} />
                Descripción
              </label>
              <textarea
                className="textarea-bordered"
                placeholder="Describe el cultivo sembrado, variedad, características..."
                rows={3}
                value={formData.descripcion}
                onChange={e => handleChange("descripcion", e.target.value)}
              />
            </div>

            <div className="modal-actions">
              <button className="btn-save" onClick={handleSave}>
                <span>Guardar cultivo</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}