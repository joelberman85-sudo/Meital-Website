// app.jsx — Maytal Oz · existential psychotherapy (Hebrew, RTL)
// Warm, calming redesign — beige background, caramel CTAs, sage accents, rounded cards.
// All client copy preserved verbatim — visual redesign only.

const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────────────────────────────────────
// Inline-SVG icons
// ─────────────────────────────────────────────────────────────────────────────
const Icon = ({ d, children, size = 22, className = "", stroke = 1.6 }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none"
stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
className={className} aria-hidden="true">
    {d ? <path d={d} /> : children}
  </svg>;

const I = {
  Phone: (p) => <Icon {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" /></Icon>,
  Whatsapp: (p) => <Icon {...p}>
    <path d="M20.52 3.48A11.78 11.78 0 0 0 12.02 0C5.5 0 .2 5.3.2 11.82c0 2.08.55 4.11 1.6 5.9L0 24l6.45-1.7a11.78 11.78 0 0 0 5.57 1.42h.01c6.52 0 11.82-5.3 11.82-11.82a11.74 11.74 0 0 0-3.33-8.42Z" fill="currentColor" stroke="none" />
    <path d="M17.45 14.4c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.6.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.54.12-.12.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.13-.6-1.45-.82-1.99-.22-.52-.44-.45-.6-.46l-.51-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.97 2.63 1.11 2.82.13.18 1.92 2.94 4.66 4.12.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32Z" fill="#fff" stroke="none" />
  </Icon>,
  Facebook: (p) => <Icon {...p}>
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" fill="currentColor" stroke="none" />
  </Icon>,
  Instagram: (p) => <Icon {...p}><rect x="2" y="2" width="20" height="20" rx="5.5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" /></Icon>,
  Mail: (p) => <Icon {...p}><rect x="2" y="4" width="20" height="16" rx="3" /><path d="m22 6-10 7L2 6" /></Icon>,
  ArrowL: (p) => <Icon {...p} d="M19 12H5M12 19l-7-7 7-7" />,
  Check: (p) => <Icon {...p} d="M20 6 9 17l-5-5" />,
  Menu: (p) => <Icon {...p} d="M4 7h16M4 12h16M4 17h16" />,
  X: (p) => <Icon {...p} d="M18 6 6 18M6 6l12 12" />,
  Pin: (p) => <Icon {...p}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" /><circle cx="12" cy="10" r="3" /></Icon>,
  Tv: (p) => <Icon {...p}><rect x="2" y="7" width="20" height="13" rx="2" /><path d="m17 2-5 5-5-5" /></Icon>,
  Leaf: (p) => <Icon {...p} d="M11 20A7 7 0 0 1 4 13c0-5 6-8 14-9-1 8-4 14-9 14-1.6 0-3-.7-4-1.8M2 22c4-5 8-9 13-13" />,
  Chevron: (p) => <Icon {...p} d="m6 9 6 6 6-6" />,
  // soft specialty icons
  Compass: (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></Icon>,
  Wind: (p) => <Icon {...p} d="M9.6 4.6A2 2 0 1 1 11 8H2m10.6 11.4A2 2 0 1 0 14 16H2m13.7-8.3A2.5 2.5 0 1 1 17.5 12H2" />,
  Sprout: (p) => <Icon {...p}><path d="M7 20h10M12 20V10" /><path d="M12 10C12 6 9 4 5 4c0 4 3 6 7 6Z" /><path d="M12 12c0-3 2.5-5 6-5 0 3.5-2.5 5-6 5Z" /></Icon>,
  Hearts: (p) => <Icon {...p} d="M12 21s-7-4.6-9.3-9A4.6 4.6 0 0 1 12 7.5 4.6 4.6 0 0 1 21.3 12C19 16.4 12 21 12 21Z" />
};

// Footer logo — delicate leaf-and-figures motif
const BrandMark = ({ size = 64, color = "#7D8F6B", className = "" }) =>
<svg width={size} height={size} viewBox="0 0 80 80" className={className} fill="none"
stroke={color} strokeWidth="1.6" aria-hidden="true">
    <path d="M40 8 C 46 18, 46 26, 40 32 C 34 26, 34 18, 40 8 Z" fill={color} fillOpacity=".15" />
    <path d="M40 30 C 26 36, 22 50, 30 60 C 40 56, 46 44, 40 30 Z" />
    <path d="M40 30 C 54 36, 58 50, 50 60 C 40 56, 34 44, 40 30 Z" />
    <circle cx="31" cy="64" r="4.5" />
    <circle cx="49" cy="64" r="4.5" />
  </svg>;

// ─────────────────────────────────────────────────────────────────────────────
// Nature image URLs (placeholders — user will replace)
// ─────────────────────────────────────────────────────────────────────────────
const NAT = {
  maytal: "assets/maytal.jpg",
  clinic: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1400&q=80",
  hero: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=78",
  portrait: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=75",
  approach: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1600&q=75",
  contact: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=2000&q=75"
};

// ─────────────────────────────────────────────────────────────────────────────
// Contact info
// ─────────────────────────────────────────────────────────────────────────────
const CONTACT = {
  phone: "052-4250242",
  phoneRaw: "972524250242",
  email: "maytaloz@gmail.com",
  facebookUrl: "https://www.facebook.com/",
  facebookLabel: "מיטל עוז, M.A — פסיכותרפיסטית",
  whatsappMsg: "היי מיטל, אשמח להתייעץ איתך",
  location: "קליניקה במרכז תל אביב · מפגשים פרונטליים ובזום",
  tvUrl: "https://13tv.co.il/item/special/recommended/health-2/meitaloz-902508561/"
};
const waHref = `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(CONTACT.whatsappMsg)}`;
const telHref = `tel:+${CONTACT.phoneRaw}`;

// ─────────────────────────────────────────────────────────────────────────────
// Tweak defaults
// ─────────────────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "ctaText": "בואו נדבר",
  "displayFont": "Assistant",
  "showStickyDesktopBar": true,
  "openingQuote": "frankl"
} /*EDITMODE-END*/;

// ─────────────────────────────────────────────────────────────────────────────
// Scroll reveal — gentle fade + rise
// ─────────────────────────────────────────────────────────────────────────────
const Reveal = ({ children, className = "", as: As = "div", delay, style, ...rest }) => {
  const ref = useRef(null);
  const [state, setState] = useState("show");

  React.useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {setState("show");return;}
    setState("pending");
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {if (e.isIntersecting) {setState("show");obs.disconnect();}});
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const mergedStyle = delay != null ? { transitionDelay: `${delay}ms`, ...(style || {}) } : style;
  return <As ref={ref} {...rest} style={mergedStyle} className={`fade-in ${state} ${className}`}>{children}</As>;
};

// Centered section heading + sage pill label
const SectionHead = ({ label, children, className = "" }) =>
<div className={`text-center ${className}`}>
    {label && <div className="flex justify-center mb-5"><span className="pill-label" style={{ backgroundColor: "rgb(231, 236, 222)", color: "rgb(79, 59, 50)", fontWeight: "600" }}>{label}</span></div>}
    <h2 className="display text-[34px] sm:text-[44px] md:text-[52px]">{children}</h2>
  </div>;

// Minimal quote band — sage background
const QuoteBand = ({ children, cite, className = "", style }) =>
<Reveal as="section" style={style} className={`quote-band py-16 md:py-24 px-6 ${className}`}>
    <p className="text-sage-deep text-center text-[22px] sm:text-[27px] md:text-[32px] leading-[1.55] max-w-[900px] mx-auto font-medium">
      {children}
    </p>
    {cite && <div className="mt-5 text-center text-sage-deep/80 text-[16px] md:text-[18px]">{cite}</div>}
  </Reveal>;

// Call-to-action band — sage rounded box: message (right) + caramel button (left)
const CTABand = ({ title, sub, btn, href = waHref, ext = true, center = false, className = "" }) =>
<Reveal className={className}>
    <div className="max-w-[1040px] mx-auto px-6 lg:px-10">
      <div className={`bg-sage-mist rounded-[28px] px-7 py-7 md:px-11 md:py-8 flex flex-col gap-5
        ${center ? "items-center text-center" : "sm:flex-row sm:items-center sm:justify-between text-center sm:text-right"}`} style={{ backgroundColor: "rgb(232, 239, 224)" }}>
        <div>
          <div className="text-ink font-bold text-[20px] md:text-[23px] leading-snug">{title}</div>
          {sub && <div className="mt-1.5 text-ink-soft text-[15px]">{sub}</div>}
        </div>
        <a href={href} {...ext ? { target: "_blank", rel: "noreferrer" } : {}} className="btn btn-primary shrink-0">{btn}</a>
      </div>
    </div>
  </Reveal>;

// ─────────────────────────────────────────────────────────────────────────────
// Top nav
// ─────────────────────────────────────────────────────────────────────────────
function TopNav({ ctaText }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ["about", "approach", "thoughts", "contact"];
      const y = window.scrollY + 160;
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
  { href: "#about", label: "אודות" },
  { href: "#approach", label: "הגישה הטיפולית" },
  { href: "#thoughts", label: "מחשבות על..." },
  { href: "#contact", label: "יצירת קשר" }];

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300
      ${scrolled ? "bg-cream/95 backdrop-blur-md border-b border-line shadow-soft" : "bg-cream/80 backdrop-blur-sm"}`}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 h-[74px] flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3" aria-label="מיטל עוז">
          <BrandMark size={38} color="#7D8F6B" />
          <span className="leading-tight">
            <span className="block text-[19px] font-bold text-ink" style={{ color: "rgb(175, 99, 64)" }}>מיטל עוז</span>
            <span className="block text-[10.5px] tracking-[0.18em] text-ink-mute font-semibold">פסיכותרפיסטית · M.A</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9 text-[15.5px] text-ink-soft">
          {links.map((l) =>
          <a key={l.href} href={l.href}
          className={`nav-link transition font-semibold ${active === l.href.slice(1) ? "active text-cta" : "hover:text-ink"}`}>
              {l.label}
            </a>
          )}
        </nav>

        <a href={waHref} target="_blank" rel="noreferrer"
        className="hidden md:inline-flex btn btn-primary !py-2.5 !px-7 !text-[15px]" style={{ backgroundColor: "rgb(163, 106, 72)" }}>
          {ctaText}
        </a>

        <button className="md:hidden p-2 -mr-2 text-ink" onClick={() => setMobileOpen((s) => !s)} aria-label="תפריט">
          {mobileOpen ? <I.X /> : <I.Menu />}
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-[max-height] duration-300 bg-cream border-t border-line
        ${mobileOpen ? "max-h-96" : "max-h-0"}`}>
        <nav className="flex flex-col px-6 py-2">
          {links.map((l) =>
          <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
          className="py-3.5 border-b border-line last:border-0 text-ink-soft font-medium">
              {l.label}
            </a>
          )}
          <a href={telHref} className="py-3.5 text-cta flex items-center gap-2 font-semibold">
            <I.Phone size={15} /><span dir="ltr">{CONTACT.phone}</span>
          </a>
        </nav>
      </div>
    </header>);
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero — two columns: text + rounded image over organic sage shape
// ─────────────────────────────────────────────────────────────────────────────
function Hero({ ctaText, openingQuote }) {
  const quotes = {
    frankl: {
      text: "אפשר ליטול מאיתנו כמעט הכל, חוץ מדבר אחד: את החופש להחליט כיצד להגיב למצבי החיים שלנו.",
      who: "ויקטור פראנקל"
    },
    yalom: {
      text: "הקשר האנושי בין המטפל למטופל הוא ליבת הטיפול — מסע אל תוך עצמך, ואינך לבד בו.",
      who: "אירווין יאלום"
    }
  };
  const q = quotes[openingQuote] || quotes.frankl;

  return (
    <section id="hero" className="relative overflow-hidden pt-[112px] md:pt-[128px] pb-20 md:pb-28">
      {/* soft ambient washes */}
      <div className="absolute -z-0 top-10 -right-32 w-[460px] h-[460px] rounded-full opacity-60"
      style={{ background: "radial-gradient(closest-side, #E7EFE0, transparent 70%)" }} />
      <div className="absolute -z-0 bottom-0 -left-24 w-[380px] h-[380px] rounded-full opacity-50"
      style={{ background: "radial-gradient(closest-side, #f3e2cd, transparent 70%)" }} />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-12 md:gap-16 items-center" style={{ padding: "0px 55px 0px 40px" }}>
        {/* text (right in RTL) */}
        <div className="order-2 md:order-1">
          <Reveal delay={40}>
            <span className="pill-label" style={{ backgroundColor: "rgb(223, 232, 214)", color: "rgb(78, 63, 51)", fontWeight: "600" }}>פסיכותרפיה קיומית · אקזיסטנציאליסטית</span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="display-lg mt-6 text-[52px] sm:text-[68px] md:text-[80px]" style={{ height: "80px" }}>מיטל עוז</h1>
            <p className="mt-3 text-[18px] sm:text-[21px] text-sage-deep font-semibold tracking-[0.04em]" style={{ height: "31px" }}>
              פסיכותרפיסטית · קרימינולוגית <span dir="ltr">M.A</span>
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-7 space-y-1.5 text-[18px] sm:text-[20px] text-ink-soft">
              <p style={{ height: "25px" }}>טיפול במשברי החיים, תחושת תקיעות ובדידות.</p>
              <p>טיפול בהתמכרויות.</p>
            </div>
          </Reveal>
          <Reveal delay={290}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href={waHref} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ backgroundColor: "rgb(175, 99, 64)" }}>{ctaText}</a>
              <a href="#about" className="btn btn-ghost" style={{ backgroundColor: "rgba(251, 249, 243, 0.1)", borderColor: "rgba(175, 99, 64, 0.29)" }}>קצת עליי</a>
            </div>
          </Reveal>
        </div>

        {/* image (left in RTL) over organic sage blob */}
        <div className="order-1 md:order-2 relative">
          <Reveal delay={160}>
            <div className="relative mx-auto w-[300px] sm:w-[380px] md:w-full max-w-[460px]">
              {/* sage organic shape */}
              <div className="blob absolute -inset-5 md:-inset-7 -z-10 bg-sage/55" />
              <div className="blob absolute -bottom-8 -left-6 w-32 h-32 -z-10 bg-peach/50" style={{ animationDelay: "-6s" }} />
              {/* rounded portrait */}
              <div className="soft-img aspect-[4/5] shadow-lift" style={{ width: "445px" }}>
                <img src={NAT.maytal} alt="מיטל עוז" className="w-full h-full object-cover" style={{ width: "445px", height: "560px" }} />
              </div>
              {/* quote card overlay */}
              <div className="absolute -bottom-7 right-4 md:-right-8 max-w-[270px] card !rounded-3xl px-5 py-4 shadow-lift" style={{ borderColor: "rgb(175, 99, 64)", backgroundColor: "rgb(175, 99, 64)" }}>
                <p className="text-[14.5px] leading-[1.7] text-ink italic" style={{ color: "rgb(255, 254, 254)", fontSize: "15px" }}>״{q.text}״</p>
                <div className="mt-2 text-[12px] tracking-[0.12em] text-sage-deep font-semibold" style={{ color: "rgb(247, 240, 230)" }}>— {q.who}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>);
}

