/**
 * UDIT CHHIPA — INTERACTIVE ENGINE
 * Draggable collage physics, Side Quest modal dialogs, Cursor pill,
 * Dark/Light theme switching, and live IST clock.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavScroll();
  initDraggableCollage();
  initCursorPill();
  initSideQuests();
  initISTClock();
  initEmailCopy();
});

/* ==========================================================================
   1. THEME TOGGLE (DARK / LIGHT)
   ========================================================================== */
function initTheme() {
  const themeBtn = document.getElementById('themeBtn');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('udit-theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  setTheme(currentTheme);

  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    setTheme(nextTheme);
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('udit-theme', theme);
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/* ==========================================================================
   2. STICKY NAV DYNAMIC LIGHT/DARK DETECTION
   ========================================================================== */
function initNavScroll() {
  const nav = document.getElementById('mainNav');
  const hero = document.getElementById('hero');
  const footer = document.getElementById('contact');

  if (!nav || !hero) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroBottom = hero.offsetTop + hero.offsetHeight - 64;
    const footerTop = footer ? footer.offsetTop - 64 : 999999;

    // Nav is dark over hero & footer, light over the middle content
    const inLightSection = scrollY > heroBottom && scrollY < footerTop;
    nav.classList.toggle('is-light', inLightSection);
  }, { passive: true });
}

/* ==========================================================================
   3. DRAGGABLE COLLAGE PHYSICS
   ========================================================================== */
function initDraggableCollage() {
  const collage = document.querySelector('.collage');
  if (!collage) return;

  collage.classList.add('can-drag');
  const draggables = collage.querySelectorAll('.drag');
  let topZ = 10;

  draggables.forEach((el) => {
    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeft = el.offsetLeft;
    let initialTop = el.offsetTop;
    const baseRot = parseFloat(el.getAttribute('data-rot') || '0');

    // Mouse down
    el.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isDragging = true;
      el.classList.add('dragging');
      topZ += 1;
      el.style.zIndex = topZ;

      startX = e.clientX;
      startY = e.clientY;
      initialLeft = el.offsetLeft;
      initialTop = el.offsetTop;

      const onMouseMove = (ev) => {
        if (!isDragging) return;
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        el.style.left = `${initialLeft + dx}px`;
        el.style.top = `${initialTop + dy}px`;
        el.style.transform = `rotate(${baseRot + dx * 0.04}deg)`;
      };

      const onMouseUp = () => {
        isDragging = false;
        el.classList.remove('dragging');
        el.style.transform = `rotate(${baseRot}deg)`;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });

    // Touch events for mobile
    el.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) return;
      isDragging = true;
      el.classList.add('dragging');
      topZ += 1;
      el.style.zIndex = topZ;

      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      initialLeft = el.offsetLeft;
      initialTop = el.offsetTop;

      const onTouchMove = (ev) => {
        if (!isDragging || ev.touches.length !== 1) return;
        const t = ev.touches[0];
        const dx = t.clientX - startX;
        const dy = t.clientY - startY;
        el.style.left = `${initialLeft + dx}px`;
        el.style.top = `${initialTop + dy}px`;
      };

      const onTouchEnd = () => {
        isDragging = false;
        el.classList.remove('dragging');
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
      };

      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onTouchEnd);
    }, { passive: true });
  });
}

/* ==========================================================================
   4. CURSOR PILL
   ========================================================================== */
function initCursorPill() {
  const pill = document.getElementById('cursorPill');
  if (!pill) return;

  let mouseX = 0, mouseY = 0;
  let pillX = 0, pillY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function renderPill() {
    pillX += (mouseX - pillX) * 0.2;
    pillY += (mouseY - pillY) * 0.2;
    pill.style.left = `${pillX}px`;
    pill.style.top = `${pillY}px`;
    requestAnimationFrame(renderPill);
  }
  renderPill();

  const triggers = document.querySelectorAll('[data-cursor]');
  triggers.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      pill.querySelector('span').textContent = el.getAttribute('data-cursor');
      pill.classList.add('show');
    });
    el.addEventListener('mouseleave', () => {
      pill.classList.remove('show');
    });
  });
}

