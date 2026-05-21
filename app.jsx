// app.jsx — Maytal Oz · existential psychotherapy (Hebrew, RTL) — v2

const { useState, useEffect, useRef, useMemo } = React;

// ─────────────────────────────────────────────────────────────────────────────
// Inline-SVG icons — Lucide-style outline
// ─────────────────────────────────────────────────────────────────────────────
const Icon = ({ d, children, size = 22, className = "", stroke = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
       className={className} aria-hidden="true">
    {d ? <path d={d} /> : children}
  </svg>
);
const I = {
  Phone:    (p) => <Icon {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></Icon>,
  Whatsapp: (p) => <Icon {...p}>
    <path d="M20.52 3.48A11.78 11.78 0 0 0 12.02 0C5.5 0 .2 5.3.2 11.82c0 2.08.55 4.11 1.6 5.9L0 24l6.45-1.7a11.78 11.78 0 0 0 5.57 1.42h.01c6.52 0 11.82-5.3 11.82-11.82a11.74 11.74 0 0 0-3.33-8.42Z" fill="currentColor" stroke="none"/>
    <path d="M17.45 14.4c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.6.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.54.12-.12.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.13-.6-1.45-.82-1.99-.22-.52-.44-.45-.6-.46l-.51-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.97 2.63 1.11 2.82.13.18 1.92 2.94 4.66 4.12.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32Z" fill="#fff" stroke="none"/>
  </Icon>,
  Facebook: (p) => <Icon {...p}>
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" fill="currentColor" stroke="none"/>
  </Icon>,
  Heart:   (p) => <Icon {...p} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/>,
  Leaf:    (p) => <Icon {...p} d="M11 20A7 7 0 0 1 4 13c0-5 6-8 14-9-1 8-4 14-9 14-1.6 0-3-.7-4-1.8M2 22c4-5 8-9 13-13"/>,
  Sparkle: (p) => <Icon {...p}><path d="M12 3v18M3 12h18"/><path d="M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" strokeOpacity=".55"/></Icon>,
  Compass: (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.83 5.66-5.66 2.83 2.83-5.66Z"/></Icon>,
  Shield:  (p) => <Icon {...p} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>,
  Wind:    (p) => <Icon {...p} d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>,
  Sun:     (p) => <Icon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></Icon>,
  Moon:    (p) => <Icon {...p} d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>,
  Users:   (p) => <Icon {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></Icon>,
  Mail:    (p) => <Icon {...p}><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m22 6-10 7L2 6"/></Icon>,
  ArrowL:  (p) => <Icon {...p} d="M19 12H5M12 19l-7-7 7-7"/>,
  Check:   (p) => <Icon {...p} d="M20 6 9 17l-5-5"/>,
  Menu:    (p) => <Icon {...p} d="M3 6h18M3 12h18M3 18h18"/>,
  X:       (p) => <Icon {...p} d="M18 6 6 18M6 6l12 12"/>,
  Pin:     (p) => <Icon {...p}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z"/><circle cx="12" cy="10" r="3"/></Icon>,
  Tv:      (p) => <Icon {...p}><rect x="2" y="7" width="20" height="13" rx="2"/><path d="m17 2-5 5-5-5"/></Icon>,
  Book:    (p) => <Icon {...p} d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15ZM4 19.5A2.5 2.5 0 0 0 6.5 22H20M8 7h8M8 11h6"/>,
  Quote:   (p) => <Icon {...p}><path d="M3 21c3-2 5-5 5-9V5H3v7h4c0 4-2 7-4 9Zm10 0c3-2 5-5 5-9V5h-5v7h4c0 4-2 7-4 9Z"/></Icon>,
  Tea:     (p) => <Icon {...p}><path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v3M10 2v3M14 2v3"/></Icon>,
};

// Hand-drawn underline
const Scribble = ({ color = "#a9583e" }) => (
  <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
    <path d="M2 8 C 40 2, 80 10, 120 6 S 180 4, 198 8"
          fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
  </svg>
);

// (background motif removed per feedback — keep design clean)

// ─────────────────────────────────────────────────────────────────────────────
// Contact info — updated per source doc
// ─────────────────────────────────────────────────────────────────────────────
const CONTACT = {
  phone:       "052-4250242",
  phoneRaw:    "972524250242",
  email:       "maytaloz@gmail.com",
  facebookUrl: "https://www.facebook.com/",
  facebookLabel: "מיטל עוז, M.A — פסיכותרפיסטית",
  whatsappMsg: "היי מיטל, אשמח להתייעץ איתך",
  location:    "קליניקה במרכז תל אביב · מפגשים פרונטליים ובזום",
  tvUrl:       "https://13tv.co.il/item/special/recommended/health-2/meitaloz-902508561/",
};
const waHref  = `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(CONTACT.whatsappMsg)}`;
const telHref = `tel:+${CONTACT.phoneRaw}`;
const PHOTO   = "assets/meital.jpg";

// ─────────────────────────────────────────────────────────────────────────────
// Tweak defaults
// ─────────────────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headline": "warm-personal",
  "ctaText": "בואי נדבר",
  "palette": ["#cc785c","#9FA383","#F7F1E3"],
  "displayFont": "Frank Ruhl Libre",
  "showStickyDesktopBar": true,
  "openingQuote": "frankl"
}/*EDITMODE-END*/;

// ─────────────────────────────────────────────────────────────────────────────
// Reveal — already visible (safe fallback)
// ─────────────────────────────────────────────────────────────────────────────
const Reveal = ({ children, className = "", as: As = "div", ...rest }) => (
  <As className={`fade-in show ${className}`} {...rest}>{children}</As>
);

// ─────────────────────────────────────────────────────────────────────────────
// Top nav
// ─────────────────────────────────────────────────────────────────────────────
function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const ids = ["about", "approach", "clinics", "thoughts", "contact"];
      const y = window.scrollY + 140;
      let cur = "hero";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about",    label: "אודות" },
    { href: "#approach", label: "הגישה הטיפולית" },
    { href: "#clinics",  label: "הקליניקות" },
    { href: "#thoughts", label: "מחשבות על..." },
    { href: "#contact",  label: "יצירת קשר" },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-30 transition-all duration-300 ${
      scrolled ? "bg-cream/92 backdrop-blur-md border-b border-[#e3d6c2]" : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-[76px] flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3" aria-label="מיטל עוז">
          <span className={`w-11 h-11 rounded-full overflow-hidden ring-2 transition-colors ${scrolled ? "ring-terra-soft" : "ring-cream/60"}`}>
            <img src={PHOTO} alt="" className="w-full h-full object-cover"/>
          </span>
          <span className="leading-tight">
            <span className={`block font-serif font-medium text-[18px] transition-colors ${scrolled ? "text-ink" : "text-cream"}`}>מיטל עוז</span>
            <span className={`block text-[11px] tracking-[0.18em] transition-colors ${scrolled ? "text-ink-mute" : "text-cream/80"}`}>פסיכותרפיסטית · M.A</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-[15px]">
          {links.map((l) => (
            <a key={l.href} href={l.href}
               className={`nav-link transition ${
                 scrolled
                   ? (active === l.href.slice(1) ? "active text-ink font-medium" : "text-ink-soft hover:text-ink")
                   : (active === l.href.slice(1) ? "active text-cream font-medium" : "text-cream/85 hover:text-cream")
               }`}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href={waHref} target="_blank" rel="noreferrer"
           className={`hidden md:inline-flex btn text-[14px] py-2.5 ${
             scrolled ? "btn-primary" : "bg-white/15 hover:bg-white/25 text-cream border border-cream/40 backdrop-blur-sm"
           }`}>
          <I.Whatsapp size={15} stroke={0}/> דברו איתי
        </a>

        <button className={`md:hidden p-2 -mr-2 ${scrolled ? "text-ink" : "text-cream"}`}
                onClick={() => setMobileOpen((s) => !s)} aria-label="תפריט">
          {mobileOpen ? <I.X /> : <I.Menu />}
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-[max-height] duration-300 bg-cream/95 backdrop-blur-md border-b border-[#e3d6c2]
        ${mobileOpen ? "max-h-96" : "max-h-0"}`}>
        <nav className="flex flex-col px-6 py-2">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
               className="py-3 border-b border-[#e3d6c2] last:border-0 text-ink-soft">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Nature banner — slim forest header strip (yehudittherapy style)
// ─────────────────────────────────────────────────────────────────────────────
function NatureBanner() {
  return (
    <section id="hero" className="relative w-full h-[260px] md:h-[300px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2400&q=70"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 60%" }}
      />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, rgba(40,34,28,.40) 0%, rgba(40,34,28,.25) 60%, rgba(247,241,227,.85) 100%)"
      }}/>

      <div className="relative h-full max-w-6xl mx-auto px-5 md:px-8 flex items-end pb-7 md:pb-10">
        <div className="w-full flex items-end justify-between gap-6">
          {/* Right (RTL start): name + title */}
          <div className="text-cream">
            <h1 className="font-serif font-medium tracking-tight leading-none text-[36px] sm:text-[46px] md:text-[56px]">
              מיטל עוז
            </h1>
            <p className="font-serif italic mt-2 text-[15px] sm:text-[17px] md:text-[20px] text-cream/90">
              פסיכותרפיסטית · קרימינולוגית <span dir="ltr">M.A</span>
            </p>
          </div>
          {/* Left: compact contact icons */}
          <div className="hidden sm:flex items-center gap-2">
            <a href={telHref} aria-label="טלפון"
               className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-terra-deep grid place-items-center transition shadow-sm">
              <I.Phone size={16}/>
            </a>
            <a href={waHref} target="_blank" rel="noreferrer" aria-label="WhatsApp"
               className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#1fb558] grid place-items-center transition shadow-sm">
              <I.Whatsapp size={16} stroke={0}/>
            </a>
            <a href={CONTACT.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook"
               className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#1877F2] grid place-items-center transition shadow-sm">
              <I.Facebook size={18} stroke={0}/>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero — quiet personal intro that lives below the banner
function Hero({ headline, ctaText, openingQuote }) {
  const variants = {
    "warm-personal": {
      kicker: "פסיכותרפיה קיומית · בגובה העיניים",
      h1:     "כאן בשבילך, ברגעים הקשים כאחד.",
      sub:    "פסיכותרפיסטית וקרימינולוגית M.A, מתמחה בפסיכותרפיה קיומית-אקזיסטנציאליסטית ובטיפול בהתמכרויות. אני מלווה צעירים ומבוגרים במשברי חיים, בתחושת תקיעות, בחרדה, בבדידות ובחיפוש אחר משמעות.",
    },
    "space-to-breathe": {
      kicker: "מרחב להקשבה · להתבוננות · לצמיחה",
      h1:     "יש מקום לנשום.",
      sub:    "טיפול נפשי שאינו מתיימר ל׳תקן׳ אותך, אלא לפגוש אותך. בגישה הקיומית, ביחד נתבונן בקשר שבין הסיפור שלך, הערכים שלך, והמקום שאליו הגעת — ונבנה דרך משם, בקצב שלך.",
    },
    "soft-strength": {
      kicker: "להחזיק במושכות החיים · צעד-צעד",
      h1:     "הכאב שלך אמיתי. וגם הדרך החוצה.",
      sub:    "מאמינה בטיפול בגובה העיניים, מחובר למציאות היום-יומית. ביחד נמפה את הקושי, נכיר במורכבותו, ונחפש את הדרכים שלך — שלך בלבד — לחיות עם יותר חופש, יותר חיבור, ויותר נשימה.",
    },
  };
  const v = variants[headline] || variants["warm-personal"];

  const quotes = {
    frankl: {
      text: "אפשר ליטול מאיתנו כמעט הכל, חוץ מדבר אחד: את החופש להחליט כיצד להגיב למצבי החיים שלנו.",
      who:  "ויקטור פראנקל",
    },
    yalom: {
      text: "הקשר האנושי בין המטפל למטופל הוא ליבת הטיפול — מסע אל תוך עצמך, ואינך לבד בו.",
      who:  "אירווין יאלום",
    },
  };
  const q = quotes[openingQuote] || quotes.frankl;

  return (
    <section id="intro" className="relative pt-14 md:pt-20 pb-20 md:pb-28">
      <div className="relative max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-10 md:gap-14 items-center">
        {/* text */}
        <div className="md:col-span-7 order-2 md:order-1">
          <Reveal>
            <div className="text-[12px] tracking-[0.22em] uppercase text-terra-deep font-semibold mb-5">
              {v.kicker}
            </div>
            <h2 className="font-serif text-ink text-[32px] sm:text-[40px] md:text-[48px] leading-[1.15] tracking-tight font-medium">
              {v.h1}
            </h2>
            <p className="mt-6 text-[17px] md:text-[18px] text-ink-soft leading-[1.9] max-w-[58ch] font-light">
              {v.sub}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={waHref} target="_blank" rel="noreferrer" className="btn btn-primary">
                <I.Whatsapp size={17} stroke={0}/> {ctaText}
              </a>
              <a href="#about" className="btn btn-ghost">
                קצת עליי <I.ArrowL size={15} stroke={2}/>
              </a>
            </div>
          </Reveal>
        </div>

        {/* photo */}
        <div className="md:col-span-5 order-1 md:order-2">
          <Reveal>
            <div className="relative w-[260px] sm:w-[320px] md:w-full max-w-[400px] aspect-[4/5] mx-auto">
              <div className="absolute inset-0 overflow-hidden rounded-[28px]"
                   style={{ boxShadow: "0 30px 60px -30px rgba(61,46,38,.30)" }}>
                <img src={PHOTO} alt="מיטל עוז, פסיכותרפיסטית"
                     className="w-full h-full object-cover"
                     style={{ objectPosition: "center 28%" }}/>
              </div>
              <div className="absolute -bottom-5 -right-3 md:-right-8 bg-white border border-[#ece1cb] rounded-2xl px-5 py-3.5 max-w-[260px] shadow-soft">
                <p className="font-serif text-[14px] leading-snug text-ink italic">
                  ״{q.text}״
                </p>
                <div className="mt-1.5 text-[11px] text-ink-mute">— {q.who}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Specialties — editorial, no boxes
// ─────────────────────────────────────────────────────────────────────────────
function SpecialtiesStrip() {
  const items = [
    { icon: <I.Heart/>,  label: "משברי חיים",       sub: "תקיעות · בדידות · אובדן · מעברים" },
    { icon: <I.Wind/>,   label: "חרדה ודיכאון",      sub: "מצוקה רגשית מתמשכת" },
    { icon: <I.Shield/>, label: "התמכרויות",         sub: "התמחות מקצועית · ליווי בני משפחה" },
    { icon: <I.Users/>,  label: "טראומה ויחסים",     sub: "זוגיות · משפחה · אובדן" },
  ];
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* faint sage wash, no panel */}
      <div className="absolute inset-0 -z-0"
           style={{ background: "linear-gradient(180deg, transparent 0%, rgba(207,210,185,.18) 50%, transparent 100%)" }}/>

      <div className="relative max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <div className="eyebrow justify-center flex mb-5">תחומי טיפול</div>
            <h2 className="font-serif text-ink text-[36px] md:text-[46px] leading-[1.12] font-medium tracking-tight">
              המקומות שבהם<br className="md:hidden"/>{" "}
              <span className="text-terra-deep italic">אני יושבת מולך.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 gap-x-6 md:gap-x-8">
          {items.map((it, i) => (
            <Reveal key={i}>
              <div className="relative md:px-6 first:md:pr-0 last:md:pl-0
                              md:border-l md:border-[#e3d6c2] md:last:border-l-0 text-center md:text-right">
                <div className="text-sage-deep mb-5 flex md:justify-start justify-center">
                  {React.cloneElement(it.icon, { size: 28, stroke: 1.4 })}
                </div>
                <div className="font-serif text-ink text-[20px] md:text-[24px] font-medium leading-tight">
                  {it.label}
                </div>
                <div className="mt-2.5 text-[14px] text-ink-mute font-light leading-[1.6]">
                  {it.sub}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// About — full new bio from source doc
// ─────────────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-10 md:gap-16">
        {/* portrait */}
        <div className="md:col-span-5">
          <Reveal>
            <div className="md:sticky md:top-28">
              <div className="relative w-[260px] sm:w-[320px] md:w-full max-w-[380px] aspect-[4/5] mx-auto">
                <div className="absolute inset-0 overflow-hidden rounded-[24px]">
                  <img src={PHOTO} alt="מיטל עוז" className="w-full h-full object-cover"
                       style={{ objectPosition: "center 22%" }}/>
                </div>
                <div className="absolute -bottom-6 right-0 bg-white border border-[#ece1cb] rounded-2xl px-4 py-3 shadow-soft flex items-center gap-3">
                  <I.Tea size={20} className="text-terra-deep"/>
                  <div>
                    <div className="font-serif text-ink text-[14px]">מקבלת מטופלים חדשים</div>
                    <div className="text-[11px] text-ink-mute">פגישת היכרות לתיאום ציפיות</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* text */}
        <div className="md:col-span-7">
          <Reveal>
            <div className="eyebrow mb-5">אודות</div>
            <h2 className="font-serif text-ink text-[40px] md:text-[54px] leading-[1.08] font-medium tracking-tight">
              שמי מיטל עוז.<br/>
              <span className="text-terra-deep italic">פסיכותרפיסטית וקרימינולוגית M.A.</span>
            </h2>

            <div className="mt-7 space-y-5 text-[17px] leading-[1.9] text-ink-soft font-light">
              <p>
                בעלת תואר ראשון במדעי ההתנהגות, ובוגרת תואר שני טיפולי בקרימינולוגיה
                שיקומית בהצטיינות, עם התמחות בטיפול בהתמכרויות. מוסמכת התכנית התלת-שנתית
                בפסיכותרפיה וייעוץ אקזיסטנציאליסטי.
              </p>
              <p>
                כחלק מההתפתחות האישית והמקצועית שלי, התמקצעתי בלימודי בודהיזם, מיינדפולנס,
                חמלה עצמית ו-ACT — ואלה תופסים מקום מרכזי באופן שבו אני יושבת מול אנשים בחדר.
              </p>
              <p>
                אני מטפלת פרטית בקליניקה במרכז תל אביב, ובמכון לטיפול בהתמכרויות. במסגרת
                תפקידי כמטפלת, אני עובדת עם צעירים ומבוגרים המתמודדים עם אתגרים קיומיים
                שונים: דכאון, חרדה, תחושת תקיעות, התמכרויות, טראומה, בדידות, קשיים בזוגיות
                או במשפחה, מוות או מחלה של אדם קרוב, ועוד.
              </p>
              <p className="font-serif italic text-ink text-[20px] leading-[1.7] pr-5 border-r-2 border-terra/40">
                אני מאמינה שטיפול רגשי צריך להיות בגובה העיניים, ומחובר למציאות היום-יומית.
                לא לתקן — ללוות. לא להעמיד את המטפלת על במה — לשבת לצידך, ולקחת נשימה איתך.
              </p>
            </div>

            {/* credentials grid */}
            <div className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {[
                "B.A במדעי ההתנהגות",
                "M.A טיפולי בקרימינולוגיה שיקומית (בהצטיינות)",
                "תכנית תלת-שנתית · פסיכותרפיה אקזיסטנציאליסטית",
                "התמחות בטיפול בהתמכרויות",
                "מיינדפולנס · חמלה עצמית · ACT",
                "חברה באיגוד הקרימינולוגים השיקומיים",
                "חברה בארגון הרב-תחומי לפסיכותרפיה",
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[14px] text-ink-soft">
                  <I.Leaf size={16} className="text-sage-deep mt-1 shrink-0"/>
                  <span>{c}</span>
                </div>
              ))}
            </div>

            {/* TV / press */}
            <Reveal>
              <a href={CONTACT.tvUrl} target="_blank" rel="noreferrer"
                 className="mt-10 inline-flex items-center gap-4 bg-white/70 hover:bg-white border border-[#ece1cb] rounded-3xl px-5 py-4 transition">
                <span className="w-11 h-11 rounded-full bg-rose-soft text-terra-deep grid place-items-center"><I.Tv size={20}/></span>
                <span>
                  <span className="block font-serif text-ink text-[16px]">בתקשורת · חדשות 13</span>
                  <span className="block text-[12px] text-ink-mute">לקריאת הכתבה →</span>
                </span>
              </a>
            </Reveal>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// What is a crisis — when to come for therapy
// ─────────────────────────────────────────────────────────────────────────────
function WhenToCome() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 -z-0"
           style={{ background: "linear-gradient(180deg, transparent 0%, rgba(207,210,185,.18) 50%, transparent 100%)" }}/>
      <div className="relative max-w-4xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="text-center">
            <div className="eyebrow justify-center flex mb-5">מתי כדאי לפנות לטיפול?</div>
            <h2 className="font-serif text-ink text-[36px] md:text-[48px] leading-[1.1] font-medium tracking-tight">
              אין סיבה לא נכונה,
              <br/>
              <span className="text-terra-deep italic">או זמן לא נכון.</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 space-y-6 text-[17px] md:text-[18px] leading-[1.9] text-ink-soft font-light max-w-2xl mx-auto">
            <p>
              משבר יכול להיות תחושה או הרגשה שזרים לכם: שינוי שהתרחש בחיים, בזוגיות, במשפחה,
              בקריירה. צומת שאתם מרגישים תקועים בה. שגרה שוחקת. הרגל שלא עושה לכם טוב.
            </p>
            <p>
              כל תחושת מצוקה או חוסר אונים יכולה להיות סיבה לפנות לסיוע — בין אם אנחנו יודעים
              מאיפה היא מגיעה, ובין אם לא. לעיתים גם אירועים שנראים לנו שוליים, יכולים להיות
              סיבה לפנות לטיפול.
            </p>
            <p className="text-ink font-serif italic text-[20px] leading-[1.75]">
              טיפול נכון ומותאם אישית מספק לנו כלים להתבוננות פנימית מיטיבה, מאפשר למצוא
              את דרכי ההתמודדות הנכונות עבורנו — ואף לצמוח מתוך הקשיים שלנו.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Approach — מהי פסיכותרפיה אקזיסטנציאליסטית
// ─────────────────────────────────────────────────────────────────────────────
function Approach() {
  const pillars = [
    {
      h: "בגובה העיניים",
      d: "טיפול שלא ׳מאבחן׳ אותך מלמעלה. הגישה הקיומית מאמינה שכולנו חשופים לאתגרי הקיום — חרדה, בדידות, תקיעות, דכאון — ושלכל אחד יש דרך התמודדות שונה. אני יושבת מולך, לא מעלייך.",
      icon: <I.Sun size={22}/>,
    },
    {
      h: "הקשר הוא הריפוי",
      d: "בבסיס הטיפול נמצא הקשר האנושי בין המטפלת למטופל. אני מלווה אותך במסע אל תוך עצמך — מסע שעלול להיות לא קל, אבל אתה לא לבד בו. צוללת איתך לתחושות, מחזקת, מציעה עוד נקודות מבט.",
      icon: <I.Heart size={22}/>,
    },
    {
      h: "מרחב לדבר בחופשיות",
      d: "כשניתן לנו מרחב לבטא את רגשותינו — גם המאיימים ביותר — אנחנו מרגישים הקלה ופורקן. וכשהמרחב הזה לא קיים, פעם אחר פעם, בדידות קשה יכולה להציף אותנו.",
      icon: <I.Wind size={22}/>,
    },
    {
      h: "בקצב שלך",
      d: "הכי חשוב, אני נמצאת לצידך בקצב שלך. הגישה מתאימה למי שמרגיש חרדה, דכאון, תקיעות או בדידות — ולמי שמרגיש שאיפשהו במהלך השגרה הכיוון נאבד, ומחפש את הדרך חזרה, או דרך חדשה.",
      icon: <I.Compass size={22}/>,
    },
  ];
  return (
    <section id="approach" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-0"
           style={{ background: "linear-gradient(180deg, transparent 0%, rgba(241,216,201,.30) 30%, rgba(207,210,185,.20) 70%, transparent 100%)" }}/>

      <div className="relative max-w-5xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="eyebrow justify-center flex mb-5">הגישה הטיפולית</div>
            <h2 className="font-serif text-ink text-[40px] md:text-[56px] leading-[1.08] font-medium tracking-tight">
              פסיכותרפיה
              <br/>
              <span className="text-terra-deep italic">אקזיסטנציאליסטית.</span>
            </h2>
            <p className="mt-6 text-[18px] text-ink-soft leading-[1.85] font-light">
              גישה טיפולית המאמינה כי החיים מהווים אתגר עבור כולנו — וכי תחושות של דכאון,
              בדידות, תקיעות וחרדה, הן חלק מהתנאי האנושי. הטיפול לא בא ׳לפתור׳ אותך, אלא
              ללוות אותך בתוך זה — וגם דרך זה.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 space-y-6">
          {pillars.map((p, i) => (
            <Reveal key={i}>
              <div className="relative grid md:grid-cols-12 gap-6 md:gap-10 items-start py-8 md:py-10 border-b border-[#e3d6c2] last:border-0">
                <div className="md:col-span-4 flex items-center gap-5">
                  <div className="relative inline-block">
                    <span className="font-serif text-[64px] md:text-[80px] leading-none text-terra-soft/80 italic font-medium">
                      0{i+1}
                    </span>
                    <span className="absolute -top-1 -left-2 md:-top-2 md:-left-3 w-8 h-8 md:w-11 md:h-11 rounded-full bg-rose-soft text-terra-deep grid place-items-center">
                      {React.cloneElement(p.icon, { size: 16 })}
                    </span>
                  </div>
                </div>
                <div className="md:col-span-8">
                  <h3 className="font-serif text-ink text-[26px] md:text-[32px] font-medium leading-tight">{p.h}</h3>
                  <p className="mt-3 text-[17px] text-ink-soft leading-[1.85] font-light max-w-[60ch]">{p.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="relative mt-16 md:mt-24 max-w-2xl mx-auto text-center">
            <p className="font-serif text-[22px] md:text-[28px] leading-[1.55] text-ink italic font-medium">
              החרדה הזו אינה הופכת אותך
              <br className="hidden md:block"/>
              לחולה, שונה או משוגע —
              <br className="hidden md:block"/>
              <span className="text-terra-deep">פשוט בן אדם.</span>
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="w-9 h-9 rounded-full overflow-hidden">
                <img src={PHOTO} alt="" className="w-full h-full object-cover"/>
              </span>
              <span className="text-[13px] text-ink-mute tracking-wider">— מיטל</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Two clinics — editorial image/text blocks, alternating
// ─────────────────────────────────────────────────────────────────────────────
function Clinics() {
  const list = [
    {
      kicker: "קליניקה פרטית",
      title:  "מרכז תל אביב",
      desc:   "מפגש דיאלוגי, אחד-על-אחד, של שעה תמימה — דיסקרטי, חם, ובקצב שלך. מתאים לטיפול ארוך-טווח, ייעוץ ממוקד, או מסע מתמשך של התבוננות פנימית.",
      bullets: ["מפגשים פרונטליים", "מפגשים בזום", "פגישת היכרות לתיאום ציפיות"],
      image:  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=70",
      imageAlt: "פינת ישיבה רגועה בקליניקה",
      tone:  "cream",
    },
    {
      kicker: "מכון לטיפול בהתמכרויות",
      title:  "טיפול ייעודי בהתמכרויות",
      desc:   "במסגרת תפקידי במכון, אני מלווה אנשים בעיצומו של מאבק עם אלכוהול, סמים והתנהגויות כפייתיות — ובני משפחה שנפגעו ביחד איתם. ניסיון מצטבר ועבודה במסגרת מקצועית מובנית.",
      bullets: ["טיפול ממוקד התמכרויות", "ליווי בני משפחה", "עבודה בצוות רב-מקצועי"],
      image:  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=70",
      imageAlt: "אור רך בין עלים",
      tone:  "sage",
    },
  ];
  return (
    <section id="clinics" className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <div className="eyebrow justify-center flex mb-5">היכן נפגשים</div>
            <h2 className="font-serif text-ink text-[40px] md:text-[54px] leading-[1.08] font-medium tracking-tight">
              שתי מסגרות,<br/>
              <span className="text-terra-deep italic">אותו קשב.</span>
            </h2>
          </div>
        </Reveal>

        <div className="space-y-20 md:space-y-28">
          {list.map((c, i) => (
            <Reveal key={i}>
              <div className="grid md:grid-cols-12 gap-8 md:gap-14 items-center">
                {/* image */}
                <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="relative">
                    <div className={`absolute -inset-4 md:-inset-6 -z-10 rounded-[36px] ${
                      c.tone === "cream" ? "bg-[#f1d8c9]/40" : "bg-sage-mist/60"
                    }`}/>
                    <div className="relative overflow-hidden rounded-[24px] aspect-[5/4] md:aspect-[16/11]">
                      <img src={c.image} alt={c.imageAlt} loading="lazy"
                           className="w-full h-full object-cover"/>
                    </div>
                  </div>
                </div>

                {/* text */}
                <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className={`text-[12px] tracking-[0.18em] uppercase font-semibold mb-3 ${
                    c.tone === "cream" ? "text-terra-deep" : "text-sage-deep"
                  }`}>
                    {c.kicker}
                  </div>
                  <h3 className="font-serif text-ink text-[34px] md:text-[44px] font-medium leading-[1.1] tracking-tight">
                    {c.title}
                  </h3>
                  <p className="mt-5 text-[17px] text-ink-soft leading-[1.9] font-light">
                    {c.desc}
                  </p>
                  <ul className="mt-7 space-y-3">
                    {c.bullets.map((b, j) => (
                      <li key={j} className="flex items-center gap-3 text-[15px] text-ink">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          c.tone === "cream" ? "bg-terra" : "bg-sage-deep"
                        }`}/>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Thoughts — Maytal's writing (4 short essays)
// ─────────────────────────────────────────────────────────────────────────────
function Thoughts() {
  const [openId, setOpenId] = useState(null);
  const articles = (typeof window !== "undefined" && window.ARTICLES) || [];
  const stripRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = () => {
    const el = stripRef.current;
    if (!el) return;
    // RTL: scrollLeft goes 0 → -maxScroll
    const sl = el.scrollLeft;
    const max = el.scrollWidth - el.clientWidth;
    const atStart = Math.abs(sl) < 4;
    const atEnd   = Math.abs(sl) >= max - 4;
    setCanPrev(!atStart);
    setCanNext(!atEnd && max > 4);
  };
  useEffect(() => {
    updateArrows();
    const el = stripRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [articles.length]);

  const scrollBy = (dir) => {
    const el = stripRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const step = card ? card.getBoundingClientRect().width + 24 : 320;
    // RTL: dir=1 (next) means scroll towards more-negative scrollLeft
    el.scrollBy({ left: dir * -step, behavior: "smooth" });
  };

  useEffect(() => {
    if (openId) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [openId]);

  const article = articles.find(a => a.id === openId);

  return (
    <section id="thoughts" className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
            <div className="max-w-xl">
              <div className="eyebrow mb-4">מחשבות על...</div>
              <h2 className="font-serif text-ink text-[34px] md:text-[44px] leading-[1.1] font-medium tracking-tight">
                דרכי התמודדות,
                <span className="text-terra-deep italic"> מילים מהחדר.</span>
              </h2>
            </div>
            {/* arrows — horizontal carousel nav */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button onClick={() => scrollBy(-1)} disabled={!canPrev} aria-label="הקודם"
                      className="w-11 h-11 rounded-full border border-[#ece1cb] bg-white grid place-items-center text-ink-soft hover:text-ink hover:bg-cream-2 disabled:opacity-30 disabled:cursor-not-allowed transition">
                {/* chevron right (back in RTL) */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
              <button onClick={() => scrollBy(1)} disabled={!canNext} aria-label="הבא"
                      className="w-11 h-11 rounded-full border border-[#ece1cb] bg-white grid place-items-center text-ink-soft hover:text-ink hover:bg-cream-2 disabled:opacity-30 disabled:cursor-not-allowed transition">
                {/* chevron left (forward in RTL) */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
            </div>
          </div>
        </Reveal>

        {/* horizontal carousel */}
        <div
          ref={stripRef}
          className="thoughts-strip flex gap-5 md:gap-6 overflow-x-auto pb-6 -mx-5 md:-mx-8 px-5 md:px-8 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {articles.map((a) => (
            <article
              key={a.id}
              data-card
              onClick={() => setOpenId(a.id)}
              className="group relative shrink-0 snap-start w-[280px] sm:w-[320px] md:w-[330px]
                         bg-white border border-[#ece1cb] rounded-[20px] overflow-hidden flex flex-col
                         transition hover:-translate-y-0.5 hover:shadow-lift cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden bg-sage-mist">
                <img src={a.image} alt={a.imageAlt || ""} loading="lazy"
                     className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03]"/>
              </div>
              <div className="flex-1 flex flex-col p-6">
                <div className="text-[11px] tracking-[0.18em] uppercase text-terra-deep font-semibold mb-2">
                  {a.kicker}
                </div>
                <h3 className="font-serif text-ink text-[22px] font-medium leading-[1.2] tracking-tight min-h-[3.2em]">
                  {a.title}
                </h3>
                <p className="mt-3 text-[14.5px] text-ink-soft leading-[1.7] font-light line-clamp-3 flex-1">
                  {a.lead}
                </p>
                <div className="mt-5 pt-4 border-t border-[#ece1cb] flex items-center justify-between">
                  <span className="text-[12px] text-ink-mute font-serif italic">{(a.paragraphs?.length || 0)} פסקאות</span>
                  <span className="text-[13px] font-medium text-terra-deep flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    קראו עוד <I.ArrowL size={13} stroke={2}/>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article reader modal */}
      {article && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setOpenId(null)}/>
          <div className="relative min-h-full flex items-start justify-center p-4 md:p-10">
            <div className="relative w-full max-w-3xl bg-cream rounded-[28px] shadow-lift border border-[#ece1cb] overflow-hidden">
              <button onClick={() => setOpenId(null)}
                      className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 border border-[#ece1cb] text-ink-soft hover:text-ink hover:bg-white grid place-items-center z-10"
                      aria-label="סגירה">
                <I.X size={18}/>
              </button>
              {article.image && (
                <div className="relative aspect-[16/9] md:aspect-[2/1] overflow-hidden bg-sage-mist">
                  <img src={article.image} alt={article.imageAlt || ""} className="w-full h-full object-cover"/>
                  <div className="absolute inset-x-0 bottom-0 h-1/3"
                       style={{ background:"linear-gradient(180deg, transparent, rgba(247,241,227,.85))"}}/>
                </div>
              )}
              <div className="px-6 md:px-14 py-10 md:py-14">
                <div className="text-[12px] tracking-[0.16em] uppercase text-terra-deep font-semibold mb-3">
                  {article.kicker}
                </div>
                <h2 className="font-serif text-ink text-[32px] md:text-[44px] leading-[1.1] font-medium tracking-tight">
                  {article.title}
                </h2>
                <p className="mt-6 font-serif italic text-[20px] md:text-[22px] leading-[1.6] text-ink-soft pr-5 border-r-2 border-terra/40">
                  {article.lead}
                </p>
                <div className="mt-8 space-y-5 text-[17px] leading-[1.95] text-ink-soft font-light">
                  {article.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                {article.sources && article.sources.length > 0 && (
                  <div className="mt-10 pt-6 border-t border-[#e3d6c2]">
                    <div className="eyebrow mb-4">מקורות</div>
                    <ul className="space-y-1.5 text-[14px] text-ink-mute leading-[1.7]">
                      {article.sources.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                )}
                {article.extra && (
                  <a href={article.extra.href} target="_blank" rel="noreferrer"
                     className="mt-8 inline-flex items-center gap-3 bg-white border border-[#ece1cb] rounded-2xl px-5 py-3 hover:bg-cream-2 transition">
                    <I.Book size={18} className="text-terra-deep"/>
                    <span className="text-[14px] text-ink">{article.extra.label}</span>
                    <I.ArrowL size={14} stroke={2} className="text-ink-mute"/>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact form — updated info
// ─────────────────────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name:"", phone:"", topic:"", message:"", prefer:"whatsapp", consent:true });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm(f => ({...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value}));
  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "אשמח לדעת איך לפנות אליך";
    if (!/^[\d\s+\-()]{8,}$/.test(form.phone.trim())) e.phone = "מספר טלפון לא נראה תקין";
    if (form.message.trim().length < 5) e.message = "כתבו משפט קצר ואחזור אליכם";
    if (!form.consent) e.consent = "אני צריכה את האישור שלכם כדי לחזור אליכם";
    return e;
  };
  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setSent(true);
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-0"
           style={{ background:"linear-gradient(180deg, rgba(241,216,201,.35) 0%, rgba(247,241,227,1) 100%)"}}/>

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-10 md:gap-14 items-start">
        {/* invitation */}
        <div className="md:col-span-5">
          <Reveal>
            <div className="eyebrow mb-5">יצירת קשר</div>
            <h2 className="font-serif text-ink text-[40px] md:text-[54px] leading-[1.05] font-medium tracking-tight">
              אני כאן<br/>
              <span className="text-terra-deep italic">בשבילך.</span><br/>
              מוזמנים להתייעץ.
            </h2>
            <p className="mt-5 text-[17px] text-ink-soft leading-[1.85] font-light max-w-md">
              לא חייבים לדעת בדיוק מה רוצים להגיד. אפשר להתחיל ב״היי, נתקעתי״ — וניקח משם.
            </p>

            <div className="mt-8 space-y-3">
              <a href={waHref} target="_blank" rel="noreferrer"
                 className="flex items-center justify-between gap-3 bg-white/70 border border-[#ece1cb] rounded-3xl px-5 py-4 hover:bg-white transition">
                <span className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-[#25D366] text-white grid place-items-center"><I.Whatsapp size={18} stroke={0}/></span>
                  <span>
                    <span className="block font-serif text-ink text-[16px]">WhatsApp</span>
                    <span className="block text-[12px] text-ink-mute">הדרך הכי נוחה אליי</span>
                  </span>
                </span>
                <I.ArrowL size={18} className="text-ink-mute"/>
              </a>
              <a href={telHref}
                 className="flex items-center justify-between gap-3 bg-white/70 border border-[#ece1cb] rounded-3xl px-5 py-4 hover:bg-white transition">
                <span className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-terra text-white grid place-items-center"><I.Phone size={18}/></span>
                  <span>
                    <span className="block font-serif text-ink text-[16px]" dir="ltr">{CONTACT.phone}</span>
                    <span className="block text-[12px] text-ink-mute">שיחה ישירה · גם בוואטסאפ</span>
                  </span>
                </span>
                <I.ArrowL size={18} className="text-ink-mute"/>
              </a>
              <a href={`mailto:${CONTACT.email}`}
                 className="flex items-center justify-between gap-3 bg-white/70 border border-[#ece1cb] rounded-3xl px-5 py-4 hover:bg-white transition">
                <span className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-sage-deep text-white grid place-items-center"><I.Mail size={18}/></span>
                  <span>
                    <span className="block font-serif text-ink text-[16px]">{CONTACT.email}</span>
                    <span className="block text-[12px] text-ink-mute">דוא״ל</span>
                  </span>
                </span>
                <I.ArrowL size={18} className="text-ink-mute"/>
              </a>
              <a href={CONTACT.facebookUrl} target="_blank" rel="noreferrer"
                 className="flex items-center justify-between gap-3 bg-white/70 border border-[#ece1cb] rounded-3xl px-5 py-4 hover:bg-white transition">
                <span className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-[#1877F2] text-white grid place-items-center"><I.Facebook size={20} stroke={0}/></span>
                  <span>
                    <span className="block font-serif text-ink text-[16px]">{CONTACT.facebookLabel}</span>
                    <span className="block text-[12px] text-ink-mute">עמוד הפייסבוק</span>
                  </span>
                </span>
                <I.ArrowL size={18} className="text-ink-mute"/>
              </a>
            </div>
          </Reveal>
        </div>

        {/* form */}
        <div className="md:col-span-7">
          <Reveal>
            <div className="warm-card border border-[#ece1cb] p-6 md:p-10 shadow-soft">
              {!sent ? (
                <form onSubmit={onSubmit} noValidate>
                  <h3 className="font-serif text-ink text-[26px] font-medium mb-1">השאירו הודעה</h3>
                  <p className="text-[14px] text-ink-mute mb-7">פרטיכם יישארו בינינו בלבד.</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="block text-[13px] font-medium text-ink-soft mb-1.5">שם <span className="text-terra">*</span></span>
                      <input className={`field ${errors.name ? "invalid" : ""}`} type="text"
                             value={form.name} onChange={set("name")} placeholder="איך לפנות אליך?"/>
                      {errors.name && <span className="block text-[12px] text-terra-deep mt-1">{errors.name}</span>}
                    </label>
                    <label className="block">
                      <span className="block text-[13px] font-medium text-ink-soft mb-1.5">טלפון <span className="text-terra">*</span></span>
                      <input className={`field ${errors.phone ? "invalid" : ""}`} type="tel" dir="ltr"
                             value={form.phone} onChange={set("phone")} placeholder="050-0000000"/>
                      {errors.phone && <span className="block text-[12px] text-terra-deep mt-1">{errors.phone}</span>}
                    </label>
                  </div>

                  <label className="block mt-4">
                    <span className="block text-[13px] font-medium text-ink-soft mb-1.5">הנושא (לא חובה)</span>
                    <select className="field" value={form.topic} onChange={set("topic")}>
                      <option value="">בחרו נושא...</option>
                      <option>משבר חיים · תקיעות</option>
                      <option>חרדה ודיכאון</option>
                      <option>בדידות · חיפוש משמעות</option>
                      <option>התמכרויות</option>
                      <option>טראומה</option>
                      <option>קשיים בזוגיות / משפחה</option>
                      <option>אובדן · מחלה של אדם קרוב</option>
                      <option>אחר</option>
                    </select>
                  </label>

                  <label className="block mt-4">
                    <span className="block text-[13px] font-medium text-ink-soft mb-1.5">בכמה מילים, מה מביא אתכם? <span className="text-terra">*</span></span>
                    <textarea className={`field min-h-[120px] ${errors.message ? "invalid" : ""}`} rows={4}
                              value={form.message} onChange={set("message")}
                              placeholder="אפשר גם משפט קצר. אבין."/>
                    {errors.message && <span className="block text-[12px] text-terra-deep mt-1">{errors.message}</span>}
                  </label>

                  <div className="mt-5">
                    <span className="block text-[13px] font-medium text-ink-soft mb-2">איך נוח לכם שאחזור?</span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { v:"whatsapp", l:"וואטסאפ", icon:<I.Whatsapp size={14} stroke={0}/> },
                        { v:"phone",    l:"שיחה",    icon:<I.Phone size={14}/> },
                        { v:"email",    l:"אימייל",   icon:<I.Mail size={14}/> },
                      ].map(o => (
                        <button type="button" key={o.v}
                                onClick={() => setForm(f => ({...f, prefer:o.v}))}
                                className={`px-4 py-2 rounded-full border text-[14px] font-medium flex items-center gap-1.5 transition
                                  ${form.prefer === o.v
                                    ? "bg-terra text-white border-terra"
                                    : "bg-white border-[#ece1cb] text-ink-soft hover:bg-cream-2"}`}>
                          {o.icon} {o.l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="mt-6 flex items-start gap-3 text-[13px] text-ink-soft leading-relaxed cursor-pointer">
                    <input type="checkbox" className="mt-1 accent-[#cc785c]" checked={form.consent} onChange={set("consent")}/>
                    <span>אני מאשר/ת שתחזרי אליי לגבי פנייתי. פרטיי לא יישלחו לאף גורם נוסף.</span>
                  </label>
                  {errors.consent && <span className="block text-[12px] text-terra-deep mt-1">{errors.consent}</span>}

                  <button type="submit" className="btn btn-primary mt-7 w-full md:w-auto justify-center">
                    שליחה <I.ArrowL size={16} stroke={2}/>
                  </button>
                </form>
              ) : (
                <div className="py-6">
                  <div className="w-16 h-16 rounded-full bg-rose-soft text-terra-deep grid place-items-center mb-5">
                    <I.Check size={28} stroke={2.5}/>
                  </div>
                  <h3 className="font-serif text-ink text-[28px] font-medium mb-2">
                    תודה {form.name.trim().split(" ")[0]}
                  </h3>
                  <p className="text-[17px] text-ink-soft leading-[1.8] font-light max-w-md">
                    קיבלתי את ההודעה. אחזור אליכם בהקדם — לרוב ב{form.prefer === "whatsapp" ? "וואטסאפ" : form.prefer === "phone" ? "שיחה" : "אימייל"}.
                    בינתיים תנו לעצמכם את הזמן, נשמה.
                  </p>
                  <button onClick={() => { setSent(false); setForm({name:"",phone:"",topic:"",message:"",prefer:"whatsapp",consent:true});}}
                          className="btn btn-ghost mt-6">
                    שליחת פנייה נוספת
                  </button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-ink text-cream pb-32 md:pb-12 pt-16 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-terra/50">
              <img src={PHOTO} alt="" className="w-full h-full object-cover"/>
            </span>
            <span className="font-serif font-medium text-[20px]">מיטל עוז · M.A</span>
          </div>
          <p className="font-serif italic text-[18px] text-cream/80 leading-relaxed max-w-xs">
            ״טיפול רגשי בגובה העיניים, מחובר למציאות היום-יומית — ובקצב שלך.״
          </p>
        </div>
        <div>
          <div className="eyebrow !text-terra-soft mb-3">קישורים</div>
          <ul className="space-y-2 text-[15px] font-light">
            <li><a href="#about"    className="hover:text-terra-soft">אודות</a></li>
            <li><a href="#approach" className="hover:text-terra-soft">הגישה הטיפולית</a></li>
            <li><a href="#clinics"  className="hover:text-terra-soft">הקליניקות</a></li>
            <li><a href="#thoughts" className="hover:text-terra-soft">מחשבות על...</a></li>
            <li><a href="#contact"  className="hover:text-terra-soft">יצירת קשר</a></li>
            <li><a href={CONTACT.tvUrl} target="_blank" rel="noreferrer" className="hover:text-terra-soft">כתבה בחדשות 13 →</a></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow !text-terra-soft mb-3">פרטי קשר</div>
          <ul className="space-y-2 text-[15px] text-cream/90 font-light">
            <li className="flex items-center gap-2"><I.Phone size={14}/> <span dir="ltr">{CONTACT.phone}</span></li>
            <li className="flex items-center gap-2"><I.Whatsapp size={14} stroke={0}/> גם בוואטסאפ</li>
            <li className="flex items-center gap-2"><I.Mail  size={14}/> {CONTACT.email}</li>
            <li className="flex items-center gap-2"><I.Facebook size={14} stroke={0}/> {CONTACT.facebookLabel}</li>
            <li className="flex items-center gap-2"><I.Pin   size={14}/> {CONTACT.location}</li>
          </ul>
        </div>
      </div>
      <div className="relative max-w-6xl mx-auto px-5 md:px-8 mt-12 pt-6 border-t border-cream/15 text-[12px] text-cream/60 flex flex-wrap items-center justify-between gap-3">
        <span>© {new Date().getFullYear()} מיטל עוז · כל הזכויות שמורות</span>
        <span className="font-serif italic">״אנו אדונים לגורלנו ולא קורבנותיו.״ — פראנקל</span>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sticky CTA
// ─────────────────────────────────────────────────────────────────────────────
function StickyCTA({ ctaText, showDesktopBar }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className={`only-mobile cta-bubble transition-all duration-300 ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}>
        <a href={waHref} target="_blank" rel="noreferrer" aria-label="פנייה בוואטסאפ"
           className="blob-btn" style={{ background: "#25D366" }}>
          <I.Whatsapp size={26} stroke={0}/>
        </a>
        <a href={telHref} aria-label="חיוג" className="blob-btn" style={{ background: "#cc785c" }}>
          <I.Phone size={22}/>
        </a>
      </div>

      {showDesktopBar && (
        <div className={`only-desktop cta-bar transition-all duration-300 ${shown ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}>
          <div className="max-w-6xl mx-auto px-8 py-3.5 flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-terra-soft">
                <img src={PHOTO} alt="" className="w-full h-full object-cover"/>
              </span>
              <div className="leading-tight">
                <div className="font-serif text-ink text-[16px]">אני כאן בשבילך</div>
                <div className="text-[12px] text-ink-mute">מוזמנים להתייעץ — בדיסקרטיות מלאה</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a href={telHref} className="btn btn-ghost text-[14px] py-2.5"><I.Phone size={15}/> <span dir="ltr">{CONTACT.phone}</span></a>
              <a href={waHref} target="_blank" rel="noreferrer" className="btn btn-primary text-[14px] py-2.5"><I.Whatsapp size={15} stroke={0}/> {ctaText}</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const [terra, sage, cream] = t.palette || ["#cc785c","#9FA383","#F7F1E3"];
    const root = document.documentElement;
    root.style.setProperty("--terra", terra);
    root.style.setProperty("--sage", sage);
    root.style.setProperty("--cream", cream);
  }, [t.palette]);

  useEffect(() => {
    let s = document.getElementById("__font-override");
    if (!s) { s = document.createElement("style"); s.id = "__font-override"; document.head.appendChild(s); }
    s.textContent = `.font-serif, h1, h2, h3, h4 { font-family: '${t.displayFont}', 'Frank Ruhl Libre', serif !important; }`;
  }, [t.displayFont]);

  return (
    <div className="relative">
      <TopNav/>
      <main>
        <NatureBanner/>
        <Hero headline={t.headline} ctaText={t.ctaText} openingQuote={t.openingQuote}/>
        <SpecialtiesStrip/>
        <About/>
        <WhenToCome/>
        <Approach/>
        <Clinics/>
        <Thoughts/>
        <ContactForm/>
      </main>
      <Footer/>
      <StickyCTA ctaText={t.ctaText} showDesktopBar={t.showStickyDesktopBar}/>

      <TweaksPanel title="התאמות עיצוב">
        <TweakSection label="כותרת ראשית"/>
        <TweakRadio label="ניסוח" value={t.headline}
                    options={["warm-personal","space-to-breathe","soft-strength"]}
                    onChange={(v) => setTweak("headline", v)}/>
        <TweakText label="טקסט CTA" value={t.ctaText}
                   onChange={(v) => setTweak("ctaText", v)}/>

        <TweakSection label="ציטוט פתיחה"/>
        <TweakRadio label="מקור" value={t.openingQuote}
                    options={["frankl","yalom"]}
                    onChange={(v) => setTweak("openingQuote", v)}/>

        <TweakSection label="פלטה"/>
        <TweakColor label="צבעי האתר" value={t.palette}
                    options={[
                      ["#cc785c","#9FA383","#F7F1E3"],
                      ["#B47A6A","#A6B5A0","#F2EDDD"],
                      ["#C8A98F","#B9B097","#F6EDE2"],
                      ["#a9583e","#6f7257","#EFE6D2"],
                    ]}
                    onChange={(v) => setTweak("palette", v)}/>

        <TweakSection label="טיפוגרפיה"/>
        <TweakRadio label="פונט כותרות" value={t.displayFont}
                    options={["Frank Ruhl Libre","Heebo","Assistant"]}
                    onChange={(v) => setTweak("displayFont", v)}/>

        <TweakSection label="CTA דביק"/>
        <TweakToggle label="פס תחתון בדסקטופ" value={t.showStickyDesktopBar}
                     onChange={(v) => setTweak("showStickyDesktopBar", v)}/>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
