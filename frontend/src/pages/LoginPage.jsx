import { useState, useCallback, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import './LoginPage.css';

export default function LoginPage({ setIsLoggedIn }) {
  const [mode, setMode] = useState('login');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesConfig = {
    fullScreen: { enable: false },
    particles: {
      number: {
        value: 45,
        density: { enable: true, width: 800 }
      },
      color: {
        value: ["#8B6F47", "#D97706", "#B45309", "#9A3412", "#FCD34D"]
      },
      shape: {
        type: ["circle", "triangle", "polygon"],
        options: {
          polygon: { sides: 5 }
        }
      },
      opacity: {
        value: { min: 0.3, max: 0.8 }
      },
      size: {
        value: { min: 4, max: 12 }
      },
      move: {
        enable: true,
        speed: { min: 0.5, max: 2 },
        direction: "bottom",
        outModes: { default: "out" },
        random: true,
        straight: false
      },
      rotate: {
        value: { min: 0, max: 360 },
        animation: { enable: true, speed: 4, sync: false }
      },
      wobble: {
        enable: true,
        distance: 10,
        speed: 10
      }
    },
    detectRetina: true,
  };

  return (
    <div className="login-page">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
      />

      <div className="login-container centered">
        {mounted && (
          <LoginForm mode={mode} setMode={setMode} onLogin={() => setIsLoggedIn(true)} />
        )}
      </div>
    </div>
  );
}
