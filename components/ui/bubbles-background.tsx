"use client"

import { useEffect, useState } from "react"

export function BubblesBackground() {
    const [bubbles, setBubbles] = useState<{ id: number; size: number; left: number; duration: number; delay: number }[]>([])

    useEffect(() => {
        const newBubbles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            size: Math.random() * 60 + 20, // 20px to 80px
            left: Math.random() * 100, // 0% to 100%
            duration: Math.random() * 10 + 10, // 10s to 20s
            delay: Math.random() * 5, // 0s to 5s
        }))
        setBubbles(newBubbles)
    }, [])

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-[#1a0505]">
            {/* Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2a0a0a]/50 to-[#1a0505]" />

            {/* Bubbles */}
            {bubbles.map((bubble) => (
                <div
                    key={bubble.id}
                    className="absolute bottom-[-100px] rounded-full bg-red-500/10 backdrop-blur-sm border border-red-500/20 animate-float"
                    style={{
                        width: `${bubble.size}px`,
                        height: `${bubble.size}px`,
                        left: `${bubble.left}%`,
                        animationDuration: `${bubble.duration}s`,
                        animationDelay: `${bubble.delay}s`,
                    }}
                />
            ))}

            <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation-name: float;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
        </div>
    )
}
