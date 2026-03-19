import { useState } from 'react';
import { Eye, EyeOff, LogIn, UserPlus, KeyRound, ArrowLeft } from 'lucide-react';
import './LoginForm.css';
import { loginUsuario, registerUsuario } from '../services/usuarios.service';
import { useAuth } from '../context/AuthContext';

export default function LoginForm({ onLogin, mode, setMode }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrorMessage('');
  };

  const pwdReqs = {
    length: formData.password.length >= 8,
    upper: /[A-Z]/.test(formData.password),
    lower: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Validación de contraseñas en registro
    if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Las contraseñas no coinciden');
        return;
      }
      if (!Object.values(pwdReqs).every(Boolean)) {
        setErrorMessage('La contraseña no cumple todos los requisitos');
        return;
      }
      if (!formData.agree) {
        setErrorMessage('Debes aceptar los términos de servicio');
        return;
      }
    }

    setLoading(true);
    setErrorMessage('');

    try {
      if (mode === 'login') {
        const res = await loginUsuario({
          email: formData.email,
          password: formData.password,
        });
        login(res.access_token, res.user);
        onLogin();
      } else if (mode === 'forgot') {
        // Simulación de envío de recuperación
        await new Promise(resolve => setTimeout(resolve, 1500));
        alert('Se ha enviado un enlace de recuperación a: ' + formData.email);
        setMode('login');
      } else { // mode === 'register'
        const res = await registerUsuario({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        });
        login(res.access_token, res.user);
        onLogin();
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
        error.message ||
        'Error al autenticar'
      );
    } finally {
      setLoading(false);
    }
  };

  const renderForgotMode = () => (
    <div className="form-content fade-in">
      <div className="form-header-center">
        <div className="icon-box forgot-icon">
          <KeyRound size={26} color="#fff" strokeWidth={2.5} />
        </div>
        <h2>Recuperar Contraseña</h2>
        <p>Introduce tu correo para recibir las instrucciones</p>
      </div>

      <form onSubmit={handleSubmit} className="custom-form">
        <div className="input-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@ejemplo.com"
            autoComplete="off"
            required
            disabled={loading}
          />
        </div>

        <button type="submit" className="glass-btn primary-btn btn-login-anim" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Instrucciones'}
        </button>

        <div className="footer-link-back" onClick={() => setMode('login')}>
          <ArrowLeft size={16} style={{ marginRight: '8px' }} />
          <span>Volver al inicio de sesión</span>
        </div>
      </form>
    </div>
  );

  const renderLoginMode = () => (
    <div className="form-content fade-in">
      <div className="form-header-center">
        <h2>Iniciar Sesión</h2>
        <p>Usa tu correo y contraseña</p>
      </div>

      <form onSubmit={handleSubmit} className="custom-form">
        <div className="input-group">
          <label>EMAIL</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@email.com"
            autoComplete="off"
            required
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label>PASSWORD</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="off"
              required
              disabled={loading}
            />
            <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="forgot-wrapper">
            <a href="#" className="forgot-link" onClick={(e) => { e.preventDefault(); setMode('forgot'); }}>¿Olvidaste tu contraseña?</a>
          </div>
        </div>

        <button type="submit" className="glass-btn primary-btn btn-login-anim" disabled={loading}>
          {loading ? 'CARGANDO...' : 'INICIAR SESIÓN'}
        </button>

        <div className="footer-link">
          ¿No tienes una cuenta? <span onClick={() => setMode('register')}>Regístrate</span>
        </div>
      </form>
    </div>
  );

  const renderRegisterMode = () => (
    <div className="form-content fade-in">
      <div className="form-header-center">
        <div className="icon-box register-icon">
          <UserPlus size={26} color="#fff" strokeWidth={2.5} />
        </div>
        <h2>Crear Cuenta</h2>
        <p>Únete a nosotros hoy para comenzar</p>
      </div>

      <form onSubmit={handleSubmit} className="custom-form">
        <div className="input-group">
          <label>Nombre Completo</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Ej. Juan Pérez"
            autoComplete="off"
            required
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@ejemplo.com"
            autoComplete="off"
            required
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="off"
              required
              disabled={loading}
            />
            <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="password-rules-glass">
          <p>Requisitos de contraseña:</p>
          <div className="rules-grid">
            <span className={pwdReqs.length ? 'valid' : ''}>• 8+ caracteres</span>
            <span className={pwdReqs.upper ? 'valid' : ''}>• Letra Mayúscula</span>
            <span className={pwdReqs.lower ? 'valid' : ''}>• Letra Minúscula</span>
            <span className={pwdReqs.number ? 'valid' : ''}>• Número</span>
            <span className={pwdReqs.special ? 'valid' : ''}>• Car. especial</span>
          </div>
        </div>

        <div className="input-group">
          <label>Confirmar Contraseña</label>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="off"
              required
              disabled={loading}
            />
            <button type="button" className="eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="terms-checkbox">
          <input
            type="checkbox"
            id="terms"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
          <label htmlFor="terms">
            Acepto los <a href="#">Términos de Servicio</a> y la <a href="#">Política de Privacidad</a>
          </label>
        </div>

        <button type="submit" className="glass-btn register-btn btn-login-anim" disabled={loading}>
          <UserPlus size={18} style={{ marginRight: '8px' }} />
          {loading ? 'Cargando...' : 'Registrarse'}
        </button>

        <div className="footer-link">
          ¿Ya tienes una cuenta? <span onClick={() => setMode('login')}>Inicia sesión</span>
        </div>
      </form>
    </div>
  );

  return (
    <div className="login-form-container glass-panel">
      {errorMessage && (
        <div style={{
          background: 'rgba(220, 38, 38, 0.1)',
          border: '1px solid rgba(220, 38, 38, 0.3)',
          color: '#dc2626',
          padding: '10px 14px',
          borderRadius: '10px',
          fontSize: '0.875rem',
          fontWeight: 600,
          marginBottom: '16px'
        }}>
          {errorMessage}
        </div>
      )}

      {mode === 'forgot' ? renderForgotMode() : (mode === 'login' ? renderLoginMode() : renderRegisterMode())}
    </div>
  );
}