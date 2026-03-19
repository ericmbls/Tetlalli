<<<<<<< HEAD
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
=======
import { useState, useEffect } from 'react';
import { X, Upload, MapPin, Calendar, Droplets, Activity } from 'lucide-react';
import './EditCultivoModal.css';

export default function EditCultivoModal({
  isOpen,
  onClose,
  cultivo,
  onSave,
  onDelete,
  userRole
}) {

  const [formData, setFormData] = useState({
    nombre: '',
    fechaSiembra: '',
    frecuenciaRiego: '',
    estado: '',
    ubicacion: '',
    descripcion: '',
    file: null,
  });

  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {

    if (cultivo) {

      setFormData({
        nombre: cultivo.nombre || '',
        fechaSiembra: cultivo.fechaSiembra
          ? cultivo.fechaSiembra.split('T')[0]
          : '',
        frecuenciaRiego: cultivo.frecuenciaRiego || '',
        estado: cultivo.estado || '',
        ubicacion: cultivo.ubicacion || '',
        descripcion: cultivo.descripcion || '',
        file: null,
      });

      if (cultivo.imagen) {
        setPreviewUrl(`http://localhost:3000${cultivo.imagen}`);
      } else {
        setPreviewUrl('');
      }

    }

  }, [cultivo]);

  if (!isOpen) return null;

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };

  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setPreviewUrl(url);

    setFormData(prev => ({
      ...prev,
      file
    }));

  };

  const handleSave = async () => {

    if (!formData.nombre || !formData.fechaSiembra) {
      alert("Completa los campos obligatorios");
      return;
    }

    const data = new FormData();

>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
    data.append('nombre', formData.nombre);
    data.append('fechaSiembra', new Date(formData.fechaSiembra).toISOString());
    data.append('frecuenciaRiego', formData.frecuenciaRiego);
    data.append('estado', formData.estado);
<<<<<<< HEAD
=======
    data.append('ubicacion', formData.ubicacion);
    data.append('descripcion', formData.descripcion);

>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
    if (formData.file) {
      data.append('imagen', formData.file);
    }

    await onSave(cultivo.id, data);
<<<<<<< HEAD
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
=======

    onClose();

  };

  const handleDelete = async () => {

    if (!window.confirm("¿Seguro que deseas eliminar este cultivo?")) return;

    await onDelete(cultivo.id);

    onClose();

  };

  return (

    <div className="modal-overlay" onClick={onClose}>

      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <X size={20} strokeWidth={2} />
        </button>

        <div className="cultivo-card-header">
          <h2>Editar cultivo</h2>
          <span className="cultivo-badge">Edición</span>
        </div>

        <div className="modal-body">

          <div className="left-column">

            <div className={`image-upload-area ${previewUrl ? 'has-image' : ''}`}>

              {previewUrl ? (
                <img src={previewUrl} alt="preview" />
              ) : (
                <>
                  <Upload className="upload-icon" size={40} strokeWidth={1.5} />
                  <span className="upload-text">Subir imagen</span>
                  <span className="upload-hint">PNG, JPG hasta 5MB</span>
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
                  height: '100%',
                }}
              />

            </div>

          </div>

          <div className="right-column">

            <div className="form-group">
              <label>Nombre del cultivo</label>
              <input
                type="text"
                name="nombre"
                className="input-flushed"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">

              <label>
                <MapPin size={12} />
                Ubicación
              </label>

              <select
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
              >
                <option value="">Seleccionar ubicación</option>
                <option value="Invernadero A">Invernadero A</option>
                <option value="Invernadero B">Invernadero B</option>
                <option value="Campo Abierto">Campo Abierto</option>
              </select>

            </div>

            <div className="form-row">

              <div className="form-group">

                <label>
                  <Calendar size={12} />
                  Fecha siembra
                </label>

                <input
                  type="date"
                  name="fechaSiembra"
                  value={formData.fechaSiembra}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>
                  <Droplets size={12} />
                  Riego (días)
                </label>

                <input
                  type="number"
                  name="frecuenciaRiego"
                  value={formData.frecuenciaRiego}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="form-group">

              <label>
                <Activity size={12} />
                Estado
              </label>

              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="">Seleccionar...</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="cosechado">Cosechado</option>
                <option value="perdido">Perdido</option>
              </select>

            </div>

            <div className="form-group">

              <label>Descripción</label>

              <textarea
                name="descripcion"
                rows={3}
                value={formData.descripcion}
                onChange={handleChange}
              />

            </div>

            <div className="modal-actions">

              <button
                className="btn-save"
                onClick={handleSave}
              >
                Guardar cambios
              </button>

              {userRole === "admin" && (
                <button
                  className="btn-delete"
                  onClick={handleDelete}
                >
                  Borrar cultivo
                </button>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
}