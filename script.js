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
  android: {
    id: "android",
    title: "Android Platform Security Research",
    meta: "Advanced Threat Emulation Framework · 2025 – Present",
    line: "Controlled Android research component for studying system behavior and detection coverage.",
    facts: [
      ["Platform", "Android"],
      ["Role", "Framework research component"],
      ["Focus", "System behavior and detection coverage"],
      ["Status", "Active Research"]
    ],
    process: [
      ["Problem", "Security research across mobile platforms requires repeatable experiments that make system behavior and detection coverage easier to compare."],
      ["Approach", "Developed the Android component as part of a broader multi-platform framework and documented observations, test conditions, and defensive research findings."],
      ["Outcome", "Created a reusable Android research track that supports comparison with the framework's Windows components."]
    ]
  },
  shadowfox: {
    id: "shadowfox",
    title: "Web App Vulnerability Assessment Lab",
    meta: "ShadowFox · Remote · 2025",
    line: "Web application and REST API security assessments during a remote cybersecurity internship.",
    facts: [
      ["Role", "Cyber Security Intern"],
      ["Arsenal", "Burp Suite · Nessus · Nmap · REST APIs"],
      ["Focus", "Web application and REST API testing"],
      ["Status", "Completed"]
    ],
    process: [
      ["Approach", "Conducted web application and REST API security assessments using Burp Suite, Nessus, and Nmap."],
      ["Outcome", "Documented security findings and remediation recommendations, performed OSINT reconnaissance, and analyzed network traffic with Wireshark."]
    ]
  },
  ollama: {
    id: "ollama",
    title: "Local Qwen Analysis for Telemon",
    meta: "Telemon · NLP Research · 2026",
    line: "Local language-model analysis for message classification and research triage.",
    facts: [
      ["Architecture", "Local Qwen 70B inference"],
      ["Pipeline", "Python · Telegram OSINT · NLP"],
      ["Analysis", "Sentiment and role/entity classification"],
      ["Status", "Research Component of Telemon"]
    ],
    process: [
      ["Problem", "Large-scale channel research needs consistent message classification and triage before investigators review the collected material."],
      ["Approach", "Used a local Qwen 70B model with Python workflows to support sentiment analysis, message categorization, and role/entity classification within the Telemon pipeline."],
      ["Outcome", "Supported a one-week authorized collection that indexed approximately 700 channels, 11,000 APK artifacts, and 15,000 associated users for analysis."]
    ]
  },
  ctf: {
    id: "ctf",
    title: "Capture The Flag (CTF) Achievement",
    meta: "Competitive Security · Awarded · 2024",
    line: "Secured 6th position at Jaipur National University CTF competition.",
    facts: [
      ["Achievement", "6th Place Rank in University CTF"],
      ["Host", "Jaipur National University"]
    ],
    process: [
      ["Outcome", "Achieved 6th place in a university-wide Capture the Flag competition."]
    ]
  }
};

const QUEST_ORDER = ["android", "shadowfox", "ollama", "ctf"];
let currentQuestId = "android";

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
