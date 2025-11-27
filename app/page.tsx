"use client"

import { useEffect, useState, useRef } from "react"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import {
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon,
  Code,
  Briefcase,
  User,
  Mail,
  Award
} from "lucide-react"
import { useClickRipple } from "@/components/click-ripple"
import { ThreeBackground } from "@/components/three-background"

export default function Home() {
  const [activeSection, setActiveSection] = useState("about")
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const contentRef = useRef<HTMLDivElement>(null)

  useClickRipple()

  const sections = [
    { id: "about", label: "Home", icon: HomeIcon },
    { id: "skills", label: "Skills", icon: Code },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: Award },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  // Scroll spy removed as per user request

  const handleTabClick = (sectionId: string) => {
    setActiveSection(sectionId)

    // If contact is clicked, scroll to the footer
    if (sectionId === "contact") {
      const footer = document.getElementById("site-footer")
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth", block: "end" })
        return
      }
    }

    const element = document.getElementById(`section-${sectionId}`)
    if (element && contentRef.current) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background flex flex-col overflow-hidden">
      <ThreeBackground />

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.1), transparent 80%)`,
          transition: "background 0.1s ease-out",
          zIndex: 1,
        }}
      />


      <main className="flex flex-1 relative z-20">
        {/* Sidebar */}
        <div
          className={`fixed left-0 top-0 h-screen transition-all duration-300 border-r border-border bg-card/50 backdrop-blur-sm ${sidebarVisible ? "w-72" : "w-0"
            } overflow-hidden flex flex-col z-40`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary/50">
                UC
              </div>
              <span className="font-bold text-lg tracking-wide">Portfolio</span>
            </div>
            <button
              onClick={() => setSidebarVisible(!sidebarVisible)}
              className="w-8 h-8 rounded-full bg-cyan-500 hover:bg-cyan-400 flex items-center justify-center text-white transition-colors shadow-lg shadow-cyan-500/20"
              aria-label="Toggle sidebar"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-2 p-4 flex-1 overflow-y-auto relative">
            {sections.map((section) => {
              const Icon = section.icon
              const isActive = activeSection === section.id
              return (
                <button
                  key={section.id}
                  onClick={() => handleTabClick(section.id)}
                  className={`flex items-center gap-4 px-4 py-3.5 text-sm font-medium rounded-xl transition-colors text-left relative z-10 focus:outline-none focus-visible:ring-0 ${isActive ? "text-foreground font-bold bg-secondary/50" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                >
                  <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`} />
                  <span className="tracking-wide">{section.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Toggle button when sidebar is hidden */}
        {!sidebarVisible && (
          <button
            onClick={() => setSidebarVisible(true)}
            className="fixed left-4 top-4 w-10 h-10 rounded-full bg-cyan-500 hover:bg-cyan-400 z-50 flex items-center justify-center text-white transition-colors shadow-lg shadow-cyan-500/20"
            aria-label="Show sidebar"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Main content area */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarVisible ? "ml-72" : "ml-0"}`}>
          <div ref={contentRef} className="flex-1 w-full h-screen overflow-y-auto scroll-smooth relative">
            <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
              <div id="section-about" className="mb-20 scroll-mt-24">
                <Hero />
              </div>
              <div id="section-skills" className="mb-20 scroll-mt-24">
                <Skills />
              </div>
              <div id="section-experience" className="mb-20 scroll-mt-24">
                <Experience />
              </div>
              <div id="section-projects" className="mb-20 scroll-mt-24">
                <Projects />
              </div>
              <div id="section-contact" className="mb-20 scroll-mt-24">
                <Contact />
              </div>
            </div>
            <div id="site-footer">
              <Footer />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
