import { useState, useEffect, useRef } from "react";


// ── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const T = {
  // Warm ivory/cream for home background instead of dark
  pageBg: "#FDFAF5",
  heroGrad: "linear-gradient(135deg, #FFF8EE 0%, #FFF3E0 40%, #FEF9EF 100%)",
  ink: "#1A1207",
  ink2: "#221809",
  ink3: "#2C2010",
  navy: "#1A1207",
  cream: "#F8F4EC",
  cream2: "#F2EDE0",
  orange: "#F4581A",
  orange2: "#FF7A40",
  gold: "#F0B429",
  teal: "#00C4A7",
  blue: "#2563EB",
  blue2: "#3B82F6",
  purple: "#7C3AED",
  green: "#059669",
  green2: "#10B981",
  red: "#DC2626",
  muted: "#7A6E60",
  border: "#EAE2D5",
  borderDark: "#302418",
  white: "#FFFFFF",
  // Section backgrounds — warm light tones
  secLight: "#FFFDF9",
  secAlt: "#FBF7F0",
};

const IMG = {
  hero: "./assets/hero1.png",
  R1: "./assets/R.png",
  R2: "./assets/Ramanujan.png",
  D1: "./assets/D.png",
  D2: "./assets/dhrona.png",
  D3: "./assets/ddd.png",
  C1: "./assets/c.png",
  C2: "./assets/cccc.png",
  C3: "./assets/c1.png",
  A1: "./assets/A.png",
  A3: "./assets/a3.png",
  A2: "./assets/aryabatta.png",
  logoRamanujan: "./assets/logo1.png",   // replace with actual file
  logoDhrona:    "./assets/logo2.png",      // replace with actual file
  logoChanakya:  "./assets/logo3.png",    // replace with actual file
  logoAryabhata: "./assets/logo4.png",
  student1: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80",
  student2: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
  student3: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
  ai: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
  career: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
  ramanujan: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=700&q=80",
  dhrona: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&q=80",
  chanakya: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=700&q=80",
  aryabhata: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=700&q=80",
  classroom: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80",
  india: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&q=80",
  future: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80",
  parent1: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
  parent2: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
  parent3: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
  parent4: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
  parent5: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
  parent6: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
};

const DEMO_USERS = {
  "arjun@demo.in": { name: "Arjun Sharma", grade: "Grade 9", school: "Delhi Public School", city: "Delhi", plan: "All Access", avatar: "AS", color: T.orange, joined: "Aug 2024", progress: 72 },
  "priya@demo.in": { name: "Priya Reddy", grade: "Grade 11", school: "Kendriya Vidyalaya", city: "Hyderabad", plan: "R + C Pack", avatar: "PR", color: T.purple, joined: "Jan 2024", progress: 88 },
  "rahul@demo.in": { name: "Rahul Mehta", grade: "Grade 7", school: "Ryan International", city: "Mumbai", plan: "D + A Pack", avatar: "RM", color: T.teal, joined: "Mar 2025", progress: 55 },
  "demo@talentignition.in": { name: "Ananya Krishnan", grade: "Grade 10", school: "Narayana IIT Academy", city: "Bangalore", plan: "All Access", avatar: "AK", color: T.blue, joined: "Jun 2024", progress: 91 },
};

const GRADES = Array.from({ length: 12 }, (_, i) => ({ grade: `Grade ${i + 1}`, range: `Ages ${5 + i}–${6 + i}`, level: i < 5 ? "Primary" : i < 8 ? "Middle" : "Secondary" }));

const SESSION_DATA = { Jan:{sessions:8,min:480,fc:4,topic:"Climate Change & Environmental Science"}, Feb:{sessions:12,min:720,fc:6,topic:"Artificial Intelligence & Machine Learning"}, Mar:{sessions:10,min:600,fc:5,topic:"Space Exploration & Astrophysics"}, Apr:{sessions:7,min:420,fc:4,topic:"Indian Economy & Financial Literacy"}, May:{sessions:9,min:540,fc:5,topic:"Human Biology & Health Technology"}, Jun:{sessions:5,min:300,fc:3,topic:"Coding & App Development Workshop"}, Jul:{sessions:11,min:660,fc:6,topic:"Global History & Geopolitics"}, Aug:{sessions:8,min:480,fc:4,topic:"Robotics & Automation"}, Sep:{sessions:9,min:540,fc:5,topic:"Art, Design & Creative Thinking"}, Oct:{sessions:7,min:420,fc:3,topic:"Entrepreneurship & Start-up Stories"}, Nov:{sessions:6,min:360,fc:4,topic:"Cybersecurity & Digital Safety"}, Dec:{sessions:10,min:600,fc:5,topic:"Year-End Showcase & Innovation Fair"} };

// RDCA data — with WHY TI added conceptually in nav
const RDCA = [
  { id: "ramanujan", letter: "R", name: "Ramanujan", purpose: "Assess", tagline: "Intelligence", subtitle: "Know Where You Stand", desc: "Precision academic assessments that reveal your true potential and map your growth journey with data-driven insights.", color: T.orange, bg: "linear-gradient(135deg,#FFF5F0,#FFE8D9)", border: "#FFCFB8", textColor: "#B83A00", emoji: "🧮", grade: "Grade 1–12" },
  { id: "dhrona", letter: "D", name: "Dhrona", purpose: "Aware", tagline: "Wisdom", subtitle: "Understand the World", desc: "Knowledge, wisdom & real-world awareness that goes far beyond classroom textbooks through expert mentorship.", color: T.blue, bg: "linear-gradient(135deg,#EFF6FF,#DBEAFE)", border: "#BFDBFE", textColor: "#1D4ED8", emoji: "📚", grade: "Grade 1–12" },
  { id: "chanakya", letter: "C", name: "Chanakya", purpose: "Align", tagline: "Leadership", subtitle: "Choose Your Direction", desc: "Strategic career guidance that transforms ambition into a clear, achievable roadmap for your future.", color: T.green, bg: "linear-gradient(135deg,#ECFDF5,#D1FAE5)", border: "#A7F3D0", textColor: "#065F46", emoji: "🎯", grade: "Grade 6–12" },
  { id: "aryabhata", letter: "A", name: "Aryabhata", purpose: "Accelerate", tagline: "Innovation", subtitle: "Build the Future", desc: "AI, coding & future-skills training that makes you ready for tomorrow's world with hands-on projects.", color: T.purple, bg: "linear-gradient(135deg,#F5F3FF,#EDE9FE)", border: "#DDD6FE", textColor: "#5B21B6", emoji: "🚀", grade: "Grade 3–12" },
];

// ── UTILITIES ─────────────────────────────────────────────────────────────────
const useIsMobile = () => {
  const [mobile, setMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return mobile;
};

// ── ICONS ─────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    menu: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    x: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    arrow: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
    back: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>,
    check: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20,6 9,17 4,12"/></svg>,
    star: <svg width={size} height={size} fill={color} viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>,
    users: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    zap: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>,
    award: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"/><polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/></svg>,
    brain: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5c-3.31 0-6 2.69-6 6v1c0 1.1.45 2.1 1.17 2.83A4 4 0 0 0 12 19a4 4 0 0 0 4.83-4.17A3.988 3.988 0 0 0 18 12v-1c0-3.31-2.69-6-6-6z"/></svg>,
    target: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    book: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    rocket: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>,
    trending: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>,
    mail: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    phone: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    lock: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    user: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    chart: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    compass: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"/></svg>,
    logout: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    map: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
    chevron: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polyline points="6,9 12,15 18,9"/></svg>,
    globe: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    shield: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    play: <svg width={size} height={size} fill={color} viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>,
    link: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  };
  return icons[name] || null;
};

