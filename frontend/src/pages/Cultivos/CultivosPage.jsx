import { useState, useEffect, useMemo } from "react";
<<<<<<< HEAD
import EditCultivoModal from "../../components/cultivo/EditCultivoModal";
import AddCultivoModal from "../../components/cultivo/AddCultivoModal";
import "./CultivosPage.css";
import { getCultivos, createCultivo, updateCultivo } from "../../services/cultivos.service";

export default function CultivosPage() {
=======
import { useAuth } from "../../context/AuthContext";

import EditCultivoModal from "../../components/cultivo/EditCultivoModal";
import AddCultivoModal from "../../components/cultivo/AddCultivoModal";

import "./CultivosPage.css";

import {
  getCultivos,
  createCultivo,
  updateCultivo,
  deleteCultivo
} from "../../services/cultivos.service";

export default function CultivosPage({ onOpenCultivo }) {
  const { user } = useAuth();
  const userRole = user?.role;

>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
  const [cultivos, setCultivos] = useState([]);
  const [selectedCultivo, setSelectedCultivo] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    const loadCultivos = async () => {
      try {
        const data = await getCultivos();
        setCultivos(Array.isArray(data) ? data : []);
      } catch {
        setCultivos([]);
      }
    };
<<<<<<< HEAD
=======

>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
    loadCultivos();
  }, []);

  const surcos = useMemo(() => {
    const grouped = {};
<<<<<<< HEAD
    cultivos.forEach(({ ubicacion = "Sin ubicación", ...cultivo }) => {
      if (!grouped[ubicacion]) grouped[ubicacion] = [];
      grouped[ubicacion].push({ ubicacion, ...cultivo });
    });
    return Object.entries(grouped).map(([ubicacion, lista]) => ({
      id: ubicacion,
      nombre: ubicacion,
      cultivos: lista,
=======

    cultivos.forEach(({ ubicacion = "Sin ubicación", ...cultivo }) => {
      if (!grouped[ubicacion]) grouped[ubicacion] = [];
      grouped[ubicacion].push({
        ubicacion,
        ...cultivo
      });
    });

    return Object.entries(grouped).map(([ubicacion, lista]) => ({
      id: ubicacion,
      nombre: ubicacion,
      cultivos: lista
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
    }));
  }, [cultivos]);

  const handleCreateCultivo = async (nuevoCultivo) => {
    try {
      const creado = await createCultivo(nuevoCultivo);
      setCultivos(prev => [...prev, creado]);
      setIsAddOpen(false);
    } catch (error) {
      console.error("Error creando cultivo:", error);
    }
  };

  const handleUpdateCultivo = async (id, updatedData) => {
    try {
      const data = await updateCultivo(id, updatedData);
      setCultivos(prev => prev.map(c => c.id === id ? data : c));
      setSelectedCultivo(null);
    } catch (err) {
      console.error("Error actualizando cultivo:", err);
    }
  };

<<<<<<< HEAD
  return (
    <>
      <div className="cultivos-header">
        <button className="btn-add-cultivo" onClick={() => setIsAddOpen(true)}>
=======
  const handleDeleteCultivo = async (id) => {
    try {
      await deleteCultivo(id);
      setCultivos(prev => prev.filter(c => c.id !== id));
      setSelectedCultivo(null);
    } catch (err) {
      console.error("Error eliminando cultivo:", err);
    }
  };

  return (
    <>
      <div className="cultivos-header">
        <button
          className="btn-add-cultivo"
          onClick={() => setIsAddOpen(true)}
        >
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
          + Añadir cultivo
        </button>
      </div>

      <div className="cultivos-content">
        {surcos.map(({ id, nombre, cultivos }) => (
          <section key={id} className="surco-section">
            <h2>{nombre}</h2>
            <div className="cultivos-grid">
              {cultivos.map((cultivo, index) => (
                <div
                  key={cultivo.id || index}
                  className={`cultivo-card-large estado-${cultivo.estado?.toLowerCase()}`}
<<<<<<< HEAD
                  onClick={() => setSelectedCultivo(cultivo)}
                >
                  <div className="cultivo-placeholder">
=======
                >
                  <div
                    className="cultivo-placeholder"
                    onClick={() => setSelectedCultivo(cultivo)}
                  >
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                    {cultivo.imagen ? (
                      <img
                        src={`http://localhost:3000${cultivo.imagen}`}
                        alt={cultivo.nombre}
                        className="cultivo-img"
                      />
<<<<<<< HEAD
                    ) : (
                      "🌱"
                    )}
                  </div>
                  <div className="cultivo-card-content">
                    <span className="badge badge-cultivo">{cultivo.nombre}</span>
                    <span className="badge badge-source">Estado: {cultivo.estado}</span>
=======
                    ) : "🌱"}
                  </div>

                  <div className="cultivo-card-content">
                    <span className="badge badge-cultivo">
                      {cultivo.nombre}
                    </span>
                    <span className="badge badge-source">
                      Estado: {cultivo.estado}
                    </span>
                    <button
                      className="btn-bitacora"
                      onClick={() => onOpenCultivo(cultivo)}
                    >
                      Ver bitácora
                    </button>
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
<<<<<<< HEAD
=======

>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
        {!surcos.length && (
          <div className="empty-state">
            <p>No tienes cultivos registrados aún 🌾</p>
          </div>
        )}
      </div>

      <EditCultivoModal
        isOpen={!!selectedCultivo}
        onClose={() => setSelectedCultivo(null)}
        cultivo={selectedCultivo}
        onSave={handleUpdateCultivo}
<<<<<<< HEAD
=======
        onDelete={handleDeleteCultivo}
        userRole={userRole}
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
      />

      <AddCultivoModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleCreateCultivo}
      />
    </>
  );
}