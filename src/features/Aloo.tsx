import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface MenuItem {
  name: string;
  desc: string;
  price: string;
  badge?: string;
  badgeNew?: boolean;
  gradient: string;
  icon: string;
}
interface Category {
  id: string;
  label: string;
  icon: string;
  items: MenuItem[];
}
const CATEGORIES: Category[] = [
  {
    id: "calientes", label: "Cafés Calientes", icon: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=200&h=200&fit=crop",
    items: [
      { name: "Latte de Vainilla", desc: "Espresso doble con leche vaporizada y esencia de vainilla artesanal. Suave, dulce y reconfortante.", price: "$75", badge: "Popular", gradient: "from-[#5C3D2E] via-[#8B6249] to-[#E8C9A0]", icon: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=200&h=200&fit=crop" },
      { name: "Cappuccino Clásico", desc: "Espresso, leche texturizada y espuma cremosa en proporciones perfectas. El clásico de siempre.", price: "$65", gradient: "from-[#3D2010] via-[#6B4B3E] to-[#C4906A]", icon: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=200&h=200&fit=crop" },
      { name: "Cortado de Avellana", desc: "Espresso cortado con leche vaporizada y toque de avellana tostada. Intenso, aromático y elegante.", price: "$70", badge: "Nuevo", badgeNew: true, gradient: "from-[#4A2E1A] via-[#7A5040] to-[#D4A070]", icon: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&h=200&fit=crop" },
      { name: "Flat White", desc: "Ratio restringido, microespuma sedosa, para quien conoce el café de verdad.", price: "$78", badge: "Firma", gradient: "from-[#3A2215] via-[#6B4230] to-[#C48860]", icon: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "frios", label: "Cafés Fríos", icon: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=200&h=200&fit=crop",
    items: [
      { name: "Cold Brew", desc: "24 horas de extracción en frío. Suave, intenso y sin acidez. Servido con hielo y leche de avena.", price: "$80", badge: "Favorito", gradient: "from-[#1A0D05] via-[#4A3020] to-[#C09060]", icon: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&h=200&fit=crop" },
      { name: "Iced Latte Caramelo", desc: "Espresso, leche fría y caramelo artesanal sobre hielo. La bebida perfecta para el calor tapatío.", price: "$78", gradient: "from-[#3D2510] via-[#7A5535] to-[#E0C090]", icon: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=200&h=200&fit=crop" },
      { name: "Dalgona Frío", desc: "Espuma batida de café sobre leche fría. Instagrammable, cremoso y delicioso en cada sorbo.", price: "$85", badge: "Nuevo", badgeNew: true, gradient: "from-[#2A1508] via-[#5C3C25] to-[#C49870]", icon: "https://images.unsplash.com/photo-1593443320739-77f74939d0da?w=200&h=200&fit=crop" },
      { name: "Espresso Tonic", desc: "Doble espresso sobre agua tónica artesanal y hielo. Refrescante y complejo.", price: "$90", gradient: "from-[#1E1008] via-[#3A2518] to-[#A07040]", icon: "https://images.unsplash.com/photo-1557142046-c704a3adf364?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "matcha", label: "Matcha", icon: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=200&h=200&fit=crop",
    items: [
      { name: "Matcha Latte", desc: "Matcha ceremonial japonés con leche vaporizada. Terroso, cremoso y absolutamente reconfortante.", price: "$85", badge: "Favorito", gradient: "from-[#2A3E2C] via-[#4A7050] to-[#B0D0B0]", icon: "https://images.unsplash.com/photo-1536514072410-5019a3c69182?w=200&h=200&fit=crop" },
      { name: "Iced Matcha", desc: "Matcha frío con leche de avena sobre hielo. Suave, verde y refrescante. El favorito del verano.", price: "$88", gradient: "from-[#344A36] via-[#587860] to-[#C0D8C0]", icon: "https://images.unsplash.com/photo-1589476993333-f55b84301219?w=200&h=200&fit=crop" },
      { name: "Matcha Affogato", desc: "Helado de vainilla con shot de matcha ceremonial. Una fusión inesperada que enamora desde el primer sorbo.", price: "$95", badge: "Nuevo", badgeNew: true, gradient: "from-[#1E3020] via-[#3C6045] to-[#A0C8A0]", icon: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "postres", label: "Postres", icon: "https://images.unsplash.com/photo-1551024506-0bc4a10508b5?w=200&h=200&fit=crop",
    items: [
      { name: "Cheesecake Japonesa", desc: "Cheesecake esponjosa estilo japonés. Ligera, suave y con un toque de vainilla bourbon natural.", price: "$70", badge: "Popular", gradient: "from-[#6A5038] via-[#9A8060] to-[#EAD8A8]", icon: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=200&h=200&fit=crop" },
      { name: "Croissant de Mantequilla", desc: "Hojaldre artesanal, dorado y crujiente. Con mantequilla francesa y mermelada de temporada.", price: "$55", gradient: "from-[#504030] via-[#806050] to-[#D8C090]", icon: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&h=200&fit=crop" },
      { name: "Brownie Salted Caramel", desc: "Brownie húmedo de chocolate 70% con caramelo salado y sal de mar. Adictivo en cada bocado.", price: "$65", badge: "Nuevo", badgeNew: true, gradient: "from-[#301A0A] via-[#60382A] to-[#C08860]", icon: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&h=200&fit=crop" },
      { name: "Tarta de Limón", desc: "Masa sucrée, crema de limón meyer, merengue flameado al momento.", price: "$78", gradient: "from-[#3A3010] via-[#706030] to-[#D4C060]", icon: "https://images.unsplash.com/photo-1519869325930-281384150729?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "brunch", label: "Brunch", icon: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=200&h=200&fit=crop",
    items: [
      { name: "Avocado Toast Aloó", desc: "Pan sourdough tostado, aguacate cremoso, huevo estrellado, chile de árbol, limón y semillas.", price: "$120", badge: "Popular", gradient: "from-[#505828] via-[#848040] to-[#DDD890]", icon: "https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=200&h=200&fit=crop" },
      { name: "Eggs Benedict", desc: "Muffin inglés, jamón serrano, huevo pochado y salsa holandesa casera. Un brunch de revista.", price: "$145", gradient: "from-[#604820] via-[#907040] to-[#E0C888]", icon: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=200&h=200&fit=crop" },
      { name: "Pancakes de Matcha", desc: "Pancakes esponjosas con matcha, frutos rojos frescos, crema y miel de maple artesanal.", price: "$135", badge: "Nuevo", badgeNew: true, gradient: "from-[#384830] via-[#607850] to-[#BED0A8]", icon: "https://images.unsplash.com/photo-1528207776546-3221864817a0?w=200&h=200&fit=crop" },
      { name: "Bowl de Granola", desc: "Granola artesanal, yogurt griego, fruta de temporada, miel de agave.", price: "$95", gradient: "from-[#5A4028] via-[#8A7050] to-[#D8C090]", icon: "https://images.unsplash.com/photo-1511690656956-5ef183d20e29?w=200&h=200&fit=crop" },
    ],
  },
];

const RIBBON_ITEMS = [
  "Café de Especialidad", "Brunch Artesanal", "Matcha Ceremonial",
  "Pet Friendly", "WiFi Ilimitado", "Colonia Americana · GDL",
  "Specialty Coffee", "Postres Artesanales",
];

const FEATURES = [
  { icon: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200&h=200&fit=crop", title: "Pet Friendly", desc: "Tu mejor amigo también es bienvenido. Tenemos agua fresca y snacks para ellos en la terraza." },
  { icon: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&h=200&fit=crop", title: "WiFi Rápido", desc: "Fibra óptica de alta velocidad para trabajar, estudiar o hacer videollamadas sin interrupciones." },
  { icon: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=200&h=200&fit=crop", title: "Specialty Coffee", desc: "Café de especialidad con origen trazable. Baristas entrenados que realmente aman lo que hacen." },
  { icon: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=200&fit=crop", title: "Ambiente Único", desc: "Decoración vintage, plantas, luz natural y música curada. Un espacio diseñado para sentirte bien." },
  { icon: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&h=200&fit=crop", title: "Ideal para Trabajar", desc: "Mesas amplias, enchufes disponibles y el ambiente perfecto para ser creativo y productivo." },
  { icon: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=200&h=200&fit=crop", title: "Col. Americana", desc: "En el corazón del barrio más bohemio de Guadalajara. A pasos de todo lo que te gusta." },
];

const STATS = [
  { num: "+3000", label: "Clientes felices" },
  { num: "12+", label: "Orígenes de café" },
  { num: "4.9★", label: "Google Maps" },
  { num: "100%", label: "Hecho con amor" },
];

const GALLERY = [
  { label: "Latte art del día", icon: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=400&fit=crop", grad: "from-[#5C3020] via-[#8B6249] to-[#E8CFA8]", tall: true },
  { label: "Matcha ceremonial", icon: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=400&h=400&fit=crop", grad: "from-[#2A3E2C] via-[#4A7050] to-[#8AB090]", tall: false },
  { label: "Avocado toast", icon: "https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=400&h=400&fit=crop", grad: "from-[#485028] via-[#788050] to-[#B0B878]", tall: false },
  { label: "Interior vintage", icon: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=400&fit=crop", grad: "from-[#3D2515] via-[#7A5040] to-[#E8D0A8]", wide: true },
  { label: "Postres artesanales", icon: "https://images.unsplash.com/photo-1551024506-0bc4a10508b5?w=400&h=400&fit=crop", grad: "from-[#3A2510] via-[#6A5038] to-[#D4B080]", tall: true },
  { label: "Cold brew", icon: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop", grad: "from-[#1E1008] via-[#4A3020] to-[#8A6040]", tall: false },
];
// ─── Hooks ────────────────────────────────────────────────────────────────────
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const scrollY = useScrollY();
  const scrolled = scrollY > 60;
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { label: "Inicio", id: "inicio" },
    { label: "Menú", id: "menu" },
    { label: "Nosotros", id: "nosotros" },
    { label: "Galería", id: "galeria" },
    { label: "Ubicación", id: "ubicacion" },
    { label: "Contacto", id: "contacto" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#faf6f0]/95 backdrop-blur-md border-b border-[#c9b09a]/20 py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => go("inicio")} className="flex items-center gap-2 cursor-pointer">
            <span className={`font-bold text-lg transition-colors duration-400 ${scrolled ? "text-[#c9a87c]" : "text-[#e8c99a]"}`}>✦</span>
            <span className={`font-bold text-xl tracking-wide transition-colors duration-400 ${scrolled ? "text-[#2a1a0e]" : "text-[#faf3e8]"}`}
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Aloó<em className="not-italic font-normal">Café</em>
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={`text-xs tracking-[0.15em] uppercase font-light transition-colors duration-300 cursor-pointer ${scrolled ? "text-[#6b4c33] hover:text-[#2a1a0e]" : "text-[#e8d5bc]/80 hover:text-[#faf3e8]"}`}
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden flex flex-col gap-[5px] p-2 cursor-pointer ${scrolled ? "text-[#2a1a0e]" : "text-[#faf3e8]"}`}
            aria-label="Menú"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className="block w-6 h-[1.5px] bg-current transition-all duration-300" style={{
                transform: open && i === 0 ? "translateY(6.5px) rotate(45deg)" : open && i === 2 ? "translateY(-6.5px) rotate(-45deg)" : open && i === 1 ? "scaleX(0)" : "none",
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-40 bg-[#faf6f0] flex flex-col items-center justify-center gap-8 transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}>
        {links.map((l, i) => (
          <button
            key={l.id}
            onClick={() => go(l.id)}
            className="text-3xl text-[#2a1a0e] cursor-pointer bg-transparent border-0 transition-all duration-300"
            style={{
              fontFamily: "'Playfair Display', serif",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(16px)",
              transitionDelay: `${i * 60 + 150}ms`,
            }}
          >
            {l.label}
          </button>
        ))}
        <p className="text-xs tracking-[0.2em] text-[#a08060] mt-4" style={{ fontFamily: "'Jost', sans-serif" }}>
          GDL · COLONIA AMERICANA
        </p>
      </div>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const scrollY = useScrollY();
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section id="inicio" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Parallax bg */}
      <div
        className="absolute inset-[-10%] bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1800&q=85')",
          transform: `translateY(${scrollY * 0.3}px)`,
          filter: "brightness(0.5) saturate(0.85)",
        }}
      />
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e1208]/30 via-[#3c230f]/10 to-[#1e1208]/60" />

      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#c4956a]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#8b6249]/10 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative text-center px-6 max-w-3xl">
        <p className="text-xs tracking-[0.3em] uppercase text-[#e8c99a]/70 mb-5 transition-all duration-700 delay-200"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(10px)", fontFamily: "'Jost', sans-serif" }}>
          Colonia Americana · Guadalajara
        </p>
        <h1 className="text-[clamp(2.8rem,9vw,6.5rem)] font-bold text-[#faf3e8] leading-[1.0] mb-7 tracking-tight transition-all duration-1000 delay-300"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", fontFamily: "'Playfair Display', serif" }}>
          Donde cada taza<br /><em className="font-normal">cuenta una historia</em>
        </h1>
        <p className="text-[clamp(1rem,2.2vw,1.35rem)] text-[#e8d5bc]/80 font-light mb-10 leading-relaxed transition-all duration-700 delay-500"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", fontFamily: "'Cormorant Garamond', serif" }}>
          Café de especialidad, brunch artesanal y un rincón que se siente como casa.
        </p>
        <div className="flex flex-wrap gap-4 justify-center transition-all duration-700 delay-700"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)" }}>
          <button onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 bg-[#c9a87c] text-[#1a0f07] text-xs tracking-[0.18em] uppercase font-medium hover:bg-[#d4b888] transition-colors duration-300 cursor-pointer border-0"
            style={{ fontFamily: "'Jost', sans-serif" }}>
            Ver menú
          </button>
          <button onClick={() => document.getElementById("nosotros")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 border border-[#faf3e8]/40 text-[#faf3e8] text-xs tracking-[0.18em] uppercase font-light hover:bg-[#faf3e8]/10 hover:border-[#faf3e8]/70 transition-all duration-300 cursor-pointer bg-transparent"
            style={{ fontFamily: "'Jost', sans-serif" }}>
            Nuestra esencia
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-1000 delay-[1200ms]"
        style={{ opacity: loaded ? 0.5 : 0 }}>
        <span className="text-[#faf3e8] text-[0.6rem] tracking-[0.25em] uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>Scroll</span>
        <div className="w-px h-12 bg-[#faf3e8]/50" style={{ animation: "scrollPulse 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

// ─── Ribbon ───────────────────────────────────────────────────────────────────
function Ribbon() {
  const items = [...RIBBON_ITEMS, ...RIBBON_ITEMS];
  return (
    <div className="overflow-hidden bg-[#2a1a0e] py-4 border-y border-[#c9a87c]/20">
      <div className="flex gap-0" style={{ animation: "ribbonScroll 28s linear infinite", width: "max-content" }}>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-5 whitespace-nowrap px-1">
            <span className="text-[#faf3e8]/80 text-sm tracking-[0.08em]" style={{ fontFamily: "'Jost', sans-serif" }}>{item}</span>
            <span className="text-[#c9a87c] text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="nosotros" className="py-28 bg-[#faf6f0]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Visual */}
          <Reveal className="flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Coffee cup illustration */}
              <div className="relative bg-gradient-to-br from-[#e8d5bc] via-[#d4b896] to-[#c4956a] rounded-sm overflow-hidden aspect-[4/5] flex items-center justify-center">
                <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-56">
                  <path d="M68 40 Q72 24 68 10 Q64 20 68 40" stroke="#5C3A2A" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.4" />
                  <path d="M100 33 Q105 14 100 2 Q95 14 100 33" stroke="#5C3A2A" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.55" />
                  <path d="M132 40 Q136 24 132 10 Q128 20 132 40" stroke="#5C3A2A" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.4" />
                  <ellipse cx="100" cy="208" rx="68" ry="8" fill="rgba(46,26,15,.15)" />
                  <ellipse cx="100" cy="202" rx="66" ry="10" fill="#8B6249" opacity="0.4" />
                  <ellipse cx="100" cy="202" rx="66" ry="10" stroke="#5C3A2A" strokeWidth="2" fill="none" />
                  <ellipse cx="100" cy="202" rx="44" ry="6" fill="#7A5438" opacity="0.25" stroke="#5C3A2A" strokeWidth="1.5" />
                  <path d="M42 62 L58 190 Q100 206 142 190 L158 62 Z" fill="#8B6249" opacity="0.2" />
                  <path d="M42 62 L58 190 Q100 206 142 190 L158 62 Z" stroke="#5C3A2A" strokeWidth="2.5" fill="none" />
                  <ellipse cx="100" cy="65" rx="58" ry="13" fill="#5C3A2A" opacity="0.5" />
                  <ellipse cx="100" cy="63" rx="58" ry="13" fill="#8B6249" opacity="0.35" />
                  <ellipse cx="100" cy="63" rx="58" ry="13" stroke="#5C3A2A" strokeWidth="2" fill="none" />
                  <circle cx="100" cy="67" r="28" stroke="#faf3e8" strokeWidth="1.5" fill="none" opacity="0.5" />
                  <ellipse cx="100" cy="67" rx="18" ry="10" stroke="#faf3e8" strokeWidth="1.5" fill="none" opacity="0.4" transform="rotate(-15 100 67)" />
                  <path d="M82 63 Q100 52 118 63 Q100 74 82 63" stroke="#faf3e8" strokeWidth="1.5" fill="none" opacity="0.5" />
                  <circle cx="100" cy="67" r="6" fill="#faf3e8" opacity="0.35" />
                  <path d="M158 95 Q192 95 192 138 Q192 178 158 168" stroke="#5C3A2A" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M158 105 Q180 105 180 138 Q180 168 158 160" stroke="#5C3A2A" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.35" />
                </svg>
                {/* Decorative elements */}
                <div className="absolute top-6 left-6 w-3 h-3 rounded-full border border-[#5C3A2A]/30" />
                <div className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-[#5C3A2A]/20" />
              </div>
              {/* Tag */}
              <div className="absolute -bottom-4 left-6 bg-[#2a1a0e] text-[#c9a87c] text-xs tracking-[0.15em] uppercase px-4 py-2"
                style={{ fontFamily: "'Jost', sans-serif" }}>
                Est. 2022 · Col. Americana
              </div>
              {/* Decorative square */}
              <div className="absolute -top-4 -right-4 w-28 h-28 border border-[#c9b09a]/40 -z-10" />
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={150}>
            <p className="text-[0.68rem] tracking-[0.25em] uppercase text-[#a08060] mb-5" style={{ fontFamily: "'Jost', sans-serif" }}>
              Nuestra esencia
            </p>
            <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-bold text-[#2a1a0e] leading-[1.15] mb-7"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Un espacio que<br /><em className="font-normal">respira café</em>
            </h2>
            <p className="text-[#6b5240] font-light leading-[1.85] mb-5" style={{ fontFamily: "'Jost', sans-serif" }}>
              Aloó nació con una idea simple: crear un lugar donde el café sea el pretexto para vivir momentos que valen. Cada grano es seleccionado con amor, cada receta pensada para sorprenderte.
            </p>
            <p className="text-[#6b5240] font-light leading-[1.85] mb-10" style={{ fontFamily: "'Jost', sans-serif" }}>
              Aquí el tiempo pasa diferente. Llega con tu laptop, con tus amigos, con un libro o solo con las ganas de tomar algo increíble. Siempre habrá un lugar para ti.
            </p>

            <div className="flex flex-col gap-5 mb-10">
              {[
                ["01", "Specialty coffee de origen único y trazable"],
                ["02", "Brunch y postres hechos con ingredientes frescos"],
                ["03", "Ambiente diseñado para quedarse y desconectarse"],
              ].map(([num, text]) => (
                <div key={num} className="flex items-start gap-5">
                  <span className="text-[#c9a87c] text-sm font-bold tabular-nums shrink-0 mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>{num}</span>
                  <span className="text-[#6b5240] text-sm leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>{text}</span>
                </div>
              ))}
            </div>

            <button onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-[#2a1a0e] border border-[#2a1a0e] px-6 py-3.5 hover:bg-[#2a1a0e] hover:text-[#faf3e8] transition-all duration-300 cursor-pointer bg-transparent"
              style={{ fontFamily: "'Jost', sans-serif" }}>
              Explorar el menú →
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  return (
    <Reveal>
      <div className="bg-[#3d2b1a] py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[#faf3e8]/10">
            {STATS.map((s) => (
              <div key={s.label} className="text-center py-4 px-6">
                <p className="text-2xl md:text-3xl font-bold text-[#c9a87c] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{s.num}</p>
                <p className="text-xs tracking-[0.12em] uppercase text-[#faf3e8]/50" style={{ fontFamily: "'Jost', sans-serif" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Menu ─────────────────────────────────────────────────────────────────────
function MenuSection() {
  const [active, setActive] = useState("calientes");
  const current = CATEGORIES.find((c) => c.id === active)!;

  return (
    <section id="menu" className="py-28 bg-[#f5ede2]">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="text-[0.68rem] tracking-[0.25em] uppercase text-[#a08060] mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
            Lo que más nos piden
          </p>
          <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-bold text-[#2a1a0e] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            El <em className="font-normal">menú</em>
          </h2>
          <p className="text-[#8b6b50] font-light max-w-md mx-auto leading-relaxed text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>
            Cada producto es una pequeña obra. Hecho con los mejores ingredientes, con tiempo y con ganas.
          </p>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={100} className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs tracking-[0.1em] uppercase transition-all duration-250 cursor-pointer border ${active === cat.id
                  ? "bg-[#2a1a0e] text-[#faf3e8] border-[#2a1a0e]"
                  : "bg-transparent text-[#8b6b4a] border-[#c9b09a] hover:border-[#8b6b4a]"
                  }`}
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                  <img
                    src={cat.icon}
                    alt={cat.label}
                    className="h-5 w-5 rounded-full object-cover"
                    loading="lazy"
                  />
                  {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {current.items.map((item, i) => (
            <Reveal key={`${active}-${i}`} delay={i * 70}>
              <article className="group bg-[#faf6f0] overflow-hidden hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#3d2b1a]/10 transition-all duration-350 flex flex-col h-full">
                {/* Card image area */}
                <div className="relative overflow-hidden">
                  <div className={`h-44 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {item.badge && (
                    <span className={`absolute top-3 left-3 text-[0.6rem] tracking-[0.12em] uppercase px-2.5 py-1 ${item.badgeNew ? "bg-[#4a7050] text-[#e0f0e0]" : "bg-[#c9a87c] text-[#1a0f07]"
                      }`} style={{ fontFamily: "'Jost', sans-serif" }}>
                      {item.badge}
                    </span>
                  )}
                </div>
                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-semibold text-[#2a1a0e] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.name}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#8b6b50] font-light mb-4 flex-1" style={{ fontFamily: "'Jost', sans-serif" }}>
                    {item.desc}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#e8d5bc]/60">
                    <span className="text-lg font-bold text-[#3d2b1a]" style={{ fontFamily: "'Playfair Display', serif" }}>{item.price}</span>
                    <button className="w-8 h-8 rounded-full bg-[#2a1a0e] text-[#faf3e8] text-lg flex items-center justify-center hover:bg-[#c9a87c] hover:text-[#1a0f07] transition-colors duration-250 cursor-pointer border-0 leading-none">
                      +
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
function Gallery() {
  return (
    <section id="galeria" className="py-28 bg-[#faf6f0]">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <Reveal className="text-center">
          <p className="text-[0.68rem] tracking-[0.25em] uppercase text-[#a08060] mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
            Vive la experiencia
          </p>
          <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-bold text-[#2a1a0e]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Un lugar para <em className="font-normal">fotografiar</em>
          </h2>
        </Reveal>
      </div>

      {/* Masonry */}
      <div className="px-4 md:px-6 max-w-6xl mx-auto" style={{ columns: "3 240px", columnGap: "12px" }}>
        {GALLERY.map((g, i) => (
          <Reveal key={i} delay={i * 60}>
            <div
              className="group relative overflow-hidden cursor-pointer mb-3"
              style={{ breakInside: "avoid", height: g.tall ? "360px" : g.wide ? "220px" : "240px" }}
            >
              <img
                src={g.icon}
                alt={g.label}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${g.grad} opacity-40`} />
              <div className="absolute inset-0 flex items-end">
                <p className="p-4 text-[#faf3e8]/90 text-sm" style={{ fontFamily: "'Jost', sans-serif" }}>{g.label}</p>
              </div>
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#1a0f07]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex items-center justify-center">
                <span className="text-[#faf3e8] text-sm tracking-[0.1em]" style={{ fontFamily: "'Jost', sans-serif" }}>{g.label}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* CTA */}
      <Reveal className="text-center mt-12">
        <p className="text-[#8b6b50] text-sm mb-5" style={{ fontFamily: "'Jost', sans-serif" }}>
          Síguenos en Instagram para más momentos
        </p>
        <a
          href="https://www.instagram.com/aloocafe.gdl/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs tracking-[0.12em] uppercase px-6 py-3 hover:opacity-90 transition-opacity duration-300"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          @aloocafe.gdl
        </a>
      </Reveal>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  return (
    <section className="py-28 bg-[#f5ede2]">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="text-[0.68rem] tracking-[0.25em] uppercase text-[#a08060] mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
            Por qué volver
          </p>
          <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-bold text-[#2a1a0e]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Una experiencia <em className="font-normal">completa</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#c9b09a]/20">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="group bg-[#faf6f0] p-8 hover:bg-[#2a1a0e] transition-colors duration-400 cursor-default">
                <div className="mb-5 h-14 w-14 overflow-hidden rounded-full ring-1 ring-[#c9b09a]/50 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={f.icon}
                    alt={f.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-semibold text-[#2a1a0e] group-hover:text-[#c9a87c] mb-3 transition-colors duration-300 text-base"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  {f.title}
                </h3>
                <p className="text-[#8b6b50] group-hover:text-[#faf3e8]/60 text-sm leading-relaxed font-light transition-colors duration-300"
                  style={{ fontFamily: "'Jost', sans-serif" }}>
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Quote ────────────────────────────────────────────────────────────────────
function Quote() {
  const scrollY = useScrollY();
  return (
    <section className="relative py-36 overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-[-10%] bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1600&q=80')",
          transform: `translateY(${scrollY * 0.15}px)`,
          filter: "brightness(0.35) saturate(0.7)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f07]/50 to-[#1a0f07]/50" />
      <Reveal className="relative text-center px-6 max-w-2xl">
        <svg className="w-14 h-10 mx-auto mb-8 text-[#c9a87c]/30" viewBox="0 0 66 50" fill="none">
          <path d="M0 50V30.3C0 12.4 10.6 3 31.8 0L35.4 6C26.2 8.1 19.2 12.1 16.2 19.7H28.8V50H0ZM37.9 50V30.3C37.9 12.4 48.5 3 69.7 0L73.3 6C64.1 8.1 57.1 12.1 54.1 19.7H66.7V50H37.9Z" fill="currentColor" />
        </svg>
        <blockquote className="text-[clamp(1.5rem,3.5vw,2.4rem)] text-[#faf3e8] font-light leading-[1.3] mb-8"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          El café no es solo una bebida.<br />
          <em className="text-[#c9a87c]">Es el inicio de algo bueno.</em>
        </blockquote>
        <cite className="text-[#faf3e8]/40 text-xs tracking-[0.2em] uppercase not-italic" style={{ fontFamily: "'Jost', sans-serif" }}>
          — Aloó Café · Guadalajara, Jalisco
        </cite>
      </Reveal>
    </section>
  );
}

// ─── Location ─────────────────────────────────────────────────────────────────
function Location() {
  return (
    <section id="ubicacion" className="py-28 bg-[#faf6f0]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <Reveal>
            <p className="text-[0.68rem] tracking-[0.25em] uppercase text-[#a08060] mb-4" style={{ fontFamily: "'Jost', sans-serif" }}>
              Encuéntranos
            </p>
            <h2 className="text-[clamp(2rem,3.5vw,2.6rem)] font-bold text-[#2a1a0e] mb-12 leading-[1.15]"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Ven a <em className="font-normal">visitarnos</em>
            </h2>

            <div className="flex flex-col gap-8">
              {[
                { icon: "📍", title: "Dirección", content: "Lerdo de Tejada 2073, Colonia Americana\nGuadalajara, Jalisco, C.P. 44160" },
                { icon: "🕐", title: "Horarios", schedule: [["Lun – Vie", "8:00 – 21:00"], ["Sábado", "9:00 – 22:00"], ["Domingo", "9:00 – 20:00"]] },
                { icon: "📞", title: "Contacto", content: "+52 33 1234 5678\nhola@aloocafe.mx" },
              ].map((block) => (
                <div key={block.title} className="flex gap-5">
                  <div className="w-10 h-10 rounded-full bg-[#e8d5bc] flex items-center justify-center text-lg shrink-0 mt-0.5">
                    {block.icon}
                  </div>
                  <div>
                    <strong className="block text-[#2a1a0e] text-sm mb-2 font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {block.title}
                    </strong>
                    {block.schedule ? (
                      <div className="flex flex-col gap-1">
                        {block.schedule.map(([day, time]) => (
                          <div key={day} className="flex justify-between gap-8 text-sm text-[#6b5240] font-light" style={{ fontFamily: "'Jost', sans-serif" }}>
                            <span>{day}</span><span>{time}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-[#6b5240] font-light leading-relaxed whitespace-pre-line" style={{ fontFamily: "'Jost', sans-serif" }}>
                        {block.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-10">
              {["🚗 Estacionamiento cercano", "🚌 Ruta de camión", "🚲 Ciclovía"].map((b) => (
                <span key={b} className="text-xs px-3 py-1.5 border border-[#c9b09a] text-[#8b6b50]" style={{ fontFamily: "'Jost', sans-serif" }}>{b}</span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="overflow-hidden h-[480px]">
              <iframe
                title="Ubicación Aloó Café"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.0548548497!2d-103.37316238503!3d20.66802028614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ae4f8c1c9ef7%3A0x1!2sColonia+Americana%2C+Guadalajara%2C+Jalisco!5e0!3m2!1ses-419!2smx!4v1700000000000"
                width="100%" height="100%"
                style={{ border: "none", filter: "sepia(15%) saturate(85%)" }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://maps.google.com/?q=Colonia+Americana+Guadalajara+Jalisco"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-xs tracking-[0.12em] uppercase text-[#8b6b50] hover:text-[#2a1a0e] transition-colors duration-250"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Abrir en Google Maps →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Contact CTA ──────────────────────────────────────────────────────────────
function ContactCTA() {
  return (
    <section id="contacto" className="py-28 bg-[#2a1a0e]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <p className="text-[0.68rem] tracking-[0.25em] uppercase text-[#8b6b50] mb-5" style={{ fontFamily: "'Jost', sans-serif" }}>
            ¿Listo para venir?
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#faf3e8] mb-6 leading-[1.15]"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Tu próximo café favorito<br /><em className="font-normal text-[#c9a87c]">te está esperando</em>
          </h2>
          <p className="text-[#faf3e8]/50 font-light leading-relaxed mb-12 max-w-md mx-auto" style={{ fontFamily: "'Jost', sans-serif" }}>
            Reserva una mesa, haz tu pedido o simplemente aparece. Siempre hay un lugar para ti en Aloó.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/523312345678?text=Hola!%20Quiero%20hacer%20una%20reservación%20en%20Aloó%20Café"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 text-xs tracking-[0.15em] uppercase hover:bg-[#20bd5a] transition-colors duration-300"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              Reservar por WhatsApp
            </a>
            <a
              href="https://www.instagram.com/aloocafe.gdl/"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#faf3e8]/25 text-[#faf3e8]/75 px-8 py-4 text-xs tracking-[0.15em] uppercase hover:bg-[#faf3e8]/5 hover:border-[#faf3e8]/50 transition-all duration-300"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Ver en Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#120a04] pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-[#c9a87c] font-bold">✦</span>
              <span className="text-[#faf3e8] text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Aloó<em className="font-normal">Café</em>
              </span>
            </div>
            <p className="text-[#6b5240] text-sm leading-relaxed mb-6 font-light" style={{ fontFamily: "'Jost', sans-serif" }}>
              Specialty coffee &amp; brunch artesanal en la Colonia Americana, Guadalajara.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/aloocafe.gdl/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-[#3d2b1a] flex items-center justify-center text-[#6b5240] hover:border-[#c9a87c] hover:text-[#c9a87c] transition-colors duration-250">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://wa.me/523312345678" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-[#3d2b1a] flex items-center justify-center text-[#6b5240] hover:border-[#c9a87c] hover:text-[#c9a87c] transition-colors duration-250">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
              </a>
            </div>
          </div>

          {/* Menú col */}
          <div>
            <h4 className="text-[#faf3e8]/60 text-[0.65rem] tracking-[0.2em] uppercase mb-5 font-medium" style={{ fontFamily: "'Jost', sans-serif" }}>Menú</h4>
            <ul className="flex flex-col gap-2.5">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-[#6b5240] text-sm font-light hover:text-[#c9a87c] transition-colors duration-250 cursor-pointer bg-transparent border-0 p-0 text-left"
                    style={{ fontFamily: "'Jost', sans-serif" }}>
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Horarios */}
          <div>
            <h4 className="text-[#faf3e8]/60 text-[0.65rem] tracking-[0.2em] uppercase mb-5 font-medium" style={{ fontFamily: "'Jost', sans-serif" }}>Horarios</h4>
            <ul className="flex flex-col gap-2">
              {[["Lun – Vie", "8:00 – 21:00"], ["Sábado", "9:00 – 22:00"], ["Domingo", "9:00 – 20:00"]].map(([d, h]) => (
                <li key={d} className="flex justify-between gap-4 text-sm text-[#6b5240] font-light" style={{ fontFamily: "'Jost', sans-serif" }}>
                  <span>{d}</span><span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-[#faf3e8]/60 text-[0.65rem] tracking-[0.2em] uppercase mb-5 font-medium" style={{ fontFamily: "'Jost', sans-serif" }}>Contacto</h4>
            <ul className="flex flex-col gap-2.5">
              {["+52 33 1234 5678", "hola@aloocafe.mx", "Lerdo de Tejada 2073", "Col. Americana, GDL"].map((t) => (
                <li key={t} className="text-[#6b5240] text-sm font-light" style={{ fontFamily: "'Jost', sans-serif" }}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2a1a0e] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#3d2b1a] text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>
            © {new Date().getFullYear()} Aloó Café · Guadalajara, México
          </p>
          <p className="text-[#3d2b1a] text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>
            Specialty Coffee · Brunch · Colonia Americana
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Global CSS injection ──────────────────────────────────────────────────────
function GlobalStyles() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      html { scroll-behavior: smooth; }
      body { background: #faf6f0; overflow-x: hidden; }
      @keyframes scrollPulse {
        0%, 100% { opacity: 0.3; transform: scaleY(1); transform-origin: top; }
        50% { opacity: 0.8; transform: scaleY(0.5); transform-origin: top; }
      }
      @keyframes ribbonScroll {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);
  return null;
}

// ─── Root ─────────────────────────────────────────────────────────────────────
function Aloo() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <Ribbon />
        <About />
        <Stats />
        <MenuSection />
        <Gallery />
        <Features />
        <Quote />
        <Location />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

export default Aloo;