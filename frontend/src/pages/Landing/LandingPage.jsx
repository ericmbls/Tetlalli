import React, { useState } from 'react';
import { 
  Sprout, 
  BarChart3, 
  BellRing, 
  FileText, 
  CheckCircle2, 
  Activity,
  Droplets,
  Thermometer,
  ShieldCheck,
  Zap,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import './LandingPage.css';

const LandingPage = ({ onLoginClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (e) => {
    setScrolled(e.target.scrollTop > 50);
  };

  return (
    <div className="landing-container" onScroll={handleScroll}>
      <nav className={`landing-nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="landing-logo">
          <Sprout className="logo-icon-svg" />
          <span className="logo-text">Tetlalli</span>
        </div>
        
        <div className="landing-nav-links desktop-only">
          <a href="#features">Características</a>
          <a href="#modules">Módulos</a>
          <a href="#how-it-works">¿Cómo funciona?</a>
          <a href="#testimonials">Testimonios</a>
          <button className="landing-btn-login" onClick={onLoginClick}>
            Iniciar Sesión
          </button>
        </div>

        <button 
          className="mobile-menu-toggle mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#features" onClick={() => setMobileMenuOpen(false)}>Características</a>
        <a href="#modules" onClick={() => setMobileMenuOpen(false)}>Módulos</a>
        <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>¿Cómo funciona?</a>
        <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonios</a>
        <button className="landing-btn-login fluid" onClick={() => { setMobileMenuOpen(false); onLoginClick(); }}>
          Iniciar Sesión
        </button>
      </div>

      <main className="landing-main">
        <section className="landing-hero">
          <div className="hero-content">
            <div className="badge">
              <Zap size={14} className="badge-icon" /> 
              El Futuro de la Agricultura
            </div>
            <h1 className="hero-title">
              Cultiva el éxito con <br/><span className="highlight">Inteligencia Agrícola</span>
            </h1>
            <p className="hero-subtitle">
              Toma el control total de tus parcelas. Monitorea humedad, temperatura y automatiza procesos para maximizar tus cosechas con Tetlalli. Nuestro sistema predictivo protege tu inversión.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={onLoginClick}>
                Ingresar al sistema <ChevronRight size={18} className="arrow" />
              </button>
              <div className="guarantee">
                <ShieldCheck size={16} /> <span>Acceso seguro 24/7</span>
              </div>
            </div>
            
            <div className="hero-stats">
              <div className="stat-card">
                <span className="stat-value">+10k</span>
                <span className="stat-label">Hectáreas</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">99%</span>
                <span className="stat-label">Precisión</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">24/7</span>
                <span className="stat-label">Análisis</span>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="glass-card main-glass pulse-glow">
              <div className="glass-header">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
                <span className="glass-title">Monitor en vivo</span>
              </div>
              <div className="glass-body">
                <div className="eco-chart">
                  <div className="eco-bar e1"><Thermometer size={14}/><span>Temperatura</span></div>
                  <div className="eco-bar e2"><Droplets size={14}/><span>Humedad</span></div>
                  <div className="eco-bar e3"><Activity size={14}/><span>Ph Suelo</span></div>
                </div>
                <div className="mock-info">
                  <div className="info-line w-full"></div>
                  <div className="info-line w-half"></div>
                </div>
              </div>
            </div>
            <div className="floating-badge badge-1">
              <Droplets size={16} /> Riego Inteligente
            </div>
            <div className="floating-badge badge-2">
              <Thermometer size={16} /> Clima Óptimo
            </div>
            <div className="floating-badge badge-3">
              <Sprout size={16} /> Cosecha Lista
            </div>
          </div>
        </section>

        <section id="features" className="landing-features">
          <div className="features-head">
            <span className="section-badge">Nuestras Herramientas</span>
            <h2 className="section-title">Diseñadas para el productor moderno</h2>
            <p className="section-desc">Todo lo que necesitas para llevar la gestión de tu campo al siguiente nivel corporativo, centralizado en una única plataforma fácil de usar.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card glass-morph">
              <div className="feature-icon-wrapper">
                <BarChart3 size={32} />
              </div>
              <h3>Métricas en Tiempo Real</h3>
              <p>Monitorea variables críticas de tus cultivos de manera instantánea y toma decisiones informadas antes de que sea tarde.</p>
              <ul className="feature-list">
                <li><CheckCircle2 size={16}/> Tableros personalizables</li>
                <li><CheckCircle2 size={16}/> Gráficos históricos</li>
              </ul>
            </div>
            <div className="feature-card glass-morph">
              <div className="feature-icon-wrapper">
                <BellRing size={32} />
              </div>
              <h3>Alertas Tempranas</h3>
              <p>Recibe notificaciones automáticas si la temperatura o la humedad salen de los rangos ideales para tu tipo de siembra.</p>
              <ul className="feature-list">
                <li><CheckCircle2 size={16}/> Notificaciones SMS/Email</li>
                <li><CheckCircle2 size={16}/> Prevención de heladas</li>
              </ul>
            </div>
            <div className="feature-card glass-morph">
              <div className="feature-icon-wrapper">
                <FileText size={32} />
              </div>
              <h3>Reportes Detallados</h3>
              <p>Exporta históricos y analiza el rendimiento de tus parcelas temporada tras temporada con un solo clic.</p>
              <ul className="feature-list">
                <li><CheckCircle2 size={16}/> Exportación a PDF/Excel</li>
                <li><CheckCircle2 size={16}/> Análisis de rentabilidad</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="landing-steps">
          <div className="steps-container">
            <h2 className="section-title text-center">Una plataforma potente, 3 pasos simples</h2>
            <div className="steps-wrapper">
              <div className="step-item">
                <div className="step-number">1</div>
                <h3>Regístrate en el Sistema</h3>
                <p>Crea tu cuenta de productor, configura los datos de tu finca y establece los parámetros básicos de tu zona en minutos.</p>
              </div>
              <div className="step-line"></div>
              <div className="step-item">
                <div className="step-number">2</div>
                <h3>Añade tus Parcelas</h3>
                <p>Registra tus cultivos, tipo de semilla, fechas de siembra y extensión del terreno. Agrupa por ubicaciones físicas.</p>
              </div>
              <div className="step-line"></div>
              <div className="step-item">
                <div className="step-number">3</div>
                <h3>Optimiza tu Proceso</h3>
                <p>Usa nuestro panel de control premium para evaluar la salud de tus cultivos, prever riesgos y automatizar eventos.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-cta">
          <div className="cta-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
          </div>
          <div className="cta-content">
            <h2>¿Listo para revolucionar tu campo?</h2>
            <p>Únete a la comunidad de agricultores modernos que están llevando sus cosechas al siguiente nivel con Tetlalli.</p>
            <button className="btn-primary cta-btn" onClick={onLoginClick}>
              Ingresar al sistema <ChevronRight size={18} className="arrow" />
            </button>
          </div>
        </section>
      </main>
      
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-column brand-col">
            <div className="footer-brand">
              <Sprout size={24} className="logo-icon-svg" style={{color: 'var(--landing-primary)'}}/>
              <span className="logo-text">Tetlalli</span>
            </div>
            <p className="footer-desc">Soluciones tecnológicas avanzadas para la agricultura moderna. Maximizamos tu rendimiento.</p>
          </div>
          
          <div className="footer-column">
            <h4>Producto</h4>
            <a href="#features">Características</a>
            <a href="#how-it-works">Funcionamiento</a>
            <a href="#">Precios</a>
          </div>
          
          <div className="footer-column">
            <h4>Recursos</h4>
            <a href="#">Blog Agrícola</a>
            <a href="#">Guías de Usuario</a>
            <a href="#">Soporte Técnico</a>
          </div>
          
          <div className="footer-column">
            <h4>Legal</h4>
            <a href="#">Privacidad</a>
            <a href="#">Términos y Condiciones</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Tetlalli. Todos los derechos reservados. Diseñado para productores.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;