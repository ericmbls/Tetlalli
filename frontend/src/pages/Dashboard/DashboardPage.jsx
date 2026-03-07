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
  const [pronostico, setPronostico] = useState([]);
  const [zonasCultivo, setZonasCultivo] = useState([]);
  const [heatmapZones, setHeatmapZones] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const res = await fetch('http://localhost:3000/api/dashboard', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!res.ok) throw new Error('Error al obtener dashboard');
        const data = await res.json();
        setKpis(data.kpis ?? []);
        setPronostico(data.pronostico ?? []);
        setZonasCultivo(data.zonasCultivo ?? []);
        setHeatmapZones(data.heatmapZones ?? []);
      } catch (err) {
        console.error('Error cargando dashboard', err);
      }
    }
    loadDashboard();
  }, []);

  return (
    <>
      <div className="dashboard-content">
        <section className="kpi-grid">
          {kpis.map(kpi => (
            <div key={kpi.title} className={`kpi-card ${kpi.status}`}>
              <div className="kpi-header">
                <span>{kpi.title}</span>
                <div className="kpi-icon">
                  {kpi.icon === 'sprout' && <Sprout size={20} />}
                  {kpi.icon === 'alertCircle' && <AlertCircle size={20} />}
                  {kpi.icon === 'download' && <Download size={20} />}
                  {kpi.icon === 'activity' && <Activity size={20} />}
                </div>
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
              {pronostico.map(item => (
                <div key={item.id} className="forecast-item">
                  <span>{item.day}</span>
                  <div className="forecast-icon">
                    {item.icon === 'sun' && <Sun size={18} color="#F59E0B" />}
                    {item.icon === 'cloudSun' && <CloudSun size={18} color="#78716c" />}
                    {item.icon === 'cloudRain' && <CloudRain size={18} color="#78716c" />}
                  </div>
                  <span className="forecast-temp">{item.temp}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="zones-section">
          {zonasCultivo.map(zona => (
            <div
              key={zona.id}
              className={`zone-card ${zona.estado === 'alert' ? 'zone-alert-border' : ''}`}
            >
              <div className="zone-header">
                <div>
                  <h4>{zona.nombre}</h4>
                  <span className="zone-location">{zona.ubicacion}</span>
                </div>
                {zona.estado === 'ok'
                  ? <span className="check-icon">✓</span>
                  : <AlertCircle size={18} className="alert-icon-red" />}
              </div>

              {zona.imagen && (
                <div className="zone-image">
                  <img src={zona.imagen} alt={zona.nombre} className="cultivo-img" />
                </div>
              )}

              <div className="zone-metrics">
                <div className="z-metric">
                  <Droplets size={14} />
                  <span>Frecuencia Riego</span>
                  <strong>{zona.frecuenciaRiego} días</strong>
                </div>
                <div className="z-metric">
                  <CloudSun size={14} />
                  <span>Estado</span>
                  <strong>{zona.estado}</strong>
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