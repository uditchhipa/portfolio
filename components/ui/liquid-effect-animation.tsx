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
        
        // CRITICAL PERFORMANCE FIX: Force low resolution
        if (app.renderer) {
            const pixelRatio = Math.min(window.devicePixelRatio, 2) * 0.5; // Target effective 0.5x-1x
            app.renderer.setPixelRatio(pixelRatio);
            
            // iOS FIX: Explicitly set size on init
            const width = canvas.clientWidth || window.innerWidth;
            const height = canvas.clientHeight || window.innerHeight;
            app.renderer.setSize(width, height, false);
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
          if (window.__liquidApp.renderer) {
            const canvas = canvasRef.current;
            const width = canvas.clientWidth || window.innerWidth;
            const height = canvas.clientHeight || window.innerHeight;
            window.__liquidApp.renderer.setSize(width, height, false);

            // Re-apply low pixel ratio on resize just in case
            const pixelRatio = Math.min(window.devicePixelRatio, 2) * 0.5;
            window.__liquidApp.renderer.setPixelRatio(pixelRatio);
          }
        }
      }, 200);
    }

    // iOS FIX: Trigger resize on mount to ensure correct sizing
    setTimeout(handleResize, 100);

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize);
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
