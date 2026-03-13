
import { useState, useEffect } from "react";
import {
  Sprout,
  AlertCircle,
  Activity,
  Droplets,
  CloudSun,
  CloudRain,
  Sun
} from "lucide-react";

import AddCultivoModal from "../../components/cultivo/AddCultivoModal";
import "./DashboardPage.css";

export default function DashboardPage() {

  const [showAddModal, setShowAddModal] = useState(false);
  const [kpis, setKpis] = useState([]);
  const [zonasCultivo, setZonasCultivo] = useState([]);
  const [actividad, setActividad] = useState([]);
  const [cultivosRecientes, setCultivosRecientes] = useState([]);
  const [cultivosPorTipo, setCultivosPorTipo] = useState([]);

  const pronostico = [
    { day: "Lun", icon: <Sun size={18} color="#F59E0B" />, temp: "24°" },
    { day: "Mar", icon: <CloudSun size={18} color="#78716c" />, temp: "22°" },
    { day: "Mié", icon: <CloudRain size={18} color="#78716c" />, temp: "20°" },
    { day: "Jue", icon: <Sun size={18} color="#F59E0B" />, temp: "23°" },
    { day: "Vie", icon: <Sun size={18} color="#F59E0B" />, temp: "25°" }
  ];

  useEffect(() => {

    const fetchCultivos = async () => {
      try {

        const res = await fetch("http://localhost:3000/api/cultivos");
        const data = await res.json();

        const alertas = data.filter(
          c => (c.humedad ?? 0) < 60 || (c.temperatura ?? 0) > 30
        ).length;

        setKpis([
          {
            title: "Total de cultivos",
            value: data.length,
            sub: "Registrados",
            icon: <Sprout size={20} />,
            status: "neutral"
          },
          {
            title: "Alertas Activas",
            value: alertas,
            sub: "Revisar cultivos",
            icon: <AlertCircle size={20} />,
            status: alertas > 0 ? "danger" : "neutral"
          },
          {
            title: "Salud Promedio",
            value: "94%",
            sub: "Estado general",
            icon: <Activity size={20} />,
            status: "success"
          }
        ]);

        const zonas = data.map(c => ({
          id: c.id,
          name: c.nombre,
          lugar: c.lugar,
          humedad: `${c.humedad ?? 0}%`,
          temp: `${c.temperatura ?? 0}°C`,
          status:
            (c.humedad ?? 0) < 60 || (c.temperatura ?? 0) > 30
              ? "alert"
              : "ok"
        }));

        setZonasCultivo(zonas);

        const recientes = [...data]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);

        setCultivosRecientes(recientes);

        setActividad(
          recientes.map(c => ({
            id: c.id,
            text: `Se registró cultivo "${c.nombre}"`,
            date: new Date(c.created_at).toLocaleDateString()
          }))
        );

        const conteoTipos = {};

        data.forEach(c => {
          const tipo = c.tipo || "Sin tipo";
          conteoTipos[tipo] = (conteoTipos[tipo] || 0) + 1;
        });

        setCultivosPorTipo(
          Object.entries(conteoTipos).map(([tipo, total]) => ({
            tipo,
            total
          }))
        );

      } catch (err) {
        console.error(err);
      }
    };

    fetchCultivos();

  }, []);

  return (
    <div className="dashboard-content">

      <section className="kpi-grid">
        {kpis.map(kpi => (
          <div key={kpi.title} className={`kpi-card ${kpi.status}`}>
            <div className="kpi-header">
              <span>{kpi.title}</span>
              <div className="kpi-icon">{kpi.icon}</div>
            </div>

            <div className="kpi-value">{kpi.value}</div>

            <div className={`kpi-sub ${kpi.status}`}>
              {kpi.sub}
            </div>
          </div>
        ))}
      </section>

      <section className="middle-section">

        <div className="heatmap-card">
          <h3>Mapa de Cultivo</h3>

          <div className="heatmap-grid">
            {zonasCultivo.map(zone => (
              <div
                key={zone.id}
                className={`heatmap-zone zone-${zone.status}`}
              >
                {zone.name}
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

                <div className="forecast-icon">
                  {day.icon}
                </div>

                <span className="forecast-temp">
                  {day.temp}
                </span>

              </div>
            ))}
          </div>

        </div>

      </section>

      <section className="zones-section">

        {zonasCultivo.map(zona => (

          <div
            key={zona.id}
            className={`zone-card ${zona.status === "alert"
              ? "zone-alert-border"
              : ""
              }`}
          >

            <div className="zone-header">

              <div>
                <h4>{zona.name}</h4>
                <span className="zone-location">
                  {zona.lugar}
                </span>
              </div>

              {zona.status === "ok"
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

      <section className="dashboard-extra">

        <div className="recent-card">



          {cultivosRecientes.map(c => (
            <div key={c.id} className="recent-item">
              <strong>{c.nombre}</strong>
              <span>{c.lugar}</span>
            </div>
          ))}

        </div>

        <div className="activity-card">

          <h3>Actividad reciente</h3>

          {actividad.map(a => (
            <div key={a.id} className="activity-item">
              <span>{a.text}</span>
              <small>{a.date}</small>
            </div>
          ))}

        </div>

        <div className="types-card">

          <h3>Tipos de cultivo</h3>

          {cultivosPorTipo.map(t => (
            <div key={t.tipo} className="type-item">
              <span>{t.tipo}</span>
              <strong>{t.total}</strong>
            </div>
          ))}

        </div>

      </section>

      <AddCultivoModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

    </div>
  );
}