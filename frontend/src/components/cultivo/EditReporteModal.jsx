import { useState, useEffect } from "react";
import { X, Edit, FileText } from "lucide-react";
import "./AddReporteModal.css";

export default function EditReporteModal({ isOpen, onClose, reporte, onUpdate }) {
    const [descripcion, setDescripcion] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (reporte) {
            setDescripcion(reporte.descripcion || "");
        }
    }, [reporte]);

    if (!isOpen || !reporte) return null;

    const handleSubmit = async () => {
        try {
            if (!descripcion.trim()) return;
            setLoading(true);
            await onUpdate(reporte.id, { descripcion });
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content reporte-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <X size={18} />
                </button>

                <div className="modal-header">
                    <Edit size={20} />
                    <h2>Editar reporte</h2>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label>Título</label>
                        <input type="text" value={reporte.titulo} disabled />
                    </div>

                    <div className="form-group">
                        <label>Tipo de reporte</label>
                        <input type="text" value={reporte.tipo} disabled />
                    </div>

                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea
                            rows="4"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>
                </div>

                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onClose} disabled={loading}>
                        Cancelar
                    </button>
                    <button className="btn-save" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Guardando..." : "Actualizar reporte"}
                    </button>
                </div>
            </div>
        </div>
    );
}
