"use client"

import { Download, Link as LinkIcon, Smartphone, Mail } from "lucide-react"

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center py-4 lg:py-8">
      <div className="relative overflow-hidden rounded-3xl glass p-8 md:p-10">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse delay-1000" />

        <div className="relative z-10 flex flex-col gap-8">
          {/* Top Profile Section */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Avatar */}
            <div className="flex-shrink-0 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-cyan-400 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center text-white text-4xl md:text-5xl font-bold border-4 border-white/10 shadow-2xl">
                UC
              </div>
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-[#0a0a0a] flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase border border-primary/20">
                    Available for Hire
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-wider uppercase border border-cyan-500/20">
                    Open to Work
                  </span>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-3">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-glow">
                    Udit Chhipa
                  </h1>
                  <svg className="w-8 h-8 text-blue-400 fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </div>

                <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl">
                  Security Engineer & Full Stack Developer crafting robust, secure, and scalable digital solutions.
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-primary" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>udit.chhipa@example.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span>Jaipur, India</span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                {["Network Security", "Penetration Testing", "Full Stack Dev", "Cloud Security", "Python", "Go"].map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 hover:bg-primary/20 transition-colors cursor-default shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector("#site-footer")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/25 flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <LinkIcon className="w-4 h-4" />
                  Connect
                </a>
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch('/Udit_Chhipa_Resume.pdf');
                      const blob = await response.blob();
                      const url = window.URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = 'Udit_Chhipa_Resume.pdf';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      window.URL.revokeObjectURL(url);
                    } catch (error) {
                      console.error('Download failed:', error);
                      window.open('/Udit_Chhipa_Resume.pdf', '_blank');
                    }
                  }}
                  className="px-8 py-3 bg-white border border-border text-foreground rounded-full text-sm font-bold hover:bg-secondary transition-all flex items-center gap-2 hover:scale-105 active:scale-95 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full" />

          {/* Detailed Bio Box */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 glass p-6 rounded-2xl space-y-4">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <span className="w-2 h-8 bg-primary rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                About Me
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                I am a final-year Computer Science student with a dual focus on <span className="text-primary font-bold">Software Development</span> and <span className="text-primary font-bold">Cybersecurity Engineering</span>. I enjoy solving complex engineering problems—whether that means optimizing a Java algorithm for speed or architecting a Python tool to detect security flaws.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently looking for opportunities to apply my skills in a challenging environment where I can grow and contribute to secure, scalable systems.
              </p>
            </div>

            <div className="space-y-4">
              <div className="glass p-5 rounded-2xl hover:bg-white/50 transition-colors cursor-default">
                <h3 className="text-lg font-bold text-primary mb-2">Focus</h3>
                <p className="text-sm text-muted-foreground font-medium">
                  Building automated security tools and scalable backend systems.
                </p>
              </div>
              <div className="glass p-5 rounded-2xl hover:bg-white/50 transition-colors cursor-default">
                <h3 className="text-lg font-bold text-cyan-600 mb-2">Goal</h3>
                <p className="text-sm text-muted-foreground font-medium">
                  To secure the digital infrastructure of tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
