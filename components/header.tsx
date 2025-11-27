"use client"

interface HeaderProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4 lg:px-12">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
            <span className="text-sm font-bold text-accent-foreground">UC</span>
          </div>
          <span className="font-bold text-foreground hidden sm:inline">Udit Chhipa</span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />
      </div>
    </header>
  )
}
