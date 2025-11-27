"use client"

import { Download, Link as LinkIcon, Smartphone, Mail } from "lucide-react"

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center py-4 lg:py-8">
      <div className="relative overflow-hidden rounded-3xl bg-card/30 border border-border/50 p-6 md:p-8 backdrop-blur-sm">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex flex-col gap-6">
          {/* Top Profile Section */}
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-xl shadow-primary/20 border-4 border-background">
                UC
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-1">
                <div className="text-xs font-medium text-primary tracking-wider uppercase">Resume</div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cyan-400 tracking-tight">
                  Udit Chhipa
                </h1>
                <p className="text-base md:text-lg text-muted-foreground font-medium">
                  Computer Science Engineer | Developer | Security Researcher
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs md:text-sm text-muted-foreground">
                  <span>CGPA: 7.5</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>Jaipur National University</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs font-medium border border-primary/20">
                  CSE
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] md:text-xs font-medium border border-cyan-500/20">
                  Tool Developer
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[10px] md:text-xs font-medium border border-purple-500/20">
                  Security Researcher
                </span>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-1">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector("#site-footer")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
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
                  className="px-5 py-2 bg-transparent border border-cyan-500 text-cyan-500 rounded-full text-sm font-medium hover:bg-cyan-500/10 transition-all flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download CV
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border/50 w-full" />

          {/* Detailed Bio Box */}
          <div className="bg-secondary/20 rounded-2xl p-5 md:p-6 border border-border/50 space-y-4">
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              I am a final-year Computer Science student with a dual focus on <span className="text-foreground font-medium">Software Development</span> and <span className="text-foreground font-medium">Cybersecurity Engineering</span>. I enjoy solving complex engineering problems—whether that means optimizing a Java algorithm for speed or architecting a Python tool to detect security flaws.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card/40 border border-border/50 rounded-xl p-4 space-y-2 hover:bg-card/60 transition-colors">
                <h3 className="text-base font-semibold text-primary flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  What I Build
                </h3>
                <ul className="space-y-1.5 text-muted-foreground text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong className="text-foreground">Backend Systems:</strong> High-concurrency network services built in Go (Golang).</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong className="text-foreground">AI Integrations:</strong> Automated reporting engines using LLMs (OpenAI) and NLP.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong className="text-foreground">Data Pipelines:</strong> Fraud detection logic processing 100k+ records using Pandas/SQL.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card/40 border border-border/50 rounded-xl p-4 space-y-2 hover:bg-card/60 transition-colors">
                <h3 className="text-base font-semibold text-cyan-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  How I Secure It
                </h3>
                <ul className="space-y-1.5 text-muted-foreground text-sm">
                  <li className="flex gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>I apply <strong className="text-foreground">OWASP Top 10</strong> principles and Zero Trust architecture.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>I use <strong className="text-foreground">Threat Modeling (STRIDE)</strong> to anticipate design flaws.</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed border-t border-border/50 pt-3 text-sm md:text-base">
              I am eager to apply my technical versatility to a challenging internship in <span className="text-foreground font-medium">Software Engineering</span>, <span className="text-foreground font-medium">Backend Development</span>, or <span className="text-foreground font-medium">Security Engineering</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
