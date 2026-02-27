import {
  FileText, Calendar, Filter, Download, Share2,
  Droplets, DollarSign, TrendingUp
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './ReportesPage.css';

export default function ReportesPage() {

  const kpis = [
    { title: 'Producción total', value: '2,450 Kg', badge: '+18%', trend: 'positive', sub: 'Este mes', icon: <SproutIcon /> },
    { title: 'Ahorro de Agua', value: '2,660 L', badge: '-22%', trend: 'negative', sub: 'Este mes', icon: <Droplets size={20} color="#0EA5E9" /> },
    { title: 'Ingresos', value: '$18,450', badge: '+24%', trend: 'positive', sub: 'Este mes', icon: <DollarSign size={20} color="#16A34A" /> },
    { title: 'Eficiencia', value: '94%', badge: '+12%', trend: 'positive', sub: 'Promedio general', icon: <TrendingUp size={20} color="#EA580C" /> },
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
    <div className="reportes-content">

      <div className="page-header-row">
        <div>
          <h1 className="page-title">Reportes y Análisis</h1>
          <p className="page-subtitle">
            Genera y consulta reportes del sistema
          </p>
        </div>
        <button type="button" className="btn-primary" aria-label="Generar reporte">
          <FileText size={18} style={{ marginRight: 8 }} />
          Generar Reporte
        </button>
      </div>

      <div className="kpi-row">
        {kpis.map((kpi, index) => (
          <div key={index} className={`kpi-card-report animate-slide-up card-hover-effect delay-${(index % 4 + 1) * 100}`} role="group" aria-label={kpi.title}>
            <div className="kpi-top">
              <div className="kpi-icon-wrapper">
                {kpi.icon}
              </div>
              {kpi.badge && (
                <span className={`kpi-badge ${kpi.trend === 'positive' ? 'positive' : 'negative'}`}>
                  {kpi.badge}
                </span>
              )}
            </div>
            <div className="kpi-content">
              <span className="kpi-label">{kpi.title}</span>
              <h3 className="kpi-number">{kpi.value}</h3>
              <span className="kpi-sub-text">{kpi.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-card-section animate-slide-up delay-200">
        <div className="chart-controls">
          <div className="chart-tabs">
            <button type="button" className="chart-tab active" aria-pressed="true">Producción</button>
            <button type="button" className="chart-tab" aria-pressed="false">Consumo de Agua</button>
            <button type="button" className="chart-tab" aria-pressed="false">Financiero</button>
          </div>
          <div className="chart-actions">
            <button type="button" className="btn-secondary" aria-label="Seleccionar rango">
              <Calendar size={14} /> Rango
            </button>
            <button type="button" className="btn-secondary" aria-label="Abrir filtros">
              <Filter size={14} /> Filtros
            </button>
            <button type="button" className="btn-secondary" aria-label="Exportar reporte">
              <Download size={14} /> Exportar
            </button>
          </div>
        </div>

        <h3 className="chart-title">
          Producción por Cultivo
        </h3>

        <div className="chart-legend" role="list" aria-label="Leyenda de cultivos">
          <LegendItem color="#F472B6" label="Fresa" />
          <LegendItem color="#4ADE80" label="Lechuga" />
          <LegendItem color="#FCD34D" label="Pimiento" />
          <LegendItem color="#EF4444" label="Tomate" />
        </div>

        <div style={{ width: '100%', height: 300, marginTop: '20px' }}>
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              barSize={12}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 13, fontWeight: 600 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 13 }} />
              <Tooltip
                cursor={{ fill: '#f3f4f6' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="fresa" fill="#F472B6" radius={[4, 4, 0, 0]} name="Fresa" />
              <Bar dataKey="lechuga" fill="#4ADE80" radius={[4, 4, 0, 0]} name="Lechuga" />
              <Bar dataKey="pimiento" fill="#FCD34D" radius={[4, 4, 0, 0]} name="Pimiento" />
              <Bar dataKey="tomate" fill="#EF4444" radius={[4, 4, 0, 0]} name="Tomate" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="reportes-list-section animate-slide-up delay-300">
        <h3>Reportes Generados</h3>
        <p className="page-subtitle" style={{ marginTop: 6 }}>Últimos {reportes.length} reportes</p>

        <div className="reportes-stack">
          {reportes.map((rep) => (
            <div key={rep.id} className="reporte-item card-hover-effect" role="listitem" tabIndex={0} aria-label={rep.title}>
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
                    <button type="button" className="btn-action-text" aria-label={`Compartir ${rep.title}`}>
                      <Share2 size={16} /> Compartir
                    </button>
                    <button type="button" className="btn-action-text" aria-label={`Descargar ${rep.title}`}>
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
}