"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function WaveBackground() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        // Fog for depth (White fog for light mode)
        scene.fog = new THREE.Fog(0xffffff, 1, 10)

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
        camera.position.z = 3
        camera.position.y = 1

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        containerRef.current.appendChild(renderer.domElement)

        // Particles
        const count = 2000
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10
            positions[i * 3 + 1] = (Math.random() - 0.5) * 2
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10

            // Dark Grey/Black colors for Light Mode
            const shade = 0.1 + Math.random() * 0.2 // Dark grey (0.1 to 0.3)
            colors[i * 3] = shade     // R
            colors[i * 3 + 1] = shade // G
            colors[i * 3 + 2] = shade // B
        }

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

        // Custom Shader Material
        const material = new THREE.ShaderMaterial({
            vertexShader: `
        uniform float uTime;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Wave animation
          pos.y += sin(pos.x * 2.0 + uTime) * 0.2;
          pos.y += sin(pos.z * 1.5 + uTime) * 0.2;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Size attenuation
          gl_PointSize = 4.0 * (1.0 / -mvPosition.z);
        }
      `,
            fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // Circular particle
          float strength = distance(gl_PointCoord, vec2(0.5));
          strength = 1.0 - strength;
          strength = pow(strength, 3.0);
          
          vec3 finalColor = mix(vec3(1.0), vColor, strength); // Mix with white background
          gl_FragColor = vec4(finalColor, strength);
        }
      `,
            uniforms: {
                uTime: { value: 0 }
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.NormalBlending, // Normal blending for dark on light
            vertexColors: true
        })

        const particles = new THREE.Points(geometry, material)
        scene.add(particles)

        // Resize handler
        const handleResize = () => {
            if (!containerRef.current) return
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener("resize", handleResize)

        // Animation loop
        let animationId: number
        const clock = new THREE.Clock()

        const animate = () => {
            const elapsedTime = clock.getElapsedTime()
            material.uniforms.uTime.value = elapsedTime

            // Gentle rotation
            particles.rotation.y = elapsedTime * 0.05

            renderer.render(scene, camera)
            animationId = requestAnimationFrame(animate)
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

    return <div ref={containerRef} className="fixed inset-0 -z-10 w-full h-full bg-white" />
}
