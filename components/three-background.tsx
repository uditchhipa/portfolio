"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    camera.position.z = 100

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Create particles
    const particleCount = 150
    const particles = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 400
      positions[i + 1] = (Math.random() - 0.5) * 400
      positions[i + 2] = (Math.random() - 0.5) * 400
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 3,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(particles, material)
    scene.add(points)

    // Create lines connecting particles
    const lineGeometry = new THREE.BufferGeometry()
    const linePositions: number[] = []

    const posArray = particles.attributes.position.array as Float32Array
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const x1 = posArray[i * 3]
        const y1 = posArray[i * 3 + 1]
        const z1 = posArray[i * 3 + 2]

        const x2 = posArray[j * 3]
        const y2 = posArray[j * 3 + 1]
        const z2 = posArray[j * 3 + 2]

        const distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2)

        if (distance < 80) {
          linePositions.push(x1, y1, z1, x2, y2, z2)
        }
      }
    }

    lineGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePositions), 3))

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      linewidth: 1,
      transparent: true,
      opacity: 0.5,
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    // Mouse tracking
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Rotate particles
      points.rotation.x += 0.00005
      points.rotation.y += 0.0001

      // Mouse interaction
      points.rotation.x += mouseY * 0.0002
      points.rotation.y += mouseX * 0.0002

      // Update particle positions for animation
      const positionAttribute = particles.getAttribute("position") as THREE.BufferAttribute
      const pos = positionAttribute.array as Float32Array

      for (let i = 0; i < particleCount * 3; i += 3) {
        pos[i] += Math.sin(Date.now() * 0.00005 + i) * 0.05
        pos[i + 1] += Math.cos(Date.now() * 0.00005 + i) * 0.05
      }

      positionAttribute.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0" style={{ zIndex: 0 }} />
}
