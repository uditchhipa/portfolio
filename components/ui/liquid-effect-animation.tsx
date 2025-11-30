"use client"
import { useEffect, useRef } from "react"

export function LiquidEffectAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<any>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Load the script dynamically
    const script = document.createElement("script")
    script.type = "module"
    script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';

      const canvas = document.getElementById('liquid-canvas');
      if (canvas) {
        const app = LiquidBackground(canvas);
        app.loadImage('/mesmerizing.avif');
        app.liquidPlane.material.metalness = 0.75;
        app.liquidPlane.material.roughness = 0.25;
        app.liquidPlane.uniforms.displacementScale.value = 5;
        app.setRain(false);
        
        // Performance Optimization: Cap pixel ratio to 1 to reduce GPU load on high-DPI devices
        if (app.renderer) {
            app.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
        }
        
        window.__liquidApp = app;
      }
    `

    document.body.appendChild(script)

    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (canvasRef.current && window.__liquidApp) {
          // Optional: Manually trigger resize if needed, but CSS usually handles it.
          // We just want to prevent excessive firing.
          if (window.__liquidApp.renderer) {
            const canvas = canvasRef.current;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            window.__liquidApp.renderer.setSize(width, height, false);
          }
        }
      }, 200); // Debounce by 200ms
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout);
      if (window.__liquidApp && window.__liquidApp.dispose) {
        window.__liquidApp.dispose()
      }
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 m-0 w-full h-full overflow-hidden"
      style={{ fontFamily: '"Montserrat", serif', zIndex: 0 }}
    >
      <canvas ref={canvasRef} id="liquid-canvas" className="fixed inset-0 w-full h-full" />
    </div>
  )
}

declare global {
  interface Window {
    __liquidApp?: any
  }
}
