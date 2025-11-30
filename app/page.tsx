"use client"

import Link from "next/link"
import { WaveBackground } from "@/components/ui/wave-background"

export default function LandingPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
            {/* Background */}
            <WaveBackground />

            {/* Content Overlay */}
            <div className="relative z-10 text-center space-y-8 p-4">
                <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <h1 className="text-6xl md:text-8xl font-bold text-black tracking-tighter drop-shadow-sm font-[family-name:var(--font-orbitron)]">
                        UDIT CHHIPA
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-700 font-light tracking-widest uppercase opacity-90">
                        Security Engineer & Developer
                    </p>
                </div>

                <div className="pt-8 animate-in fade-in zoom-in-50 duration-1000 delay-500 fill-mode-forwards opacity-0" style={{ animationFillMode: 'forwards' }}>
                    <Link
                        href="/portfolio"
                        className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-bold text-white transition-all duration-300 bg-black border-2 border-black rounded-full hover:bg-gray-800 hover:scale-105 hover:shadow-xl"
                    >
                        <span className="relative z-10">Click Here to View Portfolio</span>
                        <div className="absolute inset-0 rounded-full bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