// ── TI LOGO COMPONENT (shared, professional) ─────────────────────────────────
const TILogo = ({ size = 44, fontSize = 17, showTagline = true, dark = false, onClick }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: onClick ? "pointer" : "default" }} onClick={onClick}>
    {/* Icon mark: flame + spark */}
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <rect width="44" height="44" rx="13" fill="url(#tiGrad)"/>
      <defs>
        <linearGradient id="tiGrad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F4581A"/>
          <stop offset="100%" stopColor="#F0B429"/>
        </linearGradient>
      </defs>
      {/* TI lettermark */}
      <text x="8" y="31" fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="22" fill="white" letterSpacing="1">TI</text>
      {/* Small spark top-right */}
      <circle cx="35" cy="10" r="3.5" fill="rgba(255,255,255,0.55)"/>
      <circle cx="38" cy="7" r="1.8" fill="rgba(255,255,255,0.35)"/>
    </svg>
    <div>
      <div style={{ fontWeight: 900, fontSize, color: dark ? "#fff" : T.ink, letterSpacing: -0.8, fontFamily: "'Outfit', sans-serif", lineHeight: 1.1 }}>
        <span style={{ background: `linear-gradient(90deg, ${T.orange}, ${T.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Talent</span>
        <span style={{ color: dark ? "#fff" : T.ink }}> Ignition</span>
      </div>
      {showTagline && <div style={{ fontSize: 7.5, color: dark ? "#6A7A98" : "#9A8C7A", letterSpacing: 2.8, textTransform: "uppercase", marginTop: 1, fontWeight: 700 }}>Ignite · Evolve · Excel</div>}
    </div>
  </div>
);

// ── RDCA CONNECTED LOGO ────────────────────────────────────────────────────────
// A professional "connection" icon: 4 nodes linked in a diamond with the RDCA letters
const RDCAConnectionLogo = ({ size = 56 }) => {
  const colors = [T.orange, T.blue, T.green, T.purple];
  const letters = ["R", "D", "C", "A"];
  const r = size * 0.38;
  const cx = size / 2, cy = size / 2;
  // Diamond positions: top, right, bottom, left
  const nodes = [
    { x: cx, y: cy - r },
    { x: cx + r, y: cy },
    { x: cx, y: cy + r },
    { x: cx - r, y: cy },
  ];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {/* Connection lines between all nodes */}
      {nodes.map((a, i) => nodes.map((b, j) => j > i ? (
        <line key={`${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
          stroke={`url(#connGrad${i}${j})`} strokeWidth="1.8" strokeOpacity="0.55" />
      ) : null))}
      {/* Center dot */}
      <circle cx={cx} cy={cy} r={size * 0.065} fill="url(#centerGrad)" />
      <defs>
        {nodes.map((a, i) => nodes.map((b, j) => j > i ? (
          <linearGradient key={`g${i}${j}`} id={`connGrad${i}${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} gradientUnits="userSpaceOnUse">
            <stop stopColor={colors[i]} />
            <stop offset="1" stopColor={colors[j]} />
          </linearGradient>
        ) : null))}
        <linearGradient id="centerGrad" x1="0" y1="0" x2={size} y2={size} gradientUnits="userSpaceOnUse">
          <stop stopColor={T.orange} />
          <stop offset="1" stopColor={T.purple} />
        </linearGradient>
      </defs>
      {/* Node circles */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={size * 0.115} fill={colors[i]} opacity="0.14" />
          <circle cx={n.x} cy={n.y} r={size * 0.09} fill={colors[i]} />
          <text x={n.x} y={n.y + size * 0.033} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontWeight="900" fontSize={size * 0.13} fill="#fff">{letters[i]}</text>
        </g>
      ))}
    </svg>
  );
};

// ── TRACK HEADER BADGE (like image 1 — icon pill with color accent) ──────────
const TrackHeaderBadge = ({ r }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 10,
    background: "#fff", borderRadius: 40, padding: "8px 20px 8px 8px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.10)", border: `1.5px solid ${r.border}`,
    marginBottom: 20
  }}>
    <div style={{
      width: 42, height: 42, borderRadius: 32, background: `linear-gradient(135deg, ${r.color}, ${r.color}AA)`,
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
      boxShadow: `0 4px 14px ${r.color}40`
    }}>{r.emoji}</div>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: r.textColor }}>{r.purpose}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: T.ink, letterSpacing: -0.2 }}>{r.name} Track</span>
    </div>
  </div>
);

// ── BASE COMPONENTS ───────────────────────────────────────────────────────────
const Btn = ({ children, style = {}, onClick, variant = "primary", fullWidth = false, size = "md", disabled = false }) => {
  const [hover, setHover] = useState(false);
  const sizes = {
    sm: { padding: "8px 18px", fontSize: 12, borderRadius: 8 },
    md: { padding: "11px 22px", fontSize: 13.5, borderRadius: 10 },
    lg: { padding: "14px 30px", fontSize: 15, borderRadius: 12 },
    xl: { padding: "16px 36px", fontSize: 16, borderRadius: 14 },
  };
  const base = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, fontFamily: "'Outfit', sans-serif", fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", border: "none", transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)", width: fullWidth ? "100%" : "auto", opacity: disabled ? 0.55 : 1, letterSpacing: 0.2, ...sizes[size] };
  const variants = {
    primary: { background: hover && !disabled ? "#D94010" : T.orange, color: "#fff", boxShadow: hover && !disabled ? "0 8px 28px rgba(244,88,26,0.42)" : "0 2px 8px rgba(244,88,26,0.2)", transform: hover && !disabled ? "translateY(-2px)" : "none" },
    secondary: { background: hover ? T.ink3 : T.ink, color: "#fff", boxShadow: hover ? "0 8px 24px rgba(0,0,0,0.3)" : "none", transform: hover ? "translateY(-2px)" : "none" },
    outline: { background: "transparent", color: hover ? T.orange : T.ink, border: `1.5px solid ${hover ? T.orange : T.border}`, transform: hover ? "translateY(-1px)" : "none" },
    outlineWhite: { background: hover ? "rgba(255,255,255,0.12)" : "transparent", color: "#fff", border: `1.5px solid rgba(255,255,255,${hover ? "0.5" : "0.25"})` },
    ghost: { background: hover ? "rgba(244,88,26,0.07)" : "transparent", color: T.orange },
    white: { background: hover ? "#F4F0E8" : "#fff", color: T.ink, boxShadow: hover ? "0 8px 24px rgba(0,0,0,0.12)" : "none", transform: hover ? "translateY(-2px)" : "none" },
    teal: { background: hover ? "#00A891" : T.teal, color: "#fff", transform: hover ? "translateY(-2px)" : "none" },
  };
  return (
    <button style={{ ...base, ...(variants[variant] || variants.primary), ...style }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={disabled ? undefined : onClick}>{children}</button>
  );
};

const Tag = ({ children, color = T.orange, small = false }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: `${color}18`, color, fontSize: small ? 9.5 : 10.5, fontWeight: 700, padding: small ? "3px 10px" : "4px 14px", borderRadius: 20, letterSpacing: 1.5, textTransform: "uppercase", border: `1px solid ${color}25` }}>{children}</div>
);

const Toast = ({ msg, onClose }) => (
  <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: T.ink, color: "#fff", padding: "14px 24px", borderRadius: 14, zIndex: 9999, fontSize: 13.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 12px 48px rgba(0,0,0,0.35)", whiteSpace: "nowrap", border: `1px solid ${T.borderDark}`, animation: "toastIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}>
    <span style={{ width: 22, height: 22, borderRadius: "50%", background: T.green2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="check" size={13} color="#fff" /></span>
    {msg}
    <button style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", marginLeft: 4, fontSize: 20, lineHeight: 1 }} onClick={onClose}>×</button>
  </div>
);

const Modal = ({ title, subtitle, children, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(26,18,7,0.82)", zIndex: 9000, display: "flex", alignItems: "flex-end", justifyContent: "center", backdropFilter: "blur(8px)" }} onClick={onClose}>
      <div style={{ background: T.white, borderRadius: "28px 28px 0 0", width: "100%", maxWidth: 500, padding: "32px 28px 48px", maxHeight: "96vh", overflowY: "auto", animation: "slideUp 0.32s cubic-bezier(0.34,1.56,0.64,1)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 800, color: T.ink, letterSpacing: -0.5 }}>{title}</h3>
            {subtitle && <p style={{ fontSize: 13.5, color: T.muted, marginTop: 4 }}>{subtitle}</p>}
          </div>
          <button style={{ background: "#F0EDE8", border: "none", cursor: "pointer", color: T.muted, width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: 12 }} onClick={onClose}><Icon name="x" size={18} /></button>
        </div>
        <div style={{ height: 1, background: T.border, margin: "18px 0 24px" }} />
        {children}
      </div>
    </div>
  );
};

const Section = ({ children, bg = T.white, py = "80px 40px", style = {}, maxW = 1080 }) => {
  const mobile = useIsMobile();
  return (
    <section style={{ background: bg, padding: mobile ? "56px 20px" : py, ...style }}>
      <div style={{ maxWidth: maxW, margin: "0 auto" }}>{children}</div>
    </section>
  );
};

const SectionHeader = ({ tag, tagColor = T.orange, title, subtitle, center = false }) => (
  <div style={{ textAlign: center ? "center" : "left", marginBottom: 48 }}>
    {tag && <Tag color={tagColor}>{tag}</Tag>}
    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: T.ink, letterSpacing: -1, lineHeight: 1.12, margin: tag ? "12px 0 14px" : "0 0 14px", maxWidth: center ? "none" : 640 }}>{title}</h2>
    {subtitle && <p style={{ fontSize: 16, color: T.muted, lineHeight: 1.75, maxWidth: center ? 580 : 520, margin: center ? "0 auto" : 0 }}>{subtitle}</p>}
  </div>
);

const InputField = ({ placeholder, type = "text", value, onChange, icon, onKeyDown, error }) => (
  <div style={{ position: "relative", marginBottom: 14 }}>
    {icon && <div style={{ position: "absolute", left: 15, top: "50%", transform: "translateY(-50%)", color: T.muted }}><Icon name={icon} size={16} /></div>}
    <input placeholder={placeholder} type={type} value={value} onChange={onChange} onKeyDown={onKeyDown}
      style={{ width: "100%", padding: icon ? "14px 16px 14px 46px" : "14px 16px", borderRadius: 12, border: `2px solid ${error ? T.red : T.border}`, fontSize: 14, fontFamily: "'Outfit', sans-serif", outline: "none", boxSizing: "border-box", background: "#FAFAF8", transition: "all 0.2s", color: T.ink }}
      onFocus={e => { e.target.style.borderColor = T.orange; e.target.style.background = "#fff"; e.target.style.boxShadow = `0 0 0 4px ${T.orange}14`; }}
      onBlur={e => { e.target.style.borderColor = error ? T.red : T.border; e.target.style.background = "#FAFAF8"; e.target.style.boxShadow = "none"; }} />
  </div>
);

// ── NAV — clean: logo, Why TI, Programs, Sign Up, Login, menu ─────────────────
const Nav = ({ onNav, onOpenSignin, onOpenLogin, currentPage, loggedIn, user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobile = useIsMobile();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const NavLink = ({ id, label, active }) => (
    <button onClick={() => { onNav(id); }}
      style={{ background: active ? `${T.orange}12` : "none", border: "none", color: active ? T.orange : T.ink, padding: "7px 14px", borderRadius: 8, fontSize: 13, fontWeight: active ? 700 : 500, cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "all 0.15s", letterSpacing: 0.1 }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = T.orange; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = T.ink; }}
    >{label}</button>
  );

  return (
    <>
      <nav style={{ background: scrolled ? "rgba(253,250,245,0.97)" : T.pageBg, height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0, zIndex: 1000, borderBottom: `1px solid ${scrolled ? T.border : "rgba(234,226,213,0.6)"}`, backdropFilter: "blur(12px)", transition: "all 0.3s", boxShadow: scrolled ? "0 2px 24px rgba(26,18,7,0.07)" : "none" }}>
        
        {/* Logo */}
        <TILogo size={40} fontSize={17} showTagline={!mobile} dark={false} onClick={() => { onNav("home"); setMenuOpen(false); }} />

        

        {/* Right: Sign Up, Login, menu */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {!mobile && !loggedIn && (
            <>
              <button onClick={onOpenLogin} style={{ background: "transparent", border: `1.5px solid ${T.border}`, color: T.muted, padding: "8px 20px", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.orange; e.currentTarget.style.color = T.orange; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}>Log In</button>
              <Btn size="sm" onClick={onOpenSignin} style={{ letterSpacing: 0.2, padding: "9px 22px" }}>Sign Up →</Btn>
            </>
          )}
          {!mobile && loggedIn && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: T.cream, border: `1px solid ${T.border}`, borderRadius: 12, padding: "5px 14px 5px 7px", cursor: "pointer" }} onClick={() => onNav("dashboard")}>
                <div style={{ width: 28, height: 28, background: `linear-gradient(135deg, ${user?.color || T.orange}, ${T.gold})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 11, color: "#fff" }}>{user?.avatar || "U"}</div>
                <span style={{ fontSize: 13, color: T.ink, fontWeight: 600 }}>{user?.name?.split(" ")[0]}</span>
              </div>
              <button onClick={onLogout} style={{ background: "none", border: `1px solid ${T.border}`, color: T.muted, padding: "8px 12px", borderRadius: 9, cursor: "pointer", fontSize: 12, fontFamily: "'Outfit', sans-serif", display: "flex", alignItems: "center", gap: 5 }}>
                <Icon name="logout" size={14} /> Logout
              </button>
            </div>
          )}
          <button style={{ background: "none", border: "none", color: T.muted, cursor: "pointer", padding: "6px", display: "flex", alignItems: "center" }} onClick={() => setMenuOpen(true)}>
            <Icon name="menu" size={22} />
          </button>
        </div>
      </nav>

      {/* Drawer overlay */}
      {menuOpen && <div style={{ position: "fixed", inset: 0, background: "rgba(26,18,7,0.55)", zIndex: 1998, backdropFilter: "blur(4px)" }} onClick={() => setMenuOpen(false)} />}
      <div style={{ position: "fixed", top: 0, right: 0, width: mobile ? "100%" : 320, height: "100vh", background: "#FFFDF8", zIndex: 1999, transform: menuOpen ? "translateX(0)" : "translateX(100%)", transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)", overflowY: "auto", display: "flex", flexDirection: "column", borderLeft: `1px solid ${T.border}`, boxShadow: "-12px 0 40px rgba(26,18,7,0.12)" }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <TILogo size={36} fontSize={15} showTagline={false} dark={false} />
          <button style={{ background: T.cream, border: "none", color: T.muted, cursor: "pointer", width: 34, height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setMenuOpen(false)}><Icon name="x" size={18} /></button>
        </div>

        {loggedIn && (
          <div style={{ padding: "16px 24px", background: `${T.orange}06`, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 42, height: 42, background: `linear-gradient(135deg, ${user?.color || T.orange}, ${T.gold})`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 14, color: "#fff" }}>{user?.avatar || "U"}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>{user?.name}</div>
              <div style={{ fontSize: 11.5, color: T.muted }}>{user?.grade} · {user?.plan}</div>
            </div>
          </div>
        )}

        <div style={{ padding: "20px 16px", flex: 1 }}>
          <div style={{ fontSize: 9, letterSpacing: 2.2, textTransform: "uppercase", color: T.muted, padding: "0 8px 10px", fontWeight: 700 }}>Navigation</div>
          {[
            { id: "home", label: "Home", icon: "🏠" },
            { id: "whyti", label: "Why Talent Ignition", icon: "💡" },
            { id: "ramanujan", label: "Ramanujan — Intelligence", icon: "🧮" },
            { id: "dhrona", label: "Dhrona — Wisdom", icon: "📚" },
            { id: "chanakya", label: "Chanakya — Leadership", icon: "🎯" },
            { id: "aryabhata", label: "Aryabhata — Innovation", icon: "🚀" },
            { id: "combo", label: "Programs & Pricing", icon: "💎" },
            { id: "success", label: "Success Stories", icon: "⭐" },
            { id: "about", label: "About Us", icon: "ℹ️" },
            { id: "contact", label: "Contact", icon: "📩" },
          ].map(link => (
            <div key={link.id} onClick={() => { onNav(link.id); setMenuOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 10px", borderRadius: 12, cursor: "pointer", marginBottom: 2, background: currentPage === link.id ? `${T.orange}10` : "transparent", borderLeft: currentPage === link.id ? `3px solid ${T.orange}` : "3px solid transparent", transition: "all 0.15s" }}
              onMouseEnter={e => { if (currentPage !== link.id) e.currentTarget.style.background = T.cream; }}
              onMouseLeave={e => { if (currentPage !== link.id) e.currentTarget.style.background = "transparent"; }}>
              <span style={{ fontSize: 18, width: 24, textAlign: "center" }}>{link.icon}</span>
              <span style={{ fontSize: 13.5, color: currentPage === link.id ? T.orange : T.muted, fontWeight: currentPage === link.id ? 700 : 400 }}>{link.label}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: 20, borderTop: `1px solid ${T.border}` }}>
          {loggedIn ? (
            <Btn fullWidth variant="outline" onClick={() => { onLogout(); setMenuOpen(false); }}>
              <Icon name="logout" size={15} /> Log Out
            </Btn>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Btn fullWidth onClick={() => { onOpenSignin(); setMenuOpen(false); }}>Sign Up Free →</Btn>
              <Btn fullWidth variant="outline" onClick={() => { onOpenLogin(); setMenuOpen(false); }}>Log In</Btn>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ── FOOTER ────────────────────────────────────────────────────────────────────
const Footer = ({ onNav }) => (
  <footer style={{ background: "#FFF8F2", borderTop: `2px solid #F0E4D4` }}>
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "clamp(40px,6vw,64px) clamp(20px,5vw,40px) 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "clamp(24px,4vw,48px)", marginBottom: 48 }}>
 
        {/* Brand column */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 42, height: 42, background: `linear-gradient(135deg, ${T.orange}, ${T.gold})`, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "#fff", fontFamily: "'Outfit', sans-serif", letterSpacing: 1, boxShadow: `0 4px 14px ${T.orange}35` }}>TI</div>
            <div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 17, lineHeight: 1.1 }}>
                <span style={{ background: `linear-gradient(90deg, ${T.orange}, ${T.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Talent</span>
                <span style={{ color: T.ink }}> Ignition</span>
              </div>
              <div style={{ fontSize: 7.5, color: "#B8A898", letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 700 }}>Ignite · Evolve · Excel</div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: "#8B7A6A", lineHeight: 1.85, marginBottom: 20 }}>India's most structured student growth platform for Grades 4–12. Turning raw potential into future leaders through the RDCA framework.</p>
          <div style={{ display: "flex", gap: 8 }}>
            {[["in","L"],["𝕏","X"],["▶","Y"],["ig","I"]].map(([s, key]) => (
              <div key={key} style={{ width: 34, height: 34, borderRadius: 9, background: "#FFF0E4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#B8A898", cursor: "pointer", transition: "all 0.2s", border: `1.5px solid #F0E4D4` }}
                onMouseEnter={e => { e.currentTarget.style.background = T.orange; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = T.orange; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#FFF0E4"; e.currentTarget.style.color = "#B8A898"; e.currentTarget.style.borderColor = "#F0E4D4"; }}>
                {s}
              </div>
            ))}
          </div>
        </div>
 
        {/* Framework */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.2, textTransform: "uppercase", color: "#C0A890", marginBottom: 16 }}>Framework</div>
          {[["Ramanujan — Intelligence", "ramanujan", T.orange], ["Dhrona — Wisdom", "dhrona", T.blue], ["Chanakya — Leadership", "chanakya", T.green], ["Aryabhata — Innovation", "aryabhata", T.purple]].map(([l, id, c]) => (
            <div key={id} onClick={() => onNav(id)} style={{ fontSize: 13, color: "#7A6A5A", marginBottom: 11, cursor: "pointer", transition: "color 0.2s", display: "flex", alignItems: "center", gap: 6 }}
              onMouseEnter={e => e.currentTarget.style.color = c}
              onMouseLeave={e => e.currentTarget.style.color = "#7A6A5A"}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: c, display: "inline-block", flexShrink: 0 }} />
              {l}
            </div>
          ))}
        </div>
 
        {/* Quick Links */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.2, textTransform: "uppercase", color: "#C0A890", marginBottom: 16 }}>Quick Links</div>
          {[["Home","home"],["Programs & Pricing","combo"],["Success Stories","success"],["About Us","about"],["Contact","contact"],["Privacy Policy","contact"],["Terms & Conditions","contact"]].map(([l, id]) => (
            <div key={l} onClick={() => onNav(id)} style={{ fontSize: 13, color: "#7A6A5A", marginBottom: 11, cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = T.orange}
              onMouseLeave={e => e.target.style.color = "#7A6A5A"}>{l}</div>
          ))}
        </div>
 
        {/* Contact */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.2, textTransform: "uppercase", color: "#C0A890", marginBottom: 16 }}>Contact Us</div>
          {[[<Icon name="mail" size={14} color={T.orange} />, "hello@talentignition.in"],[<Icon name="phone" size={14} color={T.orange} />, "+91 98765 43210"],[<Icon name="map" size={14} color={T.orange} />, "Srikakulam, Andhra Pradesh"]].map(([icon, text], i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 13 }}>
              <div style={{ marginTop: 1, flexShrink: 0 }}>{icon}</div>
              <span style={{ fontSize: 13, color: "#7A6A5A", lineHeight: 1.6 }}>{text}</span>
            </div>
          ))}
          <div style={{ marginTop: 18, padding: "13px 15px", background: "#FFF0E4", borderRadius: 12, border: `1.5px solid #F0D8C0` }}>
            <div style={{ fontSize: 10.5, color: T.orange, marginBottom: 4, fontWeight: 700, letterSpacing: 0.5 }}>SCHOOL HOURS</div>
            <div style={{ fontSize: 12.5, color: "#7A6A5A" }}>Mon–Sat · 9 AM – 7 PM IST</div>
          </div>
        </div>
      </div>
    </div>
 
    {/* Bottom bar */}
    <div style={{ borderTop: `1px solid #F0E4D4`, padding: "18px clamp(20px,5vw,40px)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div style={{ fontSize: 12, color: "#B8A898" }}>© 2025 Talent Ignition Pvt. Ltd. · All rights reserved.</div>
        <div style={{ fontSize: 12, color: "#B8A898" }}>🇮🇳 Empowering Future Leaders of India</div>
      </div>
    </div>
  </footer>
);

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
const HomePage = ({ onNav, onOpenLogin, onOpenSignin, loggedIn, user }) => {
  const mobile = useIsMobile();
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div>
      {/* ── HERO ── Warm cream/ivory, not dark */}
      <section style={{ background: T.heroGrad, minHeight: mobile ? "auto" : "92vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: mobile ? "72px 20px 60px" : "0 40px" }}>
        <div style={{ position: "absolute", top: -120, right: -80, width: 600, height: 600, background: `radial-gradient(circle, ${T.orange}18 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -60, width: 450, height: 450, background: `radial-gradient(circle, ${T.gold}14 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, #F4581A08 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1080, margin: "0 auto", width: "100%", display: mobile ? "block" : "flex", alignItems: "center", gap: 60, position: "relative", zIndex: 1 }}>
          <div style={{ flex: 1, maxWidth: 640 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(90deg, ${T.orange}18, ${T.gold}14)`, border: `1.5px solid ${T.orange}30`, borderRadius: 30, padding: "7px 18px 7px 10px", marginBottom: 30 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: T.orange, display: "inline-block", boxShadow: `0 0 10px ${T.orange}80` }} />
              <span style={{ fontSize: 12, color: T.orange, fontWeight: 800, letterSpacing: 0.4 }}>India's #1 Student Growth Platform</span>
            </div>

            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mobile ? "clamp(36px,10vw,44px)" : "clamp(50px,5vw,72px)", fontWeight: 900, color: T.ink, letterSpacing: -3, lineHeight: 0.98, marginBottom: 26 }}>
              Ignite Your<br />
              <span style={{ background: `linear-gradient(90deg, ${T.orange} 0%, ${T.gold} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Child's Potential.</span>
              <br />
              <span style={{ color: T.ink, opacity: 0.75 }}>Shape Their Future.</span>
            </h1>

            <p style={{ fontSize: mobile ? 16 : 18.5, color: T.muted, lineHeight: 1.78, marginBottom: 40, maxWidth: 520, fontWeight: 400 }}>
              The <strong style={{ color: T.ink, fontWeight: 700 }}>RDCA Framework</strong> — Ramanujan, Dhrona, Chanakya & Aryabhata — gives every student a complete growth journey from Grade 1 to Grade 12.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 52 }}>
              <Btn size="xl" onClick={onOpenSignin} style={{ background: `linear-gradient(135deg, ${T.orange}, #E04810)`, boxShadow: `0 12px 32px ${T.orange}45`, letterSpacing: 0.2 }}>
                🎯 Start Free Today
              </Btn>
              <button onClick={() => onNav("combo")} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", border: `2px solid ${T.border}`, color: T.ink, padding: "16px 30px", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.orange; e.currentTarget.style.color = T.orange; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.ink; }}>
                View Programs
              </button>
            </div>

        
          </div>

          {!mobile && (
            <div style={{ flex: "0 0 420px", position: "relative", height: 520 }}>
              <div style={{ borderRadius: 28, overflow: "hidden", border: `3px solid rgba(244,88,26,0.15)`, boxShadow: "0 32px 80px rgba(244,88,26,0.18), 0 8px 32px rgba(0,0,0,0.10)", position: "relative", height: 460, top: 30 }}>
                <img src={IMG.hero} alt="Students learning" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,18,7,0.25) 0%, transparent 50%)" }} />
              </div>
              <div style={{ position: "absolute", top: 0, right: -24, background: `linear-gradient(135deg, ${T.orange}, #C94010)`, borderRadius: 20, padding: "16px 20px", boxShadow: `0 12px 40px ${T.orange}55`, zIndex: 3 }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 30, fontWeight: 900, color: "#fff", lineHeight: 1 }}>4</div>
                <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.4, marginTop: 2, fontWeight: 700 }}>RDCA<br/>Tracks</div>
              </div>
              
            </div>
          )}
        </div>
      </section>

      {/* ── RDCA SECTION ── */}
<section style={{ background: T.secLight, padding: mobile ? "60px 20px" : "100px 40px", position: "relative", overflow: "hidden" }}>
  <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 80% 20%, ${T.orange}06 0%, transparent 50%), radial-gradient(circle at 20% 80%, ${T.blue}04 0%, transparent 50%)`, pointerEvents: "none" }} />
  <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
    {/* Section header with RDCA logo */}
    <div style={{ textAlign: "center", marginBottom: 64 }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <RDCAConnectionLogo size={80} />
      </div>
      <Tag color={T.blue}>The RDCA Framework</Tag>
      <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mobile ? 30 : 48, fontWeight: 900, color: T.ink, letterSpacing: -2, lineHeight: 1.08, margin: "14px 0 16px" }}>Four Paths. One Complete Journey.</h2>
      <p style={{ fontSize: 17, color: T.muted, maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>Named after India's greatest minds — each track unlocks a dimension of your child's potential.</p>
    </div>

    {/* RDCA Cards */}
    <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: mobile ? 14 : 20, marginBottom: 48 }}>
      {RDCA.map((r) => {
        const isHov = hoveredCard === r.id;
        const imgs = {
          ramanujan: IMG.R1,
          dhrona: IMG.D1,
          chanakya: IMG.A1,
          aryabhata: IMG.C1,
        };
        return (
          <div key={r.id}
            onMouseEnter={() => setHoveredCard(r.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => onNav(r.id)}
            style={{ position: "relative", borderRadius: 24, overflow: "hidden", cursor: "pointer", transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)", transform: isHov ? "translateY(-10px) scale(1.02)" : "none", boxShadow: isHov ? `0 32px 72px ${r.color}35, 0 8px 24px rgba(0,0,0,0.10)` : "0 4px 20px rgba(0,0,0,0.07)", height: mobile ? 220 : 320 }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${imgs[r.id]})`, backgroundSize: "cover", backgroundPosition: "center", transition: "transform 0.5s ease", transform: isHov ? "scale(1.08)" : "scale(1)" }} />
            <div style={{ position: "absolute", inset: 0, background: isHov
              ? `linear-gradient(to top, ${r.color}F2 0%, ${r.color}90 40%, ${r.color}40 70%, transparent 100%)`
              : `linear-gradient(to top, rgba(26,18,7,0.88) 0%, rgba(26,18,7,0.55) 45%, transparent 100%)`, transition: "all 0.35s ease" }} />
            <div style={{ position: "absolute", inset: 0, padding: mobile ? "14px 12px" : "22px 20px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div style={{ position: "absolute", top: mobile ? 10 : 16, right: mobile ? 10 : 16, width: mobile ? 36 : 48, height: mobile ? 36 : 48, borderRadius: mobile ? 10 : 14, background: isHov ? r.color : "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", border: `2px solid ${isHov ? r.color : "rgba(255,255,255,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: mobile ? 18 : 24, color: "#fff", transition: "all 0.3s", boxShadow: isHov ? `0 4px 20px ${r.color}60` : "none" }}>{r.letter}</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: isHov ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)", borderRadius: 20, padding: mobile ? "3px 8px" : "4px 12px", marginBottom: mobile ? 6 : 10, alignSelf: "flex-start", transition: "all 0.3s" }}>
                <span style={{ fontSize: mobile ? 10 : 11, color: "#fff", fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase" }}>{r.purpose}</span>
              </div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mobile ? 16 : 22, fontWeight: 900, color: "#fff", margin: `0 0 ${mobile ? 2 : 6}px`, letterSpacing: -0.5, lineHeight: 1.1 }}>{r.name}</h3>
              <div style={{ fontSize: mobile ? 10.5 : 13, color: "rgba(255,255,255,0.8)", fontWeight: 600, letterSpacing: 0.3, marginBottom: isHov ? (mobile ? 8 : 12) : 0 }}>{r.tagline} — {r.subtitle}</div>
              <div style={{ fontSize: mobile ? 11 : 13, color: "rgba(255,255,255,0.88)", lineHeight: 1.6, maxHeight: isHov ? "100px" : 0, overflow: "hidden", transition: "max-height 0.4s ease, opacity 0.35s ease", opacity: isHov ? 1 : 0, marginBottom: isHov ? (mobile ? 8 : 14) : 0 }}>{r.desc}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, opacity: isHov ? 1 : 0, transform: isHov ? "translateY(0)" : "translateY(8px)", transition: "all 0.35s ease" }}>
                <span style={{ fontSize: mobile ? 11 : 13, color: "#fff", fontWeight: 800 }}>Explore {r.name}</span>
                <span style={{ fontSize: 16 }}>→</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* ── PACKS & COMBOS BLOCK — redirects to combo page ── */}
    <div style={{ marginBottom: 48 }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <Tag color={T.gold}>Bundles & Combos</Tag>
        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mobile ? 22 : 32, fontWeight: 800, color: T.ink, letterSpacing: -1, margin: "12px 0 10px" }}>Find the Right Pack for Your Child</h3>
        <p style={{ fontSize: 15, color: T.muted, maxWidth: 480, margin: "0 auto" }}>Mix and match RDCA tracks or go for the full journey — every pack includes parent dashboard access.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: 18 }}>
        {[
          { name: "Assess + Align", sub: "Ramanujan + Chanakya", price: "₹35,000/yr", tag: "Most Popular", color: T.orange, icon: "🧮🎯", desc: "Know your score, then strategise your career path. Perfect for Grades 9–12." },
          { name: "Complete RDCA", sub: "All Four Tracks", price: "₹28,000/yr", tag: "Best Value", color: T.gold, icon: "🔗", desc: "The full RDCA journey — assess, learn, align, and build. For serious achievers." },
          { name: "Learn + Build", sub: "Dhrona + Aryabhata", price: "₹25,000/yr", tag: null, color: T.blue, icon: "📚🚀", desc: "World knowledge meets future skills. Monthly live sessions and AI labs included." },
        ].map((p, i) => (
          <div key={p.name}
            onClick={() => onNav("combo")}
            style={{ background: "#fff", border: `2px solid ${T.border}`, borderRadius: 22, padding: "26px 24px", cursor: "pointer", position: "relative", transition: "all 0.28s", overflow: "hidden" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.boxShadow = `0 20px 56px ${p.color}20`; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
            {p.tag && <div style={{ position: "absolute", top: -1, right: 20, background: p.color, color: i === 1 ? T.ink : "#fff", fontSize: 10, fontWeight: 800, padding: "4px 14px", borderRadius: "0 0 10px 10px", letterSpacing: 0.8 }}>{p.tag}</div>}
            <div style={{ fontSize: 32, marginBottom: 12 }}>{p.icon}</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 18, color: T.ink, marginBottom: 2 }}>{p.name}</div>
            <div style={{ fontSize: 12, color: T.muted, marginBottom: 10 }}>{p.sub}</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 26, fontWeight: 900, color: p.color, letterSpacing: -1, marginBottom: 10 }}>{p.price}</div>
            <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.65, marginBottom: 16 }}>{p.desc}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: p.color, fontWeight: 700, fontSize: 13 }}>View Package <Icon name="arrow" size={14} color={p.color} /></div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 22 }}>
        <Btn size="lg" onClick={() => onNav("combo")} style={{ background: `linear-gradient(135deg, ${T.orange}, #E04810)` }}>See All Packages & Pricing →</Btn>
      </div>
    </div>
  </div>