// ─────────────────────────────────────────────────────────────────────────────
// Crisis intro — centered text on soft card
// ─────────────────────────────────────────────────────────────────────────────
function CrisisIntro() {
  return (
    <section id="crisis" className="relative py-20 md:py-28">
      <div className="max-w-[820px] mx-auto px-6">
        <Reveal>
          <SectionHead label="מתי לפנות">
            מהו בכלל משבר ומתי כדאי לפנות לטיפול?
          </SectionHead>
          <p className="mt-7 text-center text-[20px] md:text-[24px] text-cta font-semibold italic leading-snug">
            אין סיבה לא נכונה או זמן לא נכון לפנות לטיפול.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 space-y-6 text-[16.5px] md:text-[18px] text-ink-soft leading-[2] text-center">
            <p>
              משבר יכול להיות תחושה או הרגשה שזרים לכם: שינוי שהתרחש בחיים, בזוגיות,
              במשפחה, בקריירה. צומת שאתם מרגישים תקועים בה, שגרה שוחקת, או הרגל שלא עושה
              לכם טוב.
            </p>
            <p>
              כל תחושת מצוקה או חוסר אונים יכולה להיות סיבה לפנות לסיוע — בין אם אנחנו
              יודעים מאיפה היא מגיעה ובין אם לא. לעיתים גם אירועים שנראים לנו שוליים,
              יכולים להיות סיבה לפנות לטיפול.
            </p>
            <p>
              טיפול נכון ומותאם אישית מספק לנו כלים להתבוננות פנימית מיטיבה, מאפשר למצוא
              את דרכי ההתמודדות הנכונות עבורנו — ואף לצמוח מתוך הקשיים שלנו.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 md:mt-16">
        <CTABand
          title="מרגיש/ה שזה מדבר אליך?"
          sub="אני כאן כדי להקשיב לסיפור שלך."
          btn="שלחו לי הודעה"
          href="#contact" ext={false} />
      </div>
    </section>);
}

