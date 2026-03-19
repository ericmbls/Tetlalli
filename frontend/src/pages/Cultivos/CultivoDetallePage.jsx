import { useState, useEffect } from "react";
import { getReportesByCultivo, createReporte } from "../../services/reportes.service";
import AddReporteModal from "../../components/cultivo/AddReporteModal";
import "./CultivoDetallePage.css";

export default function CultivoDetallePage({ cultivo }) {

  const [reportes, setReportes] = useState([]);
  const [isReporteOpen, setIsReporteOpen] = useState(false);

  if (!cultivo) {
    return (
      <div className="cultivo-detalle-empty">
        <h2>No hay cultivo seleccionado</h2>
        <p>Selecciona un cultivo para ver su información.</p>
      </div>
    );
  }

  useEffect(() => {

    const loadReportes = async () => {

      try {

        const data = await getReportesByCultivo(cultivo.id);
        setReportes(data);

      } catch (error) {

        console.error("Error cargando reportes", error);

      }

    };

    loadReportes();

  }, [cultivo]);

  const handleCreateReporte = async (formData) => {

    try {

      const nuevo = await createReporte(formData);

      setReportes(prev => [nuevo, ...prev]);

    } catch (error) {

      console.error("Error creando reporte", error);

    }

  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="cultivo-detalle-container">

      <div className="cultivo-detalle-header">

        <h1>{cultivo.nombre}</h1>

        <span className={`estado estado-${cultivo.estado}`}>
          {cultivo.estado}
        </span>

      </div>

      <div className="cultivo-detalle-info">

        {cultivo.imagen && (
          <img
            src={`http://localhost:3000${cultivo.imagen}`}
            alt={cultivo.nombre}
            className="cultivo-detalle-img"
          />
        )}

        <div className="cultivo-detalle-data">

          <p>
            <strong>Ubicación:</strong> {cultivo.ubicacion}
          </p>

          <p>
            <strong>Fecha de siembra:</strong>{" "}
            {formatDate(cultivo.fechaSiembra)}
          </p>

          <p>
            <strong>Frecuencia de riego:</strong>{" "}
            {cultivo.frecuenciaRiego} días
          </p>

          {cultivo.descripcion && (
            <p>
              <strong>Descripción:</strong> {cultivo.descripcion}
            </p>
          )}

        </div>

      </div>

      <div className="bitacora-section">

        <div className="bitacora-header">

          <h2>Bitácora del cultivo</h2>

          <button
            className="btn-add-reporte"
            onClick={() => setIsReporteOpen(true)}
          >
            + Registrar reporte
          </button>

        </div>

        {reportes.length === 0 ? (

          <div className="bitacora-empty">
            <p>No hay reportes registrados aún.</p>
          </div>

        ) : (

          <div className="reportes-list">

            {reportes.map((reporte) => (

              <div key={reporte.id} className="reporte-card">

                <span className="reporte-fecha">
                  {formatDate(reporte.createdAt)}
                </span>

                <h4>{reporte.titulo}</h4>

                <p>{reporte.descripcion}</p>

              </div>

            ))}

          </div>

        )}

      </div>

      <AddReporteModal
        isOpen={isReporteOpen}
        onClose={() => setIsReporteOpen(false)}
        cultivoId={cultivo.id}
        onSave={handleCreateReporte}
      />

    </div>
  );

}