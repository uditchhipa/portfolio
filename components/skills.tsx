export default function Skills() {
  const skillCategories = [
    {
      category: "Languages",
      skills: ["Python (Advanced)", "Java (DSA)", "Go (Golang)", "HTML", "CSS", "JavaScript", "SQL", "Bash"],
    },
    {
      category: "Security Tools",
      skills: ["Burp Suite", "Metasploit", "Wireshark", "Nmap", "OWASP ZAP", "Docker", "Kubernetes"],
    },
    {
      category: "Core Concepts",
      skills: [
        "Network Security",
        "Threat Modeling (STRIDE)",
        "Zero Trust",
        "Digital Forensics",
        "CI/CD Security",
        "Web Application Security",
        "OWASP Top 10",
      ],
    },
    {
      category: "Data & AI",
      skills: ["Pandas", "NumPy", "OpenAI API Integration", "Log Analysis", "Selenium", "Machine Learning Basics"],
    },
  ]

  return (
    <section className="max-w-4xl space-y-8 py-12">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-foreground">Technical Skills</h2>
        <p className="text-muted-foreground">Expertise across security, development, and data analysis</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className="p-6 rounded-lg border border-border bg-card hover:border-accent/50 transition-all"
          >
            <h3 className="text-lg font-bold text-accent mb-4">{category.category}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm rounded-full bg-primary/20 text-foreground border border-accent/30 font-medium hover:border-accent transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Continuous Learning */}
      <div className="p-6 rounded-lg border border-border bg-card/50">
        <h3 className="text-lg font-bold text-foreground mb-3">Continuous Learning</h3>
        <p className="text-muted-foreground mb-4">
          Active learner on platforms like HackTheBox, TryHackMe, and LeetCode. Constantly exploring new threat
          landscapes and security methodologies.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 text-sm rounded-full bg-accent/20 text-accent font-medium">
            Advanced Web Security
          </span>
          <span className="px-3 py-1 text-sm rounded-full bg-accent/20 text-accent font-medium">Cloud Security</span>
          <span className="px-3 py-1 text-sm rounded-full bg-accent/20 text-accent font-medium">
            Threat Intelligence
          </span>
          <span className="px-3 py-1 text-sm rounded-full bg-accent/20 text-accent font-medium">Incident Response</span>
        </div>
      </div>
    </section>
  )
}