// ─────────────────────────────────────────────────────────────────────────────
// About — warm image + text, personal
// ─────────────────────────────────────────────────────────────────────────────
function About() {
  const creds = [
  "B.A במדעי ההתנהגות",
  "M.A טיפולי בקרימינולוגיה שיקומית (בהצטיינות)",
  "תכנית תלת-שנתית · פסיכותרפיה אקזיסטנציאליסטית",
  "התמחות בטיפול בהתמכרויות",
  "מיינדפולנס · חמלה עצמית · ACT",
  "חברה באיגוד הקרימינולוגים השיקומיים",
  "חברה בארגון הרב-תחומי לפסיכותרפיה"];

  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
        {/* image — clinic */}
        <div className="md:col-span-5 order-1">
          <Reveal>
            <div className="relative mx-auto max-w-[480px]">
              <div className="absolute -inset-4 -z-10 rounded-[34px] bg-peach-soft" />
              <div className="soft-img aspect-[4/3] shadow-lift">
                <img src={NAT.clinic} alt="הקליניקה" className="w-full h-full object-cover" />
              </div>
            </div>
          </Reveal>
        </div>

        {/* text */}
        <div className="md:col-span-7 order-2">
          <Reveal>
            <span className="pill-label" style={{ backgroundColor: "rgb(232, 236, 223)" }}>אודות</span>
            <h2 className="display mt-5 text-[38px] md:text-[52px] leading-[1.1]">
              שמי <span className="accent">מיטל עוז</span>
            </h2>
            <p className="mt-2 text-[19px] md:text-[22px] text-sage-deep font-semibold">
              פסיכותרפיסטית וקרימינולוגית M.A.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-7 space-y-5 text-[16px] md:text-[17.5px] leading-[1.95] text-ink-soft">
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
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 card p-6 md:p-7" style={{ borderColor: "rgb(255, 255, 255)", backgroundColor: "rgba(255, 255, 255, 0.357)" }}>
              <div className="grid sm:grid-cols-2 gap-x-7 gap-y-2.5">
                {creds.map((c, i) =>
                <div key={i} className="flex items-start gap-2.5 text-[14px] text-ink-soft">
                    <I.Leaf size={15} className="text-sage-deep mt-1 shrink-0" />
                    <span>{c}</span>
                  </div>
                )}
              </div>
            </div>

            <a href={CONTACT.tvUrl} target="_blank" rel="noreferrer"
            className="mt-7 group inline-flex items-center gap-3 text-cta font-semibold border-b border-cta/40 pb-1 hover:gap-4 transition-all">
              <I.Tv size={18} />
              <span className="text-[15px]">בתקשורת · חדשות 13 — לקריאת הכתבה</span>
              <I.ArrowL size={14} />
            </a>

            <div className="mt-8">
              <a href={waHref} target="_blank" rel="noreferrer" className="btn btn-primary">קביעת פגישת היכרות <I.ArrowL size={16} /></a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>);
}

