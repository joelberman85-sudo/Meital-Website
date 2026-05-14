// app.jsx — Maytal Oz psychotherapy site (Hebrew, RTL) — warm therapist edition

const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────────────────────────────────────
// Inline-SVG icons — Lucide-style outline, 1.6 stroke
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
  Heart:   (p) => <Icon {...p} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/>,
  Leaf:    (p) => <Icon {...p} d="M11 20A7 7 0 0 1 4 13c0-5 6-8 14-9-1 8-4 14-9 14-1.6 0-3-.7-4-1.8M2 22c4-5 8-9 13-13"/>,
  Sparkle: (p) => <Icon {...p}><path d="M12 3v18M3 12h18"/><path d="M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" strokeOpacity=".55"/></Icon>,
  Compass: (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.83 5.66-5.66 2.83 2.83-5.66Z"/></Icon>,
  Shield:  (p) => <Icon {...p} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>,
  Wind:    (p) => <Icon {...p} d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>,
  Sun:     (p) => <Icon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></Icon>,
  Users:   (p) => <Icon {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></Icon>,
  Mail:    (p) => <Icon {...p}><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m22 6-10 7L2 6"/></Icon>,
  ArrowL:  (p) => <Icon {...p} d="M19 12H5M12 19l-7-7 7-7"/>,
  Check:   (p) => <Icon {...p} d="M20 6 9 17l-5-5"/>,
  Menu:    (p) => <Icon {...p} d="M3 6h18M3 12h18M3 18h18"/>,
  X:       (p) => <Icon {...p} d="M18 6 6 18M6 6l12 12"/>,
  Pin:     (p) => <Icon {...p}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z"/><circle cx="12" cy="10" r="3"/></Icon>,
  Tv:      (p) => <Icon {...p}><rect x="2" y="7" width="20" height="13" rx="2"/><path d="m17 2-5 5-5-5"/></Icon>,
  Tea:     (p) => <Icon {...p}><path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v3M10 2v3M14 2v3"/></Icon>,
};

// Decorative botanical leaf for backgrounds
const LeafSVG = ({ className = "", size = 120, rotate = 0, color = "#9FA383" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}
       style={{ transform: `rotate(${rotate}deg)` }} aria-hidden="true">
    <path d="M50 92 C 22 80, 12 50, 22 22 C 50 12, 78 22, 88 50 C 80 78, 70 88, 50 92 Z"
          fill="none" stroke={color} strokeWidth="1.4"/>
    <path d="M50 92 C 50 60, 60 30, 78 18" fill="none" stroke={color} strokeWidth="1.4"/>
    <path d="M50 80 C 56 70, 64 60, 72 52" fill="none" stroke={color} strokeWidth="1"/>
    <path d="M50 65 C 56 58, 62 50, 68 42" fill="none" stroke={color} strokeWidth="1"/>
    <path d="M50 50 C 54 45, 58 38, 62 32" fill="none" stroke={color} strokeWidth="1"/>
  </svg>
);

// Hand-drawn underline SVG
const Scribble = ({ color = "#C77E5F" }) => (
  <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
    <path d="M2 8 C 40 2, 80 10, 120 6 S 180 4, 198 8"
          fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Contact info
// ─────────────────────────────────────────────────────────────────────────────
const CONTACT = {
  phone:    "054-000-0000",
  phoneRaw: "972540000000",
  email:    "meital@maytal-oz.co.il",
  whatsappMsg: "היי מיטל, אשמח להתייעץ איתך 🌿",
  location: "תל אביב והסביבה · מפגשים פרונטליים ובזום",
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
  "showStickyDesktopBar": true
}/*EDITMODE-END*/;

// ─────────────────────────────────────────────────────────────────────────────
// Reveal hook — safe (content visible if JS fails)
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
      setScrolled(window.scrollY > 14);
      const ids = ["about", "method", "for-whom", "media", "contact"];
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
    { href: "#method",   label: "השיטה שלי" },
    { href: "#for-whom", label: "למי זה מתאים" },
    { href: "#media",    label: "בתקשורת" },
    { href: "#contact",  label: "יצירת קשר" },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-30 transition-all duration-300 ${
      scrolled ? "bg-cream/90 backdrop-blur-md border-b border-[#e3d6c2]" : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-[76px] flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3" aria-label="מיטל עוז">
          <span className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-terra-soft">
            <img src={PHOTO} alt="" className="w-full h-full object-cover"/>
          </span>
          <span className="leading-tight">
            <span className="block font-serif font-medium text-ink text-[18px]">מיטל עוז</span>
            <span className="block text-[11px] text-ink-mute tracking-[0.18em]">פסיכותרפיה</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-[15px]">
          {links.map((l) => (
            <a key={l.href} href={l.href}
               className={`nav-link transition ${active === l.href.slice(1) ? "active text-ink font-medium" : "text-ink-soft hover:text-ink"}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href={waHref} target="_blank" rel="noreferrer" className="hidden md:inline-flex btn btn-primary text-[14px] py-2.5">
          <I.Whatsapp size={15} stroke={0}/> דברי איתי
        </a>

        <button className="md:hidden p-2 -mr-2 text-ink" onClick={() => setMobileOpen((s) => !s)} aria-label="תפריט">
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
// Hero
// ─────────────────────────────────────────────────────────────────────────────
function Hero({ headline, ctaText }) {
  const variants = {
    "warm-personal": {
      kicker: "פסיכותרפיה אישית · בגובה העיניים",
      h1pre:  "היי, אני",
      h1mid:  "מיטל.",
      h1tail: "כאן בשבילך, ברגעים הקשים והיפים כאחד.",
      sub:    "ליווי טיפולי חם ומקצועי במשברי חיים, בחרדה, בגמילה מהתמכרויות ובצמיחה אישית. תפקידי הוא לא לפתור — אלא ללוות, להאיר, ולעזור לך למצוא את הדרך שלך, בקצב שלך.",
    },
    "space-to-breathe": {
      kicker: "מרחב להקשבה · לעיבוד · לצמיחה",
      h1pre:  "יש מקום",
      h1mid:  "לנשום.",
      h1tail: "כאן אפשר להניח הכל לרגע ולהתחיל להבין.",
      sub:    "טיפול נפשי שאינו מתיימר ל'תקן' אותך, אלא לפגוש אותך. ביחד נמפה את הקשיים, נבין את השורש, ונבנה את הכלים שיאפשרו לך לחיות בקלות גדולה יותר.",
    },
    "soft-strength": {
      kicker: "החלמה אמיתית · צעד-צעד",
      h1pre:  "הכאב שלך",
      h1mid:  "אמיתי.",
      h1tail: "וגם הריפוי יכול להיות.",
      sub:    "מתוך 15 שנות עבודה עם אנשים במקומות הכי קשים — אני יודעת שיש דרך החוצה. היא לא תמיד ישרה, ולא תמיד מהירה. אבל היא קיימת, ואני אלווה אותך בה.",
    },
  };
  const v = variants[headline] || variants["warm-personal"];

  return (
    <section id="hero" className="relative pt-[130px] md:pt-[150px] pb-20 md:pb-28 overflow-hidden">
      {/* soft warm wash only — no decorative leaves */}
      <div className="absolute -z-0 rounded-full" style={{
        width: 520, height: 520, top: -120, right: -160,
        background: "radial-gradient(closest-side, rgba(232,195,174,.55), transparent 70%)",
        filter:"blur(8px)"
      }}></div>

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-10 md:gap-14 items-center">
        {/* text */}
        <div className="md:col-span-7 order-2 md:order-1">
          <Reveal>
            <div className="eyebrow mb-6">{v.kicker}</div>

            <h1 className="font-serif text-ink text-[42px] sm:text-[56px] md:text-[72px] leading-[1.05] tracking-tight font-medium">
              {v.h1pre} <span className="scribble">
                <span className="text-terra-deep italic">{v.h1mid}</span>
                <Scribble/>
              </span>
              <br/>
              <span className="text-ink-soft block mt-2 text-[28px] sm:text-[34px] md:text-[44px] font-normal leading-[1.2]">
                {v.h1tail}
              </span>
            </h1>

            <p className="mt-7 text-[17px] md:text-[19px] text-ink-soft leading-[1.85] max-w-[58ch] font-light">
              {v.sub}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={waHref} target="_blank" rel="noreferrer" className="btn btn-primary">
                <I.Whatsapp size={17} stroke={0}/> {ctaText}
              </a>
              <a href="#about" className="btn btn-ghost">
                קצת עליי <I.ArrowL size={15} stroke={2}/>
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] text-ink-mute">
              <span className="flex items-center gap-2"><I.Shield size={15}/> דיסקרטיות מלאה</span>
              <span className="flex items-center gap-2"><I.Pin size={15}/> {CONTACT.location}</span>
              <span className="flex items-center gap-2"><I.Heart size={15}/> 15+ שנות ניסיון</span>
            </div>
          </Reveal>
        </div>

        {/* photo */}
        <div className="md:col-span-5 order-1 md:order-2">
          <Reveal>
            <div className="relative w-[280px] sm:w-[340px] md:w-full max-w-[440px] aspect-[4/5] mx-auto">
              {/* back washes */}
              <div className="absolute -top-6 right-2 w-[78%] h-[78%] rounded-full"
                   style={{ background: "radial-gradient(closest-side, #cfd2b9, transparent 75%)" }}></div>
              <div className="absolute -bottom-10 -left-4 w-[62%] h-[62%] rounded-full"
                   style={{ background: "radial-gradient(closest-side, #F1D8C9, transparent 75%)" }}></div>

              {/* photo */}
              <div className="absolute inset-0 overflow-hidden blob-mask"
                   style={{ boxShadow: "0 30px 70px -30px rgba(165,95,69,.35)" }}>
                <img src={PHOTO} alt="מיטל עוז, פסיכותרפיסטית"
                     className="w-full h-full object-cover"
                     style={{ objectPosition: "center 28%" }}/>
              </div>

              {/* floating quote */}
              <div className="absolute -bottom-6 -right-2 md:-right-10 bg-white/95 backdrop-blur border border-[#ece1cb] rounded-3xl px-5 py-4 max-w-[240px] shadow-soft">
                <p className="font-serif text-[16px] leading-snug text-ink italic">
                  "בפעם הראשונה הרגשתי שאני לא לבד מול זה."
                </p>
                <div className="mt-2 text-[12px] text-ink-mute">— מטופלת</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Trust strip
// ─────────────────────────────────────────────────────────────────────────────
function TrustStrip() {
  const items = [
    { label: "חדשות 13",      sub: "ראיון מקצועי",       icon: <I.Tv size={20}/> },
    { label: "עמותת גמילה",   sub: "Gmila.org.il",        icon: <I.Heart size={20}/> },
    { label: "סדנאות והרצאות", sub: "מוסדות וארגונים",      icon: <I.Users size={20}/> },
    { label: "טיפול קליני",    sub: "מעל 15 שנה",          icon: <I.Shield size={20}/> },
  ];
  return (
    <section id="media" className="relative py-14 md:py-20">
      <div className="absolute inset-x-0 top-0 h-full bg-sand/60"></div>
      <div className="relative max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <p className="text-center eyebrow justify-center flex mb-8">כפי שנראה ושותפה ב·</p>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {items.map((it, i) => (
            <Reveal key={i}>
              <div className="bg-white/70 border border-[#ece1cb] rounded-3xl px-5 py-5 flex items-center gap-3">
                <span className="w-11 h-11 rounded-full bg-rose-soft text-terra-deep grid place-items-center">{it.icon}</span>
                <div>
                  <div className="font-serif font-medium text-ink text-[17px]">{it.label}</div>
                  <div className="text-[12px] text-ink-mute">{it.sub}</div>
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
// About
// ─────────────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-10 md:gap-16">
        {/* portrait column */}
        <div className="md:col-span-5">
          <Reveal>
            <div className="md:sticky md:top-28">
              <div className="relative w-[260px] sm:w-[320px] md:w-full max-w-[380px] aspect-[4/5] mx-auto">
                <div className="absolute -top-4 -left-4 w-[60%] h-[60%] rounded-full bg-sage-mist"></div>
                <div className="absolute inset-0 overflow-hidden rounded-[42% 58% 50% 50% / 55% 45% 55% 45%]"
                     style={{ borderRadius: "42% 58% 50% 50% / 55% 45% 55% 45%" }}>
                  <img src={PHOTO} alt="מיטל עוז" className="w-full h-full object-cover"
                       style={{ objectPosition: "center 22%" }}/>
                </div>
                <div className="absolute -bottom-6 right-0 bg-white border border-[#ece1cb] rounded-2xl px-4 py-3 shadow-soft flex items-center gap-3">
                  <I.Tea size={20} className="text-terra-deep"/>
                  <div>
                    <div className="font-serif text-ink text-[14px]">מקבלת מטופלות חדשות</div>
                    <div className="text-[11px] text-ink-mute">פגישת היכרות ללא עלות</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* text column */}
        <div className="md:col-span-7">
          <Reveal>
            <div className="eyebrow mb-5">קצת עליי</div>
            <h2 className="font-serif text-ink text-[40px] md:text-[54px] leading-[1.08] font-medium tracking-tight">
              לפני שהייתי מטפלת,<br/>
              <span className="text-terra-deep italic">הייתי בן אדם.</span>
            </h2>

            <div className="mt-7 space-y-5 text-[17px] leading-[1.9] text-ink-soft font-light">
              <p>
                שמי מיטל עוז. בשנים האחרונות אני יושבת מול אנשים בקליניקה שלי בתל אביב,
                ומקשיבה לסיפורים שלהם — לפעמים סיפורים שמעולם לא סופרו קודם.
              </p>
              <p>
                התחלתי את דרכי המקצועית בעבודה עם אנשים בעיצומו של תהליך גמילה, במסגרת{" "}
                <a href="https://gmila.org.il" target="_blank" rel="noreferrer"
                   className="text-terra-deep underline decoration-terra/40 decoration-2 underline-offset-4 hover:text-terra">
                  עמותת גמילה
                </a>.
                שם פגשתי מקרוב את עומק הכאב — ואת היכולת הבלתי-נתפסת של בני אדם להחזיק תקווה
                גם כשהיא דקה.
              </p>
              <p>
                מאז ליוויתי מאות מטופלות ומטופלים: בטראומה, בחרדה, באבל, ברגעי השבר השקטים
                והגדולים. את החיבור שלי לציבור הרחב אני עושה גם דרך התקשורת — בהם
                <strong className="text-ink"> ראיונות בחדשות 13</strong> וכתיבה — כי בריאות נפש
                היא לא מותרות.
              </p>
              <p className="font-serif italic text-ink text-[20px] leading-[1.7] pr-5 border-r-2 border-terra/40">
                אני לא מאמינה בטיפול שמעמיד את המטפלת על במה. אני מאמינה ביושבת לצידך,
                בלוקחת נשימה איתך, ובאמונה שגם זה — יעבור.
              </p>
            </div>

            {/* credentials — softer */}
            <div className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {[
                "M.A פסיכותרפיה — אוניברסיטה מוכרת",
                "התמחות בטראומה ו-EMDR",
                "מטפלת בהתמכרויות, מוכרת ע״י משרד הבריאות",
                "חברה באיגוד המטפלים בישראל",
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[14px] text-ink-soft">
                  <I.Leaf size={16} className="text-sage-deep mt-1 shrink-0"/>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Method — flowing principles, not a corporate process grid
// ─────────────────────────────────────────────────────────────────────────────
function Method() {
  const pillars = [
    {
      h: "קודם — להרגיש בטוחה",
      d: "כל תהליך מתחיל מקשר. בפגישות הראשונות נכיר, נבדוק שיש בינינו כימיה, ונבנה את מרחב הביטחון שיאפשר לך להגיע למקומות שעד היום היה קשה לגעת בהם.",
      icon: <I.Heart size={22}/>,
    },
    {
      h: "להבין — איך הגעת לכאן",
      d: "ביחד נמפה את הסיפור. לא רק את הסימפטום, אלא את ההקשר, את המקור, את הדפוסים. כי כשמבינים — מפסיקים להרגיש משוגעות.",
      icon: <I.Compass size={22}/>,
    },
    {
      h: "לעבד — ולשחרר",
      d: "באמצעות כלים מותאמים — CBT, EMDR, גישה אינטגרטיבית וגוף-נפש — מעבדים את מה שתקוע. לא במכה אחת, אלא בעדינות ובקצב שלך.",
      icon: <I.Sparkle size={22}/>,
    },
    {
      h: "לחיות — אחרת",
      d: "המטרה היא לא רק \"להפסיק לסבול\". המטרה היא לחיות חיים שמרגישים כמו שלך — עם יותר נשימה, יותר חופש, ויותר חיבור.",
      icon: <I.Leaf size={22}/>,
    },
  ];
  return (
    <section id="method" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-0"
           style={{ background: "linear-gradient(180deg, transparent 0%, rgba(241,216,201,.35) 30%, rgba(207,210,185,.25) 70%, transparent 100%)" }}/>

      <div className="relative max-w-5xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="eyebrow justify-center flex mb-5">השיטה שלי</div>
            <h2 className="font-serif text-ink text-[40px] md:text-[56px] leading-[1.08] font-medium tracking-tight">
              לא שיטה אחת.<br/>
              <span className="text-terra-deep italic">דרך אחת — שלך.</span>
            </h2>
            <p className="mt-6 text-[18px] text-ink-soft leading-[1.85] font-light">
              אין שתי מטופלות שזהות. אז גם הטיפול לא יכול להיות זהה. השיטה שלי משלבת
              את הכלים שעובדים — CBT, גישה אינטגרטיבית, טיפול ממוקד טראומה — ומותאמת
              בכל פגישה למה שעולה. אלה ארבעת המעגלים שאני נעה ביניהם איתך:
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

        {/* quote */}
        <Reveal>
          <div className="relative mt-16 md:mt-20 max-w-3xl mx-auto warm-card p-8 md:p-12 text-center overflow-hidden">
            <div className="absolute top-2 right-6 quote-mark" aria-hidden>״</div>
            <p className="font-serif text-[22px] md:text-[30px] leading-[1.5] text-ink italic font-medium relative z-10">
              הקושי שלך הוא לא חולשה.<br/>
              הוא סיפור — וסיפורים אפשר לעבד, להבין,<br className="hidden md:block"/>
              ולכתוב מחדש.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 relative z-10">
              <span className="w-10 h-10 rounded-full overflow-hidden">
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
// For whom
// ─────────────────────────────────────────────────────────────────────────────
function ForWhom() {
  const items = [
    { icon: <I.Shield size={22}/>, t: "התמכרויות וגמילה",      d: "אלכוהול, סמים, התנהגויות כפייתיות. וגם — ליווי לבני משפחה." },
    { icon: <I.Wind size={22}/>,   t: "חרדה ולחץ נפשי",         d: "התקפי חרדה, חרדה חברתית, דאגנות מתמשכת, קשיי הירדמות." },
    { icon: <I.Heart size={22}/>,  t: "משברי חיים ומעברים",    d: "פרידה, אובדן, גירושין, רגעים שבהם הקרקע פתאום זזה." },
    { icon: <I.Leaf size={22}/>,   t: "טראומה ופוסט-טראומה",    d: "אירועים שנשארו תקועים בגוף ובנפש. נעבד אותם בעדינות." },
    { icon: <I.Sun size={22}/>,    t: "צמיחה אישית ויחסים",     d: "להבין דפוסים, לחיות עם יותר חופש, לבנות קשרים שמרגישים נכון." },
    { icon: <I.Users size={22}/>,  t: "ליווי הורים ובני משפחה", d: "כשמישהו קרוב במשבר — גם לך מגיע מקום לעבד ולקבל כלים." },
  ];
  return (
    <section id="for-whom" className="relative py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="eyebrow justify-center flex mb-5">למי זה מתאים</div>
            <h2 className="font-serif text-ink text-[40px] md:text-[54px] leading-[1.08] font-medium tracking-tight">
              לא חייבים לחכות שיהיה
              <br className="hidden sm:block"/>{" "}
              <span className="scribble">
                <span className="text-terra-deep italic">״גרוע באמת״.</span>
                <Scribble/>
              </span>
            </h2>
            <p className="mt-6 text-[18px] text-ink-soft leading-[1.85] font-light">
              הסיבות שמביאות אנשים אליי שונות ומגוונות. אלה כמה מהמרחבים שבהם אני עובדת ביום-יום —
              אבל אם משהו אחר מטריד אותך, אל תהססי לפנות.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {items.map((it, i) => (
            <Reveal key={i}>
              <article className="group h-full bg-white/70 border border-[#ece1cb] rounded-[28px] p-7 transition hover:bg-white hover:-translate-y-0.5 hover:shadow-soft">
                <div className="w-14 h-14 rounded-full bg-rose-soft text-terra-deep grid place-items-center mb-5 transition group-hover:bg-terra-soft/70">
                  {it.icon}
                </div>
                <h3 className="font-serif font-medium text-ink text-[22px] mb-2 leading-tight">{it.t}</h3>
                <p className="text-[15px] text-ink-soft leading-[1.8] font-light">{it.d}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 text-center">
            <p className="text-[16px] text-ink-soft mb-4">לא בטוחה שזה מתאים לך?</p>
            <a href="#contact" className="font-serif italic text-[22px] text-terra-deep underline decoration-terra/40 decoration-2 underline-offset-4 hover:text-terra">
              בואי נברר ביחד →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact form
// ─────────────────────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name:"", phone:"", topic:"", message:"", prefer:"whatsapp", consent:true });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm(f => ({...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value}));
  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "אשמח לדעת איך לפנות אלייך";
    if (!/^[\d\s+\-()]{8,}$/.test(form.phone.trim())) e.phone = "מספר טלפון לא נראה תקין";
    if (form.message.trim().length < 5) e.message = "כתבי משפט קצר ואני אחזור אלייך";
    if (!form.consent) e.consent = "אני צריכה את האישור שלך כדי לחזור אלייך";
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
              מוזמנת להתייעץ.
            </h2>
            <p className="mt-5 text-[17px] text-ink-soft leading-[1.85] font-light max-w-md">
              את לא חייבת לדעת בדיוק מה את רוצה להגיד. אפשר להתחיל ב״היי, נתקעתי״ —
              וניקח משם. אני חוזרת בדרך כלל באותו יום.
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
                    <span className="block font-serif text-ink text-[16px]">{CONTACT.phone}</span>
                    <span className="block text-[12px] text-ink-mute">שיחה ישירה</span>
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
            </div>
          </Reveal>
        </div>

        {/* form */}
        <div className="md:col-span-7">
          <Reveal>
            <div className="warm-card border border-[#ece1cb] p-6 md:p-10 shadow-soft">
              {!sent ? (
                <form onSubmit={onSubmit} noValidate>
                  <h3 className="font-serif text-ink text-[26px] font-medium mb-1">השאירי הודעה</h3>
                  <p className="text-[14px] text-ink-mute mb-7">פרטייך יישארו בינינו בלבד.</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="block text-[13px] font-medium text-ink-soft mb-1.5">שם <span className="text-terra">*</span></span>
                      <input className={`field ${errors.name ? "invalid" : ""}`} type="text"
                             value={form.name} onChange={set("name")} placeholder="איך לפנות אלייך?"/>
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
                      <option value="">בחרי נושא...</option>
                      <option>חרדה ולחץ נפשי</option>
                      <option>התמכרויות וגמילה</option>
                      <option>טראומה</option>
                      <option>משבר חיים</option>
                      <option>צמיחה אישית ויחסים</option>
                      <option>ליווי הורים / משפחה</option>
                      <option>אחר</option>
                    </select>
                  </label>

                  <label className="block mt-4">
                    <span className="block text-[13px] font-medium text-ink-soft mb-1.5">בכמה מילים, מה מביא אותך? <span className="text-terra">*</span></span>
                    <textarea className={`field min-h-[120px] ${errors.message ? "invalid" : ""}`} rows={4}
                              value={form.message} onChange={set("message")}
                              placeholder="אפשר גם משפט קצר. אני אבין."/>
                    {errors.message && <span className="block text-[12px] text-terra-deep mt-1">{errors.message}</span>}
                  </label>

                  <div className="mt-5">
                    <span className="block text-[13px] font-medium text-ink-soft mb-2">איך נוח לך שאחזור?</span>
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
                    <input type="checkbox" className="mt-1 accent-[#C77E5F]" checked={form.consent} onChange={set("consent")}/>
                    <span>אני מאשרת שתחזרי אליי לגבי פנייתי. פרטיי לא יישלחו לאף גורם נוסף.</span>
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
                    תודה {form.name.trim().split(" ")[0]} 🌿
                  </h3>
                  <p className="text-[17px] text-ink-soft leading-[1.8] font-light max-w-md">
                    קיבלתי את ההודעה. אני חוזרת בדרך כלל באותו יום — לרוב ב{form.prefer === "whatsapp" ? "וואטסאפ" : form.prefer === "phone" ? "שיחה" : "אימייל"}.
                    בינתיים תני לעצמך את הזמן, נשמה.
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
            <span className="font-serif font-medium text-[20px]">מיטל עוז · פסיכותרפיה</span>
          </div>
          <p className="font-serif italic text-[18px] text-cream/80 leading-relaxed max-w-xs">
            "מרחב טיפולי חם, מקצועי ובטוח. בגובה העיניים — תמיד."
          </p>
        </div>
        <div>
          <div className="eyebrow !text-terra-soft mb-3">קישורים</div>
          <ul className="space-y-2 text-[15px] font-light">
            <li><a href="#about"    className="hover:text-terra-soft">אודות</a></li>
            <li><a href="#method"   className="hover:text-terra-soft">השיטה</a></li>
            <li><a href="#for-whom" className="hover:text-terra-soft">למי זה מתאים</a></li>
            <li><a href="#contact"  className="hover:text-terra-soft">יצירת קשר</a></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow !text-terra-soft mb-3">פרטי קשר</div>
          <ul className="space-y-2 text-[15px] text-cream/90 font-light">
            <li className="flex items-center gap-2"><I.Phone size={14}/> <span dir="ltr">{CONTACT.phone}</span></li>
            <li className="flex items-center gap-2"><I.Mail  size={14}/> {CONTACT.email}</li>
            <li className="flex items-center gap-2"><I.Pin   size={14}/> {CONTACT.location}</li>
          </ul>
        </div>
      </div>
      <div className="relative max-w-6xl mx-auto px-5 md:px-8 mt-12 pt-6 border-t border-cream/15 text-[12px] text-cream/60 flex flex-wrap items-center justify-between gap-3">
        <span>© {new Date().getFullYear()} מיטל עוז · כל הזכויות שמורות</span>
        <span className="font-serif italic">בריאות הנפש היא לא מותרות — היא דרך לחיות.</span>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sticky CTA — mobile bubble + desktop bar
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
      {/* Mobile: floating bubble */}
      <div className={`only-mobile cta-bubble transition-all duration-300 ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}>
        <a href={waHref} target="_blank" rel="noreferrer" aria-label="פנייה בוואטסאפ"
           className="blob-btn" style={{ background: "#25D366" }}>
          <I.Whatsapp size={26} stroke={0}/>
        </a>
        <a href={telHref} aria-label="חיוג" className="blob-btn" style={{ background: "#cc785c" }}>
          <I.Phone size={22}/>
        </a>
      </div>

      {/* Desktop: bottom bar */}
      {showDesktopBar && (
        <div className={`only-desktop cta-bar transition-all duration-300 ${shown ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}>
          <div className="max-w-6xl mx-auto px-8 py-3.5 flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-terra-soft">
                <img src={PHOTO} alt="" className="w-full h-full object-cover"/>
              </span>
              <div className="leading-tight">
                <div className="font-serif text-ink text-[16px]">אני כאן בשבילך</div>
                <div className="text-[12px] text-ink-mute">מוזמנת להתייעץ — ללא עלות, בדיסקרטיות מלאה</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a href={telHref} className="btn btn-ghost text-[14px] py-2.5"><I.Phone size={15}/> {CONTACT.phone}</a>
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
        <Hero headline={t.headline} ctaText={t.ctaText}/>
        <TrustStrip/>
        <About/>
        <Method/>
        <ForWhom/>
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
