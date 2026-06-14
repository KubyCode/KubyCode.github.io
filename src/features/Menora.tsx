import { useState, useEffect } from "react";

// ─── CONFIGURACIÓN ─────────────────────────────────────────────────
const CONFIG = {
  WHATSAPP_URL: "https://wa.me/521234567890",
  INSTAGRAM_URL: "https://instagram.com/menorapanaderia",
  FACEBOOK_URL: "https://facebook.com/menorapanaderia",
  TELEFONO: "+52 33 1234 5678",
  HORARIO: "Lun – Sáb: 6:00 am – 2:00 pm",
  DIRECCION_PANADERIA: "Calle Independencia 142, Guadalajara, Jalisco",
  GOOGLE_MAPS_URL:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.0!2d-103.349!3d20.659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDM5JzMyLjQiTiAxMDPCsDIwJzU2LjQiVw!5e0!3m2!1ses!2smx!4v1620000000000",
};
// ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Historia", href: "#historia" },
  { label: "Ubicación", href: "#ubicacion" },
  { label: "Contacto", href: "#contacto" },
];

// ─── COMPONENTES UTILITARIOS ────────────────────────────────────────

function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 my-10">
      <div className="h-px bg-amber-800/20 flex-1 max-w-24" />
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className="text-amber-800/40"
      >
        <path
          d="M14 4 C14 4 10 8 14 12 C18 8 14 4 14 4Z"
          fill="currentColor"
        />
        <path
          d="M14 12 C14 12 8 14 10 19 C13 18 14 15 14 12Z"
          fill="currentColor"
        />
        <path
          d="M14 12 C14 12 20 14 18 19 C15 18 14 15 14 12Z"
          fill="currentColor"
        />
        <circle cx="14" cy="22" r="1.5" fill="currentColor" />
      </svg>
      <div className="h-px bg-amber-800/20 flex-1 max-w-24" />
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-xs tracking-[0.25em] uppercase text-amber-700 font-medium mb-3">
      {children}
    </p>
  );
}

