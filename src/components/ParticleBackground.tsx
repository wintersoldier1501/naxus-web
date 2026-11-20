'use client';

import { useEffect, useRef } from 'react';

interface ParticlePoint {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: ParticlePoint[] = [];
    let animationFrameId = 0;
    let logicalWidth = 0;
    let logicalHeight = 0;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setCanvasSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      logicalWidth = parent.clientWidth;
      logicalHeight = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(logicalWidth * dpr));
      canvas.height = Math.max(1, Math.floor(logicalHeight * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      particlesArray = [];
      const maxParticles = logicalWidth < 640 ? 35 : 90;
      const count = Math.min(
        Math.floor((logicalWidth * logicalHeight) / 8500),
        maxParticles
      );

      for (let i = 0; i < count; i++) {
        particlesArray.push({
          x: Math.random() * logicalWidth,
          y: Math.random() * logicalHeight,
          size: Math.random() * 1.8 + 0.9,
          speedX: (Math.random() - 0.5) * 0.55,
          speedY: (Math.random() - 0.5) * 0.55,
        });
      }
    };

    const renderFrame = (shouldMove: boolean) => {
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);

      for (let i = 0; i < particlesArray.length; i++) {
        const p = particlesArray[i];

        if (shouldMove) {
          p.x += p.speedX;
          p.y += p.speedY;

          if (p.x < 0) p.x = logicalWidth;
          if (p.x > logicalWidth) p.x = 0;
          if (p.y < 0) p.y = logicalHeight;
          if (p.y > logicalHeight) p.y = 0;
        }

        ctx.fillStyle = 'rgba(212, 216, 197, 0.7)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particlesArray.length; j++) {
          const other = particlesArray[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(212, 216, 197, ${0.38 - distance / 320})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      renderFrame(true);
      animationFrameId = requestAnimationFrame(animate);
    };

    setCanvasSize();
    init();

    if (prefersReducedMotion) {
      renderFrame(false);
    } else {
      animate();
    }

    const resizeObserver = new ResizeObserver(() => {
      setCanvasSize();
      init();
      if (prefersReducedMotion) {
        renderFrame(false);
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    return () => {
      resizeObserver.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
