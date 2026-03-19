import { useState, useEffect } from "react";
import { getReportesByCultivo, createReporte, updateReporte, removeReporte } from "../../services/reportes.service";
import AddReporteModal from "../../components/cultivo/AddReporteModal";
import EditReporteModal from "../../components/cultivo/EditReporteModal";
import Swal from "sweetalert2";
import { Edit, Trash2 } from "lucide-react";
import "./CultivoDetallePage.css";

export default function CultivoDetallePage({ cultivo }) {

  const [reportes, setReportes] = useState([]);
  const [isReporteOpen, setIsReporteOpen] = useState(false);
  const [reporteToEdit, setReporteToEdit] = useState(null);

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

  const handleDeleteReporte = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar reporte?',
      text: "Esta acción no se puede deshacer. Escribe 'ELIMINAR' para confirmar.",
      icon: 'warning',
      input: 'text',
      inputPlaceholder: "ELIMINAR",
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      didOpen: () => {
        const confirmBtn = Swal.getConfirmButton();
        if (confirmBtn) confirmBtn.disabled = true;
        const input = Swal.getInput();
        if (input) {
          input.addEventListener('input', () => {
            confirmBtn.disabled = input.value !== 'ELIMINAR';
          });
        }
      }
    });

    if (result.isConfirmed && result.value === 'ELIMINAR') {
      try {
        await removeReporte(id);
        setReportes(prev => prev.filter(r => r.id !== id));
        Swal.fire('¡Eliminado!', 'El reporte ha sido eliminado.', 'success');
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al eliminar el reporte.', 'error');
      }
    }
  };

  const handleUpdateReporte = async (id, data) => {
    try {
      await updateReporte(id, data);
      setReportes(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
    } catch (error) {
      console.error("Error actualizando reporte", error);
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

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="reporte-fecha">
                    {formatDate(reporte.createdAt)}
                  </span>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'gray' }} onClick={() => setReporteToEdit(reporte)}>
                      <Edit size={16} />
                    </button>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }} onClick={() => handleDeleteReporte(reporte.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

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

      <EditReporteModal
        isOpen={!!reporteToEdit}
        onClose={() => setReporteToEdit(null)}
        reporte={reporteToEdit}
        onUpdate={handleUpdateReporte}
      />

    </div>
  );

}