// ─────────────────────────────────────────────────────────────────────────────
// Specialties — soft-icon cards
// ─────────────────────────────────────────────────────────────────────────────
function SpecialtiesStrip() {
  const items = [
  { icon: I.Compass, label: "משברי חיים", sub: ["תקיעות · בדידות", "אובדן · מעברים"] },
  { icon: I.Wind, label: "חרדה ודיכאון", sub: ["מצוקה רגשית מתמשכת"] },
  { icon: I.Sprout, label: "התמכרויות", sub: ["תהליכי גמילה מותאמים אישית", "ליווי בני המשפחה"] },
  { icon: I.Hearts, label: "טראומה ויחסים", sub: ["משברים בזוגיות", "יחסי משפחה"] }];

  return (
    <section className="relative py-20 md:py-28 bg-cream-2">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <Reveal>
          <SectionHead label="תחומי טיפול">במה אוכל לעזור לכם?</SectionHead>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {items.map((it, i) => {
            const Ic = it.icon;
            return (
              <Reveal key={i} delay={i % 4 * 90}>
                <div className="card lift-hover h-full px-7 py-9 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full grid place-items-center bg-sage-mist text-sage-deep">
                    <Ic size={28} stroke={1.5} />
                  </div>
                  <h3 className="mt-5 font-bold text-ink text-[21px] md:text-[22px] leading-tight">{it.label}</h3>
                  <div className="mt-4 mx-auto w-9 h-px bg-line" />
                  <div className="mt-4 space-y-1 text-[15px] text-ink-soft leading-[1.8]">
                    {it.sub.map((s, j) => <div key={j}>{s}</div>)}
                  </div>
                </div>
              </Reveal>);
          })}
        </div>

        <CTABand className="mt-14 md:mt-16" center
        title="מתלבט/ת אם זה מתאים לך?"
        btn="בואו נדבר בטלפון"
        href={telHref} ext={false} />
      </div>
    </section>);
}

