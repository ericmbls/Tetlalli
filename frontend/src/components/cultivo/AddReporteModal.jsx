import { useState } from "react";
import { X, Upload, FileText } from "lucide-react";
import "./AddReporteModal.css";

export default function AddReporteModal({ isOpen, onClose, cultivoId, onSave }) {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    tipo: "OBSERVACION",
    fecha: new Date().toISOString().split("T")[0],
    file: null
  });

  const [errorImg, setErrorImg] = useState("");

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setErrorImg("Formato no válido. Solo JPG, PNG o WEBP.");
      setPreview(null);
      setFormData(prev => ({ ...prev, file: null }));
      return;
    }

    setErrorImg("");
    setPreview(URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      file
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.titulo.trim()) return;
      if (!formData.descripcion.trim()) return;

      setLoading(true);

      const data = new FormData();
      data.append("titulo", formData.titulo);
      data.append("descripcion", formData.descripcion);
      data.append("tipo", formData.tipo);
      data.append("fecha", new Date(formData.fecha).toISOString());
      data.append("cultivoId", String(cultivoId));

      if (formData.file) {
        data.append("imagen", formData.file);
      }

      await onSave(data);

      setFormData({
        titulo: "",
        descripcion: "",
        tipo: "OBSERVACION",
        fecha: new Date().toISOString().split("T")[0],
        file: null
      });

      setPreview(null);
      setErrorImg("");
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content reporte-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="modal-header">
          <FileText size={20} />
          <h2>Nuevo reporte</h2>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Tipo de reporte</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
            >
              <option value="RIEGO">💧 Riego</option>
              <option value="FERTILIZACION">🌱 Fertilización</option>
              <option value="PLAGA">🐛 Plaga</option>
              <option value="COSECHA">🌾 Cosecha</option>
              <option value="OBSERVACION">📝 Observación</option>
            </select>
          </div>

          <div className="form-group">
            <label>Fecha</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              max={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="descripcion"
              rows="4"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Imagen</label>
            <div className="upload-area">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="preview-img"
                />
              ) : (
                <>
                  <Upload size={32} />
                  <span>Subir imagen</span>
                </>
              )}
              {errorImg && <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{errorImg}</div>}
              <input
                type="file"
                accept=".jpg, .jpeg, .png, .webp"
                onChange={handleFile}
              />
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn-save"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Registrar reporte"}
          </button>
        </div>
      </div>
    </div>
  );
}