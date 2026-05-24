# 📐 Reglas de Codificación

Para mantener el proyecto limpio y consistente, seguimos estas convenciones de nombres:

---

## 📚 Resumen Rápido

- **PascalCase** → Componentes  
  ```tsx
  Layout.tsx
  Navbar.tsx
  WelcomePage.tsx


- **camelCase** → Hooks y funciones de ayuda
  ```tsx
  useAuth.ts
  useFetch.ts
  formatDate.ts


- **kebab-case** → Carpetas y archivos de páginas/rutas
  ```tsx
    /pages/user-profile/UserProfilePage.tsx


# 👉 Regla de Oro
* Si se renderiza como componente → PascalCase
* Si es una función o utilidad interna → camelCase
* Si representa una ruta o URL → kebab-case 


# 📂 Organización de Features
Para mantener cada feature/autónoma bien estructurada:
src/features/<feature>/
 ├─ components/      # Subcomponentes específicos de la feature (que no se reusen en ninguna view)
 ├─ data/            # Datos estáticos o mocks
 ├─ <Feature>.tsx    # Componente principal de la feature

* Ejemplo: EdgeNet
src/features/edgeNet/
 ├─ components/       # LocationPoint.tsx, Popup.tsx, etc.
 ├─ components/       # LocationPoint.tsx, Popup.tsx, etc.
 ├─ data/             # locations.ts
 ├─ EdgeNet.tsx       # Componente principal de la vista

"Todos los datos estáticos deben ir en data/ y los subcomponentes en components/. El archivo principal de la feature debe permanecer limpio y enfocado en la UI y la lógica de interacción.


## ⚡ Hooks en React

En React, un **hook** es una función especial que permite “enganchar” lógica de React a tus componentes funcionales.

- Siempre usar **camelCase** y prefijo `use` para hooks personalizados
- Ejemplo de hook personalizado: `useAuth.ts`, `useFetch.ts`
- Hooks nativos más comunes: `useState`, `useEffect`, `useContext`, `useRef`, `useMemo`, `useCallback`


# KubyCode.github.io
