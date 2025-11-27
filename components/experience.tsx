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

      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <button
          onClick={() => setExpandedExp(!expandedExp)}
          className="w-full p-6 flex items-center justify-between hover:bg-card/80 transition-colors text-left"
        >
          <h3 className="text-2xl font-bold text-foreground">My Experience</h3>
          <div className={`flex-shrink-0 transition-transform duration-300 ${expandedExp ? "rotate-180" : "rotate-0"}`}>
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </button>

        {/* Experience Cards - Conditionally Rendered */}
        {expandedExp && (
          <div className="px-6 pb-6 space-y-6 border-t border-border/50">
            {experiences.map((exp, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-foreground">{exp.title}</h4>
                    <p className="text-accent font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.type}</p>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono flex-shrink-0">{exp.period}</span>
                </div>

                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground">
                      <span className="text-accent flex-shrink-0">→</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <button
          onClick={() => setExpandedAch(!expandedAch)}
          className="w-full p-6 flex items-center justify-between hover:bg-card/80 transition-colors text-left"
        >
          <h3 className="text-2xl font-bold text-foreground">Achievements</h3>
          <div className={`flex-shrink-0 transition-transform duration-300 ${expandedAch ? "rotate-180" : "rotate-0"}`}>
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </button>

        {/* Achievements Grid - Conditionally Rendered */}
        {expandedAch && (
          <div className="px-6 pb-6 border-t border-border/50">
            <div className="grid md:grid-cols-3 gap-4">
              {achievements.map((ach, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border/50 bg-background hover:border-accent/50 transition-all"
                >
                  <div className="text-3xl mb-2">{ach.icon}</div>
                  <h4 className="font-bold text-foreground mb-2">{ach.category}</h4>
                  <p className="text-sm text-muted-foreground">{ach.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
