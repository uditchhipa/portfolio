
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

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden bg-card">
            {/* Project Header - Always Visible */}
            <button
              onClick={() => toggleProject(index)}
              className="w-full p-6 flex items-center justify-between hover:bg-card/80 transition-colors text-left group"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-accent mt-1">{project.type}</p>
              </div>
              <div
                className={`ml-4 flex-shrink-0 transition-transform duration-300 ${expandedProjects.includes(index) ? "rotate-180" : "rotate-0"
                  }`}
              >
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </button>

            {/* Project Details - Conditionally Rendered */}
            {expandedProjects.includes(index) && (
              <div className="px-6 pb-6 space-y-4 border-t border-border/50">
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                {/* Highlights */}
                <div className="space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <div key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="text-accent flex-shrink-0">✓</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-primary/20 text-accent border border-accent/30 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4">
                  {/* @ts-ignore */}
                  {project.report && (
                    <a
                      /* @ts-ignore */
                      href={project.report}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-medium text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View Security Report
                    </a>
                  )}

                  {/* @ts-ignore */}
                  {project.github && (
                    <a
                      /* @ts-ignore */
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 text-foreground rounded-lg hover:bg-secondary transition-colors font-medium text-sm border border-border"
                    >
                      <Github className="w-4 h-4" />
                      View Source
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
