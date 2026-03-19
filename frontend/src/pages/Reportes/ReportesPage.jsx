import { useState, useEffect } from "react";
import axios from "axios";
import {
  FileText,
  Download,
  Share2,
  Calendar,
  MapPin,
  User,
  Tag
} from "lucide-react";
import "./ReportesPage.css";

export default function ReportesPage() {
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const API = "http://localhost:3000/api/reportes";

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const repRes = await axios.get(`${API}/list`);
        setReportes(repRes.data || []);
      } catch (err) {
        console.error("Error cargando reportes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportes();
  }, []);

  const descargarReporte = async (id) => {
    try {
      const res = await axios.get(`${API}/${id}/descargar`, {
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `reporte-${id}.pdf`);

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error descargando reporte", error);
    }
  };

  const filteredReportes = filter === "todos"
    ? reportes
    : reportes.filter(rep => rep.type?.toLowerCase() === filter);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const totalPages = Math.ceil(filteredReportes.length / itemsPerPage);
  const currentReportes = filteredReportes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando reportes...</p>
      </div>
    );
  }

  return (
    <div className="reportes-container">
      <div className="reportes-header">
        <div>
          <h1 className="reportes-title">Reportes del Sistema</h1>
          <p className="reportes-subtitle">Consulta y descarga reportes generados</p>
        </div>
      </div>

      <div className="reportes-filters">
        <button
          className={`filter-chip ${filter === "todos" ? "active" : ""}`}
          onClick={() => setFilter("todos")}
        >
          Todos
        </button>
        <button
          className={`filter-chip ${filter === "riego" ? "active" : ""}`}
          onClick={() => setFilter("riego")}
        >
          Riego
        </button>
        <button
          className={`filter-chip ${filter === "fertilizacion" ? "active" : ""}`}
          onClick={() => setFilter("fertilizacion")}
        >
          Fertilización
        </button>
        <button
          className={`filter-chip ${filter === "plaga" ? "active" : ""}`}
          onClick={() => setFilter("plaga")}
        >
          Plaga
        </button>
        <button
          className={`filter-chip ${filter === "cosecha" ? "active" : ""}`}
          onClick={() => setFilter("cosecha")}
        >
          Cosecha
        </button>
        <button
          className={`filter-chip ${filter === "observacion" ? "active" : ""}`}
          onClick={() => setFilter("observacion")}
        >
          Observación
        </button>
      </div>

      <div className="reportes-stats">
        <div className="stat-item">
          <span className="stat-label">Total reportes</span>
          <span className="stat-value">{filteredReportes.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Este mes</span>
          <span className="stat-value">
            {filteredReportes.filter(r => {
              const fecha = new Date(r.date.split('/').reverse().join('-') || r.date);
              // Try to parse since date comes as a localized string from backend getList()
              const hoy = new Date();
              return !isNaN(fecha) && fecha.getMonth() === hoy.getMonth() && fecha.getFullYear() === hoy.getFullYear();
            }).length}
          </span>
        </div>
      </div>

      <div className="reportes-grid">
        {currentReportes.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} className="empty-icon" />
            <h3>No hay reportes</h3>
            <p>No se encontraron reportes con los filtros seleccionados</p>
          </div>
        ) : (
          currentReportes.map((rep) => (
            <div key={rep.id} className="reporte-card">
              <div className="reporte-card-header">
                <div className="reporte-type-badge" data-type={rep.type?.toLowerCase()}>
                  {rep.type === "RIEGO"}
                  {rep.type === "FERTILIZACION"}
                  {rep.type === "PLAGA"}
                  {rep.type === "COSECHA"}
                  {rep.type === "OBSERVACION"}
                  <span>{rep.type}</span>
                </div>
                <span className="reporte-date">
                  <Calendar size={12} />
                  {rep.date}
                </span>
              </div>

              <h3 className="reporte-card-title">{rep.title}</h3>

              {rep.cultivo && (
                <div className="reporte-cultivo">
                  <Tag size={12} />
                  <span>{rep.cultivo}</span>
                </div>
              )}

              {rep.descripcion && (
                <p className="reporte-descripcion">{rep.descripcion}</p>
              )}

              <div className="reporte-card-footer">
                <div className="reporte-meta">
                  <User size={12} />
                  <span>{rep.autor || "Sistema"}</span>
                  <span className="meta-separator">·</span>
                  <span>{rep.size || "2.4 MB"}</span>
                </div>

                <div className="reporte-card-actions">
                  <button
                    className="btn-icon"
                    onClick={() => descargarReporte(rep.id)}
                    title="Descargar"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    className="btn-icon"
                    onClick={() => {/* compartir */ }}
                    title="Compartir"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              {rep.status === "processing" && (
                <div className="reporte-processing">
                  <div className="processing-spinner"></div>
                  <span>Procesando...</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', gap: '15px' }}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ddd', background: currentPage === 1 ? '#eee' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
          >
            Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ddd', background: currentPage === totalPages ? '#eee' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}