// ─────────────────────────────────────────────────────────────────────────────
// Approach — heading + nature image + essay + sage quote band
// ─────────────────────────────────────────────────────────────────────────────
function Approach() {
  return (
    <section id="approach" className="relative py-20 md:py-28">
      <div className="max-w-[860px] mx-auto px-6 lg:px-10">
        <Reveal>
          <SectionHead label="הגישה הטיפולית">
            מהי פסיכותרפיה אקזיסטנציאליסטית<br className="hidden md:block" /> ולמי זה מתאים?
          </SectionHead>
        </Reveal>
      </div>

      <Reveal>
        <div className="max-w-[1040px] mx-auto px-6 lg:px-10 mt-12">
          <div className="soft-img w-full aspect-[16/7] shadow-soft">
            <img src={NAT.approach} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </Reveal>

      <div className="max-w-[760px] mx-auto px-6 lg:px-10">
        <Reveal delay={120}>
          <div className="mt-12 space-y-6 text-[16.5px] md:text-[18px] leading-[2] text-ink-soft">
            <p>
              פסיכותרפיה אקזיסטנציאליסטית (קיומית) היא גישה טיפולית, המאמינה כי טיפול
              רגשי צריך להיות בגובה העיניים, ומחובר למציאות היום-יומית שלנו. הגישה מאמינה
              כי החיים מהווים אתגר עבור כולנו, וכי כולנו חשופים לאתגרי הקיום — ומרגישים
              תחושות של דכאון, בדידות, תקיעות וחרדה — וכי לכל אחד דרך התמודדות שונה.
            </p>
            <p>
              הגישה מאמינה כי בבסיסו של הטיפול הרגשי נמצא הקשר האנושי בין המטפל למטופל.
              קשר שבו המטפל מלווה את המטופל במסע אל תוך עצמו. מסע אשר עלול להיות לא קל,
              אך המטופל אינו לבד בו.
            </p>
            <p>
              המטופל יכול לחוות רגשות לא פשוטים, אך המטפל לצידו — צולל איתו לתחושות,
              מחזק ומעודד, נותן עוד נקודות מבט. והכי חשוב, נמצא לצידו בקצב שלו.
            </p>
          </div>
        </Reveal>
      </div>

      <QuoteBand className="my-14 md:my-20">
        אני מאמינה שכשניתן לנו מרחב לדבר בחופשיות, ולבטא את רגשותינו — גם המאיימים
        ביותר — אנחנו מרגישים הקלה ופורקן. אני יודעת שכשאנחנו לא מוצאים את המרחב
        הזה, פעם אחר פעם, תחושת בדידות קשה יכולה להציף אותנו.
      </QuoteBand>

      <div className="max-w-[760px] mx-auto px-6 lg:px-10">
        <Reveal delay={120}>
          <div className="space-y-6 text-[16.5px] md:text-[18px] leading-[2] text-ink-soft">
            <p>
              פסיכותרפיה אקזיסטנציאליסטית מתאימה לכל מי שמרגיש תחושות חרדה, דכאון, תקיעות
              או בדידות. לכל מי שמרגיש או מרגישה שאיפשהו במהלך שגרת החיים הכיוון נאבד,
              והוא מחפש למצוא את הדרך חזרה — או מעוניין בדרך חדשה.
            </p>
          </div>
        </Reveal>
      </div>
    </section>);
}

