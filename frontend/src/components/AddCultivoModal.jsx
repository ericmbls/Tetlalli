import React, { useEffect } from "react";
import "./AddCultivoModal.css";

const AddCultivoModal = ({ isOpen, onClose }) => {

  // 🔥 IMPORTANTE: si no está abierto, NO se renderiza
  if (!isOpen) return null;

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >

        {/* BOTÓN CERRAR */}
        <button
          type="button"
          className="close-btn"
          onClick={onClose}
        >
          ×
        </button>

        {/* IMAGEN */}
        <div className="image-section">
          <div className="image-upload">
            <span>Subir imagen</span>
          </div>
        </div>

        {/* FORMULARIO */}
        <form
          className="form-section"
          onSubmit={(e) => e.preventDefault()}
        >

          <div className="form-group">
            <label>Nombre</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Ubicación</label>
            <select>
              <option>Seleccionar invernadero</option>
              <option>Campo Abierto</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Plantado</label>
              <input type="date" />
            </div>

            <div className="form-group">
              <label>Área</label>
              <input type="number" placeholder="m²" />
            </div>
          </div>

          <div className="form-group">
            <label>Cosecha estimada</label>
            <input type="date" />
          </div>

          <div className="form-group">
            <textarea placeholder="Describe el cultivo sembrado"></textarea>
          </div>

          <div className="button-container">
            <button type="submit" className="save-btn">
              Guardar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddCultivoModal;