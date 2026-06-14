import { useEffect, useState } from "react";
import { collection, onSnapshot, query, limit } from "firebase/firestore";
import { db } from "../firebase";

export interface Producto {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  categoria: string;
  badge?: string;
  imagen?: string;
  activo?: boolean;
}

export function useProductos(uid: string) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) return;

    const q = query(
      collection(db, "locales", uid, "productos"),
      limit(100)
    );

    // onSnapshot = tiempo real, se actualiza solo cuando Firestore cambia
    const unsub = onSnapshot(
      q,
      (snap) => {
        const data = snap.docs
          .map((doc) => ({ id: doc.id, ...doc.data() } as Producto))
          .filter((p) => p.activo !== false); // ocultar inactivos
        setProductos(data);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsub(); // limpia el listener al desmontar
  }, [uid]);

  return { productos, loading, error };
}