// ─────────────────────────────────────────────────────────────────────────────
// Thoughts — calm image cards (grid), modal reader
// ─────────────────────────────────────────────────────────────────────────────
function Thoughts() {
  const [openId, setOpenId] = useState(null);
  const articles = typeof window !== "undefined" && window.ARTICLES || [];
  const stripRef = useRef(null);

  const scrollByCard = (dir) => {
    const el = stripRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const step = card ? card.getBoundingClientRect().width + 24 : 340;
    const target = el.scrollLeft + dir * -step;
    const steps = 18;
    let i = 0;
    const from = el.scrollLeft;
    const timer = setInterval(() => {
      i++;
      const p = i / steps;
      const ease = 1 - Math.pow(1 - p, 3);
      el.scrollLeft = from + (target - from) * ease;
      if (i >= steps) clearInterval(timer);
    }, 16);
  };

  useEffect(() => {
    if (openId) document.body.style.overflow = "hidden";else
    document.body.style.overflow = "";
    return () => {document.body.style.overflow = "";};
  }, [openId]);

  const article = articles.find((a) => a.id === openId);

  return (
    <section id="thoughts" className="relative py-20 md:py-28 bg-cream-2">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6 mb-12">
          <Reveal>
            <span className="pill-label" style={{ backgroundColor: "rgb(231, 236, 222)" }}>קריאה</span>
            <h2 className="display mt-5 text-[34px] sm:text-[44px] md:text-[52px]">מחשבות על...</h2>
          </Reveal>
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button onClick={() => scrollByCard(-1)} aria-label="הקודם"
            className="w-12 h-12 rounded-full border border-sage text-sage-deep bg-card grid place-items-center hover:bg-sage-deep hover:text-white hover:border-sage-deep transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
            <button onClick={() => scrollByCard(1)} aria-label="הבא"
            className="w-12 h-12 rounded-full border border-sage text-sage-deep bg-card grid place-items-center hover:bg-sage-deep hover:text-white hover:border-sage-deep transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
          </div>
        </div>

        <div ref={stripRef}
        className="thoughts-strip flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 lg:-mx-10 lg:px-10 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}>
          {articles.map((a) =>
          <article key={a.id} data-card
          onClick={() => setOpenId(a.id)}
          className="group relative shrink-0 snap-start w-[78%] sm:w-[330px] md:w-[360px] aspect-[3/4]
                       rounded-[24px] overflow-hidden cursor-pointer shadow-soft lift-hover">
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            <img src={a.image} alt={a.imageAlt || ""} loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-[1.05]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(40,30,24,.82) 0%, rgba(40,30,24,.28) 42%, rgba(40,30,24,.05) 70%)" }} />
            <div className="absolute inset-x-0 bottom-0 p-6 text-right">
              <h3 className="text-white font-bold text-[21px] md:text-[23px] leading-tight">{a.title}</h3>
              <span className="mt-3 inline-flex items-center gap-2 text-[14px] text-white/90 font-semibold group-hover:gap-3 transition-all">
                קראו עוד <I.ArrowL size={14} />
              </span>
            </div>
          </article>
          )}
        </div>

        <CTABand className="mt-16"
        title="אני כאן בשבילך"
        sub="מוזמנים להתייעץ — בלי התחייבות, בקצב שלכם."
        btn="בואו נתחיל בשיחה"
        href={waHref} />
      </div>

      {/* reader modal */}
      {article &&
      <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-ink/45 backdrop-blur-sm" onClick={() => setOpenId(null)} />
          <div className="relative min-h-full flex items-start justify-center p-4 md:p-10">
            <div className="relative w-full max-w-3xl bg-card rounded-3xl shadow-lift overflow-hidden">
              <button onClick={() => setOpenId(null)}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 border border-line text-ink-soft hover:text-cta grid place-items-center z-10"
            aria-label="סגירה">
                <I.X size={18} />
              </button>
              <div className="relative aspect-[2/1] overflow-hidden">
                <img src={article.image} alt={article.imageAlt || ""} className="w-full h-full object-cover" />
              </div>
              <div className="px-6 md:px-14 py-10 md:py-14">
                <h2 className="font-bold text-ink text-[30px] md:text-[42px] leading-[1.12]">
                  {article.title}
                </h2>
                <p className="mt-6 text-[19px] md:text-[21px] leading-[1.6] text-cta italic font-medium pr-5 border-r-[3px] border-sage">
                  {article.lead}
                </p>
                <div className="mt-8 space-y-5 text-[17px] leading-[1.95] text-ink-soft">
                  {article.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                {article.sources && article.sources.length > 0 &&
              <div className="mt-10 pt-6 border-t border-line">
                    <div className="eyebrow mb-4">מקורות</div>
                    <ul className="space-y-1.5 text-[14px] text-ink-mute leading-[1.7]">
                      {article.sources.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
              }
                {article.extra &&
              <a href={article.extra.href} target="_blank" rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 border border-sage rounded-full px-5 py-3 text-sage-deep hover:bg-sage hover:text-white transition">
                    <span className="text-[14px]">{article.extra.label}</span>
                    <I.ArrowL size={14} />
                  </a>
              }
              </div>
            </div>
          </div>
        </div>
      }
    </section>);
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact — white rounded card: form (left) + details with green icons (right)
// ─────────────────────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "אשמח לדעת איך לפנות אליך";
    if (!/^[\d\s+\-()]{8,}$/.test(form.phone.trim())) e.phone = "מספר טלפון לא נראה תקין";
    if (form.message.trim().length < 5) e.message = "כתבו משפט קצר ואחזור אליכם";
    return e;
  };
  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setSent(true);
  };

  const details = [
  { href: telHref, icon: <I.Phone size={17} />, t: CONTACT.phone, ltr: true },
  { href: waHref, ext: true, icon: <I.Whatsapp size={17} stroke={0} />, t: "שלחו הודעה בוואטסאפ" },
  { href: `mailto:${CONTACT.email}`, icon: <I.Mail size={17} />, t: CONTACT.email },
  { href: "#", icon: <I.Pin size={17} />, t: "קרליבך, תל-אביב · ומפגשי אונליין" }];

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="max-w-[1160px] mx-auto px-6 lg:px-10">
        <div className="card !rounded-[34px] p-7 md:p-12 grid md:grid-cols-12 gap-10 md:gap-14 items-start">
          {/* details — right (RTL first) */}
          <div className="md:col-span-5 order-1 text-right">
            <Reveal>
              <h2 className="display text-[30px] md:text-[40px] leading-[1.1]">מחכה לשמוע ממך</h2>
              <p className="mt-5 text-[16px] text-ink-soft leading-[1.95]">
                כל פנייה מתקבלת בחום ובדיסקרטיות מלאה. אפשר להשאיר פרטים כאן, או פשוט להרים
                טלפון לשיחה קצרה כדי להכיר ולבדוק התאמה.
              </p>

              <div className="mt-9 space-y-4">
                {details.map((r, i) =>
                <a key={i} href={r.href} {...r.ext ? { target: "_blank", rel: "noreferrer" } : {}}
                className="group flex items-center gap-3.5">
                    <span className="w-11 h-11 rounded-full bg-sage-mist text-sage-deep grid place-items-center shrink-0 group-hover:bg-sage-deep group-hover:text-white transition">{r.icon}</span>
                    <span className="text-[15.5px] text-ink font-medium" {...r.ltr ? { dir: "ltr" } : {}}>{r.t}</span>
                  </a>
                )}
              </div>
            </Reveal>
          </div>

          {/* form — left */}
          <div className="md:col-span-7 order-2">
            <Reveal>
              {!sent ?
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                  <div>
                    <input className={`field !rounded-2xl !py-4 !bg-sand/50 ${errors.name ? "invalid" : ""}`} type="text"
                  value={form.name} onChange={set("name")} placeholder="שם מלא" />
                    {errors.name && <span className="block text-[12px] text-cta mt-1.5">{errors.name}</span>}
                  </div>
                  <div>
                    <input className={`field !rounded-2xl !py-4 !bg-sand/50 ${errors.phone ? "invalid" : ""}`} type="tel" dir="rtl"
                  value={form.phone} onChange={set("phone")} placeholder="טלפון" />
                    {errors.phone && <span className="block text-[12px] text-cta mt-1.5">{errors.phone}</span>}
                  </div>
                  <div>
                    <input className="field !rounded-2xl !py-4 !bg-sand/50" type="email"
                  value={form.email} onChange={set("email")} placeholder="דואר אלקטרוני" />
                  </div>
                  <div>
                    <textarea className={`field !rounded-2xl !bg-sand/50 min-h-[140px] ${errors.message ? "invalid" : ""}`} rows={5}
                  value={form.message} onChange={set("message")} placeholder="איך אוכל לעזור?" />
                    {errors.message && <span className="block text-[12px] text-cta mt-1.5">{errors.message}</span>}
                  </div>
                  <button type="submit" className="btn btn-primary w-full !rounded-2xl">שליחת פנייה</button>
                </form> :

              <div className="py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-sage-deep text-white grid place-items-center mb-6 mx-auto">
                    <I.Check size={28} stroke={2} />
                  </div>
                  <h3 className="font-bold text-ink text-[28px] mb-2">תודה {form.name.trim().split(" ")[0]}</h3>
                  <p className="text-[17px] text-ink-soft leading-[1.8] max-w-md mx-auto">
                    קיבלתי את ההודעה. אחזור אליכם בהקדם. בינתיים תנו לעצמכם את הזמן, נשמה.
                  </p>
                  <button onClick={() => {setSent(false);setForm({ name: "", phone: "", email: "", message: "" });}}
                className="btn btn-ghost mt-6">שליחת פנייה נוספת</button>
                </div>
              }
            </Reveal>
          </div>
        </div>
      </div>
    </section>);
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-cream-2 pt-20 pb-32 md:pb-16 relative border-t border-line">
      <div className="max-w-[1180px] mx-auto px-6 text-center">
        <BrandMark size={66} className="mx-auto" />
        <div className="mt-4 font-bold text-ink text-[24px]">מיטל עוז · M.A</div>
        <p className="mt-3 italic text-[17px] text-ink-soft max-w-md mx-auto leading-relaxed">
          ״טיפול רגשי בגובה העיניים, מחובר למציאות היום-יומית — ובקצב שלך.״
        </p>

        <div className="mt-7 flex items-center justify-center gap-4">
          <a href={CONTACT.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook"
          className="w-11 h-11 rounded-full border border-sage text-sage-deep grid place-items-center hover:bg-sage-deep hover:text-white hover:border-sage-deep transition">
            <I.Facebook size={18} stroke={0} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"
          className="w-11 h-11 rounded-full border border-sage text-sage-deep grid place-items-center hover:bg-sage-deep hover:text-white hover:border-sage-deep transition">
            <I.Instagram size={18} />
          </a>
          <a href={waHref} target="_blank" rel="noreferrer" aria-label="WhatsApp"
          className="w-11 h-11 rounded-full border border-sage text-sage-deep grid place-items-center hover:bg-sage-deep hover:text-white hover:border-sage-deep transition">
            <I.Whatsapp size={18} stroke={0} />
          </a>
        </div>

        <a href={telHref} className="mt-6 inline-block font-bold text-cta text-[22px] tracking-wide" dir="ltr">
          {CONTACT.phone}
        </a>

        <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[14.5px] text-ink-soft">
          <a href="#about" className="hover:text-cta transition">אודות</a>
          <a href="#approach" className="hover:text-cta transition">הגישה הטיפולית</a>
          <a href="#thoughts" className="hover:text-cta transition">מחשבות על...</a>
          <a href="#contact" className="hover:text-cta transition">יצירת קשר</a>
          <a href={CONTACT.tvUrl} target="_blank" rel="noreferrer" className="hover:text-cta transition">כתבה בחדשות 13</a>
        </nav>

        <div className="mt-9 pt-6 border-t border-line text-[12.5px] text-ink-mute">
          © {new Date().getFullYear()} מיטל עוז · כל הזכויות שמורות · {CONTACT.email}
        </div>
      </div>
    </footer>);
}

