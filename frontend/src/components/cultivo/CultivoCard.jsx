import './CultivoCard.css';

export default function CultivoCard({ cultivo }) {
  return (
    <div className="cultivo-card">
      {cultivo.imagen && (
        <img
          src={`http://localhost:3000${cultivo.imagen}`}
          alt={cultivo.nombre}
          className="cultivo-image"
        />
      )}
      <div className="cultivo-content">
        <span className="badge badge-cultivo">{cultivo.nombre}</span>
        <span className="badge badge-source">{cultivo.ubicacion}</span>
      </div>
    </div>
  );
}