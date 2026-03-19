<<<<<<< HEAD
import {
  FileText, Calendar, Filter, Download, Share2,
  Droplets, DollarSign, TrendingUp
} from 'lucide-react';
import './ReportesPage.css';

export default function ReportesPage() {

  const kpis = [
    { title: 'Producción total', value: '2,450 Kg', badge: '+18%', sub: 'Este mes', icon: <SproutIcon /> },
    { title: 'Ahorro de Agua', value: '2,660 L', badge: '-22%', sub: 'Este mes', icon: <Droplets size={20} color="#0EA5E9" /> },
    { title: 'Ingresos', value: '$18,450', badge: '+24%', sub: 'Este mes', icon: <DollarSign size={20} color="#16A34A" /> },
    { title: 'Eficiencia', value: '94%', badge: '+12%', sub: 'Promedio general', icon: <TrendingUp size={20} color="#EA580C" /> },
  ];

  const chartData = [
    { month: 'Agos', fresa: 60, lechuga: 70, pimiento: 72, tomate: 75 },
    { month: 'Sep', fresa: 62, lechuga: 68, pimiento: 65, tomate: 70 },
    { month: 'Oct', fresa: 0, lechuga: 0, pimiento: 0, tomate: 0 },
    { month: 'Dic', fresa: 60, lechuga: 70, pimiento: 68, tomate: 74 },
  ];

  const reportes = [
    { id: 1, title: 'Reporte Semanal de Producción', date: '1 Feb 2026', type: 'Producción', size: '1.8 MB', status: 'ready' },
    { id: 2, title: 'Análisis de Consumo de Agua - Enero', date: '1 Feb 2026', type: 'Recursos', size: '1.8 MB', status: 'ready' },
    { id: 3, title: 'Estado de Salud de Cultivos', date: '31 Ene 2026', type: 'Agronómico', size: '3.2 MB', status: 'ready' },
    { id: 4, title: 'Informe Financiero Q4 2025', date: '28 Ene 2026', type: 'Financiero', size: '4.5 MB', status: 'ready' },
    { id: 5, title: 'Reporte de Inventario', date: '25 Ene 2026', type: 'Enero', size: 'Procesando', status: 'processing' },
  ];

  return (
    <div className="dashboard-content">

      <div className="page-header-row">
        <div>
          <h1 className="page-title">Reportes y Análisis</h1>
          <p className="page-subtitle">
            Genera y consulta reportes del sistema
          </p>
        </div>
        <button className="btn-primary">
          <FileText size={18} style={{ marginRight: 8 }} />
          Generar Reporte
        </button>
      </div>

      <div className="kpi-row">
        {kpis.map((kpi, index) => (
          <div key={index} className="kpi-card-report">
            <div className="kpi-top">
              <div className="kpi-icon-wrapper">
                {kpi.icon}
              </div>
              <span className="kpi-badge">
                {kpi.badge}
              </span>
            </div>
            <div className="kpi-content">
              <span className="kpi-label">{kpi.title}</span>
              <h3 className="kpi-number">{kpi.value}</h3>
              <span className="kpi-sub-text">{kpi.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-card-section">
        <div className="chart-controls">
          <div className="chart-tabs">
            <button className="chart-tab active">Producción</button>
            <button className="chart-tab">Consumo de Agua</button>
            <button className="chart-tab">Financiero</button>
          </div>
          <div className="chart-actions">
            <button className="btn-secondary">
              <Calendar size={14} /> Rango
            </button>
            <button className="btn-secondary">
              <Filter size={14} /> Filtros
            </button>
            <button className="btn-secondary">
              <Download size={14} /> Exportar
            </button>
          </div>
        </div>

        <h3 className="chart-title">
          Producción por Cultivo
        </h3>

        <div className="chart-legend">
          <LegendItem color="#F472B6" label="Fresa" />
          <LegendItem color="#4ADE80" label="Lechuga" />
          <LegendItem color="#FCD34D" label="Pimiento" />
          <LegendItem color="#EF4444" label="Tomate" />
        </div>

        <div className="bar-chart-container">
          {chartData.map((data, i) => (
            <div key={i} className="chart-group">
              {data.fresa > 0 ? (
                <div className="bars-wrapper">
                  <div className="bar" style={{ height: `${data.fresa}%`, background: '#F472B6' }} />
                  <div className="bar" style={{ height: `${data.lechuga}%`, background: '#4ADE80' }} />
                  <div className="bar" style={{ height: `${data.pimiento}%`, background: '#FCD34D' }} />
                  <div className="bar" style={{ height: `${data.tomate}%`, background: '#EF4444' }} />
                </div>
              ) : (
                <div className="bars-empty" />
              )}
              <span className="chart-label">
                {data.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="reportes-list-section">
        <h3>Reportes Generados</h3>

        <div className="reportes-stack">
          {reportes.map((rep) => (
            <div key={rep.id} className="reporte-item">
              <div className="reporte-left">
                <div className="file-icon-wrapper">
                  <FileText size={24} color="#8B6F47" />
                </div>
                <div className="reporte-details">
                  <h4>{rep.title}</h4>
                  <p>{rep.date} · {rep.type} · {rep.size}</p>
                </div>
              </div>

              <div className="reporte-actions">
                {rep.status === 'processing' ? (
                  <button className="btn-processing">
                    Procesando...
                  </button>
                ) : (
                  <>
                    <button className="btn-action-text">
                      <Share2 size={16} /> Compartir
                    </button>
                    <button className="btn-action-text">
                      <Download size={16} /> Descargar
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="legend-item">
      <span className="dot" style={{ background: color }} />
      <span>{label}</span>
    </div>
  );
}

function SproutIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#65A30D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 4.5-5.9 3.2-8 5.6-2.5-3 .9-6 4-9z" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1.7-2.2 1.3-5-2-6-1.5-.7-3.4.4-1.2 3.4z" />
    </svg>
  );
=======
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
          <span className="stat-value">{reportes.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Este mes</span>
          <span className="stat-value">
            {reportes.filter(r => {
              const fecha = new Date(r.date);
              const hoy = new Date();
              return fecha.getMonth() === hoy.getMonth() && fecha.getFullYear() === hoy.getFullYear();
            }).length}
          </span>
        </div>
      </div>

      <div className="reportes-grid">
        {filteredReportes.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} className="empty-icon" />
            <h3>No hay reportes</h3>
            <p>No se encontraron reportes con los filtros seleccionados</p>
          </div>
        ) : (
          filteredReportes.map((rep) => (
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
                    onClick={() => {/* compartir */}}
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
    </div>
  );
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
}