</section>

      <Footer onNav={onNav} />
    </div>
  );
};

// ── WHY TI PAGE ────────────────────────────────────────────────────────────────
const WhyTIPage = ({ onNav, onOpenSignin }) => {
  const mobile = useIsMobile();
  return (
    <div>
      <Section bg={T.ink} py="80px 40px" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.classroom})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,18,7,0.97), rgba(26,18,7,0.88))" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <Tag color={T.gold}>Why Talent Ignition</Tag>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mobile ? 36 : 56, fontWeight: 900, color: "#fff", letterSpacing: -2, lineHeight: 1.1, margin: "16px 0 18px" }}>Because Marks Don't Tell<br /><span style={{ color: T.orange }}>The Full Story.</span></h1>
          <p style={{ fontSize: 17, color: "#64748B", maxWidth: 580, margin: "0 auto", lineHeight: 1.8 }}>India has 250 million school students. Yet most are assessed only by marks, their true talents undiscovered until it's too late. Talent Ignition was built to change that.</p>
        </div>
      </Section>

      <Section bg={T.secLight} py="80px 40px">
        <SectionHeader tag="The Problem" tagColor={T.red} title="What's Missing in Indian Education" subtitle="Students are brilliant — but the system only measures a fraction of their potential." center />
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: 24, marginBottom: 60 }}>
          {[
            { emoji: "📉", title: "Only Marks Count", desc: "India's education system is almost entirely mark-centric. A student's interests, talents, leadership, and innovation are never formally measured or developed.", c: T.red },
            { emoji: "🌫️", title: "Career Confusion", desc: "80% of Indian students don't know what they want to become by the time they finish school. Career clarity is rare, and most decisions are made out of pressure.", c: T.orange },
            { emoji: "🧩", title: "Missing Future Skills", desc: "AI, coding, systems thinking, emotional intelligence — the skills of 2035 — are barely touched in school. Students graduate underprepared for the real world.", c: T.purple },
          ].map(s => (
            <div key={s.title} style={{ background: "#fff", borderRadius: 22, padding: "28px 24px", border: `1.5px solid ${T.border}`, borderTop: `4px solid ${s.c}` }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{s.emoji}</div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 18, color: T.ink, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.8 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <SectionHeader tag="The TI Solution" tagColor={T.green} title="The RDCA Framework Changes Everything" subtitle="Four interconnected dimensions of growth — built around India's greatest minds." center />
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 18, marginBottom: 48 }}>
          {RDCA.map(r => (
            <div key={r.id} style={{ background: r.bg, border: `2px solid ${r.border}`, borderRadius: 20, padding: "26px 20px", textAlign: "center", cursor: "pointer" }}
              onClick={() => onNav(r.id)}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 20px 48px ${r.color}22`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>{r.emoji}</div>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: r.color, color: "#fff", fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>{r.letter}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 16, color: r.color, marginBottom: 4 }}>{r.name}</div>
              <div style={{ fontSize: 12, color: T.muted, marginBottom: 8 }}>{r.purpose} · {r.grade}</div>
              <p style={{ fontSize: 12.5, color: T.muted, lineHeight: 1.65 }}>{r.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: T.ink, borderRadius: 24, padding: mobile ? "36px 24px" : "48px 56px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 50%, ${T.orange}15 0%, transparent 60%)` }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
              <RDCAConnectionLogo size={72} />
            </div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mobile ? 26 : 36, fontWeight: 900, color: "#fff", letterSpacing: -1, marginBottom: 14 }}>Every Student Deserves All Four.</h2>
            <p style={{ fontSize: 15.5, color: "#64748B", maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.78 }}>The RDCA framework is the only system in India that covers all four pillars of student growth — under one roof, from one team.</p>
            <Btn size="xl" onClick={onOpenSignin} style={{ background: `linear-gradient(135deg, ${T.orange}, #E04810)` }}>Start Your RDCA Journey →</Btn>
          </div>
        </div>
      </Section>
      <Footer onNav={onNav} />
    </div>
  );
};



