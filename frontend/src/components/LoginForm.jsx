import { useState } from 'react';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import './LoginForm.css';

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(); // Llama la funcion que pasa el auth
  };

  // Verificación dinámica visual de regex (Password Requirements)
  const pwdReqs = {
    length: formData.password.length >= 8,
    upper: /[A-Z]/.test(formData.password),
    lower: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password)
  };

  return (
    <div className="login-form-container glass-panel">

      {mode === 'login' ? (
        <div className="form-content fade-in">
          <div className="form-header-center">
            <div className="icon-box login-icon">
              <LogIn size={26} color="#fff" strokeWidth={2.5} />
            </div>
            <h2>Bienvenido</h2>
            <p>Inicia sesión en tu cuenta para continuar</p>
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
                required
              />
            </div>

            <div className="input-group">
              <div className="label-row">
                <label>Contraseña</label>
                <a href="#" className="forgot-link">¿Olvidaste la contraseña?</a>
              </div>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="glass-btn primary-btn btn-login-anim">
              <LogIn size={18} style={{ marginRight: '8px' }} /> Iniciar Sesión
            </button>

            <div className="divider">
              <span>O continúa con</span>
            </div>

            <div className="social-buttons">
              <button type="button" className="glass-btn social-btn">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" width="18" />
                Google
              </button>
              <button type="button" className="glass-btn social-btn">
                <svg viewBox="0 0 24 24" fill="#6B5945" width="18" height="18"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                GitHub
              </button>
            </div>

            <div className="footer-link">
              ¿No tienes una cuenta? <span onClick={() => setMode('register')}>Regístrate</span>
            </div>
          </form>
        </div>
      ) : (
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
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Ej. Juan Pérez" required />
            </div>

            <div className="input-group">
              <label>Correo Electrónico</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="tu@ejemplo.com" required />
            </div>

            <div className="input-group">
              <label>Contraseña</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Panel de validaciones estilo imagen */}
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
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <button type="button" className="eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="terms-checkbox">
              <input type="checkbox" id="terms" name="agree" checked={formData.agree} onChange={handleChange} required />
              <label htmlFor="terms">
                Acepto los <a href="#">Términos de Servicio</a> y la <a href="#">Política de Privacidad</a>
              </label>
            </div>

            <button type="submit" className="glass-btn register-btn btn-login-anim">
              <UserPlus size={18} style={{ marginRight: '8px' }} /> Registrarse
            </button>

            <div className="footer-link">
              ¿Ya tienes una cuenta? <span onClick={() => setMode('login')}>Inicia sesión</span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}