// ─── NAVBAR ────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#F7F0E3]/95 shadow-sm backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleLink("#inicio")}
          className="text-[#2C1A0E] font-serif text-xl tracking-wide font-semibold"
          aria-label="Ir al inicio - Menora"
        >
          Menora
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8" role="menubar">
          {NAV_LINKS.map((l) => (
            <li key={l.href} role="none">
              <button
                role="menuitem"
                onClick={() => handleLink(l.href)}
                className="text-[#2C1A0E]/70 hover:text-[#6B3F1A] text-sm tracking-wide transition-colors duration-200"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#2C1A0E] p-1"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open ? (
              <>
                <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-[#F7F0E3] border-t border-amber-900/10 transition-all duration-300 overflow-hidden ${
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-5 py-4 flex flex-col gap-1" role="menu">
          {NAV_LINKS.map((l) => (
            <li key={l.href} role="none">
              <button
                role="menuitem"
                onClick={() => handleLink(l.href)}
                className="w-full text-left text-[#2C1A0E] py-3 text-base border-b border-amber-900/10 last:border-0"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="inicio"
      className="min-h-screen bg-[#F7F0E3] flex flex-col justify-center pt-20 pb-16 px-5"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-amber-700 mb-5 font-medium">
              Panadería artesanal · Guadalajara
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#2C1A0E] leading-tight mb-6">
              Pan hecho
              <br />
              <em className="not-italic text-[#A0622A]">de verdad.</em>
            </h1>
            <p className="text-[#2C1A0E]/65 text-lg leading-relaxed mb-10 max-w-md">
              Birote salado tradicional y pan artesanal recién horneado todos los días.
              Desde la madrugada, con los mismos ingredientes y el mismo cuidado de siempre.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#productos"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#productos")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-block bg-[#6B3F1A] text-[#F7F0E3] px-8 py-3.5 text-sm tracking-wide hover:bg-[#5a3316] transition-colors duration-200 text-center"
              >
                Ver productos
              </a>
              <a
                href="#ubicacion"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#ubicacion")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-block border border-[#6B3F1A]/40 text-[#6B3F1A] px-8 py-3.5 text-sm tracking-wide hover:border-[#6B3F1A] transition-colors duration-200 text-center"
              >
                Cómo llegar
              </a>
            </div>
          </div>

          {/* Imagen birote */}
          <div className="relative flex justify-center md:justify-end">
            <div className="relative w-full max-w-sm md:max-w-none">
              {/* Fondo decorativo */}
              <div className="absolute -top-6 -right-6 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl" />
              {/* Imagen principal con SVG ilustrativo de birote */}
              <div className="relative bg-[#EDE4D0] rounded-sm overflow-hidden aspect-square max-w-xs mx-auto md:max-w-none">
                <BiroteIllustration />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2C1A0E]/40 to-transparent p-6">
                  <p className="text-[#F7F0E3] font-serif text-xl">Birote Salado</p>
                  <p className="text-[#F7F0E3]/70 text-xs tracking-wide mt-0.5">Recién horneado · Todos los días</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicadores de confianza */}
        <div className="mt-16 pt-10 border-t border-amber-900/10 grid grid-cols-3 gap-6">
          {[
            { num: "6 am", label: "Apertura diaria" },
            { num: "100%", label: "Ingredientes naturales" },
            { num: "Fam.", label: "Negocio familiar" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-serif text-2xl text-[#6B3F1A]">{item.num}</p>
              <p className="text-[#2C1A0E]/50 text-xs mt-1 leading-tight">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Ilustración SVG del birote
function BiroteIllustration() {
  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      role="img"
      aria-label="Birote salado tradicional recién horneado"
    >
      {/* Fondo cálido */}
      <rect width="400" height="400" fill="#EDE4D0" />
      {/* Sombra suave en mesa */}
      <ellipse cx="200" cy="310" rx="130" ry="18" fill="#C4A882" opacity="0.25" />
      {/* Birote - forma alargada característica */}
      <g>
        {/* Cuerpo del birote */}
        <ellipse cx="200" cy="220" rx="145" ry="58" fill="#C07A35" />
        <ellipse cx="200" cy="210" rx="142" ry="52" fill="#D4893E" />
        <ellipse cx="200" cy="205" rx="138" ry="47" fill="#E09848" />
        {/* Parte superior más clara (corteza horneada) */}
        <ellipse cx="200" cy="195" rx="130" ry="38" fill="#E8A84F" />
        <ellipse cx="200" cy="190" rx="120" ry="30" fill="#EFB555" />
        {/* Puntas del birote */}
        <ellipse cx="58" cy="218" rx="22" ry="32" fill="#C07A35" transform="rotate(-15 58 218)" />
        <ellipse cx="342" cy="218" rx="22" ry="32" fill="#C07A35" transform="rotate(15 342 218)" />
        <ellipse cx="56" cy="212" rx="16" ry="25" fill="#B86E2E" transform="rotate(-15 56 212)" />
        <ellipse cx="344" cy="212" rx="16" ry="25" fill="#B86E2E" transform="rotate(15 344 212)" />
        {/* Corte longitudinal caracteristico del birote */}
        <path
          d="M 80 185 Q 200 168 320 185"
          stroke="#C07A35"
          strokeWidth="3"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M 80 185 Q 200 172 320 185"
          stroke="#EFCA80"
          strokeWidth="2.5"
          fill="none"
          opacity="0.8"
        />
        {/* Textura de corteza - líneas finas */}
        {[...Array(5)].map((_, i) => (
          <path
            key={i}
            d={`M ${120 + i * 28} 178 Q ${134 + i * 28} 170 ${148 + i * 28} 178`}
            stroke="#D4893E"
            strokeWidth="1.2"
            fill="none"
            opacity="0.5"
          />
        ))}
        {/* Brillo sutil */}
        <ellipse cx="170" cy="182" rx="45" ry="12" fill="white" opacity="0.07" />
        {/* Punto de sal */}
        {[
          [145, 195], [175, 188], [210, 192], [240, 186], [265, 195],
          [160, 208], [195, 202], [230, 205], [258, 200],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="white" opacity="0.6" />
        ))}
      </g>
      {/* Elementos decorativos: trigo estilizado */}
      <g opacity="0.18" transform="translate(30, 60)">
        <line x1="12" y1="80" x2="12" y2="30" stroke="#6B3F1A" strokeWidth="1.5" />
        <ellipse cx="12" cy="28" rx="5" ry="8" fill="#6B3F1A" transform="rotate(-15 12 28)" />
        <ellipse cx="8" cy="45" rx="4" ry="7" fill="#6B3F1A" transform="rotate(-30 8 45)" />
        <ellipse cx="16" cy="40" rx="4" ry="7" fill="#6B3F1A" transform="rotate(20 16 40)" />
      </g>
      <g opacity="0.18" transform="translate(330, 60) scale(-1,1)">
        <line x1="12" y1="80" x2="12" y2="30" stroke="#6B3F1A" strokeWidth="1.5" />
        <ellipse cx="12" cy="28" rx="5" ry="8" fill="#6B3F1A" transform="rotate(-15 12 28)" />
        <ellipse cx="8" cy="45" rx="4" ry="7" fill="#6B3F1A" transform="rotate(-30 8 45)" />
        <ellipse cx="16" cy="40" rx="4" ry="7" fill="#6B3F1A" transform="rotate(20 16 40)" />
      </g>
    </svg>
  );
}

// ─── PRODUCTOS ─────────────────────────────────────────────────────

function ProductosSection() {
  const productos = [
    {
      nombre: "Birote Salado",
      descripcion:
        "El auténtico birote tapatío: corteza crujiente, miga tierna y ese sabor ligeramente ácido que solo se consigue con fermentación natural y los secretos del buen panadero. Ideal para tortas, caldos o simplemente solo.",
      etiqueta: "Especialidad de la casa",
      icon: <BiroteIcon />,
      bg: "#EDE4D0",
    },
    {
      nombre: "Pan para Hamburguesa",
      descripcion:
        "Suave por dentro, dorado por fuera. Elaborado con mantequilla real y horneado a la perfección para que aguante cualquier ingrediente sin deshacerse. Un pan que eleva cualquier hamburguesa.",
      etiqueta: "Pan artesanal",
      icon: <HamburgerBunIcon />,
      bg: "#F0E8D6",
    },
  ];

  return (
    <section id="productos" className="py-24 px-5 bg-[#F7F0E3]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>Lo que hacemos</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl text-[#2C1A0E] leading-tight">
            Nuestros productos
          </h2>
          <p className="text-[#2C1A0E]/55 mt-4 max-w-lg mx-auto leading-relaxed">
            Dos productos. Hechos bien, todos los días, sin excepciones.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {productos.map((p) => (
            <article
              key={p.nombre}
              className="group border border-amber-900/12 bg-white/40 hover:bg-white/70 transition-colors duration-300 overflow-hidden"
            >
              {/* Ilustración */}
              <div
                className="flex items-center justify-center py-14"
                style={{ backgroundColor: p.bg }}
              >
                <div className="w-40 h-40">{p.icon}</div>
              </div>
              {/* Contenido */}
              <div className="p-7">
                <span className="text-xs tracking-[0.2em] uppercase text-amber-700 font-medium">
                  {p.etiqueta}
                </span>
                <h3 className="font-serif text-2xl text-[#2C1A0E] mt-2 mb-4">{p.nombre}</h3>
                <p className="text-[#2C1A0E]/60 leading-relaxed text-sm">{p.descripcion}</p>
              </div>
            </article>
          ))}
        </div>

        <Divider />

        {/* Nota de frescura */}
        <div className="text-center max-w-md mx-auto">
          <p className="text-[#2C1A0E]/50 text-sm leading-relaxed italic font-serif">
            "Todo nuestro pan se hornea en la madrugada para que llegue fresco a tu mesa."
          </p>
        </div>
      </div>
    </section>
  );
}

function BiroteIcon() {
  return (
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="80" cy="95" rx="60" ry="28" fill="#C07A35" />
      <ellipse cx="80" cy="88" rx="57" ry="23" fill="#D4893E" />
      <ellipse cx="80" cy="83" rx="52" ry="18" fill="#EFB555" />
      <ellipse cx="22" cy="93" rx="9" ry="18" fill="#B86E2E" transform="rotate(-15 22 93)" />
      <ellipse cx="138" cy="93" rx="9" ry="18" fill="#B86E2E" transform="rotate(15 138 93)" />
      <path d="M 30 79 Q 80 68 130 79" stroke="#EFCA80" strokeWidth="1.5" fill="none" opacity="0.7" />
      {[50, 65, 80, 95, 110].map((x) => (
        <circle key={x} cx={x} cy={88} r="1.8" fill="white" opacity="0.65" />
      ))}
    </svg>
  );
}

function HamburgerBunIcon() {
  return (
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Bun top */}
      <ellipse cx="80" cy="72" rx="58" ry="36" fill="#D4893E" />
      <ellipse cx="80" cy="62" rx="55" ry="28" fill="#E8A84F" />
      <ellipse cx="80" cy="56" rx="50" ry="22" fill="#EFB555" />
      <ellipse cx="65" cy="52" rx="20" ry="9" fill="white" opacity="0.08" />
      {/* Semillas sésamo */}
      {[[60,55],[80,50],[100,55],[70,62],[90,60]].map(([x,y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="4" ry="2.5" fill="#F7E0B0" transform={`rotate(${-20 + i*10} ${x} ${y})`} opacity="0.8" />
      ))}
      {/* Base del bun */}
      <ellipse cx="80" cy="108" rx="52" ry="14" fill="#C07A35" />
      <ellipse cx="80" cy="105" rx="50" ry="11" fill="#D4893E" />
      {/* Relleno */}
      <ellipse cx="80" cy="95" rx="52" ry="8" fill="#8B9E55" opacity="0.6" />
      <ellipse cx="80" cy="92" rx="48" ry="5" fill="#C07A35" opacity="0.4" />
    </svg>
  );
}

// ─── HISTORIA ──────────────────────────────────────────────────────

function HistoriaSection() {
  return (
    <section id="historia" className="py-24 px-5 bg-[#EDE4D0]">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Lado izquierdo: decorativo */}
          <div className="relative">
            <div className="bg-[#F7F0E3] p-10 relative">
              {/* Ornamento de esquina */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-amber-800/30" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-amber-800/30" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-amber-800/30" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-amber-800/30" />

              <div className="text-center py-8">
                <p className="font-serif text-7xl text-[#A0622A]/20 leading-none select-none">M</p>
                <p className="font-serif text-3xl text-[#2C1A0E] mt-4 mb-2">Menora</p>
                <p className="text-xs tracking-[0.3em] text-amber-700/70 uppercase">Panadería Artesanal</p>
                <div className="mt-6 w-16 h-px bg-amber-800/20 mx-auto" />
                <p className="mt-6 text-[#2C1A0E]/40 text-sm font-serif italic leading-relaxed">
                  Pan honesto.
                  <br />
                  Hecho con las manos.
                  <br />
                  Todos los días.
                </p>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div>
            <SectionLabel>Quiénes somos</SectionLabel>
            <h2 className="font-serif text-4xl text-[#2C1A0E] leading-tight mb-6">
              Una panadería
              <br />
              de familia.
            </h2>
            <div className="space-y-5 text-[#2C1A0E]/65 leading-relaxed">
              <p>
                Menora nació del amor por el pan bien hecho: el que huele desde la calle, el que
                tiene la corteza que cruje al partirlo, el que sabe igual que siempre.
              </p>
              <p>
                Trabajamos desde la madrugada para que cuando abras la puerta en la mañana,
                el pan ya esté listo. Ningún ingrediente artificial, ningún atajo.
                Solo masa, tiempo y oficio.
              </p>
              <p>
                El birote salado es nuestra razón de ser: la receta que guardamos, que
                perfeccionamos, que jamás cambiaríamos. Es el mismo de siempre porque así
                tiene que ser.
              </p>
            </div>

            {/* Valores */}
            <div className="mt-8 space-y-3">
              {[
                "Ingredientes naturales, sin conservadores",
                "Fermentación y horneado artesanal",
                "Receta familiar sin modificaciones",
              ].map((v) => (
                <div key={v} className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-700 flex-shrink-0" />
                  <p className="text-sm text-[#2C1A0E]/60">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── UBICACIÓN ─────────────────────────────────────────────────────

function UbicacionSection() {
  return (
    <section id="ubicacion" className="py-24 px-5 bg-[#F7F0E3]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <SectionLabel>Encuéntranos</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl text-[#2C1A0E] leading-tight">
            Nuestra ubicación
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Mapa */}
          <div className="md:col-span-3 overflow-hidden border border-amber-900/10">
            <iframe
              src={CONFIG.GOOGLE_MAPS_URL}
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Menora Panadería"
              className="block"
            />
          </div>

          {/* Info de contacto y dirección */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#EDE4D0] p-6">
              <p className="text-xs tracking-[0.2em] uppercase text-amber-700 mb-3 font-medium">
                Dirección
              </p>
              <p className="text-[#2C1A0E] leading-relaxed font-serif text-lg">
                {CONFIG.DIRECCION_PANADERIA}
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(CONFIG.DIRECCION_PANADERIA)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-xs text-amber-700 tracking-wide underline underline-offset-2"
              >
                Abrir en Google Maps →
              </a>
            </div>

            <div className="bg-[#EDE4D0] p-6">
              <p className="text-xs tracking-[0.2em] uppercase text-amber-700 mb-3 font-medium">
                Horarios
              </p>
              <p className="text-[#2C1A0E] font-serif text-lg">{CONFIG.HORARIO}</p>
              <p className="text-[#2C1A0E]/50 text-xs mt-2">
                Llegamos temprano para que tú no te quedes sin pan.
              </p>
            </div>

            <div className="bg-[#EDE4D0] p-6">
              <p className="text-xs tracking-[0.2em] uppercase text-amber-700 mb-3 font-medium">
                Teléfono
              </p>
              <a
                href={`tel:${CONFIG.TELEFONO.replace(/\s/g, "")}`}
                className="text-[#2C1A0E] font-serif text-lg hover:text-[#6B3F1A] transition-colors"
              >
                {CONFIG.TELEFONO}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACTO + REDES ──────────────────────────────────────────────

function ContactoSection() {
  return (
    <section id="contacto" className="py-24 px-5 bg-[#2C1A0E]">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Mensaje */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-amber-500/70 mb-4 font-medium">
              Contacto
            </p>
            <h2 className="font-serif text-4xl text-[#F7F0E3] leading-tight mb-6">
              Estamos aquí
              <br />
              para atenderte.
            </h2>
            <p className="text-[#F7F0E3]/50 leading-relaxed mb-8">
              ¿Tienes un pedido especial, una pregunta o simplemente quieres saber
              cuándo llega el pan? Escríbenos sin pena.
            </p>

            {/* Teléfono */}
            <div className="mb-6">
              <p className="text-xs tracking-[0.2em] uppercase text-amber-500/60 mb-2 font-medium">
                Teléfono
              </p>
              <a
                href={`tel:${CONFIG.TELEFONO.replace(/\s/g, "")}`}
                className="text-[#F7F0E3] font-serif text-2xl hover:text-amber-400 transition-colors"
              >
                {CONFIG.TELEFONO}
              </a>
            </div>

            {/* Horario */}
            <div className="mb-8">
              <p className="text-xs tracking-[0.2em] uppercase text-amber-500/60 mb-2 font-medium">
                Horario de atención
              </p>
              <p className="text-[#F7F0E3]/80 font-serif text-lg">{CONFIG.HORARIO}</p>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={CONFIG.WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 text-sm tracking-wide hover:bg-[#20ba59] transition-colors duration-200"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Escríbenos por WhatsApp
            </a>
          </div>

          {/* Redes sociales */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-amber-500/70 mb-6 font-medium">
              Síguenos
            </p>
            <div className="space-y-4">
              <a
                href={CONFIG.INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 group border border-white/10 p-5 hover:border-amber-500/40 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                  <InstagramIcon className="w-5 h-5 text-[#F7F0E3]" />
                </div>
                <div>
                  <p className="text-[#F7F0E3] font-medium text-sm">Instagram</p>
                  <p className="text-[#F7F0E3]/40 text-xs mt-0.5">@menorapanaderia</p>
                </div>
                <svg className="ml-auto w-4 h-4 text-[#F7F0E3]/30 group-hover:text-amber-400 transition-colors" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href={CONFIG.FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 group border border-white/10 p-5 hover:border-amber-500/40 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                  <FacebookIcon className="w-5 h-5 text-[#F7F0E3]" />
                </div>
                <div>
                  <p className="text-[#F7F0E3] font-medium text-sm">Facebook</p>
                  <p className="text-[#F7F0E3]/40 text-xs mt-0.5">Menora Panadería</p>
                </div>
                <svg className="ml-auto w-4 h-4 text-[#F7F0E3]/30 group-hover:text-amber-400 transition-colors" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-serif text-[#F7F0E3]/40 text-sm">Menora · Panadería Artesanal</p>
          <p className="text-[#F7F0E3]/25 text-xs">
            {CONFIG.DIRECCION_PANADERIA}
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── BOTÓN FLOTANTE WHATSAPP ───────────────────────────────────────

function WhatsAppButton() {
  return (
    <a
      href={CONFIG.WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-5 z-50 bg-[#25D366] text-white w-14 h-14 flex items-center justify-center shadow-lg hover:bg-[#20ba59] hover:scale-105 active:scale-95 transition-all duration-200"
      style={{ borderRadius: "2px" }}
    >
      <WhatsAppIcon className="w-6 h-6" />
    </a>
  );
}

// ─── ÍCONOS SVG ────────────────────────────────────────────────────

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

// ─── APP PRINCIPAL ─────────────────────────────────────────────────

export default function Menora() {
  return (
    <>
      {/* SEO básico */}
      <title>Menora · Panadería Artesanal en Guadalajara</title>

      <div className="font-sans antialiased bg-[#F7F0E3] text-[#2C1A0E]">
        <Navbar />
        <main>
          <HeroSection />
          <ProductosSection />
          <HistoriaSection />
          <UbicacionSection />
          <ContactoSection />
        </main>
        <WhatsAppButton />
      </div>
    </>
  );
}