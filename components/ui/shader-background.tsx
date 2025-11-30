"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ShaderBackground() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })

        // Performance: Limit pixel ratio to 1 for high-DPI screens
        const pixelRatio = Math.min(window.devicePixelRatio, 1.5)
        renderer.setPixelRatio(pixelRatio)

        containerRef.current.appendChild(renderer.domElement)

        // Geometry
        const geometry = new THREE.PlaneGeometry(2, 2)

        // Custom Liquid Shader
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new THREE.Vector2() },
                uColor1: { value: new THREE.Color("#000000") }, // Black
                uColor2: { value: new THREE.Color("#06b6d4") }, // Cyan-500
                uColor3: { value: new THREE.Color("#3b82f6") }, // Blue-500
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec2 vUv;

        // Simplex noise function
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

        float snoise(vec2 v){
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                   -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 uv = vUv;
          
          // Create flowing liquid effect
          float noise1 = snoise(uv * 3.0 + uTime * 0.1);
          float noise2 = snoise(uv * 6.0 - uTime * 0.15);
          float noise3 = snoise(uv * 2.0 + uTime * 0.05);
          
          float mixVal = (noise1 + noise2 + noise3) / 3.0;
          
          // Color mixing
          vec3 color = mix(uColor1, uColor2, smoothstep(-0.5, 0.5, mixVal));
          color = mix(color, uColor3, smoothstep(0.2, 0.8, noise3));
          
          // Darken edges for vignette
          float dist = distance(uv, vec2(0.5));
          color *= 1.0 - dist * 0.5;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
        })

        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        // Resize handler
        const handleResize = () => {
            if (!containerRef.current) return
            const width = containerRef.current.clientWidth
            const height = containerRef.current.clientHeight
            renderer.setSize(width, height)
            material.uniforms.uResolution.value.set(width, height)
        }

        handleResize()
        window.addEventListener("resize", handleResize)

        // Animation loop
        let animationId: number
        const clock = new THREE.Clock()

        const animate = () => {
            animationId = requestAnimationFrame(animate)
            material.uniforms.uTime.value = clock.getElapsedTime()
            renderer.render(scene, camera)
        }

        animate()

        return () => {
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(animationId)
            renderer.dispose()
            geometry.dispose()
            material.dispose()
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement)
            }
        }
    }, [])

    return <div ref={containerRef} className="fixed inset-0 -z-10 w-full h-full bg-black" />
}
