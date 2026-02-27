import { useState } from 'react';
import { Globe, Sliders, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import Header from '../components/Header';
import './AjustesPage.css';

export default function AjustesPage() {
  const [activeTab, setActiveTab] = useState('general');

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      language: 'es-mx',
      timezone: 'cst',
      units: 'metric',
      currency: 'mxn',
      farmName: 'Xihuitl Farms S.A de C.V.',
      location: 'Jalisco, México',
      darkMode: false,
      animations: true,
      compactMode: false,
    }
  });

  const onSubmit = (data) => {
    console.log('Guardar configuración:', data);
    toast.success('Los ajustes se han guardado exitosamente.', {
      style: { background: '#16A34A', color: 'white', border: 'none' }
    });
    // Aquí después conectas con backend
  };

  const toggles = [
    { key: 'darkMode', title: 'Modo Oscuro', desc: 'Cambiar el tema visual de la aplicación' },
    { key: 'animations', title: 'Animaciones', desc: 'Habilitar transiciones y efectos visuales' },
    { key: 'compactMode', title: 'Modo Compacto', desc: 'Mostrar más información en menos espacio' },
  ];

  return (
    <>
      <Toaster position="top-right" />
      <div className="dashboard-content">

        {/* Header */}
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Configuración del Sistema</h1>
            <p className="page-subtitle">
              Ajustes de preferencias y parámetros de Xihuitl
            </p>
          </div>
          <button className="btn-primary" onClick={handleSubmit(onSubmit)}>
            Guardar
          </button>
        </div>

        {/* Tabs */}
        <div className="settings-tabs">
          {['general', 'notificaciones', 'seguridad', 'dispositivos', 'avanzado']
            .map(tab => (
              <button
                key={tab}
                className={`settings-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
        </div>

        {activeTab === 'general' && (
          <div className="settings-content">

            {/* Regional */}
            <div className="settings-section animate-slide-up card-hover-effect delay-100">
              <div className="section-header">
                <Globe size={20} />
                <h3>Configuración Regional</h3>
              </div>

              <div className="form-grid-2">

                <div className="form-group">
                  <label>Idioma del sistema</label>
                  <div className="select-wrapper">
                    <select className="input-filled" {...register('language')}>
                      <option value="es-mx">Español México</option>
                      <option value="en-us">English US</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Zona Horaria</label>
                  <div className="select-wrapper">
                    <select className="input-filled" {...register('timezone')}>
                      <option value="cst">América/México_City (CST)</option>
                      <option value="est">América/New_York (EST)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Sistema de Unidades</label>
                  <div className="select-wrapper">
                    <select className="input-filled" {...register('units')}>
                      <option value="metric">Métrico (Kg, L, °C)</option>
                      <option value="imperial">Imperial (Lb, Gal, °F)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Moneda</label>
                  <div className="select-wrapper">
                    <select className="input-filled" {...register('currency')}>
                      <option value="mxn">MXN - Peso Mexicano</option>
                      <option value="usd">USD - Dólar Estadounidense</option>
                    </select>
                  </div>
                </div>

              </div>

              <div className="form-grid-1">

                <div className="form-group">
                  <label>Nombre de la Granja</label>
                  <input
                    type="text"
                    className="input-filled"
                    {...register('farmName', { required: true })}
                  />
                </div>

                <div className="form-group">
                  <label>Ubicación</label>
                  <input
                    type="text"
                    className="input-filled"
                    {...register('location', { required: true })}
                  />
                </div>

              </div>
            </div>

            {/* Visual */}
            <div className="settings-section animate-slide-up card-hover-effect delay-200">
              <div className="section-header">
                <Sliders size={20} />
                <h3>Preferencias de Visualización</h3>
              </div>

              <div className="toggles-list">

                {toggles.map(item => (
                  <div key={item.key} className="toggle-item">
                    <div className="toggle-info">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        {...register(item.key)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                ))}

              </div>
            </div>

          </div>
        )}

        {activeTab !== 'general' && (
          <div className="empty-state animate-slide-up delay-100">
            <div className="empty-icon">
              <Shield size={48} color="#ddd" />
            </div>
            <h3>Sección en construcción</h3>
            <p>Esta configuración estará disponible pronto.</p>
          </div>
        )}

      </div>
    </>
  );
}