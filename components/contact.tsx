"use client"

import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="max-w-4xl space-y-8 py-12">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-foreground">Let's Connect</h2>
        <p className="text-muted-foreground">Always open to discussing security, projects, and opportunities</p>
      </div>

      {/* Contact Card */}
      <div className="p-8 rounded-lg border border-border bg-card space-y-6">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-accent mt-1" />
          <div>
            <h3 className="text-sm font-bold text-foreground tracking-wider mb-2">EMAIL</h3>
            <a
              href="mailto:udit7852@gmail.com"
              className="text-lg font-medium text-accent hover:underline transition-colors"
            >
              udit7852@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-accent mt-1" />
          <div>
            <h3 className="text-sm font-bold text-foreground tracking-wider mb-2">PHONE</h3>
            <a href="tel:+917852091947" className="text-lg font-medium text-accent hover:underline transition-colors">
              +91 78520-91947
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-accent mt-1" />
          <div>
            <h3 className="text-sm font-bold text-foreground tracking-wider mb-2">LOCATION</h3>
            <p className="text-foreground">Jaipur, India</p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Follow Me</h3>
        <div className="flex gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-border bg-card hover:border-accent hover:bg-accent/10 transition-all group"
            title="GitHub"
          >
            <Github className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-border bg-card hover:border-accent hover:bg-accent/10 transition-all group"
            title="LinkedIn"
          >
            <Linkedin className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="mailto:udit7852@gmail.com"
            className="p-3 rounded-lg border border-border bg-card hover:border-accent hover:bg-accent/10 transition-all group"
            title="Email"
          >
            <Mail className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
