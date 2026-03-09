import { useState, useEffect } from 'react';
import {
  Sprout, AlertCircle, Download, Activity,
  Droplets, CloudSun, CloudRain, Sun
} from 'lucide-react';
import AddCultivoModal from '../../components/cultivo/AddCultivoModal';
import './DashboardPage.css';

export default function DashboardPage() {

  const [showAddModal, setShowAddModal] = useState(false);
  const [kpis, setKpis] = useState([]);
  const [zonasCultivo, setZonasCultivo] = useState([]);

  const pronostico = [
    { day: 'Lun', icon: <Sun size={18} color="#F59E0B" />, temp: '24°' },
    { day: 'Mar', icon: <CloudSun size={18} color="#78716c" />, temp: '22°' },
    { day: 'Mié', icon: <CloudRain size={18} color="#78716c" />, temp: '20°' },
    { day: 'Jue', icon: <Sun size={18} color="#F59E0B" />, temp: '23°' },
    { day: 'Vie', icon: <Sun size={18} color="#F59E0B" />, temp: '25°' },
  ];

  const heatmapZones = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    status: 'ok'
  }));

  useEffect(() => {
    fetch("http://localhost:3000/api/cultivos")
      .then(res => res.json())
      .then(data => {

        const alertas = data.filter(
          c => c.humedad < 60 || c.temperatura > 30
        ).length;

        setKpis([
          {
            title: 'Total de cultivos',
            value: data.length,
            sub: 'Registrados',
            icon: <Sprout size={20} />,
            status: 'neutral'
          },
          {
            title: 'Alertas Activas',
            value: alertas,
            sub: 'Ver Alertas',
            icon: <AlertCircle size={20} />,
            status: alertas > 0 ? 'danger' : 'neutral'
          },
          {
            title: 'Estado del Sistema',
            value: '98%',
            sub: 'Operativo',
            icon: <Download size={20} />,
            status: 'success'
          },
          {
            title: 'Salud Promedio',
            value: '94%',
            sub: 'Excelente',
            icon: <Activity size={20} />,
            status: 'success'
          },
        ]);

        const zonas = data.map(c => ({
          id: c.id,
          name: c.nombre,
          lugar: c.lugar,
          humedad: `${c.humedad}%`,
          temp: `${c.temperatura}°C`,
          status: c.humedad < 60 || c.temperatura > 30 ? 'alert' : 'ok'
        }));

        setZonasCultivo(zonas);

      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <div className="dashboard-content">

        <section className="kpi-grid">
          {kpis.map(kpi => (
            <div key={kpi.title} className={`kpi-card ${kpi.status}`}>
              <div className="kpi-header">
                <span>{kpi.title}</span>
                <div className="kpi-icon">{kpi.icon}</div>
              </div>
              <div className="kpi-value">{kpi.value}</div>
              <div className={`kpi-sub ${kpi.status}`}>{kpi.sub}</div>
            </div>
          ))}
        </section>

        <section className="middle-section">

          <div className="heatmap-card">
            <h3>Mapa de Calor</h3>
            <div className="heatmap-grid">
              {heatmapZones.map(zone => (
                <div key={zone.id} className={`heatmap-zone zone-${zone.status}`}>
                  Zona {zone.id}
                </div>
              ))}
            </div>
          </div>

          <div className="forecast-card">
            <h3>Pronóstico</h3>
            <div className="forecast-list">
              {pronostico.map(day => (
                <div key={day.day} className="forecast-item">
                  <span>{day.day}</span>
                  <div className="forecast-icon">{day.icon}</div>
                  <span className="forecast-temp">{day.temp}</span>
                </div>
              ))}
            </div>
          </div>

        </section>

        <section className="zones-section">
          {zonasCultivo.map(zona => (
            <div
              key={zona.id}
              className={`zone-card ${zona.status === 'alert' ? 'zone-alert-border' : ''}`}
            >
              <div className="zone-header">
                <div>
                  <h4>{zona.name}</h4>
                  <span className="zone-location">{zona.lugar}</span>
                </div>
                {zona.status === 'ok'
                  ? <span className="check-icon">✓</span>
                  : <AlertCircle size={18} className="alert-icon-red" />
                }
              </div>

              <div className="zone-metrics">
                <div className="z-metric">
                  <Droplets size={14} />
                  <span>Humedad</span>
                  <strong>{zona.humedad}</strong>
                </div>
                <div className="z-metric">
                  <CloudSun size={14} />
                  <span>Temperatura</span>
                  <strong>{zona.temp}</strong>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="chart-section">
          <div className="chart-header">
            <h3>Caudal Actual</h3>
            <div className="chart-value-big">
              54.2 L/min
              <span>Promedio 24h</span>
            </div>
          </div>

          <div className="chart-container">
            <svg viewBox="0 0 1000 220" className="caudal-chart">
              <path
                d="M0,150 C100,140 200,140 300,170 C400,200 500,100 600,110 C700,120 800,180 900,190 L1000,200"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="3"
                opacity="0.4"
              />
              <path
                d="M0,140 C150,130 300,180 450,120 S750,150 1000,180"
                fill="none"
                stroke="#8B6F47"
                strokeWidth="4"
              />
              <line x1="0" y1="200" x2="1000" y2="200" stroke="#ddd" strokeWidth="2" />
            </svg>
          </div>
        </section>

      </div>

      <AddCultivoModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </>
  );
}