<<<<<<< HEAD
import './CultivoCard.css';

export default function CultivoCard({ cultivo }) {
  return (
    <div className="cultivo-card">
=======
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CultivoCard.css";

export default function CultivoCard({ cultivo }) {

  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const goToCultivo = () => {
    navigate(`/cultivos/${cultivo.id}`);
  };

  return (
    <div className="cultivo-card">

>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
      {cultivo.imagen && (
        <img
          src={`http://localhost:3000${cultivo.imagen}`}
          alt={cultivo.nombre}
          className="cultivo-image"
        />
      )}
<<<<<<< HEAD
      <div className="cultivo-content">
        <span className="badge badge-cultivo">{cultivo.nombre}</span>
        <span className="badge badge-source">{cultivo.ubicacion}</span>
      </div>
=======

      <div className="cultivo-content">

        <div className="cultivo-header">
          <span className="badge badge-cultivo">
            {cultivo.nombre}
          </span>

          <span className={`estado estado-${cultivo.estado}`}>
            {cultivo.estado}
          </span>
        </div>

        <span className="badge badge-source">
          📍 {cultivo.ubicacion}
        </span>

        <span className="cultivo-date">
          🌱 Siembra: {formatDate(cultivo.fechaSiembra)}
        </span>

        {cultivo.descripcion && (
          <p className="cultivo-desc">
            {cultivo.descripcion}
          </p>
        )}

        <div className="cultivo-actions">

          <button
            className="btn-secondary"
            onClick={() => setShowInfo(!showInfo)}
          >
            {showInfo ? "Ocultar detalles" : "Ver detalles"}
          </button>

          <button
            className="btn-primary"
            onClick={goToCultivo}
          >
            Ver cultivo
          </button>

        </div>

        {showInfo && (
          <div className="cultivo-extra">

            <p>
              💧 Frecuencia de riego:{" "}
              <strong>{cultivo.frecuenciaRiego} días</strong>
            </p>

            <p>
              📅 Creado: {formatDate(cultivo.createdAt)}
            </p>

          </div>
        )}

      </div>

>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
    </div>
  );
}