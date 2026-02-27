import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import "@fontsource/inter/400.css";
import EditCultivoModal from "../components/EditCultivoModal";
import AddCultivoModal from "../components/AddCultivoModal";
import "./CultivosPage.css";
import { getCultivos, createCultivo } from "../services/cultivos.service";

export default function CultivosPage() {
  const [cultivos, setCultivos] = useState([]);
  const [selectedCultivo, setSelectedCultivo] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // 🔥 Cargar cultivos
  useEffect(() => {
    const loadCultivos = async () => {
      try {
        const data = await getCultivos();
        setCultivos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error cargando cultivos:", err);
        setCultivos([]);
      }
    };

    loadCultivos();
  }, []);

  // 🔥 Agrupar por ubicación
  const surcos = useMemo(() => {
    const grouped = {};

    cultivos.forEach((cultivo) => {
      const ubicacion = cultivo.ubicacion || "Sin ubicación";

      if (!grouped[ubicacion]) {
        grouped[ubicacion] = [];
      }

      grouped[ubicacion].push(cultivo);
    });

    return Object.entries(grouped).map(([ubicacion, lista], index) => ({
      id: index + 1,
      nombre: ubicacion,
      cultivos: lista,
    }));
  }, [cultivos]);

  // 🔥 Crear cultivo
  const handleCreateCultivo = async (nuevoCultivo) => {
    try {
      const creado = await createCultivo(nuevoCultivo);
      setCultivos((prev) => [...prev, creado]);
      setIsAddOpen(false);
    } catch (error) {
      console.error("Error creando cultivo:", error);
    }
  };

  // 🔥 Actualizar cultivo
  const handleUpdateCultivo = async (id, updatedData) => {
    try {
      const res = await fetch(`http://localhost:3000/cultivos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      setCultivos((prev) =>
        prev.map((c) => (c.id === id ? data : c))
      );

      setSelectedCultivo(null);
    } catch (err) {
      console.error("Error actualizando cultivo:", err);
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="cultivos-header">
        <button
          className="btn-add-cultivo"
          onClick={() => setIsAddOpen(true)}
        >
          + Añadir cultivo
        </button>
      </div>

      {/* CONTENIDO */}
      <div className="cultivos-content">
        {surcos.map((surco) => (
          <section key={surco.id} className="surco-section">
            <h2>{surco.nombre}</h2>

            <motion.div
              className="cultivos-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {surco.cultivos.map((cultivo) => (
                <motion.div
                  key={cultivo.id}
                  className={`cultivo-card-large estado-${cultivo.estado?.toLowerCase()}`}
                  onClick={() => setSelectedCultivo(cultivo)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div
                    className="cultivo-image"
                    style={
                      cultivo.imagen || cultivo.image
                        ? { backgroundImage: `url(${cultivo.imagen || cultivo.image})` }
                        : undefined
                    }
                  >
                    {!cultivo.imagen && !cultivo.image && "🌱"}
                  </div>

                  <div className="image-overlay">
                    <span className="floating-label">
                      {cultivo.nombre}
                    </span>
                    <span className="floating-label label-status">
                      Estado: {cultivo.estado || "—"}
                    </span>
                  </div>

                  <div className="cultivo-card-content">
                    <span className="badge badge-cultivo">
                      {cultivo.nombre}
                    </span>
                    <span className="badge badge-source">
                      {cultivo.origen || "Origen desconocido"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        ))}

        {surcos.length === 0 && (
          <div className="empty-state">
            <p>No tienes cultivos registrados aún 🌾</p>
          </div>
        )}
      </div>

      {/* 🔥 Modal editar */}
      <EditCultivoModal
        isOpen={!!selectedCultivo}
        cultivo={selectedCultivo}
        onClose={() => setSelectedCultivo(null)}
        onSave={handleUpdateCultivo}
      />

      {/* 🔥 Modal agregar */}
      <AddCultivoModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleCreateCultivo}
      />
    </>
  );
}