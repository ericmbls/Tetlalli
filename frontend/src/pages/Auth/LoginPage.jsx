import { useState } from "react";
import logo from "../../assets/logo.png";
import "./LoginPage.css";
import { loginUsuario, registerUsuario } from "../../services/usuarios.service";
<<<<<<< HEAD
=======
import { useAuth } from "../../context/AuthContext";
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756

export default function LoginPage({ setIsLoggedIn }) {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: ""
  });

<<<<<<< HEAD
=======
  const { login } = useAuth();

>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
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
<<<<<<< HEAD
    
=======

>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Ingresa un email válido");
      return false;
    }
<<<<<<< HEAD
    
=======

>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
    if (formData.password.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
<<<<<<< HEAD
    
=======

>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
<<<<<<< HEAD
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setErrorMessage("");
    
    try {
      if (isLoginActive) {
        const res = await loginUsuario({ 
          email: formData.email, 
          password: formData.password 
        });
        localStorage.setItem("token", res.access_token);
        setIsLoggedIn(true);
      } else {
        const res = await registerUsuario({ 
          name: formData.nombre, 
          email: formData.email, 
          password: formData.password 
        });
        localStorage.setItem("token", res.access_token);
        setIsLoggedIn(true);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message || "Error al autenticar");
=======

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
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
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
<<<<<<< HEAD
      
=======

>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
      <div className={`cards-container ${isLoginActive ? "login-mode" : "register-mode"}`}>
        <div className="welcome-card">
          <div className="welcome-content">
            <img src={logo} alt="logo" className="logo" />
            <h2 className="welcome-title">
              {isLoginActive ? "¡Hola!" : "¡Bienvenido!"}
            </h2>
            <p className="welcome-text">
<<<<<<< HEAD
              {isLoginActive 
                ? "Regístrate con tus datos personales para usar todas las funciones del sistema" 
=======
              {isLoginActive
                ? "Regístrate con tus datos personales para usar todas las funciones del sistema"
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
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
<<<<<<< HEAD
            
=======

>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
            {isLoginActive ? (
              <>
                <h2 className="form-title">Iniciar Sesión</h2>
                <p className="form-subtitle">Usa tu correo y contraseña</p>
                <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-group">
                    <label>Email</label>
<<<<<<< HEAD
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      placeholder="ejemplo@email.com" 
                      required 
=======
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ejemplo@email.com"
                      required
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                      autoComplete="email"
                      disabled={loading}
                    />
                  </div>
<<<<<<< HEAD
                  <div className="form-group">
                    <label>Password</label>
                    <input 
                      type="password" 
                      name="password" 
                      value={formData.password} 
                      onChange={handleInputChange} 
                      placeholder="••••••••" 
                      required 
=======

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                      autoComplete="current-password"
                      disabled={loading}
                    />
                  </div>
<<<<<<< HEAD
                  <button 
                    type="submit" 
                    className="submit-button" 
=======

                  <button
                    type="submit"
                    className="submit-button"
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
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
<<<<<<< HEAD
                    <input 
                      type="text" 
                      name="nombre" 
                      value={formData.nombre} 
                      onChange={handleInputChange} 
                      placeholder="Tu nombre" 
=======
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Tu nombre"
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                      required
                      disabled={loading}
                    />
                  </div>
<<<<<<< HEAD
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      placeholder="ejemplo@email.com" 
=======

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ejemplo@email.com"
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                      required
                      disabled={loading}
                    />
                  </div>
<<<<<<< HEAD
                  <div className="form-group">
                    <label>Password</label>
                    <input 
                      type="password" 
                      name="password" 
                      value={formData.password} 
                      onChange={handleInputChange} 
                      placeholder="••••••••" 
=======

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
                      required
                      disabled={loading}
                    />
                  </div>
<<<<<<< HEAD
                  <button 
                    type="submit" 
                    className="submit-button" 
=======

                  <button
                    type="submit"
                    className="submit-button"
>>>>>>> afc32421451b588d80cea275fc0fe7e2b2d1c756
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