// ─────────────────────────────────────────────────────────────────────────────
// Sticky CTA
// ─────────────────────────────────────────────────────────────────────────────
function StickyCTA({ ctaText, showDesktopBar }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className={`only-mobile cta-bubble transition-all duration-300 ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}>
        <a href={waHref} target="_blank" rel="noreferrer" aria-label="פנייה בוואטסאפ"
        className="blob-btn" style={{ background: "#25D366" }}>
          <I.Whatsapp size={26} stroke={0} />
        </a>
        <a href={telHref} aria-label="חיוג" className="blob-btn" style={{ background: "#B96F45" }}>
          <I.Phone size={22} />
        </a>
      </div>

      {showDesktopBar &&
      <div className={`only-desktop cta-bar transition-all duration-300 ${shown ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}>
          <div className="max-w-[1180px] mx-auto px-8 py-3 flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <BrandMark size={38} />
              <div className="leading-tight">
                <div className="font-bold text-ink text-[16px]">אני כאן בשבילך</div>
                <div className="text-[12px] text-ink-mute">מוזמנים להתייעץ — בדיסקרטיות מלאה</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a href={telHref} className="btn btn-ghost !py-2.5 !px-6 !text-[15px]"><I.Phone size={15} /> <span dir="ltr">{CONTACT.phone}</span></a>
              <a href={waHref} target="_blank" rel="noreferrer" className="btn btn-primary !py-2.5 !px-6 !text-[15px]">{ctaText}</a>
            </div>
          </div>
        </div>
      }
    </>);
}

