import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const ParticleBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const location = useLocation();
  const hostname = window.location.hostname;
  const isWellness = location.pathname === '/wellness' || hostname.startsWith('wellness.');
  const color = 'rgba(166,7,36,0.15)';
  const particleBg = isWellness ? '#a60724' : 'white';

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100 + 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 20,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" style={{ '--particle-bg': particleBg } as React.CSSProperties}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,var(--particle-color),transparent_70%)]" style={{ '--particle-color': color } as React.CSSProperties} />
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};