/* ==========================================================================
   5. SIDE QUESTS MODAL DIALOG
   ========================================================================== */
const QUESTS = {
  weapon: {
    id: "weapon",
    title: "VLM Weapon & Threat Detection",
    meta: "Rajasthan Police HQ · Research · 2026",
    line: "Vision-Language Models tailored on domain-specific illicit weapons and contraband.",
    facts: [
      ["Organization", "Rajasthan Police (Cyber Crime Branch)"],
      ["Stack", "PyTorch · Vision-LLM · OpenCV · FastAPI"],
      ["Status", "Presented to Cyber Crime leadership"],
      ["Recognition", "Letter of Recommendation from HQ"]
    ],
    process: [
      ["Problem", "Underground trafficking channels on encrypted platforms distribute illicit firearms and contraband across thousands of daily media uploads. Manual monitoring by cyber detectives creates severe investigation bottlenecks."],
      ["Approach", "Fine-tuned lightweight Vision-Language Models (VLMs) on domain-specific contraband and weapons datasets. Designed a low-latency frame extraction and zero-shot bounding-box pipeline capable of classifying high-risk media in real-time."],
      ["Outcome", "Delivered automated threat tagging with high recall. Research prototype demonstrated to Cyber Crime leadership, earning a formal Letter of Recommendation from Rajasthan Police HQ."]
    ]
  },
  android: {
    id: "android",
    title: "Android Research C2 Implant in C",
    meta: "Offensive Research · Live · 2025 – Present",
    line: "Low-level mobile research implant built in pure C with multi-channel fallback.",
    facts: [
      ["Language", "C / POSIX / NDK"],
      ["Channels", "HTTPS · DNS · Telegram Dead-Drop · TCP"],
      ["Target", "ARM64 Android Internals"],
      ["Status", "Active Research"]
    ],
    process: [
      ["Problem", "Mobile endpoint detection mechanisms (EDR/MDR) increasingly monitor standard socket calls and Java/JNI layer telemetry, leaving gaps in how low-level native payloads operate under constrained mobile environments."],
      ["Approach", "Engineered a native C implant with zero external dependencies. Integrated multi-channel command & control logic with automated fallback: if direct HTTPS is blocked, it resolves instructions via DNS TXT records or encrypted Telegram dead-drops."],
      ["Outcome", "Validated persistent, resilient command execution across sandbox environments with minimal memory footprint and zero Java runtime signatures."]
    ]
  },
  shadowfox: {
    id: "shadowfox",
    title: "Web App Vulnerability Assessment Lab",
    meta: "ShadowFox · Remote · 2025",
    line: "Penetration testing and authentication flaw reconnaissance across live APIs.",
    facts: [
      ["Role", "Cyber Security Intern"],
      ["Arsenal", "Burp Suite · Nessus · Nmap · REST APIs"],
      ["Scope", "Auth Flaws, Misconfigurations, IDOR"],
      ["Status", "Completed"]
    ],
    process: [
      ["Problem", "Modern REST API endpoints often suffer from broken object level authorization (BOLA/IDOR), insecure token handshakes, and perimeter service misconfigurations."],
      ["Approach", "Conducted structured vulnerability assessments utilizing Burp Suite Professional, Nessus compliance scanners, and automated Nmap port scripting across staging environments."],
      ["Outcome", "Documented and reported high-severity authentication bypass vectors and misconfigurations, producing actionable remediation roadmaps."]
    ]
  },
  pcap: {
    id: "pcap",
    title: "Wireshark Network Traffic & Forensics",
    meta: "Incident Response · Forensics · 2025",
    line: "Deep packet inspection and threat beaconing extraction from raw PCAPs.",
    facts: [
      ["Tooling", "Wireshark · TShark · Python Scapy"],
      ["Focus", "DNS Exfiltration & C2 Anomaly Analysis"],
      ["Status", "Research Completed"]
    ],
    process: [
      ["Problem", "Stealthy malware strains blend malicious command callbacks into ordinary DNS and TLS traffic, making perimeter firewall detection difficult."],
      ["Approach", "Created automated packet parsing routines in Scapy and Wireshark filters to identify high-entropy DNS request bursts, abnormal TLS handshake certificates, and beaconing periodicity."],
      ["Outcome", "Established reliable threat hunting playbooks that isolate malicious endpoints from multi-gigabyte packet capture files in minutes."]
    ]
  },
  ollama: {
    id: "ollama",
    title: "Local Ollama Crime Classification",
    meta: "Zero-Cloud ML · Live · 2026",
    line: "Air-gapped machine learning pipeline classifying illicit marketplace chatter.",
    facts: [
      ["Architecture", "Local-first Ollama (Llama 3 / Mistral)"],
      ["Privacy", "100% Air-gapped · Zero Cloud Leaks"],
      ["Pipeline", "SQLite evidence storage · Flask API"],
      ["Status", "Production Component of TeleGuard"]
    ],
    process: [
      ["Problem", "Law enforcement and sensitive forensic investigations cannot transmit suspect criminal chat logs or sensitive intelligence to third-party cloud LLM APIs due to privacy and legal evidentiary integrity."],
      ["Approach", "Configured local Ollama instances running quantized open-source models with prompt-engineering templates that extract entities, criminal offers, and suspect handles completely offline on investigative workstations."],
      ["Outcome", "100% evidentiary integrity preserved with zero outbound internet traffic during classification, cutting manual review time by 95%."]
    ]
  },
  ctf: {
    id: "ctf",
    title: "Capture The Flag (CTF) Exploit Suite",
    meta: "Competitive Security · Awarded · 2024",
    line: "Secured 6th position at Jaipur National University CTF competition.",
    facts: [
      ["Achievement", "6th Place Rank in University CTF"],
      ["Categories", "Binary Exploitation · Web · Reverse Eng · Forensics"],
      ["Arsenal", "Ghidra · GDB · Pwntools · Python"],
      ["Host", "Jaipur National University"]
    ],
    process: [
      ["Problem", "Competitive CTFs require real-time reverse engineering of compiled binaries, memory corruption exploits, cryptographic challenge cracking, and hidden flag discovery under strict time limits."],
      ["Approach", "Developed rapid-fire Python exploit harnesses using Pwntools, decompiled stripped binaries using Ghidra, and analyzed format string vulnerabilities and buffer overflows."],
      ["Outcome", "Achieved 6th position university-wide, solving complex multi-stage forensic challenges under rigorous timed competition."]
    ]
  }
};

