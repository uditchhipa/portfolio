
"use client"

import { useState } from "react"
import { Github } from "lucide-react"

export default function Projects() {
  const [expandedProjects, setExpandedProjects] = useState<number[]>([0])

  const projects = [
    {
      title: "Thetaluxe Ecommerce Pentest",
      description:
        "Comprehensive penetration testing and vulnerability assessment of the Thetaluxe ecommerce platform. Identified critical security flaws including IDOR and XSS, and provided a detailed remediation report.",
      highlights: [
        "Conducted full-stack security audit on live target",
        "Identified critical vulnerabilities (IDOR, XSS)",
        "Generated professional remediation report (PDF available)",
      ],
      tech: ["Web Security", "Burp Suite", "OWASP", "Reporting"],
      type: "Pentest Report",
      report: "/thetaluxe.pdf",
    },
    {
      title: "AutoRed: AI-Powered Vulnerability Scanner",
      description:
        "Automated vulnerability assessment tool that crawls web applications to detect OWASP Top 10 vulnerabilities (XSS, SQLi) with 40% increased scan coverage.",
      highlights: [
        "Integrated LLMs (OpenAI API) for auto-generating penetration testing reports",
        "Reduced manual documentation time by 90%",
        "NLP-based false positive classification for accuracy",
      ],
      tech: ["Python", "OpenAI API", "Selenium", "Machine Learning"],
      type: "Security Tool",
      github: "https://github.com/uditchhipa/Autored-Ai",
    },
    {
      title: "Smart Network Observability Dashboard",
      description:
        "Lightweight network monitoring platform visualizing system performance and packet traffic with real-time alerting capabilities.",
      highlights: [
        "Built with Flask for real-time packet visualization",
        "Improved real-time visibility by 3x",
        "Secure remote access via Ngrok tunneling",
      ],
      tech: ["Python", "Flask", "Ngrok", "Networking"],
      type: "Monitoring",
      github: "https://github.com/uditchhipa/Advanced-Object-Tracker",
    },
    {
      title: "High-Performance Honeypot (Deception Tech)",
      description:
        "Low-interaction honeypot in Go that simulates vulnerable service ports to capture threat intelligence and attacker payloads.",
      highlights: [
        "Built with Go concurrency primitives",
        "Handles 10x more simultaneous connections than Python prototype",
        "Complete forensic logging pipeline",
      ],
      tech: ["Go (Golang)", "Concurrency", "Threat Intelligence"],
      type: "Deception Tech",
      github: "https://github.com/uditchhipa/chatty-honeypot",
    },
    {
      title: "Forensic Data Analysis Pipeline",
      description:
        "Data processing tool analyzing 100,000+ log entries (IPDR/CDR) for forensic investigations and fraud detection.",
      highlights: [
        "Algorithmic filters for anomaly detection",
        "Simulated fraud detection systems",
        "Automated visual reporting with Matplotlib",
      ],
      tech: ["Python", "Pandas", "SQL", "Data Analysis"],
      type: "Forensics",
      github: "https://github.com/uditchhipa/ipdr_analyse",
    },
  ]

  const toggleProject = (index: number) => {
    setExpandedProjects((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <section className="max-w-4xl space-y-8 py-12">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-foreground">Featured Projects</h2>
        <p className="text-muted-foreground">Building security tools and solutions that matter</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="glass rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 group flex flex-col">
            <div className="p-6 flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-xs font-medium text-primary px-2 py-1 rounded-full bg-primary/10 border border-primary/20">
                    {project.type}
                  </span>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors pt-2">
                    {project.title}
                  </h3>
                </div>
                {/* @ts-ignore */}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span key={i} className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded border border-border">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-border/50 bg-secondary/30 flex items-center justify-between">
              <button
                onClick={() => toggleProject(index)}
                className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all"
              >
                View Details <span className="text-lg">→</span>
              </button>
              {/* @ts-ignore */}
              {project.report && (
                <a href={project.report} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Report Available
                </a>
              )}
            </div>

            {/* Expanded Details Overlay */}
            {expandedProjects.includes(index) && (
              <div className="absolute inset-0 bg-background/95 backdrop-blur-xl p-6 flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-bold text-foreground">Key Highlights</h4>
                  <button onClick={() => toggleProject(index)} className="text-muted-foreground hover:text-foreground">
                    ✕
                  </button>
                </div>
                <ul className="space-y-3 flex-1 overflow-y-auto">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="text-primary flex-shrink-0">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 mt-4 border-t border-border">
                  {/* @ts-ignore */}
                  {project.report && (
                    <a
                      /* @ts-ignore */
                      href={project.report}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                    >
                      View Full Security Report
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
