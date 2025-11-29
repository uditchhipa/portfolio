"use client"

import { useState } from "react"

export default function Experience() {
  const [expandedExp, setExpandedExp] = useState<boolean>(true)
  const [expandedAch, setExpandedAch] = useState<boolean>(true)

  const experiences = [
    {
      title: "Security Engineering Intern",
      company: "ShadowFox",
      type: "Remote / Hybrid",
      period: "July 2025 – Present",
      achievements: [
        "Executed Dynamic Application Security Testing (DAST) on web infrastructure, identifying 15+ critical vulnerabilities",
        "Engineered custom Python automation scripts to streamline reconnaissance and vulnerability scanning, reducing manual testing overhead by 20%",
        "Orchestrated network traffic analysis and packet inspection using Wireshark to identify and patch insecure transmission protocols",
      ],
    },
  ]

  const achievements = [
    {
      category: "TryHackMe",
      detail: "Ranked in the Top 10% globally; completed advanced paths in Web Fundamentals",
      icon: "🎖️",
    },
    {
      category: "Hack The Box",
      detail: 'Active participant in solving "Hard" tier machines and Pro Labs scenarios',
      icon: "🔓",
    },
    {
      category: "Coding",
      detail: "Solved 200+ DSA problems on LeetCode/HackerRank (Java/Python)",
      icon: "💻",
    },
  ]

  return (
    <section className="max-w-4xl space-y-8 py-12">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-foreground">Experience</h2>
        <p className="text-muted-foreground">Professional journey in cybersecurity</p>
      </div>

      {/* Experience Timeline */}
      <div className="relative border-l-2 border-primary/20 ml-3 md:ml-6 space-y-12 pb-12">
        {experiences.map((exp, index) => (
          <div key={index} className="relative pl-8 md:pl-12">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-sm" />

            <div className="glass p-6 rounded-xl hover:bg-white transition-colors group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{exp.title}</h3>
                  <p className="text-cyan-600 font-medium">{exp.company}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-mono text-muted-foreground border border-border">
                    {exp.period}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{exp.type}</p>
                </div>
              </div>

              <ul className="space-y-3">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-foreground pl-2 border-l-4 border-primary">Achievements</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {achievements.map((ach, index) => (
            <div
              key={index}
              className="glass p-6 rounded-xl hover:scale-105 transition-transform duration-300 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{ach.icon}</div>
              <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{ach.category}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{ach.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