// ─────────────────────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    let s = document.getElementById("__font-override");
    if (!s) {s = document.createElement("style");s.id = "__font-override";document.head.appendChild(s);}
    s.textContent = `h1,h2,h3,h4,.display,.display-lg { font-family: '${t.displayFont}', 'Noto Sans Hebrew', 'Assistant', sans-serif !important; }`;
  }, [t.displayFont]);

  return (
    <div className="relative">
      <TopNav ctaText={t.ctaText} />
      <main>
        <Hero ctaText={t.ctaText} openingQuote={t.openingQuote} />
        <CrisisIntro />
        <About />
        <QuoteBand style={{ backgroundColor: "rgb(231, 236, 222)" }}>
          אני מאמינה שטיפול רגשי צריך להיות — בגובה העיניים, ומחובר למציאות היום-יומית.
        </QuoteBand>
        <SpecialtiesStrip />
        <Approach />
        <Thoughts />
        <ContactForm />
      </main>
      <Footer />
      <StickyCTA ctaText={t.ctaText} showDesktopBar={t.showStickyDesktopBar} />

      <TweaksPanel title="התאמות עיצוב">
        <TweakSection label="כפתור ראשי" />
        <TweakText label="טקסט CTA" value={t.ctaText} onChange={(v) => setTweak("ctaText", v)} />

        <TweakSection label="ציטוט פתיחה" />
        <TweakRadio label="מקור" value={t.openingQuote}
        options={["frankl", "yalom"]}
        onChange={(v) => setTweak("openingQuote", v)} />

        <TweakSection label="טיפוגרפיה" />
        <TweakRadio label="פונט כותרות" value={t.displayFont}
        options={["Assistant", "Heebo", "Noto Sans Hebrew", "Alef", "Frank Ruhl Libre"]}
        onChange={(v) => setTweak("displayFont", v)} />

        <TweakSection label="CTA דביק" />
        <TweakToggle label="פס תחתון בדסקטופ" value={t.showStickyDesktopBar}
        onChange={(v) => setTweak("showStickyDesktopBar", v)} />
      </TweaksPanel>
    </div>);
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);