// ── FRAMEWORK PAGE TEMPLATE (CIRCULAR LOGO HEADER) ──────────────────────────
const FrameworkPage = ({ r, onNav, onOpenLogin, loggedIn, user, children }) => {
  const mobile = useIsMobile();
  const pageImages = {
    ramanujan: [
      IMG.R2,
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&q=80"
    ],
    dhrona: [
      IMG.D3   // only one image
    ],
    chanakya: [
      IMG.C2   // only one image
    ],
    aryabhata: [
      IMG.A2,
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80"
    ]
  };
  const imgs = pageImages[r.id] || pageImages.ramanujan;

  // Select the correct logo based on track ID
  const getTrackLogo = () => {
    switch (r.id) {
      case 'ramanujan': return IMG.logoRamanujan;
      case 'dhrona':    return IMG.logoDhrona;
      case 'chanakya':  return IMG.logoChanakya;
      case 'aryabhata': return IMG.logoAryabhata;
      default:          return IMG.logoRamanujan;
    }
  };
  const trackLogo = getTrackLogo();

  return (
    <div>
      {/* Header bar – circular logo + slogan + Back to Home button */}
      <div style={{ 
        background: T.pageBg, 
        borderBottom: `2px solid ${r.color}`, 
        padding: "10px 24px", 
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)"
      }}>
        <div style={{ 
          maxWidth: 1080, 
          margin: "0 auto", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          flexWrap: "wrap", 
          gap: 12 
        }}>
          {/* Left side: Circular logo + slogan */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img 
              src={trackLogo} 
              alt={`${r.name} Logo`} 
              style={{ 
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                objectFit: "cover",
                cursor: "pointer",
                border: `2px solid ${r.color}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
              onClick={() => onNav("home")}
            />
            <span style={{ 
              fontFamily: "'Outfit', sans-serif",
              fontSize: mobile ? "14px" : "18px",
              fontWeight: 600,
              color: r.color,
              letterSpacing: "-0.3px",
              borderLeft: `2px solid ${r.color}40`,
              paddingLeft: "12px",
              lineHeight: 1.2
            }}>
              {r.tagline}
            </span>
          </div>

          {/* Right side: Back to Home button */}
          <button onClick={() => onNav("home")} 
            style={{ 
              background: "none", 
              border: `1px solid ${T.border}`, 
              color: T.muted, 
              padding: "6px 16px", 
              borderRadius: 8, 
              cursor: "pointer", 
              fontSize: 12.5, 
              fontFamily: "'Outfit', sans-serif", 
              fontWeight: 600, 
              display: "flex", 
              alignItems: "center", 
              gap: 6, 
              transition: "all 0.2s" 
            }}
            onMouseEnter={e => { 
              e.currentTarget.style.borderColor = T.orange; 
              e.currentTarget.style.color = T.orange; 
            }}
            onMouseLeave={e => { 
              e.currentTarget.style.borderColor = T.border; 
              e.currentTarget.style.color = T.muted; 
            }}>
            <Icon name="back" size={13} color="currentColor" /> Back to Home
          </button>
        </div>
      </div>

      {/* Hero – adapts to 1 or 3 images (unchanged) */}
      <section style={{ background: r.bg, padding: mobile ? "56px 20px 40px" : "80px 40px 60px", position: "relative", overflow: "hidden", borderBottom: `1.5px solid ${r.border}` }}>
        <div style={{ position: "absolute", right: -60, top: -60, fontFamily: "'Outfit', sans-serif", fontSize: 260, fontWeight: 900, color: r.color, opacity: 0.04, lineHeight: 1, userSelect: "none" }}>{r.letter}</div>
        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1, display: mobile ? "block" : "flex", gap: 60, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 20 }}>
              <TrackHeaderBadge r={r} />
            </div>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mobile ? 36 : 52, fontWeight: 900, color: T.ink, letterSpacing: -2, lineHeight: 1.05, marginBottom: 16 }}>
              {r.name}<br />
              <span style={{ color: r.color }}>{r.tagline}</span>
            </h1>
            <p style={{ fontSize: 17, color: T.muted, lineHeight: 1.78, maxWidth: 520, marginBottom: 32 }}>{r.desc}</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Btn size="lg" onClick={onOpenLogin} style={{ background: r.color, boxShadow: `0 8px 28px ${r.color}40` }}>Enroll in {r.name} Track →</Btn>
            </div>
          </div>
          {!mobile && (
            imgs.length === 1 ? (
              <div style={{ flex: "0 0 450px" }}>
                <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: `0 20px 48px ${r.color}30` }}>
                  <img src={imgs[0]} alt={r.name} style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} />
                </div>
              </div>
            ) : (
              <div style={{ flex: "0 0 380px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 8, height: 340 }}>
                  <div style={{ gridRow: "1 / 3", borderRadius: 18, overflow: "hidden", boxShadow: `0 16px 48px ${r.color}25` }}>
                    <img src={imgs[0]} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: `0 8px 24px ${r.color}18` }}>
                    <img src={imgs[1]} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: `0 8px 24px ${r.color}18` }}>
                    <img src={imgs[2]} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>
      {children}
      <Footer onNav={onNav} />
    </div>
  );
};

// ===== THE REST OF YOUR PAGES (unchanged – included for completeness) =====
// ── RAMANUJAN PAGE ────────────────────────────────────────────────────────────
const RamanujanPage = ({ onNav, onOpenLogin, loggedIn, user }) => {
  const r = RDCA[0];
  const mobile = useIsMobile();
  return (
    <FrameworkPage r={r} onNav={onNav} onOpenLogin={onOpenLogin} loggedIn={loggedIn} user={user}>
      <Section bg={T.white} py="80px 40px">
        <SectionHeader tag="What You'll Get" tagColor={r.color} title="Precision Assessment for Every Student" subtitle="The Ramanujan track uses rigorous testing and analytics to reveal your child's true academic profile." />
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: 22, marginBottom: 48 }}>
          {[
            { emoji: "📋", title: "PET — Performance Evaluation Test", desc: "A 60-minute comprehensive diagnostic covering Mathematics, Science, English, Logical Reasoning, and General Awareness. Generates a detailed subject-wise profile.", badge: "Core Assessment" },
            { emoji: "📈", title: "Mock Test Series", desc: "20+ exam-calibrated papers with real-time analytics, percentile rankings, time management insights, and a comprehensive strengths/weakness matrix.", badge: "Practice" },
            { emoji: "🏆", title: "Pr.ET — Progress Evaluation Test", desc: "Taken 6 months after PET. This before-vs-after comparison is your proof of transformation — hard data showing exactly how far you've come.", badge: "Growth Proof" },
          ].map(card => (
            <div key={card.title} style={{ background: r.bg, border: `1.5px solid ${r.border}`, borderRadius: 22, padding: "28px 24px", position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{card.emoji}</div>
              <div style={{ background: `${r.color}16`, color: r.textColor, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-block", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>{card.badge}</div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 17, color: T.ink, marginBottom: 10, letterSpacing: -0.3 }}>{card.title}</h3>
              <p style={{ fontSize: 13.5, color: T.muted, lineHeight: 1.75 }}>{card.desc}</p>
            </div>
          ))}
        </div>
        {loggedIn && (
          <div style={{ background: T.cream, border: `1.5px solid ${T.border}`, borderRadius: 22, padding: "28px 28px", marginBottom: 32 }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 18, marginBottom: 4, color: T.ink }}>{user?.name}'s Progress Report</div>
            <div style={{ fontSize: 13, color: T.muted, marginBottom: 22 }}>PET vs Pr.ET Comparison · {user?.grade}</div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: r.color }}>
                    {["Subject", "PET Score", "Pr.ET Score", "Growth"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", color: "#fff", textAlign: "left", fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[{ sub: "Mathematics", pet: 62, pret: 84, c: T.green }, { sub: "Science", pet: 70, pret: 88, c: T.green }, { sub: "English", pet: 75, pret: 85, c: T.teal }, { sub: "Logical Reasoning", pet: 58, pret: 79, c: T.green }, { sub: "Overall", pet: 66, pret: 84, c: T.orange }].map((row, i) => (
                    <tr key={row.sub} style={{ background: i % 2 === 0 ? "#fff" : T.cream }}>
                      <td style={{ padding: "12px 16px", fontWeight: row.sub === "Overall" ? 700 : 400, fontFamily: "'Outfit', sans-serif" }}>{row.sub}</td>
                      <td style={{ padding: "12px 16px", color: T.muted }}>{row.pet}%</td>
                      <td style={{ padding: "12px 16px", fontWeight: 700, color: row.c }}>{row.pret}%</td>
                      <td style={{ padding: "12px 16px" }}><span style={{ background: `${row.c}15`, color: row.c, padding: "3px 10px", borderRadius: 10, fontSize: 12, fontWeight: 700 }}>+{row.pret - row.pet}%</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div style={{ background: T.ink, borderRadius: 22, padding: "32px 28px", display: "flex", flexDirection: mobile ? "column" : "row", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", marginBottom: 6 }}>Ready to know where you stand?</div>
            <div style={{ fontSize: 14, color: "#64748B" }}>Book your PET slot today and get results in 48 hours.</div>
          </div>
          <Btn size="lg" onClick={onOpenLogin} style={{ flexShrink: 0 }}>Book Your PET Slot →</Btn>
        </div>
      </Section>
    </FrameworkPage>
  );
};

// ── DHRONA PAGE ───────────────────────────────────────────────────────────────
const DhronaPage = ({ onNav, onOpenLogin }) => {
  const r = RDCA[1];
  const mobile = useIsMobile();
  const [selMonth, setSelMonth] = useState(null);
  const months = Object.keys(SESSION_DATA);
  return (
    <FrameworkPage r={r} onNav={onNav} onOpenLogin={onOpenLogin}>
      <Section bg={T.white} py="80px 40px">
        <SectionHeader tag="Learning Pillars" tagColor={r.color} title="Wisdom Beyond the Classroom" subtitle="The Dhrona track is built on four pillars of real-world knowledge and expert guidance." />
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 18, marginBottom: 52 }}>
          {[["🔭","Insights","Deep dives into science, tech & global events","#EFF6FF","#1E40AF"],["🌍","World View","Understanding geopolitics, cultures & global trends","#ECFDF5","#065F46"],["💡","Wisdom","Philosophy, ethics & life skills from great thinkers","#FFFBEB","#92400E"],["📚","Reading","Curated reading club with discussion and analysis","#FDF4FF","#6B21A8"]].map(([icon, label, desc, bg, c]) => (
            <div key={label} style={{ background: bg, borderRadius: 20, padding: "24px 20px", cursor: "pointer", transition: "all 0.25s", border: `1.5px solid transparent` }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${c}18`; e.currentTarget.style.borderColor = c + "30"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "transparent"; }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{icon}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 17, color: c, marginBottom: 8 }}>{label}</div>
              <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.65 }}>{desc}</div>
            </div>
          ))}
        </div>
        <SectionHeader tag="IAU Sessions" tagColor={r.color} title="Insights Around Us — Monthly Live Sessions" subtitle="Select a month to explore upcoming sessions, topics, and expert talks." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginBottom: 24 }}>
          {months.map(m => (
            <button key={m} onClick={() => setSelMonth(selMonth === m ? null : m)}
              style={{ padding: "11px 0", borderRadius: 12, fontSize: 12.5, fontWeight: 600, border: `2px solid ${selMonth === m ? r.color : T.border}`, background: selMonth === m ? r.bg : T.white, color: selMonth === m ? r.textColor : T.ink, cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "all 0.2s" }}>
              {m}
            </button>
          ))}
        </div>
        {selMonth && SESSION_DATA[selMonth] && (
          <div style={{ background: r.bg, border: `2px solid ${r.border}`, borderRadius: 22, padding: "28px 28px", marginBottom: 24, animation: "fadeIn 0.25s ease" }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 20, color: T.ink, marginBottom: 6 }}>{selMonth} 2025 — IAU Session</div>
            <div style={{ fontSize: 14, background: `${r.color}10`, borderRadius: 12, padding: "12px 16px", marginBottom: 20, color: T.ink, lineHeight: 1.6 }}><strong>Featured Topic:</strong> {SESSION_DATA[selMonth].topic}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {[["Sessions", SESSION_DATA[selMonth].sessions + " sessions"], ["Duration", SESSION_DATA[selMonth].min + " minutes total"], ["Expert Talks", SESSION_DATA[selMonth].fc + " sessions"]].map(([l, v]) => (
                <div key={l} style={{ background: T.white, borderRadius: 14, padding: "16px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, color: r.color }}>{v.split(" ")[0]}</div>
                  <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
            <Btn fullWidth size="lg" style={{ marginTop: 20, background: r.color }} onClick={onOpenLogin}>Enroll in {selMonth} IAU Sessions →</Btn>
          </div>
        )}
      </Section>
    </FrameworkPage>
  );
};

// ── CHANAKYA PAGE ─────────────────────────────────────────────────────────────
const ChanakyaPage = ({ onNav, onOpenLogin }) => {
  const r = RDCA[2];
  const mobile = useIsMobile();
  return (
    <FrameworkPage r={r} onNav={onNav} onOpenLogin={onOpenLogin}>
      <Section bg={T.white} py="80px 40px">
        <SectionHeader tag="Career Strategy" tagColor={r.color} title="Leadership & Career Clarity from School" subtitle="The Chanakya track gives students a strategic edge — clear direction, polished profile, and leadership skills." />
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: 22, marginBottom: 48 }}>
          {[
            { emoji: "🗺️", title: "Career Path Mapping", desc: "A 1-on-1 session that identifies your interests, aptitudes, and matches you to 5 career clusters with a detailed 5-year academic roadmap.", tag: "1-on-1 Session" },
            { emoji: "📄", title: "Resume & Portfolio Building", desc: "Craft an impressive academic resume and online portfolio. Learn to showcase achievements, awards, and extracurriculars that stand out.", tag: "Workshop" },
            { emoji: "🎭", title: "Interview Preparation", desc: "3 rounds of mock interviews with real-time coaching. Build communication skills, handle pressure, and project confidence effortlessly.", tag: "Practice" },
            { emoji: "🔗", title: "LinkedIn & Personal Brand", desc: "Build a strong digital presence from Grade 9. Profile optimization, content strategy, and professional networking basics.", tag: "Digital" },
            { emoji: "🧘", title: "Leadership Skills", desc: "Workshops on critical thinking, decision-making, public speaking, and conflict resolution — skills that define future leaders.", tag: "Soft Skills" },
            { emoji: "🏆", title: "Competition Guidance", desc: "Curated guidance for national olympiads, scholarships, debate competitions, and leadership awards that boost college applications.", tag: "Competitions" },
          ].map(card => (
            <div key={card.title} style={{ background: r.bg, border: `1.5px solid ${r.border}`, borderRadius: 20, padding: "26px 22px", cursor: "pointer", transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 16px 48px ${r.color}18`; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
              onClick={onOpenLogin}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{card.emoji}</div>
              <div style={{ background: `${r.color}14`, color: r.textColor, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-block", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>{card.tag}</div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 16, color: T.ink, marginBottom: 8 }}>{card.title}</h3>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.7 }}>{card.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ background: T.ink, borderRadius: 22, padding: "32px 28px", display: "flex", flexDirection: mobile ? "column" : "row", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", marginBottom: 6 }}>Know where you're going before others do.</div>
            <div style={{ fontSize: 14, color: "#64748B" }}>Book your Career Path Mapping session — 1-on-1 with a certified counsellor.</div>
          </div>
          <Btn size="lg" onClick={onOpenLogin} style={{ background: r.color, flexShrink: 0 }}>Book Session →</Btn>
        </div>
      </Section>
    </FrameworkPage>
  );
};

// ── ARYABHATA PAGE ────────────────────────────────────────────────────────────
const AryabhataPage = ({ onNav, onOpenLogin }) => {
  const r = RDCA[3];
  const mobile = useIsMobile();
  const [selMonth, setSelMonth] = useState(null);
  const months = Object.keys(SESSION_DATA);
  const ailData = { Jan:"Intro to Machine Learning & Neural Networks", Feb:"Natural Language Processing & ChatBots", Mar:"Computer Vision & Object Detection", Apr:"AI in Healthcare & Diagnostics", May:"Generative AI & Creative Applications", Jun:"AI Ethics & Responsible Innovation", Jul:"Reinforcement Learning & Game AI", Aug:"AI for Climate & Sustainability", Sep:"Voice Assistants & Speech Recognition", Oct:"AI in Finance & Stock Prediction", Nov:"Autonomous Systems & Robotics AI", Dec:"AI Showcase & Innovation Fair" };
  const projects = { Jan:"Simple Image Classifier", Feb:"Your Own AI Chatbot", Mar:"Face Detection App", Apr:"Disease Prediction Model", May:"AI Art Generator", Jun:"AI Bias Audit", Jul:"Game-Playing Agent", Aug:"Carbon Footprint Predictor", Sep:"Personal Voice Assistant", Oct:"Stock Trend Analyzer", Nov:"Robot Navigation Simulator", Dec:"Portfolio Showcase" };
  return (
    <FrameworkPage r={r} onNav={onNav} onOpenLogin={onOpenLogin}>
      <Section bg={T.white} py="80px 40px">
        <SectionHeader tag="Future Skills" tagColor={r.color} title="Build the Future. Starting Today." subtitle="The Aryabhata track equips students with AI, coding, and innovation skills that define tomorrow's leaders." />
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 18, marginBottom: 52 }}>
          {[["🤖","AI Labs","Monthly hands-on AI projects using Python & real tools","#F5F3FF","#5B21B6"],["⚡","Innovation Challenges","National hackathons with real prizes and recognition","#EFF6FF","#1E40AF"],["🔮","Robotics","Build and program real robots solving real problems","#ECFDF5","#065F46"],["🛸","Space Tech","Astronomy, satellite data & ISRO-inspired projects","#FFF5F0","#9A3412"]].map(([icon, label, desc, bg, c]) => (
            <div key={label} style={{ background: bg, borderRadius: 20, padding: "24px 20px", transition: "all 0.25s", border: `1.5px solid transparent`, cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = c + "30"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "transparent"; }}
              onClick={onOpenLogin}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{icon}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 16, color: c, marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 12.5, color: T.muted, lineHeight: 1.65 }}>{desc}</div>
            </div>
          ))}
        </div>
        <SectionHeader tag="AIL Sessions" tagColor={r.color} title="Monthly AI Learning Sessions" subtitle="Click a month to see the AI topic and your hands-on project for that session." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginBottom: 24 }}>
          {months.map(m => (
            <button key={m} onClick={() => setSelMonth(selMonth === m ? null : m)}
              style={{ padding: "11px 0", borderRadius: 12, fontSize: 12.5, fontWeight: 600, border: `2px solid ${selMonth === m ? r.color : T.border}`, background: selMonth === m ? r.bg : T.white, color: selMonth === m ? r.textColor : T.ink, cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "all 0.2s" }}>
              {m}
            </button>
          ))}
        </div>
        {selMonth && (
          <div style={{ background: r.bg, border: `2px solid ${r.border}`, borderRadius: 22, padding: "28px", marginBottom: 32, animation: "fadeIn 0.25s ease" }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 20, color: T.ink, marginBottom: 16 }}>{selMonth} 2025 — AI Learnings</div>
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 20 }}>
              <div style={{ background: T.white, borderRadius: 14, padding: "18px" }}>
                <div style={{ fontSize: 11, color: r.textColor, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 8 }}>Monthly Topic</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 700, color: T.ink }}>{ailData[selMonth]}</div>
              </div>
              <div style={{ background: T.white, borderRadius: 14, padding: "18px" }}>
                <div style={{ fontSize: 11, color: r.textColor, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 8 }}>Hands-On Project</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 700, color: T.ink }}>Build: {projects[selMonth]}</div>
              </div>
            </div>
            <Btn fullWidth size="lg" style={{ background: r.color }} onClick={onOpenLogin}>Enroll in {selMonth} AI Sessions →</Btn>
          </div>
        )}
      </Section>
    </FrameworkPage>
  );
};

// ── PROGRAMS / COMBO PAGE ─────────────────────────────────────────────────────
const ComboPage = ({ onNav, onOpenLogin, onOpenSignin }) => {
  const mobile = useIsMobile();
  const [selected, setSelected] = useState("all");
  const plans = [
    { id: "rc", name: "Assess + Align", sub: "Ramanujan + Chanakya", price: "₹35,000", tag: "Most Popular", color: T.orange, features: ["PET & Pr.ET Assessments", "20+ Mock Test Papers", "1-on-1 Career Counselling", "Career Path Mapping", "Resume & Portfolio Building", "Interview Preparation", "Parent Dashboard Access", "Monthly Progress Report"] },
    { id: "all", name: "Complete RDCA", sub: "All Four Tracks — Full Journey", price: "₹28,000", tag: "Best Value", color: T.gold, dark: true, features: ["Everything in Assess+Align", "Everything in Learn+Build", "Priority Slot Booking", "1-on-1 Annual Review", "Achievement Certificates", "Scholarship Guidance", "National Competition Entry", "Lifetime Portfolio Access"] },
    { id: "da", name: "Learn + Build", sub: "Dhrona + Aryabhata", price: "₹25,000", tag: null, color: T.blue, features: ["12 IAU Sessions Monthly", "Expert Mentorship Access", "12 AI Learning Sessions", "Innovation Challenge Entry", "Annual Reading Club", "Parent Dashboard Access", "3 Hands-on AI Projects", "Digital Portfolio"] },
  ];
  return (
    <div>
      {/* Header bar with TI logo */}
      <div style={{ background: T.pageBg, borderBottom: `2px solid ${T.orange}`, padding: "10px 24px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <TILogo size={38} fontSize={15} showTagline={false} dark={false} onClick={() => onNav("home")} />
            <div style={{ height: 24, width: 1, background: T.border }} />
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${T.gold}18`, border: `1px solid ${T.gold}30`, borderRadius: 20, padding: "4px 14px" }}>
              <span style={{ fontSize: 14 }}>💎</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#92400E", letterSpacing: 1, textTransform: "uppercase" }}>Programs & Pricing</span>
            </div>
          </div>
          <button onClick={() => onNav("home")} style={{ background: "none", border: `1px solid ${T.border}`, color: T.muted, padding: "6px 16px", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontFamily: "'Outfit', sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.orange; e.currentTarget.style.color = T.orange; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}>
            <Icon name="back" size={13} color="currentColor" /> Back
          </button>
        </div>
      </div>

      <Section bg={T.ink} py="80px 40px" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.future})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,18,7,0.96), rgba(26,18,7,0.88))" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <Tag color={T.gold}>Annual Investment</Tag>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mobile ? 36 : 56, fontWeight: 900, color: "#fff", letterSpacing: -2, lineHeight: 1.1, margin: "16px 0 18px" }}>Programs & Pricing</h1>
          <p style={{ fontSize: 17, color: "#64748B", maxWidth: 520, margin: "0 auto" }}>Choose the right RDCA bundle for your child. All plans include parent dashboard and community access.</p>
        </div>
      </Section>

      <Section bg={T.cream} py="80px 40px">
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: 24, marginBottom: 56 }}>
          {plans.map(p => (
            <div key={p.id} style={{ background: p.dark ? T.ink : T.white, border: `2.5px solid ${selected === p.id ? p.color : p.dark ? T.borderDark : T.border}`, borderRadius: 26, padding: "30px 26px", position: "relative", cursor: "pointer", transition: "all 0.28s", boxShadow: selected === p.id ? `0 20px 60px ${p.color}22` : "none", transform: selected === p.id && !mobile ? "scale(1.02)" : "none" }}
              onClick={() => setSelected(selected === p.id ? null : p.id)}>
              {p.tag && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: p.color, color: p.dark ? T.ink : "#fff", fontSize: 11, fontWeight: 800, padding: "5px 18px", borderRadius: 20, letterSpacing: 1, whiteSpace: "nowrap" }}>{p.tag}</div>}
              <div style={{ marginBottom: 22 }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 900, color: p.dark ? "#fff" : T.ink, letterSpacing: -0.5 }}>{p.name}</div>
                <div style={{ fontSize: 13, color: p.dark ? "#4A5568" : T.muted, marginTop: 4 }}>{p.sub}</div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 42, fontWeight: 900, color: p.color, letterSpacing: -2, lineHeight: 1 }}>{p.price}</div>
                <div style={{ fontSize: 12.5, color: p.dark ? "#4A5568" : T.muted, marginTop: 4 }}>per year · all inclusive</div>
              </div>
              <div style={{ marginBottom: 26 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: `${p.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}><Icon name="check" size={11} color={p.color} /></div>
                    <span style={{ fontSize: 13.5, color: p.dark ? "#CBD5E1" : T.ink, lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <Btn fullWidth size="lg" onClick={onOpenLogin} style={{ background: p.color, boxShadow: `0 6px 20px ${p.color}30` }}>Choose {p.name} →</Btn>
            </div>
          ))}
        </div>

        <SectionHeader tag="Grade Programs" tagColor={T.blue} title="Programs by Grade" subtitle="Every grade gets a tailored curriculum within the RDCA framework." center />
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 18 }}>
          {[
            { grade: "Grade 4–5", sub: "Primary Excellence", emoji: "🌱", color: T.teal, desc: "Foundation skills, reading, world awareness, and curiosity-building through play-based learning." },
            { grade: "Grade 6–8", sub: "Middle School Mastery", emoji: "🌿", color: T.blue, desc: "Career exploration begins, critical thinking, IAU sessions, and structured assessments." },
            { grade: "Grade 9–10", sub: "Board Prep & Clarity", emoji: "🌳", color: T.orange, desc: "Full PET + mock tests, career mapping, interview prep, and AI introduction." },
            { grade: "Grade 11–12", sub: "College & Career Launch", emoji: "🚀", color: T.purple, desc: "Complete RDCA access, competitive exam prep, scholarship guidance, and personal branding." },
          ].map(g => (
            <div key={g.grade} style={{ background: T.white, border: `1.5px solid ${T.border}`, borderRadius: 20, padding: "24px 20px", transition: "all 0.25s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = g.color; e.currentTarget.style.boxShadow = `0 12px 40px ${g.color}14`; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
              onClick={onOpenSignin}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{g.emoji}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 17, color: g.color, marginBottom: 4 }}>{g.grade}</div>
              <div style={{ fontSize: 12, color: T.muted, fontWeight: 600, marginBottom: 10 }}>{g.sub}</div>
              <p style={{ fontSize: 12.5, color: T.muted, lineHeight: 1.65 }}>{g.desc}</p>
            </div>
          ))}
        </div>
      </Section>
      <Footer onNav={onNav} />
    </div>
  );
};

// ── ABOUT PAGE ────────────────────────────────────────────────────────────────
const AboutPage = ({ onNav, onOpenSignin }) => {
  const mobile = useIsMobile();
  return (
    <div>
      {/* Header bar */}
      <div style={{ background: T.pageBg, borderBottom: `2px solid ${T.orange}`, padding: "10px 24px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <TILogo size={38} fontSize={15} showTagline={false} dark={false} onClick={() => onNav("home")} />
            <div style={{ height: 24, width: 1, background: T.border }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.muted }}>About Us</span>
          </div>
          <button onClick={() => onNav("home")} style={{ background: "none", border: `1px solid ${T.border}`, color: T.muted, padding: "6px 16px", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontFamily: "'Outfit', sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.orange; e.currentTarget.style.color = T.orange; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}>
            <Icon name="back" size={13} color="currentColor" /> Back
          </button>
        </div>
      </div>

      <Section bg={T.ink} py="80px 40px" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.india})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,18,7,0.97), rgba(26,18,7,0.88))" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mobile ? 36 : 56, fontWeight: 900, color: "#fff", letterSpacing: -2, lineHeight: 1.1, marginBottom: 20, maxWidth: 700 }}>
            Built on One Belief:<br /><span style={{ color: T.orange }}>Every Child is Extraordinary.</span>
          </h1>
          <p style={{ fontSize: 17, color: "#64748B", maxWidth: 580, lineHeight: 1.8 }}>India has 250 million school students. Yet most are assessed only by marks, their true talents undiscovered until it's too late. Talent Ignition was built to change that.</p>
        </div>
      </Section>

      <Section bg={T.white} py="80px 40px">
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 32, marginBottom: 60 }}>
          <div>
            <Tag color={T.orange}>Our Mission</Tag>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 900, color: T.ink, letterSpacing: -1, lineHeight: 1.15, margin: "14px 0 18px" }}>To Give Every Student a Fighting Chance</h2>
            <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.85, marginBottom: 16 }}>Talent Ignition was born from a simple frustration — India's students are being measured only by marks, while their true talents, interests, and potential remain undiscovered.</p>
            <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.85, marginBottom: 28 }}>We built the RDCA framework — inspired by four of India's greatest minds — to give every student the structure, guidance, and acceleration they deserve, regardless of background.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[["🎯", "Mission-Driven", "We measure success in student transformations, not revenue."], ["🌱", "Inclusive", "Built for every student — urban, semi-urban, and rural India."]].map(([e, t, d]) => (
                <div key={t} style={{ background: T.cream, borderRadius: 16, padding: "18px 16px", border: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{e}</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 5 }}>{t}</div>
                  <div style={{ fontSize: 12.5, color: T.muted, lineHeight: 1.6 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img src={IMG.future} alt="Students" style={{ width: "100%", height: mobile ? 260 : "100%", objectFit: "cover", borderRadius: 22, maxHeight: 440 }} />
          </div>
        </div>

        <SectionHeader tag="Our Vision" tagColor={T.blue} title="A Future-Ready Generation" />
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: 22 }}>
          {[
            { emoji: "🧠", title: "The RDCA Philosophy", color: T.orange, desc: "RDCA stands for Ramanujan, Dhrona, Chanakya, Aryabhata — four dimensions of human growth: Assessment, Awareness, Alignment, and Acceleration. Every student needs all four to truly thrive." },
            { emoji: "🌟", title: "Our Vision", color: T.blue, desc: "A future where no Indian student graduates without knowing who they are, what they're capable of, and where they're going. A generation that is world-ready, not just exam-ready." },
            { emoji: "🚀", title: "Future Skills", color: T.purple, desc: "The jobs of 2035 don't exist yet. We prepare students with AI literacy, systems thinking, leadership, and innovation — skills that will never go out of date." },
          ].map(s => (
            <div key={s.title} style={{ padding: "26px 22px", background: T.cream, borderRadius: 22, border: `1.5px solid ${T.border}`, borderLeft: `4px solid ${s.color}` }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{s.emoji}</div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 18, color: s.color, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.8 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg={T.cream} py="80px 40px">
        <SectionHeader tag="Key Benefits" tagColor={T.green} title="Why Families Choose Talent Ignition" center />
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 20 }}>
          {[["12,000+","Students Enrolled","Across India",T.orange],["200+","Expert Mentors","IIT/IIM/Industry",T.blue],["98%","Parent Satisfaction","Post 1-Year Review",T.green],["4","Learning Tracks","Complete RDCA",T.purple]].map(([n,l,s,c]) => (
            <div key={l} style={{ background: T.white, borderRadius: 22, padding: "28px 22px", textAlign: "center", border: `1.5px solid ${T.border}`, transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = c; e.currentTarget.style.boxShadow = `0 12px 40px ${c}14`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 38, fontWeight: 900, color: c, letterSpacing: -1.5 }}>{n}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, color: T.ink, marginTop: 8 }}>{l}</div>
              <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>{s}</div>
            </div>
          ))}
        </div>
      </Section>

      <section style={{ background: T.ink, padding: mobile ? "56px 20px" : "80px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mobile ? 30 : 44, fontWeight: 900, color: "#fff", letterSpacing: -1.5, marginBottom: 16 }}>Be Part of the Movement</h2>
          <p style={{ fontSize: 16, color: "#64748B", marginBottom: 36 }}>Join thousands of students building a better future — one discovery at a time.</p>
          <Btn size="xl" onClick={onOpenSignin}>Start Your Journey →</Btn>
        </div>
      </section>
      <Footer onNav={onNav} />
    </div>
  );
};

// ── CONTACT PAGE ──────────────────────────────────────────────────────────────
const ContactPage = ({ onNav }) => {
  const mobile = useIsMobile();
  const [form, setForm] = useState({ name: "", email: "", phone: "", grade: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = () => { if (!form.name || !form.email || !form.message) return; setSent(true); };
  return (
    <div>
      {/* Header bar */}
      <div style={{ background: T.pageBg, borderBottom: `2px solid ${T.teal}`, padding: "10px 24px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <TILogo size={38} fontSize={15} showTagline={false} dark={false} onClick={() => onNav("home")} />
            <div style={{ height: 24, width: 1, background: T.border }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.muted }}>Contact Us</span>
          </div>
          <button onClick={() => onNav("home")} style={{ background: "none", border: `1px solid ${T.border}`, color: T.muted, padding: "6px 16px", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontFamily: "'Outfit', sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.orange; e.currentTarget.style.color = T.orange; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}>
            <Icon name="back" size={13} color="currentColor" /> Back
          </button>
        </div>
      </div>

      <Section bg={T.ink} py="64px 40px" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <Tag color={T.teal}>Get in Touch</Tag>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mobile ? 36 : 52, fontWeight: 900, color: "#fff", letterSpacing: -2, lineHeight: 1.1, margin: "16px 0 16px" }}>Contact Us</h1>
          <p style={{ fontSize: 16, color: "#64748B", maxWidth: 480, margin: "0 auto" }}>Questions about RDCA? Want to enroll? Let's talk. Our team responds within 24 hours.</p>
        </div>
      </Section>

      <Section bg={T.cream} py="80px 40px">
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 48 }}>
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 26, color: T.ink, marginBottom: 8, letterSpacing: -0.5 }}>Send us a Message</div>
            <p style={{ fontSize: 14.5, color: T.muted, marginBottom: 32, lineHeight: 1.75 }}>Fill in the form and a member of our team will get back to you within 24 hours.</p>
            {sent ? (
              <div style={{ background: `${T.green}12`, border: `2px solid ${T.green}30`, borderRadius: 20, padding: "32px 28px", textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 14 }}>✅</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Message Sent!</div>
                <p style={{ fontSize: 14.5, color: T.muted }}>We'll get back to you within 24 hours. Thank you, {form.name}!</p>
              </div>
            ) : (
              <div>
                <InputField placeholder="Your full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} icon="user" />
                <InputField placeholder="Email address" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} icon="mail" />
                <InputField placeholder="Phone number" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} icon="phone" />
                <div style={{ marginBottom: 14 }}>
                  <select value={form.grade} onChange={e => setForm({...form, grade: e.target.value})}
                    style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: `2px solid ${T.border}`, fontSize: 14, fontFamily: "'Outfit', sans-serif", background: "#FAFAF8", cursor: "pointer", color: form.grade ? T.ink : T.muted, outline: "none" }}>
                    <option value="">Student's current grade (optional)</option>
                    {GRADES.map(g => <option key={g.grade} value={g.grade}>{g.grade} · {g.range}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <textarea placeholder="How can we help you? Tell us about your child's goals, challenges, or any questions about RDCA..." value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: `2px solid ${T.border}`, fontSize: 14, fontFamily: "'Outfit', sans-serif", background: "#FAFAF8", resize: "vertical", minHeight: 130, boxSizing: "border-box", outline: "none", lineHeight: 1.65 }}
                    onFocus={e => { e.target.style.borderColor = T.orange; e.target.style.background = "#fff"; }}
                    onBlur={e => { e.target.style.borderColor = T.border; e.target.style.background = "#FAFAF8"; }} />
                </div>
                <Btn fullWidth size="lg" onClick={handleSubmit} disabled={!form.name || !form.email || !form.message}>Send Message →</Btn>
              </div>
            )}
          </div>
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 26, color: T.ink, marginBottom: 8, letterSpacing: -0.5 }}>Reach Us Directly</div>
            <p style={{ fontSize: 14.5, color: T.muted, marginBottom: 32, lineHeight: 1.75 }}>Prefer to talk? Call us, WhatsApp us, or visit our office in Srikakulam.</p>
            {[[<Icon name="mail" size={20} color={T.orange} />, "Email Us", "hello@talentignition.in", "We respond within 24 hours", T.orange],
              [<Icon name="phone" size={20} color={T.blue} />, "Call / WhatsApp", "+91 98765 43210", "Mon–Sat, 9 AM – 7 PM IST", T.blue],
              [<Icon name="map" size={20} color={T.green} />, "Visit Us", "Srikakulam, Andhra Pradesh", "India — serving students nationwide", T.green],
            ].map(([icon, title, val, sub, c]) => (
              <div key={title} style={{ background: T.white, border: `1.5px solid ${T.border}`, borderRadius: 18, padding: "22px 20px", marginBottom: 14, display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${c}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 14.5, color: T.ink, fontWeight: 600 }}>{val}</div>
                  <div style={{ fontSize: 12.5, color: T.muted, marginTop: 2 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Footer onNav={onNav} />
    </div>
  );
};

// ── SUCCESS STORIES PAGE ─────────────────────────────────────────────────────
const SuccessPage = ({ onNav, onOpenSignin }) => {
  const mobile = useIsMobile();
  return (
    <div>
      {/* Header bar */}
      <div style={{ background: T.pageBg, borderBottom: `2px solid ${T.gold}`, padding: "10px 24px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <TILogo size={38} fontSize={15} showTagline={false} dark={false} onClick={() => onNav("home")} />
            <div style={{ height: 24, width: 1, background: T.border }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.muted }}>⭐ Success Stories</span>
          </div>
          <button onClick={() => onNav("home")} style={{ background: "none", border: `1px solid ${T.border}`, color: T.muted, padding: "6px 16px", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontFamily: "'Outfit', sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.orange; e.currentTarget.style.color = T.orange; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}>
            <Icon name="back" size={13} color="currentColor" /> Back
          </button>
        </div>
      </div>

      <Section bg={T.ink} py="80px 40px" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.student2})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,18,7,0.97), rgba(26,18,7,0.85))" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <Tag color={T.gold}>Real Results</Tag>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mobile ? 36 : 56, fontWeight: 900, color: "#fff", letterSpacing: -2, lineHeight: 1.1, margin: "16px 0 18px" }}>Success Stories</h1>
          <p style={{ fontSize: 17, color: "#64748B", maxWidth: 540, margin: "0 auto" }}>Over 12,000 students. Real transformations. Here's what the RDCA journey looks like in real life.</p>
        </div>
      </Section>

      <Section bg={T.cream} py="80px 40px">
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 18, marginBottom: 60 }}>
          {[["12,000+","Students Transformed",T.orange],["97%","Parent Satisfaction",T.gold],["3,400+","Projects Built",T.teal],["200+","Awards Won",T.purple]].map(([n,l,c]) => (
            <div key={l} style={{ background: T.white, borderRadius: 20, padding: "28px 20px", textAlign: "center", border: `1.5px solid ${T.border}` }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 34, fontWeight: 900, color: c, letterSpacing: -1 }}>{n}</div>
              <div style={{ fontSize: 13, color: T.muted, marginTop: 6, fontWeight: 600 }}>{l}</div>
            </div>
          ))}
        </div>

        <SectionHeader tag="Student Achievements" tagColor={T.orange} title="From Classrooms to Champions" subtitle="Every story here started with one decision — to join the RDCA journey." />
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)", gap: 24 }}>
          {[
            { name: "Aarav Patel", grade: "Grade 12 · Delhi", img: IMG.parent1, achievement: "IIT JEE Mains Cleared", desc: "Started Ramanujan track in Grade 10. PET revealed his weak spots in Maths early enough to fix them. Cleared JEE Mains in first attempt.", track: "Ramanujan", color: T.orange },
            { name: "Sneha Krishnamurthy", grade: "Grade 11 · Bangalore", img: IMG.parent3, achievement: "Won National Science Olympiad", desc: "Aryabhata AI labs sparked her love for data science. She used skills from AI sessions to build a climate prediction model that won at the national level.", track: "Aryabhata", color: T.purple },
            { name: "Rohan Desai", grade: "Grade 9 · Mumbai", img: IMG.parent6, achievement: "Published Research Paper", desc: "Dhrona's IAU sessions introduced him to research methodology. With mentor guidance, he published a paper on AI applications in education at age 15.", track: "Dhrona", color: T.blue },
            { name: "Ananya Iyer", grade: "Grade 12 · Hyderabad", img: IMG.parent5, achievement: "Secured Scholarship to NUS Singapore", desc: "Chanakya's career mapping and interview prep transformed her application. The personal brand workshop helped her get noticed by the NUS scholarship committee.", track: "Chanakya", color: T.green },
          ].map(s => (
            <div key={s.name} style={{ background: T.white, borderRadius: 24, overflow: "hidden", border: `1.5px solid ${T.border}`, transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
              <div style={{ height: 5, background: s.color }} />
              <div style={{ padding: "26px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                  <img src={s.img} alt={s.name} style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", border: `3px solid ${s.color}30` }} />
                  <div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 16, color: T.ink }}>{s.name}</div>
                    <div style={{ fontSize: 12.5, color: T.muted }}>{s.grade}</div>
                    <Tag color={s.color} small>{s.track} Track</Tag>
                  </div>
                </div>
                <div style={{ background: `${s.color}10`, border: `1px solid ${s.color}20`, borderRadius: 12, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 20 }}>🏆</span>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 14, color: s.color }}>{s.achievement}</span>
                </div>
                <p style={{ fontSize: 13.5, color: T.muted, lineHeight: 1.75 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <section style={{ background: T.orange, padding: mobile ? "56px 20px" : "80px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mobile ? 30 : 44, fontWeight: 900, color: "#fff", letterSpacing: -1.5, marginBottom: 16 }}>Start Your Success Story</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.82)", marginBottom: 36 }}>Join thousands of students who transformed their academic and career journey.</p>
          <Btn size="xl" variant="white" onClick={onOpenSignin}>Get Started Free →</Btn>
        </div>
      </section>
      <Footer onNav={onNav} />
    </div>
  );
};

// ── DASHBOARD PAGE ────────────────────────────────────────────────────────────
const DashboardPage = ({ onNav, user, onLogout }) => {
  const mobile = useIsMobile();
  if (!user) { onNav("home"); return null; }
  return (
    <div style={{ background: T.cream, minHeight: "100vh" }}>
      <div style={{ background: T.ink, padding: mobile ? "28px 20px" : "36px 40px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 60, height: 60, background: `linear-gradient(135deg, ${user.color}, ${T.gold})`, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 22, color: "#fff" }}>{user.avatar}</div>
              <div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: -0.5 }}>Welcome back, {user.name.split(" ")[0]}! 👋</div>
                <div style={{ fontSize: 13.5, color: "#64748B", marginTop: 3 }}>{user.grade} · {user.school} · {user.city} · {user.plan}</div>
              </div>
            </div>
            <div style={{ background: `${T.green}14`, border: `1px solid ${T.green}25`, borderRadius: 10, padding: "6px 14px", fontSize: 12, color: T.green2, fontWeight: 700 }}>
              🟢 Member since {user.joined}
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: mobile ? "28px 20px" : "40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(4, 1fr)", gap: 18, marginBottom: 36 }}>
          {[
            { label: "Overall Progress", value: user.progress + "%", sub: "RDCA Journey", color: user.color },
            { label: "Sessions Attended", value: "28", sub: "This Year", color: T.blue },
            { label: "Mock Tests Taken", value: "14", sub: "Ramanujan Track", color: T.purple },
            { label: "Projects Built", value: "6", sub: "Aryabhata AI Labs", color: T.teal },
          ].map(s => (
            <div key={s.label} style={{ background: T.white, borderRadius: 18, padding: "22px 20px", border: `1.5px solid ${T.border}`, textAlign: "center" }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 900, color: s.color, letterSpacing: -1 }}>{s.value}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, color: T.ink, marginTop: 6 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: T.muted, marginTop: 3 }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 20, color: T.ink, marginBottom: 18 }}>Your RDCA Tracks</div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 18, marginBottom: 36 }}>
          {RDCA.map(r => (
            <div key={r.id} style={{ background: r.bg, border: `2px solid ${r.border}`, borderRadius: 20, padding: "22px 18px", cursor: "pointer", transition: "all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 48px ${r.color}20`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              onClick={() => onNav(r.id)}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{r.emoji}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 800, color: r.color }}>{r.name}</div>
              <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>{r.tagline}</div>
              <div style={{ marginTop: 14, height: 4, background: `${r.color}20`, borderRadius: 2 }}>
                <div style={{ height: "100%", background: r.color, borderRadius: 2, width: `${Math.floor(Math.random() * 40 + 50)}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: T.white, borderRadius: 20, padding: "24px 22px", border: `1.5px solid ${T.border}` }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Next Steps</div>
          <p style={{ fontSize: 14, color: T.muted, marginBottom: 18 }}>Continue your journey by completing your pending sessions and assessments.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Btn size="sm" onClick={() => onNav("ramanujan")}>🧮 Continue PET →</Btn>
            <Btn size="sm" variant="outline" onClick={() => onNav("chanakya")}>🎯 Book Career Session</Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── SIGNUP MODAL ──────────────────────────────────────────────────────────────
const SigninModal = ({ isOpen, onClose, onSwitch }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", grade: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1400);
  };
  const reset = () => { setDone(false); setForm({ name: "", email: "", grade: "", phone: "", password: "" }); setStep(1); };
  if (done) return (
    <Modal isOpen={isOpen} onClose={() => { onClose(); reset(); }} title="Account Created! 🎉" subtitle="Your journey begins now.">
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <div style={{ width: 80, height: 80, background: `${T.green}14`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", border: `3px solid ${T.green}30` }}><Icon name="check" size={34} color={T.green2} /></div>
        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Welcome to Talent Ignition!</h3>
        <p style={{ fontSize: 14, color: T.muted, marginBottom: 28, lineHeight: 1.75 }}>Your account for <strong>{form.name}</strong> has been created. Check your email to verify and unlock your RDCA dashboard.</p>
        <Btn fullWidth size="lg" onClick={() => { onClose(); reset(); }}>Start My Journey 🚀</Btn>
      </div>
    </Modal>
  );
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Your Account" subtitle="Join 12,000+ students on the RDCA journey.">
      <div style={{ display: "flex", gap: 0, background: "#F0EDE8", borderRadius: 14, padding: 4, marginBottom: 24 }}>
        {[1, 2].map(s => <div key={s} style={{ flex: 1, padding: "10px 0", textAlign: "center", borderRadius: 11, background: step === s ? T.white : "transparent", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: step === s ? "0 1px 8px rgba(0,0,0,0.09)" : "none", color: step === s ? T.ink : T.muted, transition: "all 0.2s", fontFamily: "'Outfit', sans-serif" }} onClick={() => step > s && setStep(s)}>Step {s} of 2</div>)}
      </div>
      {step === 1 ? (
        <>
          <InputField placeholder="Your full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} icon="user" />
          <InputField placeholder="Email address" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} icon="mail" />
          <InputField placeholder="Phone number (WhatsApp)" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} icon="phone" />
          <div style={{ marginBottom: 16 }}>
            <select value={form.grade} onChange={e => setForm({...form, grade: e.target.value})}
              style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: `2px solid ${T.border}`, fontSize: 14, fontFamily: "'Outfit', sans-serif", background: "#FAFAF8", cursor: "pointer", color: form.grade ? T.ink : T.muted, outline: "none" }}>
              <option value="">Select your grade</option>
              {GRADES.map(g => <option key={g.grade} value={g.grade}>{g.grade} · {g.range}</option>)}
            </select>
          </div>
          <Btn fullWidth size="lg" onClick={() => setStep(2)} disabled={!form.name || !form.email}>Continue →</Btn>
        </>
      ) : (
        <>
          <InputField placeholder="Create a strong password" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} icon="lock" />
          <div style={{ fontSize: 12.5, color: T.muted, marginBottom: 20, padding: "10px 14px", background: "#F8F6F1", borderRadius: 10, lineHeight: 1.65 }}>8+ characters with a number and special character recommended.</div>
          <Btn fullWidth size="lg" onClick={handleSubmit} disabled={!form.password}>{loading ? "Creating Account..." : "Create My Account 🚀"}</Btn>
        </>
      )}
      <div style={{ textAlign: "center", marginTop: 22, fontSize: 13.5, color: T.muted }}>
        Already have an account?{" "}
        <span style={{ color: T.orange, fontWeight: 700, cursor: "pointer" }} onClick={onSwitch}>Log In</span>
      </div>
    </Modal>
  );
};

// ── LOGIN MODAL ───────────────────────────────────────────────────────────────
const LoginModal = ({ isOpen, onClose, onSwitch, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const handleLogin = () => {
    if (!email || !password) { setErr("Please enter your email and password."); return; }
    setErr(""); setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const known = DEMO_USERS[email.toLowerCase()];
      const userData = known || { name: email.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, c => c.toUpperCase()), grade: "Grade 9", school: "My School", city: "India", plan: "Explorer", avatar: email.slice(0, 2).toUpperCase(), color: T.orange, joined: "2025", progress: 40 };
      onLogin(userData);
      onClose();
      setEmail(""); setPassword("");
    }, 1100);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Welcome Back 👋" subtitle="Log in to access your RDCA dashboard.">
      <div style={{ background: "#F0F9FF", border: `1px solid #BAE6FD`, borderRadius: 12, padding: "12px 16px", marginBottom: 22 }}>
        <div style={{ fontSize: 11.5, color: "#0369A1", fontWeight: 700, marginBottom: 5 }}>DEMO ACCOUNTS</div>
        <div style={{ fontSize: 12, color: "#0284C7", lineHeight: 1.75 }}>
          <strong>arjun@demo.in</strong> · <strong>priya@demo.in</strong> · <strong>rahul@demo.in</strong><br />
          Password: any (just type something)
        </div>
      </div>
      <InputField placeholder="Email address" type="email" value={email} onChange={e => { setEmail(e.target.value); setErr(""); }} icon="mail" error={!!err} onKeyDown={e => e.key === "Enter" && handleLogin()} />
      <InputField placeholder="Password" type="password" value={password} onChange={e => { setPassword(e.target.value); setErr(""); }} icon="lock" error={!!err} onKeyDown={e => e.key === "Enter" && handleLogin()} />
      {err && <div style={{ fontSize: 13, color: T.red, marginBottom: 14, padding: "10px 14px", background: "#FEF2F2", borderRadius: 10, border: `1px solid #FEE2E2` }}>{err}</div>}
      <div style={{ textAlign: "right", fontSize: 13, color: T.orange, cursor: "pointer", marginBottom: 20, fontWeight: 600 }}>Forgot password?</div>
      <Btn fullWidth size="lg" onClick={handleLogin}>{loading ? "Logging in..." : "Log In →"}</Btn>
      <div style={{ display: "flex", gap: 12, alignItems: "center", margin: "22px 0" }}>
        <div style={{ flex: 1, height: 1, background: T.border }} />
        <span style={{ fontSize: 12, color: T.muted }}>or</span>
        <div style={{ flex: 1, height: 1, background: T.border }} />
      </div>
      <button style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: `2px solid ${T.border}`, background: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, color: T.ink, transition: "all 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.background = T.cream; }}
        onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
        onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); onLogin(DEMO_USERS["demo@talentignition.in"]); onClose(); }, 900); }}>
        <svg width="18" height="18" viewBox="0 0 18 18"><path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.86-1.6 2.43v2h2.6c1.52-1.4 2.4-3.47 2.4-5.9 0-.54-.05-1.06-.17-1.53z" fill="#4285F4"/><path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2c-.72.48-1.63.76-2.7.76-2.07 0-3.83-1.4-4.46-3.28H1.84v2.07A8 8 0 0 0 8.98 17z" fill="#34A853"/><path d="M4.52 10.54A4.8 4.8 0 0 1 4.27 9c0-.53.1-1.05.25-1.54V5.39H1.84A8.06 8.06 0 0 0 .98 9c0 1.3.31 2.52.86 3.61l2.68-2.07z" fill="#FBBC05"/><path d="M8.98 3.58c1.16 0 2.21.4 3.04 1.2l2.27-2.28A8 8 0 0 0 8.98 1C6.2 1 3.83 2.56 2.52 4.84l2.68 2.07c.63-1.88 2.4-3.33 3.78-3.33z" fill="#EA4335"/></svg>
        Continue with Google
      </button>
      <div style={{ textAlign: "center", marginTop: 22, fontSize: 13.5, color: T.muted }}>
        Don't have an account?{" "}
        <span style={{ color: T.orange, fontWeight: 700, cursor: "pointer" }} onClick={onSwitch}>Sign Up Free</span>
      </div>
    </Modal>
  );
};

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function TalentIgnition() {
  const [page, setPage] = useState("home");
  const [signinOpen, setSigninOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 3500); };
  const goTo = id => { setPage(id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const openSignin = () => { setSigninOpen(true); setLoginOpen(false); };
  const openLogin = () => { setLoginOpen(true); setSigninOpen(false); };
  const handleLogin = userData => { setLoggedIn(true); setUser(userData); showToast(`Welcome back, ${userData.name.split(" ")[0]}! 🎉`); };
  const handleLogout = () => { setLoggedIn(false); setUser(null); showToast("Logged out successfully"); };

  const props = { onNav: goTo, onOpenLogin: openLogin, onOpenSignin: openSignin, loggedIn, user, onLogout: handleLogout };

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage {...props} />;
      case "whyti": return <WhyTIPage {...props} />;
      case "ramanujan": return <RamanujanPage {...props} />;
      case "dhrona": return <DhronaPage {...props} />;
      case "chanakya": return <ChanakyaPage {...props} />;
      case "aryabhata": return <AryabhataPage {...props} />;
      case "combo": return <ComboPage {...props} />;
      case "success": return <SuccessPage {...props} />;
      case "about": return <AboutPage {...props} />;
      case "contact": return <ContactPage {...props} />;
      case "dashboard": return <DashboardPage {...props} />;
      default: return <HomePage {...props} />;
    }
  };

  return (
    <div style={{ fontFamily: "'Outfit', 'DM Sans', sans-serif", background: T.pageBg, color: T.ink, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        input, select, button, textarea { font-family: 'Outfit', sans-serif; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d1c4b0; border-radius: 3px; }
        img { -webkit-user-drag: none; }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
        @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.9); } to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <Nav onNav={goTo} onOpenSignin={openSignin} onOpenLogin={openLogin} currentPage={page} loggedIn={loggedIn} user={user} onLogout={handleLogout} />

      {loggedIn && page !== "dashboard" && (
        <div style={{ background: `${T.green}08`, borderBottom: `1px solid ${T.green}18`, padding: "8px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12.5, color: T.green, fontWeight: 600, display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }} onClick={() => goTo("dashboard")}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: T.green2, display: "inline-block", boxShadow: `0 0 6px ${T.green2}` }} />
            {user?.name} · {user?.grade} · {user?.plan}
            <span style={{ fontSize: 11, color: T.green, fontWeight: 700, background: `${T.green}14`, padding: "2px 8px", borderRadius: 10 }}>VIEW DASHBOARD →</span>
          </span>
          <button style={{ fontSize: 12, color: T.muted, background: "none", border: "none", cursor: "pointer", fontFamily: "'Outfit', sans-serif" }} onClick={handleLogout}>Log out</button>
        </div>
      )}

      <main style={{ animation: "fadeSlideIn 0.35s ease" }}>
        {renderPage()}
      </main>

      <SigninModal isOpen={signinOpen} onClose={() => setSigninOpen(false)} onSwitch={() => { setSigninOpen(false); setLoginOpen(true); }} />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} onSwitch={() => { setLoginOpen(false); setSigninOpen(true); }} onLogin={handleLogin} />
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}