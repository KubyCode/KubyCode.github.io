import React, { useState, useEffect, useRef } from "react";

// ─── Types & Interfaces ──────────────────────────────────────────────────────
export interface MenuItem {
  name: string;
  tagline: string;
  desc: string;
  ingredients: string[];
  price: number;
  badge: string | null;
  badgeColor?: string;
  img: string;
  gradient: string;
  cal: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  description: string;
  items: MenuItem[];
}

// ─── Data (Cleaned of emojis) ─────────────────────────────────────────────────
const MENU_DATA: MenuCategory[] = [
  {
    id: "calientes",
    label: "Cafés Calientes",
    description: "Granos de especialidad, extraídos con precisión y maestría por nuestros baristas.",
    items: [
      {
        name: "Latte de Vainilla",
        tagline: "El abrazo que necesitas",
        desc: "Espresso doble de origen colombiano con leche vaporizada texturizada y esencia de vainilla artesanal extraída en casa. Suave, dulce y absolutamente reconfortante en cada sorbo.",
        ingredients: ["Espresso doble (Colombia Huila)", "Leche entera vaporizada", "Extracto de vainilla artesanal", "Espuma microvelvet"],
        price: 75,
        badge: "Popular",
        badgeColor: "bg-[#c9a87c] text-[#1a0f07]",
        img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&h=500&fit=crop",
        gradient: "from-[#5C3D2E] to-[#E8C9A0]",
        cal: "180 kcal",
      },
      {
        name: "Cappuccino Clásico",
        tagline: "Proporciones perfectas, siempre",
        desc: "Espresso, leche texturizada y espuma cremosa en la proporción de tercios que lo convierte en un clásico intemporal. Baristas entrenados, cada taza igual de perfecta.",
        ingredients: ["Espresso (blend Guatemala-Brasil)", "Leche entera", "Espuma densa de leche", "Polvo de cacao opcional"],
        price: 65,
        badge: null,
        img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&h=500&fit=crop",
        gradient: "from-[#3D2010] to-[#C4906A]",
        cal: "120 kcal",
      },
      {
        name: "Cortado de Avellana",
        tagline: "Intenso. Aromático. Elegante.",
        desc: "Espresso cortado con leche vaporizada en ratio 1:1 y un toque de avellana tostada artesanalmente en nuestra cocina. Una experiencia que mezcla intensidad y suavidad con maestría.",
        ingredients: ["Espresso doble (Etiopía Yirgacheffe)", "Leche entera", "Jarabe de avellana tostada casero", "Corteza de naranja (opcional)"],
        price: 70,
        badge: "Nuevo",
        badgeColor: "bg-[#4a7050] text-[#e0f0e0]",
        img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&h=500&fit=crop",
        gradient: "from-[#4A2E1A] to-[#D4A070]",
        cal: "110 kcal",
      },
      {
        name: "Flat White",
        tagline: "Para quien realmente conoce el café",
        desc: "Ratio restringido de espresso doble con microespuma sedosa y brillante. Sin azúcares, sin jarabes, sin distracciones. Solo café, leche y técnica. La bebida de los que saben.",
        ingredients: ["Ristretto doble (Kenia AA)", "Leche entera microespumada", "Ratio 1:2.5 espresso/leche"],
        price: 78,
        badge: "Firma",
        badgeColor: "bg-[#2a1a0e] text-[#c9a87c]",
        img: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&h=500&fit=crop",
        gradient: "from-[#3A2215] to-[#C48860]",
        cal: "95 kcal",
      },
      {
        name: "Café de Olla",
        tagline: "La tradición hecha taza",
        desc: "Receta tradicional mexicana reinterpretada: café molido en olla de barro con piloncillo, canela de Ceylon y clavo. Servido en jarro de barro auténtico. Pura alma de México.",
        ingredients: ["Café molido medio (Chiapas)", "Piloncillo artesanal", "Canela de Ceylon", "Clavo de olor", "Agua filtrada"],
        price: 60,
        badge: null,
        img: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=600&h=500&fit=crop",
        gradient: "from-[#2E1A0E] to-[#A06840]",
        cal: "85 kcal",
      },
      {
        name: "Latte de Lavanda",
        tagline: "Floral, sereno, diferente",
        desc: "Espresso suave con leche vaporizada e infusión de lavanda francesa cultivada localmente. Un perfil aromático que relaja desde el primer sorbo. Disponible con leche de avena.",
        ingredients: ["Espresso (Colombia suave)", "Leche entera o de avena", "Jarabe de lavanda francesa artesanal", "Flores de lavanda (decoración)"],
        price: 80,
        badge: "Temporada",
        badgeColor: "bg-[#6b5c8a] text-[#e8e0f8]",
        img: "https://images.unsplash.com/photo-1595104695036-7fa3c4b7c5f1?w=600&h=500&fit=crop",
        gradient: "from-[#3A2855] to-[#C8B0E8]",
        cal: "165 kcal",
      },
    ],
  },
  {
    id: "frios",
    label: "Cafés Fríos",
    description: "Extracciones en frío y recetas heladas para el calor tapatío.",
    items: [
      {
        name: "Cold Brew Clásico",
        tagline: "24 horas de paciencia en cada vaso",
        desc: "Café extraído en agua fría durante 24 horas para obtener un concentrado suave, intenso y completamente libre de acidez. Servido sobre hielo con leche de avena artesanal.",
        ingredients: ["Café molido grueso (Brasil Cerrado)", "Agua filtrada fría", "Leche de avena artesanal", "Hielo en bloque"],
        price: 80,
        badge: "Favorito",
        badgeColor: "bg-[#c9a87c] text-[#1a0f07]",
        img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=500&fit=crop",
        gradient: "from-[#1A0D05] to-[#C09060]",
        cal: "90 kcal",
      },
      {
        name: "Iced Latte Caramelo",
        tagline: "La bebida perfecta para la tarde",
        desc: "Espresso doble enfriado rápidamente, leche fría y caramelo salado artesanal elaborado en nuestra cocina con azúcar mascabado y sal de mar de Colima. Sobre hielo filtrado.",
        ingredients: ["Espresso doble enfriado", "Leche entera fría", "Caramelo salado casero", "Hielo filtrado"],
        price: 78,
        badge: null,
        img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&h=500&fit=crop",
        gradient: "from-[#3D2510] to-[#E0C090]",
        cal: "210 kcal",
      },
      {
        name: "Dalgona Frío",
        tagline: "Textura cremosa y profunda",
        desc: "Espuma batida de café instantáneo de especialidad sobre leche fría con hielo. La textura cremosa contrasta con la frialdad de la leche creando un balance óptimo de sabor.",
        ingredients: ["Café instantáneo de especialidad", "Azúcar mascabado", "Agua caliente", "Leche entera fría", "Hielo"],
        price: 85,
        badge: "Nuevo",
        badgeColor: "bg-[#4a7050] text-[#e0f0e0]",
        img: "https://images.unsplash.com/photo-1593443320739-77f74939d0da?w=600&h=500&fit=crop",
        gradient: "from-[#2A1508] to-[#C49870]",
        cal: "195 kcal",
      },
      {
        name: "Espresso Tonic",
        tagline: "El contraste más refrescante",
        desc: "Doble espresso extraído directamente sobre agua tónica artesanal con hielo. El amargor del café choca con la efervescencia y el leve dulzor de la tónica creando una bebida compleja.",
        ingredients: ["Espresso doble (Etiopía)", "Agua tónica artesanal Fever-Tree", "Hielo en cubo", "Ralladura de limón"],
        price: 90,
        badge: null,
        img: "https://images.unsplash.com/photo-1557142046-c704a3adf364?w=600&h=500&fit=crop",
        gradient: "from-[#1E1008] to-[#A07040]",
        cal: "75 kcal",
      },
    ],
  },
  {
    id: "matcha",
    label: "Matcha",
    description: "Matcha ceremonial japonés de primera cosecha. Sin compromisos.",
    items: [
      {
        name: "Matcha Latte",
        tagline: "Japón en cada sorbo",
        desc: "Matcha ceremonial de primera cosecha proveniente de Uji, Japón, tamizado y batido con agua caliente a 75°C, completado con leche vaporizada texturizada. Terroso y sofisticado.",
        ingredients: ["Matcha ceremonial Uji Grado A", "Agua caliente 75°C", "Leche entera vaporizada", "Espuma de leche"],
        price: 85,
        badge: "Favorito",
        badgeColor: "bg-[#c9a87c] text-[#1a0f07]",
        img: "https://images.unsplash.com/photo-1536514072410-5019a3c69182?w=600&h=500&fit=crop",
        gradient: "from-[#2A3E2C] to-[#B0D0B0]",
        cal: "140 kcal",
      },
      {
        name: "Iced Matcha",
        tagline: "Puro, fresco y vegetal",
        desc: "Matcha ceremonial batido en frío con leche de avena Oatly sobre hielo triturado. La combinación perfecta para días calurosos. Vívido y equilibrado.",
        ingredients: ["Matcha ceremonial Uji", "Agua fría filtrada", "Leche de avena Oatly", "Hielo triturado"],
        price: 88,
        badge: null,
        img: "https://images.unsplash.com/photo-1589476993333-f55b84301219?w=600&h=500&fit=crop",
        gradient: "from-[#344A36] to-[#C0D8C0]",
        cal: "125 kcal",
      },
      {
        name: "Matcha Affogato",
        tagline: "La fusión perfecta de temperaturas",
        desc: "Una bola de helado artesanal de vainilla de Madagascar bañada en un shot concentrado y caliente de matcha ceremonial. La cremosidad del helado contrasta con la intensidad del matcha.",
        ingredients: ["Matcha ceremonial doble", "Helado de vainilla Madagascar", "Agua caliente 75°C"],
        price: 95,
        badge: "Nuevo",
        badgeColor: "bg-[#4a7050] text-[#e0f0e0]",
        img: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&h=500&fit=crop",
        gradient: "from-[#1E3020] to-[#A0C8A0]",
        cal: "280 kcal",
      },
    ],
  },
  {
    id: "postres",
    label: "Postres",
    description: "Elaborados en nuestra cocina cada mañana. Sin conservadores, sin atajos.",
    items: [
      {
        name: "Cheesecake Japonesa",
        tagline: "Ligera como una nube",
        desc: "Cheesecake estilo japonés horneada en baño María: esponjosa, sutil y etérea. Con queso crema, vainilla bourbon de Madagascar y una base fina de galleta mantequillada.",
        ingredients: ["Queso crema premium", "Huevos frescos de rancho", "Vainilla Bourbon", "Base de galleta artesanal", "Mantequilla francesa"],
        price: 70,
        badge: "Popular",
        badgeColor: "bg-[#c9a87c] text-[#1a0f07]",
        img: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=600&h=500&fit=crop",
        gradient: "from-[#6A5038] to-[#EAD8A8]",
        cal: "320 kcal",
      },
      {
        name: "Croissant de Mantequilla",
        tagline: "72 horas de fermentación lenta",
        desc: "Hojaldre artesanal de fermentación prolongada con mantequilla francesa Président al 84% de materia grasa. Dorado y crujiente por fuera, alveolado y húmedo por dentro.",
        ingredients: ["Harina de fuerza", "Mantequilla Président 84%", "Levadura fresca", "Mermelada de la casa"],
        price: 55,
        badge: null,
        img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=500&fit=crop",
        gradient: "from-[#504030] to-[#D8C090]",
        cal: "340 kcal",
      },
      {
        name: "Brownie Salted Caramel",
        tagline: "Equilibrio profundo de chocolate y sal",
        desc: "Brownie denso de chocolate Valrhona al 70% con un núcleo fluido de caramelo salado de mantequilla tostada y flor de sal de mar de Colima. Servido tibio.",
        ingredients: ["Chocolate Valrhona 70%", "Mantequilla dorada", "Flor de sal de Colima", "Caramelo de mantequilla quemada"],
        price: 65,
        badge: "Nuevo",
        badgeColor: "bg-[#4a7050] text-[#e0f0e0]",
        img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=500&fit=crop",
        gradient: "from-[#301A0A] to-[#C08860]",
        cal: "410 kcal",
      },
    ],
  },
  {
    id: "brunch",
    label: "Brunch",
    description: "De martes a domingo, 9 am a 2 pm. Ingredientes frescos, recetas con alma.",
    items: [
      {
        name: "Avocado Toast Aloó",
        tagline: "Un clásico de nuestra barra",
        desc: "Pan sourdough de masa madre tostado al punto, con aguacate Hass cremoso aderezado con limón, chile de árbol, aceite de oliva extra virgen y semillas mixtas. Incluye huevo pochado.",
        ingredients: ["Pan sourdough de masa madre", "Aguacate Hass", "Huevo pochado de rancho", "Aceite de oliva VE", "Semillas tostadas"],
        price: 120,
        badge: "Popular",
        badgeColor: "bg-[#c9a87c] text-[#1a0f07]",
        img: "https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=600&h=500&fit=crop",
        gradient: "from-[#505828] to-[#DDD890]",
        cal: "420 kcal",
      },
      {
        name: "Eggs Benedict",
        tagline: "Técnica impecable en tu mesa",
        desc: "Muffin inglés de la casa, jamón serrano ibérico, huevo pochado con yema líquida perfecta y salsa holandesa emulsionada al momento con mantequilla clarificada y limón.",
        ingredients: ["Muffin inglés artesanal", "Jamón serrano ibérico", "Huevo pochado", "Salsa holandesa artesanal", "Pimienta negra"],
        price: 145,
        badge: null,
        img: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&h=500&fit=crop",
        gradient: "from-[#604820] to-[#E0C888]",
        cal: "580 kcal",
      },
    ],
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useScrollY(): number {
  const [y, setY] = useState<number>(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Global Styles ────────────────────────────────────────────────────────────
function GlobalStyles() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      html { scroll-behavior: smooth; }
      body { background: #faf6f0; overflow-x: hidden; }
      @keyframes ribbonScroll {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      @keyframes fadeSlideDown {
        from { opacity: 0; transform: translateY(-8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes scrollPulse {
        0%, 100% { transform: scaleY(1); transform-origin: top; }
        50% { transform: scaleY(0.4); transform-origin: top; }
      }
      .card-hover { transition: transform 0.35s ease, box-shadow 0.35s ease; }
      .card-hover:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(42,26,14,0.12); }
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      .pill-ingredient {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #f0e8da;
        border: 1px solid #e8d5bc;
        padding: 4px 12px;
        font-size: 0.7rem;
        letter-spacing: 0.05em;
        color: #6b5240;
        font-family: 'Jost', sans-serif;
        font-weight: 300;
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

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const scrollY = useScrollY();
  const scrolled = scrollY > 60;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#faf6f0]/95 backdrop-blur-md border-b border-[#c9b09a]/20 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`font-bold text-lg transition-colors duration-400 ${scrolled ? "text-[#c9a87c]" : "text-[#e8c99a]"}`}>✦</span>
          <span
            className={`font-bold text-xl tracking-wide transition-colors duration-400 ${scrolled ? "text-[#2a1a0e]" : "text-[#faf3e8]"}`}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Aloó<em className="not-italic font-normal">Café</em>
          </span>
        </div>
        <span
          className={`text-xs tracking-[0.2em] uppercase transition-colors duration-400 ${scrolled ? "text-[#8b6b50]" : "text-[#e8d5bc]/70"}`}
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          Menú Completo
        </span>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const scrollY = useScrollY();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-[65vh] min-h-[480px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-[-10%] bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1800&q=85')",
          transform: `translateY(${scrollY * 0.25}px)`,
          filter: "brightness(0.42) saturate(0.8)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e1208]/20 via-transparent to-[#1e1208]/70" />
      <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-[#c4956a]/5 blur-3xl pointer-events-none" />

      <div className="relative text-center px-6 max-w-3xl">
        <p
          className="text-[0.65rem] tracking-[0.35em] uppercase text-[#e8c99a]/70 mb-5 block"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.7s ease 0.2s", fontFamily: "'Jost', sans-serif" }}
        >
          Colonia Americana · Guadalajara
        </p>
        {/* Ajustado leading-[1.2] para evitar encimado de letras con fuentes altas */}
        <h1
          className="text-[clamp(2.4rem,6.5vw,4.5rem)] font-bold text-[#faf3e8] leading-[1.2] mb-6 tracking-tight"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.9s ease 0.3s",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Todo lo que<br />
          <em className="font-normal text-[#c9a87c]">nos hace únicos</em>
        </h1>
        <p
          className="text-[clamp(0.95rem,1.8vw,1.15rem)] text-[#e8d5bc]/85 font-light leading-relaxed max-w-xl mx-auto"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.7s ease 0.5s",
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          Cada ingrediente seleccionado con rigor. Cada receta ejecutada con paciencia.
        </p>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: loaded ? 0.45 : 0, transition: "opacity 1s ease 1.2s" }}
      >
        <span className="text-[#faf3e8] text-[0.55rem] tracking-[0.25em] uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
          Explorar
        </span>
        <div className="w-px h-10 bg-[#faf3e8]/50" style={{ animation: "scrollPulse 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

// ─── Ribbon ───────────────────────────────────────────────────────────────────
function Ribbon() {
  const items = [
    "Café de Especialidad",
    "Ingredientes Frescos",
    "Hecho en Casa",
    "Brunch Artesanal",
    "Matcha Ceremonial",
    "Sin Conservadores",
    "Col. Americana",
    "Specialty Coffee",
  ];
  const all = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden bg-[#2a1a0e] py-4 border-y border-[#c9a87c]/20">
      <div className="flex gap-0" style={{ animation: "ribbonScroll 40s linear infinite", width: "max-content" }}>
        {all.map((item, i) => (
          <span key={i} className="flex items-center gap-6 whitespace-nowrap px-2">
            <span className="text-[#faf3e8]/80 text-xs tracking-[0.1em] uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
              {item}
            </span>
            <span className="text-[#c9a87c] text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Category Nav (Sticky) ────────────────────────────────────────────────────
interface CategoryNavProps {
  active: string;
  onSelect: (id: string) => void;
}

function CategoryNav({ active, onSelect }: CategoryNavProps) {
  return (
    <div className="sticky top-[52px] sm:top-[57px] z-40 bg-[#faf6f0]/95 backdrop-blur-md border-b border-[#e8d5bc]/60 py-4 shadow-sm shadow-[#3d2b1a]/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {MENU_DATA.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`px-5 py-2 whitespace-nowrap text-xs tracking-[0.1em] uppercase transition-all duration-200 cursor-pointer border shrink-0 ${
                active === cat.id
                  ? "bg-[#2a1a0e] text-[#faf3e8] border-[#2a1a0e]"
                  : "bg-transparent text-[#8b6b4a] border-[#c9b09a]/60 hover:border-[#8b6b4a]"
              }`}
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Expanded Item Modal ───────────────────────────────────────────────────────
interface ItemModalProps {
  item: MenuItem;
  onClose: () => void;
}

function ItemModal({ item, onClose }: ItemModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-[#1a0f07]/70 backdrop-blur-sm" />

      <div
        className="relative bg-[#faf6f0] w-full sm:max-w-2xl sm:rounded-none max-h-[90vh] overflow-y-auto"
        style={{ animation: "fadeSlideDown 0.3s ease" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 overflow-hidden">
          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-30`} />
          {item.badge && (
            <span
              className={`absolute top-4 left-4 text-[0.6rem] tracking-[0.12em] uppercase px-3 py-1 ${
                item.badgeColor || "bg-[#c9a87c] text-[#1a0f07]"
              }`}
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {item.badge}
            </span>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-[#faf6f0]/90 flex items-center justify-center text-[#2a1a0e] hover:bg-[#2a1a0e] hover:text-[#faf3e8] transition-colors duration-200 text-lg cursor-pointer border-0"
          >
            ×
          </button>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#faf6f0] to-transparent" />
        </div>

        <div className="px-8 pb-8 -mt-4">
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#a08060] mb-1" style={{ fontFamily: "'Jost', sans-serif" }}>
            {item.cal}
          </p>
          <h2 className="text-2xl font-bold text-[#2a1a0e] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            {item.name}
          </h2>
          <p className="text-sm text-[#a08060] italic mb-5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {item.tagline}
          </p>

          <p className="text-[#6b5240] text-sm leading-[1.8] mb-7 font-light" style={{ fontFamily: "'Jost', sans-serif" }}>
            {item.desc}
          </p>

          <div className="mb-7">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#a08060] mb-3 font-medium" style={{ fontFamily: "'Jost', sans-serif" }}>
              Ingredientes
            </p>
            <div className="flex flex-wrap gap-2">
              {item.ingredients.map((ing) => (
                <span key={ing} className="pill-ingredient">
                  <span className="text-[#c9a87c]">·</span>
                  {ing}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-[#e8d5bc]">
            <div>
              <span className="text-3xl font-bold text-[#2a1a0e]" style={{ fontFamily: "'Playfair Display', serif" }}>
                ${item.price}
              </span>
              <span className="text-[#a08060] text-xs ml-2" style={{ fontFamily: "'Jost', sans-serif" }}>
                MXN
              </span>
            </div>
            <a
              href={`https://wa.me/523312345678?text=Hola! Quiero ordenar: ${item.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2a1a0e] text-[#faf3e8] px-6 py-3 text-xs tracking-[0.12em] uppercase hover:bg-[#c9a87c] hover:text-[#1a0f07] transition-colors duration-250"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Ordenar barra
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Menu Card ────────────────────────────────────────────────────────────────
interface MenuCardProps {
  item: MenuItem;
  index: number;
  onOpen: (item: MenuItem) => void;
}

function MenuCard({ item, index, onOpen }: MenuCardProps) {
  return (
    <Reveal delay={index * 65}>
      <article
        className="card-hover bg-[#faf6f0] border border-[#e8d5bc]/40 overflow-hidden flex flex-col h-full cursor-pointer group"
        onClick={() => onOpen(item)}
      >
        <div className="relative h-52 overflow-hidden">
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-20`} />
          {item.badge && (
            <span
              className={`absolute top-3 left-3 text-[0.58rem] tracking-[0.12em] uppercase px-2.5 py-1 ${
                item.badgeColor || "bg-[#c9a87c] text-[#1a0f07]"
              }`}
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {item.badge}
            </span>
          )}
          <span
            className="absolute bottom-3 right-3 text-[0.58rem] tracking-[0.08em] bg-[#1a0f07]/70 text-[#faf3e8]/80 px-2 py-1"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            {item.cal}
          </span>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1a0f07]/10 backdrop-blur-[2px]">
            <span
              className="bg-[#1a0f07]/80 text-[#faf3e8] text-[0.6rem] tracking-[0.15em] uppercase px-3 py-2"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Detalles →
            </span>
          </div>
        </div>

        {/* Completado del diseño funcional respetando la estética minimalista */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-baseline mb-1 gap-2">
            <h3 className="text-base font-bold text-[#2a1a0e] tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {item.name}
            </h3>
            <span className="text-base font-bold text-[#8b6b50]" style={{ fontFamily: "'Playfair Display', serif" }}>
              ${item.price}
            </span>
          </div>
          <p className="text-xs text-[#a08060] italic mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {item.tagline}
          </p>
          <p
            className="text-[#6b5240] text-xs leading-relaxed font-light line-clamp-2"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            {item.desc}
          </p>
        </div>
      </article>
    </Reveal>
  );
}

// ─── Main Menu Component ─────────────────────────────────────────────────────
export default function AlooMenu() {
  const [activeCategory, setActiveCategory] = useState<string>(MENU_DATA[0].id);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const currentCategory = MENU_DATA.find((cat) => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#2a1a0e] relative antialiased selection:bg-[#c9a87c]/30">
      <GlobalStyles />
      <Navbar />
      <Hero />
      <Ribbon />
      <CategoryNav active={activeCategory} onSelect={setActiveCategory} />

      <main className="max-w-7xl mx-auto px-6 py-16 sm:py-24">
        {currentCategory && (
          <div style={{ animation: "fadeSlideDown 0.4s ease" }}>
            <div className="mb-12 max-w-xl">
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight text-[#2a1a0e] mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {currentCategory.label}
              </h2>
              <p className="text-sm text-[#6b5240] font-light leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
                {currentCategory.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {currentCategory.items.map((item, idx) => (
                <MenuCard key={item.name} item={item} index={idx} onOpen={setSelectedItem} />
              ))}
            </div>
          </div>
        )}
      </main>

      {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
}