const QUEST_ORDER = ["weapon", "android", "shadowfox", "pcap", "ollama", "ctf"];
let currentQuestId = "weapon";

function initSideQuests() {
  const qm = document.getElementById('qm');
  const qmClose = document.getElementById('qmClose');
  const qmPrev = document.getElementById('qmPrev');
  const qmNext = document.getElementById('qmNext');
  const tabProcess = document.getElementById('tabProcess');
  const tabOverview = document.getElementById('tabOverview');

  if (!qm) return;

  // Open triggers
  document.querySelectorAll('.quest').forEach((btn) => {
    btn.addEventListener('click', () => {
      const qId = btn.getAttribute('data-id');
      openQuest(qId);
    });
  });

  // Close triggers
  if (qmClose) qmClose.addEventListener('click', () => qm.close());
  qm.addEventListener('click', (e) => {
    if (e.target === qm) qm.close();
  });

  // Next / Prev buttons
  if (qmPrev) {
    qmPrev.addEventListener('click', () => stepQuest(-1));
  }
  if (qmNext) {
    qmNext.addEventListener('click', () => stepQuest(1));
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!qm.open) return;
    if (e.key === 'ArrowRight') stepQuest(1);
    if (e.key === 'ArrowLeft') stepQuest(-1);
  });

  // Tab switching
  if (tabProcess && tabOverview) {
    tabProcess.addEventListener('click', () => setModalTab('process'));
    tabOverview.addEventListener('click', () => setModalTab('overview'));
  }
}

function openQuest(id) {
  const qm = document.getElementById('qm');
  if (!qm || !QUESTS[id]) return;
  currentQuestId = id;
  fillModal(id);
  qm.showModal();
}

