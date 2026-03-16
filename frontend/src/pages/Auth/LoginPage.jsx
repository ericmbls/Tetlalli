import { useState } from "react";
import logo from "../../assets/logo.png";
import "./LoginPage.css";
import { loginUsuario, registerUsuario } from "../../services/usuarios.service";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage({ setIsLoggedIn }) {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: ""
  });

  const { login } = useAuth();

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!isLoginActive && formData.nombre.trim().length < 2) {
      setErrorMessage("El nombre debe tener al menos 2 caracteres");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Ingresa un email válido");
      return false;
    }

    if (formData.password.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage("");

    try {
      if (isLoginActive) {
        const res = await loginUsuario({
          email: formData.email,
          password: formData.password
        });

        login(res.access_token, res.user);
        setIsLoggedIn(true);
      } else {
        const res = await registerUsuario({
          name: formData.nombre,
          email: formData.email,
          password: formData.password
        });

        login(res.access_token, res.user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
        error.message ||
        "Error al autenticar"
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLoginActive(!isLoginActive);
    setFormData({ nombre: "", email: "", password: "" });
    setErrorMessage("");
  };

  return (
    <div className="login-page">
      {[...Array(12)].map((_, i) => (
        <div key={i} className={`leaf leaf-${i + 1}`}>
          <svg viewBox="0 0 100 100">
            <path d="M50,5 C35,20 20,35 10,50 C5,60 5,75 15,85 C25,95 40,95 50,90 C60,95 75,95 85,85 C95,75 95,60 90,50 C80,35 65,20 50,5 Z" />
          </svg>
        </div>
      ))}

      <div className={`cards-container ${isLoginActive ? "login-mode" : "register-mode"}`}>
        <div className="welcome-card">
          <div className="welcome-content">
            <img src={logo} alt="logo" className="logo" />
            <h2 className="welcome-title">
              {isLoginActive ? "¡Hola!" : "¡Bienvenido!"}
            </h2>
            <p className="welcome-text">
              {isLoginActive
                ? "Regístrate con tus datos personales para usar todas las funciones del sistema"
                : "Ingresa tus datos personales para acceder a tu cuenta"}
            </p>
            <button onClick={toggleMode} className="welcome-button">
              {isLoginActive ? "Registrarse" : "Iniciar sesión"}
            </button>
          </div>
        </div>

        <div className="form-card">
          <div className="form-content">
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}

            {isLoginActive ? (
              <>
                <h2 className="form-title">Iniciar Sesión</h2>
                <p className="form-subtitle">Usa tu correo y contraseña</p>
                <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ejemplo@email.com"
                      required
                      autoComplete="email"
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                      autoComplete="current-password"
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="submit"
                    className="submit-button"
                    disabled={loading}
                  >
                    {loading ? "Cargando..." : "INICIAR SESIÓN"}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="form-title">Crear Cuenta</h2>
                <p className="form-subtitle">Regístrate con tu correo</p>
                <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-group">
                    <label>Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Tu nombre"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ejemplo@email.com"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="submit"
                    className="submit-button"
                    disabled={loading}
                  >
                    {loading ? "Cargando..." : "REGISTRARSE"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}