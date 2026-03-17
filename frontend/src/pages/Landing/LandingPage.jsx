import React, { useState, useEffect, useRef } from 'react';
import { 
  Sprout, ShieldCheck, Zap, Menu, X, ChevronRight, 
  Droplets, Thermometer, Activity, Leaf, CloudSun, BarChart3, Star
} from 'lucide-react';
import './LandingPage.css';

const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const currentRef = domRef.current;
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(currentRef);
          }
        });
      }, 
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    observer.observe(currentRef);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`scroll-reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

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
          <button className="landing-btn-login" onClick={onLoginClick}>
            Iniciar Sesión
          </button>
        </div>

        <button 
          className="mobile-menu-toggle mobile-only" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <button className="landing-btn-login fluid" onClick={() => { setMobileMenuOpen(false); onLoginClick(); }}>
          Iniciar Sesión
        </button>
      </div>

      <main className="landing-main">
        <section className="landing-hero hero-centered">
          <div className="hero-blob blob-1"></div>
          <div className="hero-blob blob-2"></div>
          <div className="hero-blob blob-3"></div>
          <div className="hero-content">
            <div className="badge">
              <Zap size={14} className="badge-icon" />
              El Futuro de la Agricultura
            </div>
            <h1 className="hero-title">
              Cultiva el éxito con <br /><span className="highlight">Inteligencia Agrícola</span>
            </h1>
            <p className="hero-subtitle">
              Toma el control total de tus parcelas. Monitorea humedad, temperatura y automatiza procesos
              para maximizar tus cosechas con Tetlalli.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={onLoginClick}>
                Ingresar al sistema <ChevronRight size={18} className="arrow" />
              </button>
              <div className="guarantee">
                <ShieldCheck size={16} /> <span>Acceso seguro 24/7</span>
              </div>
            </div>
          </div>
          
          <div className="hero-visual desktop-only">
            <div className="glass-card main-glass pulse-glow">
               <div className="glass-header">
                 <div className="dot red"></div>
                 <div className="dot yellow"></div>
                 <div className="dot green"></div>
                 <span className="glass-title">Visor de Cultivo</span>
               </div>
               <div className="glass-body">
                 <div className="eco-chart">
                   <div className="eco-bar e1"><Droplets size={14}/><span>Humedad Óptima</span></div>
                   <div className="eco-bar e2"><Thermometer size={14}/><span>Temperatura Ideal</span></div>
                   <div className="eco-bar e3"><Activity size={14}/><span>Salud General</span></div>
                 </div>
                 <div className="mock-info">
                   <div className="info-line w-full"></div>
                   <div className="info-line w-half"></div>
                 </div>
               </div>
            </div>
            
            <div className="floating-badge badge-1">
              <Leaf size={18} /> Crecimiento +15%
            </div>
            <div className="floating-badge badge-2">
              <Droplets size={18} /> Riego Optimo
            </div>
            <div className="floating-badge badge-3">
              <Zap size={18} /> Alerta Activa
            </div>
          </div>
        </section>

        <section id="how-it-works" className="landing-steps">
          <div className="steps-container">
            <FadeInSection>
              <div className="text-center">
                <span className="section-badge">Proceso Simple</span>
                <h2 className="section-title">¿Cómo funciona?</h2>
                <p className="section-desc">Tres sencillos pasos para modernizar y potenciar la gestión de tu terreno.</p>
              </div>
            </FadeInSection>
            
            <div className="steps-wrapper">
              <FadeInSection delay={100} className="step-item">
                <div className="step-number">1</div>
                <h3>Regístrate</h3>
                <p>Crea tu cuenta de productor y configura los datos generales de tu finca de manera rápida y segura.</p>
              </FadeInSection>
              <div className="step-line desktop-only"></div>
              <FadeInSection delay={300} className="step-item">
                <div className="step-number">2</div>
                <h3>Añade Parcelas</h3>
                <p>Registra tus cultivos y repártelos en zonas operativas con tecnología satelital integrada.</p>
              </FadeInSection>
              <div className="step-line desktop-only"></div>
              <FadeInSection delay={500} className="step-item">
                <div className="step-number">3</div>
                <h3>Optimiza</h3>
                <p>Recibe reportes y datos vitales para evitar riesgos en temporada y maximizar resultados.</p>
              </FadeInSection>
            </div>
          </div>
        </section>

        <section id="features" className="landing-features">
          <FadeInSection>
            <div className="features-head">
              <span className="section-badge">Herramientas Avanzadas</span>
              <h2 className="section-title">Potencia cada métrica del campo</h2>
              <p className="section-desc">Olvídate de las conjeturas. Usa datos de alta precisión para reducir tiempos y aumentar permanentemente la calidad final.</p>
            </div>
          </FadeInSection>
          
          <div className="features-grid">
            <FadeInSection delay={100}>
              <div className="feature-card glass-morph">
                <div className="feature-icon-wrapper">
                  <CloudSun size={32} />
                </div>
                <h3>Monitoreo Climático</h3>
                <p>Visualiza condiciones de temperatura, humedad y pronósticos detallados en tiempo real.</p>
                <ul className="feature-list">
                  <li><Zap size={16} /> Alertas preventivas</li>
                  <li><Zap size={16} /> Registro histórico</li>
                  <li><Zap size={16} /> Patrones estacionales</li>
                </ul>
              </div>
            </FadeInSection>

            <FadeInSection delay={200}>
              <div className="feature-card glass-morph">
                <div className="feature-icon-wrapper">
                  <BarChart3 size={32} />
                </div>
                <h3>Estadísticas Precisas</h3>
                <p>Reportes avanzados que cruzan datos vitales entre sensores, tareas y el progreso biológico.</p>
                <ul className="feature-list">
                  <li><Zap size={16} /> Gráficos de rendimiento</li>
                  <li><Zap size={16} /> Desglose económico</li>
                  <li><Zap size={16} /> Exportación simplificada</li>
                </ul>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={300}>
              <div className="feature-card glass-morph">
                <div className="feature-icon-wrapper">
                  <Droplets size={32} />
                </div>
                <h3>Gestión de Riego</h3>
                <p>Control de riego automatizado que aprende las necesidades de tu variedad específica de cultivo.</p>
                <ul className="feature-list">
                  <li><Zap size={16} /> Reducción consumo</li>
                  <li><Zap size={16} /> Zonas inteligentes</li>
                  <li><Zap size={16} /> Activación satelital</li>
                </ul>
              </div>
            </FadeInSection>
          </div>
        </section>

        <section className="landing-cta">
          <div className="cta-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
          </div>
          <FadeInSection>
            <div className="cta-content">
              <h2>¿Listo para revolucionar tu campo?</h2>
              <p>Únete a la nueva era tecnológica con Tetlalli. Simplifica tus procesos y mejora la rentabilidad de tu tierra hoy.</p>
              <button className="cta-btn btn-primary" onClick={onLoginClick}>
                Comienza Ahora
              </button>
            </div>
          </FadeInSection>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Tetlalli Intelligent Farms. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;