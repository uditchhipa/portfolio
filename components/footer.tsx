import { Github, Linkedin, Mail, Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer
      className="border-t border-border glass transition-all duration-300"
    >
      <div className="max-w-full px-6 lg:px-12 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Section - Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                UC
              </div>
              <h3 className="text-lg font-bold text-foreground">Udit Chhipa</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Security Engineer | Computer Science Engineer | Cybersecurity Specialist
            </p>
            <p className="text-xs text-muted-foreground">Jaipur National University</p>
            <p className="text-xs text-muted-foreground">+91 78520-91947 | r50017.udit@jnujaipur.ac.in</p>
          </div>

          {/* Right Section - Social Icons */}
          <div className="flex gap-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border hover:border-accent hover:text-accent transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border hover:border-accent hover:text-accent transition-all"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:udit7852@gmail.com"
              className="p-2 rounded-lg border border-border hover:border-accent hover:text-accent transition-all"
              title="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/udit.0815/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border hover:border-accent hover:text-accent transition-all"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border hover:border-accent hover:text-accent transition-all"
              title="GitHub"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border hover:border-accent hover:text-accent transition-all"
              title="GitHub"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © 2025 Udit Chhipa. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