function stepQuest(dir) {
  const idx = QUEST_ORDER.indexOf(currentQuestId);
  const nextIdx = (idx + dir + QUEST_ORDER.length) % QUEST_ORDER.length;
  currentQuestId = QUEST_ORDER[nextIdx];
  fillModal(currentQuestId);
}

function setModalTab(tab) {
  const tabProcess = document.getElementById('tabProcess');
  const tabOverview = document.getElementById('tabOverview');
  const paneProcess = document.getElementById('paneProcess');
  const paneOverview = document.getElementById('paneOverview');

  const isProc = tab === 'process';
  if (tabProcess) tabProcess.setAttribute('aria-selected', isProc ? 'true' : 'false');
  if (tabOverview) tabOverview.setAttribute('aria-selected', !isProc ? 'true' : 'false');
  if (paneProcess) paneProcess.hidden = !isProc;
  if (paneOverview) paneOverview.hidden = isProc;
}

function fillModal(id) {
  const data = QUESTS[id];
  if (!data) return;

  const qmMeta = document.getElementById('qmMeta');
  const qmTitle = document.getElementById('qmTitle');
  const qmLine = document.getElementById('qmLine');
  const qmSteps = document.getElementById('qmSteps');
  const qmFacts = document.getElementById('qmFacts');
  const qmMedia = document.getElementById('qmMedia');

  if (qmMeta) qmMeta.textContent = data.meta;
  if (qmTitle) qmTitle.textContent = data.title;
  if (qmLine) qmLine.textContent = data.line;

  // Fill Process Steps
  if (qmSteps) {
    qmSteps.innerHTML = data.process.map(([head, p]) => `
      <div>
        <h4>${head}</h4>
        <p>${p}</p>
      </div>
    `).join('');
  }

  // Fill Facts
  if (qmFacts) {
    qmFacts.innerHTML = data.facts.map(([k, v]) => `
      <div>
        <dt>${k}</dt>
        <dd>${v}</dd>
      </div>
    `).join('');
  }

  // Fill Media with stylized terminal/mockup
  if (qmMedia) {
    qmMedia.innerHTML = `
      <div class="q-mini-card" style="max-width: 320px;">
        <span class="mono" style="color: var(--ink-3); font-size: 10px;">${data.meta}</span>
        <h4 style="font-family: var(--f-display); margin: 8px 0; font-size: 18px;">${data.title}</h4>
        <p style="font-size: 12.5px; color: var(--ink-2); line-height: 1.5;">${data.line}</p>
        <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; font-size: 11px; color: var(--ink-3);">
          <span>SECURITY RESEARCH</span>
          <span style="color: var(--ok); font-weight: 600;">VERIFIED</span>
        </div>
      </div>
    `;
  }

  setModalTab('process');
}

/* ==========================================================================
   6. INDIAN STANDARD TIME CLOCK
   ========================================================================== */
function initISTClock() {
  const clock = document.getElementById('clock');
  const tod = document.getElementById('tod');
  if (!clock) return;

  function update() {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const istTime = new Intl.DateTimeFormat('en-IN', options).format(new Date());
    clock.textContent = `${istTime} IST (Jaipur)`;

    // Check day/night for sun/moon icon
    const hour = parseInt(new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false }).format(new Date()), 10);
    const isNight = hour >= 19 || hour < 6;
    if (tod) {
      tod.textContent = isNight ? '🌙' : '☀️';
    }
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   7. 1-CLICK EMAIL COPY
   ========================================================================== */
function initEmailCopy() {
  const copyBtn = document.getElementById('copyEmail');
  const copyLabel = document.getElementById('copyLabel');
  const toast = document.getElementById('toastNotice');

  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = 'uditchhipa007@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      if (copyLabel) copyLabel.textContent = 'Copied to clipboard! ✓';
      if (toast) {
        toast.textContent = `✓ Copied ${email} to clipboard!`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
      }
      setTimeout(() => {
        if (copyLabel) copyLabel.textContent = email;
      }, 2500);
    });
  });
}
