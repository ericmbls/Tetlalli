import './CultivoCard.css';

export default function CultivoCard({ image, name, surco, source }) {
  return (
    <div className="cultivo-card">
      <div style={{ position: 'relative' }}>
        <img src={image} alt={name} className="cultivo-image" />
        <div className="card-image-overlay">
          <span className="badge badge-cultivo">{name}</span>
          <span className="badge badge-source">{source}</span>
        </div>
      </div>
      <div className="cultivo-content">
        <p style={{ margin: 0, fontWeight: 'bold', fontSize: '13px', color: 'rgba(15,23,42,0.85)' }}>
          Surco: {surco}
        </p>
      </div>
    </div>
  );
}
