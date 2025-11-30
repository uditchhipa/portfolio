"use client"

import Link from "next/link"
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation"

export default function LandingPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Background */}
            <LiquidEffectAnimation />

            {/* Content Overlay */}
            <div className="relative z-10 text-center space-y-8 p-4">
                <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] font-[family-name:var(--font-orbitron)]">
                        UDIT CHHIPA
                    </h1>
                    <p className="text-xl md:text-2xl text-cyan-300 font-light tracking-widest uppercase opacity-90">
                        Security Engineer & Developer
                    </p>
                </div>

                <div className="pt-8 animate-in fade-in zoom-in-50 duration-1000 delay-500 fill-mode-forwards opacity-0" style={{ animationFillMode: 'forwards' }}>
                    <Link
                        href="/portfolio"
                        className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-bold text-black transition-all duration-300 bg-white border border-white/20 rounded-full hover:bg-cyan-400 hover:scale-110 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]"
                    >
                        <span className="relative z-10">Click Here to View Portfolio</span>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
