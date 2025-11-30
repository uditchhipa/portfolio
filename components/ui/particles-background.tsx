"use client"

import { useEffect, useRef } from "react"

export function ParticlesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let particles: Particle[] = []
        let mouse = { x: -1000, y: -1000 }

        // Configuration
        const particleCount = 60
        const connectionDistance = 150
        const mouseDistance = 200

        class Particle {
            x: number
            y: number
            vx: number
            vy: number
            size: number

            constructor(width: number, height: number) {
                this.x = Math.random() * width
                this.y = Math.random() * height
                this.vx = (Math.random() - 0.5) * 0.5
                this.vy = (Math.random() - 0.5) * 0.5
                this.size = Math.random() * 2 + 1
            }

            update(width: number, height: number) {
                this.x += this.vx
                this.y += this.vy

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1
                if (this.y < 0 || this.y > height) this.vy *= -1
            }

            draw() {
                if (!ctx) return
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = "rgba(6, 182, 212, 0.8)" // Cyan-500
                ctx.fill()
            }
        }

        const init = () => {
            particles = []
            const width = canvas.width = window.innerWidth
            const height = canvas.height = window.innerHeight

            const count = window.innerWidth < 768 ? 40 : 80

            for (let i = 0; i < count; i++) {
                particles.push(new Particle(width, height))
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach((p1, i) => {
                p1.update(canvas.width, canvas.height)
                p1.draw()

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j]
                    const dx = p1.x - p2.x
                    const dy = p1.y - p2.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(6, 182, 212, ${0.4 * (1 - distance / connectionDistance)})`
                        ctx.lineWidth = 1
                        ctx.moveTo(p1.x, p1.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                    }
                }

                const dx = p1.x - mouse.x
                const dy = p1.y - mouse.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < mouseDistance) {
                    ctx.beginPath()
                    ctx.strokeStyle = `rgba(59, 130, 246, ${0.4 * (1 - distance / mouseDistance)})`
                    ctx.lineWidth = 1
                    ctx.moveTo(p1.x, p1.y)
                    ctx.lineTo(mouse.x, mouse.y)
                    ctx.stroke()
                }
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        const handleResize = () => {
            init()
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                mouse.x = e.touches[0].clientX
                mouse.y = e.touches[0].clientY
            }
        }

        window.addEventListener("resize", handleResize)
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("touchmove", handleTouchMove)

        init()
        animate()

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("touchmove", handleTouchMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 bg-black"
        />
    )
}
