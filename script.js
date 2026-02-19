// script.js

// Progress bar
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  const bar = document.getElementById('progressBar');
  if (bar) bar.style.width = scrollPercent + "%";
});

// Reveal animations (with stagger)
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const delay = Number(el.getAttribute("data-delay") || "0");
    setTimeout(() => el.classList.add("visible"), delay);

    io.unobserve(el);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .reveal-zoom').forEach((el, idx) => {
  el.setAttribute("data-delay", String((idx % 6) * 70));
  io.observe(el);
});

// Glitch micro-shake for title label
const glitchText = document.querySelector('.glitch-text');
if (glitchText) {
  setInterval(() => {
    glitchText.style.transform = `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)`;
    setTimeout(() => { glitchText.style.transform = 'translate(0, 0)'; }, 90);
  }, 2600);
}

// Mini typing terminals
function typeLines(target, lines, speedMs = 18, linePauseMs = 220) {
  if (!target) return;
  let i = 0;
  let j = 0;

  function typeChar() {
    if (i >= lines.length) return;

    const line = lines[i];
    if (j < line.length) {
      target.textContent += line[j];
      j++;
      setTimeout(typeChar, speedMs);
      return;
    }

    // end of line
    target.textContent += "\n";
    i++;
    j = 0;
    setTimeout(typeChar, linePauseMs);
  }

  typeChar();
}

typeLines(
  document.getElementById("miniTerminal"),
  [
    "> init dossier: CHE",
    "> source: COMCYBER / Ministere des Armees",
    "> scope: immersion - offensive - defensive",
    "> status: ready",
    "> next: kickoff briefing"
  ],
  16,
  180
);

typeLines(
  document.getElementById("ctfTerminal"),
  [
    "[+] load: ctf environment",
"[+] preparation: participation a Rhintech CTF a Mulhouse et TRACS a CentraleSupelec a Paris",
"[+] objective: mise en situation reelle face a des challenges de securite varies",
"[+] skills developed: recon, web, crypto et analyse de vulnerabilites",
"[+] constraint: gestion du temps et travail sous pression",
"[+] outcome: amelioration de la rapidite, de la methodologie et de la coordination en equipe"
  ],
  14,
  180
);

typeLines(
  document.getElementById("opsConsole"),
  [
    "OPS MODE ONLINE",
    "task: vuln analysis -> validate -> prioritize",
    "task: crypto -> solve -> deliver proof",
    "task: mapping -> understand flows",
    "task: malware -> behavior + traces",
    "task: LIO/LID -> action + defense",
    "result: execution stable"
  ],
  12,
  160
);

// Animate meters in dashboard when visible
const meters = document.querySelectorAll('.meter');
const meterIO = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const meter = entry.target;
    const value = Math.max(0, Math.min(100, Number(meter.getAttribute('data-meter') || "0")));
    const barSpan = meter.querySelector('.meter-bar span');
    if (barSpan) barSpan.style.width = value + "%";
    meterIO.unobserve(meter);
  });
}, { threshold: 0.35 });

meters.forEach(m => meterIO.observe(m));

// Heartbeat BPM randomizer
const hb = document.getElementById("hbValue");
if (hb) {
  setInterval(() => {
    const bpm = 68 + Math.floor(Math.random() * 12);
    hb.textContent = `${bpm} BPM`;
  }, 1600);
}

// Counters on END section
function animateCounter(el, target, durationMs = 1100) {
  const start = 0;
  const t0 = performance.now();

  function step(t) {
    const p = Math.min(1, (t - t0) / durationMs);
    const value = Math.round(start + (target - start) * (p * (2 - p))); // ease out
    el.textContent = String(value);
    if (p < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const counterEls = document.querySelectorAll('.counter');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.getAttribute('data-count') || "0");
    animateCounter(el, target, 1200);
    counterIO.unobserve(el);
  });
}, { threshold: 0.35 });

counterEls.forEach(c => counterIO.observe(c));

