import { useMemo } from "react";
import { useProductos, type Producto } from "./useProductos";

export interface CategoriaFirestore {
  id: string;
  label: string;
  icon: string;
  items: {
    name: string;
    desc: string;
    price: string;
    badge?: string;
    badgeNew?: boolean;
    gradient: string;
    icon: string;
  }[];
}

// Mapeo de categorías Firestore → gradiente visual del menú
const GRADIENT_MAP: Record<string, string> = {
  calientes: "from-[#5C3D2E] via-[#8B6249] to-[#E8C9A0]",
  frios:     "from-[#1A0D05] via-[#4A3020] to-[#C09060]",
  matcha:    "from-[#2A3E2C] via-[#4A7050] to-[#B0D0B0]",
  postres:   "from-[#6A5038] via-[#9A8060] to-[#EAD8A8]",
  brunch:    "from-[#505828] via-[#848040] to-[#DDD890]",
};

const ICON_MAP: Record<string, string> = {
  calientes: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=200&h=200&fit=crop",
  frios:     "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=200&h=200&fit=crop",
  matcha:    "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=200&h=200&fit=crop",
  postres:   "https://images.unsplash.com/photo-1551024506-0bc4a10508b5?w=200&h=200&fit=crop",
  brunch:    "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=200&h=200&fit=crop",
};

export function useCategorias(uid: string) {
  const { productos, loading, error } = useProductos(uid);

  const categorias = useMemo<CategoriaFirestore[]>(() => {
    if (!productos.length) return [];

    // Agrupar por campo `categoria`
    const grupos = productos.reduce<Record<string, Producto[]>>((acc, p) => {
      const key = p.categoria?.toLowerCase() ?? "otros";
      if (!acc[key]) acc[key] = [];
      acc[key].push(p);
      return acc;
    }, {});

    return Object.entries(grupos).map(([catId, items]) => ({
      id: catId,
      label: catId.charAt(0).toUpperCase() + catId.slice(1),
      icon: ICON_MAP[catId] ?? ICON_MAP["calientes"],
      items: items.map((p) => ({
        name: p.nombre,
        desc: p.descripcion ?? "",
        price: `$${p.precio}`,
        badge: p.badge,
        badgeNew: p.badge?.toLowerCase() === "nuevo",
        gradient: GRADIENT_MAP[catId] ?? GRADIENT_MAP["calientes"],
        icon: p.imagen ?? ICON_MAP[catId] ?? "",
      })),
    }));
  }, [productos]);

  return { categorias, loading, error };
}