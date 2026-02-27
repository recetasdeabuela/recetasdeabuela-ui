# AGENT.md — Bitácora Técnica del Proyecto

> Este fichero es la fuente de verdad para agentes de IA y colaboradores futuros.
> Actualizar siempre que se hagan cambios significativos en la arquitectura o en las decisiones técnicas.

---

## Resumen del Proyecto

Sitio web estático para preservar recetas tradicionales de abuelas españolas.
Construido con Astro 5 (output estático, coste 0), Tailwind CSS v4 y Docker.

---

## Arquitectura General

```
recetasdeabuela/
├── src/
│   ├── content/
│   │   ├── config.ts           ← Schemas Zod para colecciones
│   │   ├── recipes/            ← *.md — Una receta por fichero
│   │   └── cooks/              ← *.json — Metadatos de cocineras
│   ├── layouts/
│   │   └── Layout.astro        ← Layout base con skip-link, header, footer
│   ├── components/
│   │   ├── RecipeCard.astro    ← Tarjeta de receta (listado)
│   │   ├── SearchFilter.astro  ← Buscador + filtro por tags (Vanilla JS)
│   │   └── CookProfile.astro   ← Perfil de cocinera (sidebar)
│   ├── pages/
│   │   ├── index.astro         ← Listado principal con búsqueda
│   │   ├── sobre-el-proyecto.astro
│   │   ├── 404.astro
│   │   └── recetas/
│   │       └── [slug].astro    ← Página individual de receta
│   └── styles/
│       └── global.css          ← Tailwind v4 + @theme tokens + prose
├── public/
│   └── favicon.svg
├── Dockerfile                  ← Imagen de desarrollo (Node 22 alpine)
└── docker-compose.yml          ← Desarrollo con hot-reload
```

---

## Stack Tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| [Astro](https://astro.build) | ^5.3.0 | Framework SSG |
| [Tailwind CSS](https://tailwindcss.com) | ^4.0.6 | Estilos |
| [@tailwindcss/vite](https://tailwindcss.com/docs/installation/using-vite) | ^4.0.6 | Integración Tailwind-Vite |
| [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) | ^0.5.15 | Estilos para contenido prose (Markdown) |
| Node.js | 22-alpine | Runtime build (Docker dev) |
| GitHub Pages | — | Hosting estático (producción) |

---

## Colecciones de Contenido (Astro Content Collections)

### `recipes` (type: `content`, ficheros `.md`)

Localización: `src/content/recipes/`

Campos del frontmatter (validados con Zod):

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `title` | string | ✅ | Nombre de la receta |
| `description` | string | ✅ | Descripción breve |
| `cook_id` | string | ❌ | ID de la cocinera (referencia a `cooks/`) |
| `tags` | string[] | ❌ | Etiquetas para filtrar |
| `servings` | number | ❌ | Número de raciones |
| `prep_time` | string | ❌ | Tiempo de preparación |
| `cook_time` | string | ❌ | Tiempo de cocción |
| `total_time` | string | ❌ | Tiempo total |
| `difficulty` | `'fácil' \| 'media' \| 'difícil'` | ❌ | Dificultad (default: `'media'`) |
| `image` | string | ❌ | URL de la imagen principal |
| `image_alt` | string | ❌ | Texto alternativo de la imagen |
| `region` | string | ❌ | Región de procedencia |
| `date` | date | ❌ | Fecha de publicación |
| `featured` | boolean | ❌ | Si aparece primero en el listado |

### `cooks` (type: `data`, ficheros `.json`)

Localización: `src/content/cooks/`

Campos:

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `name` | string | ✅ | Nombre completo |
| `origin` | string | ✅ | Ciudad/pueblo de origen |
| `region` | string | ❌ | Comunidad autónoma |
| `bio` | string | ❌ | Biografía breve |
| `picture_profile_link` | string | ❌ | URL de foto de perfil |
| `born` | string | ❌ | Año de nacimiento |

---

## Cómo Añadir una Nueva Receta

1. Crear fichero en `src/content/recipes/mi-receta.md`
2. Añadir frontmatter con los campos requeridos (`title`, `description`)
3. Escribir el contenido en Markdown
4. Si la cocinera no existe, crear su JSON en `src/content/cooks/`

```md
---
title: "Mi Receta"
description: "Descripción breve"
cook_id: "abuela-pepita"        # referencia a src/content/cooks/abuela-pepita.json
tags: ["tag1", "tag2"]
difficulty: "fácil"
---

Contenido en Markdown...
```

---

## Búsqueda y Filtrado

- Implementado en el cliente con Vanilla JS (sin dependencias externas)
- Fichero: `src/components/SearchFilter.astro` (script embebido)
- Cada `RecipeCard` tiene atributos `data-*`:
  - `data-recipe` — selector de presencia
  - `data-tags` — etiquetas en minúsculas, separadas por espacios
  - `data-title` — título en minúsculas
  - `data-description` — descripción en minúsculas
- La búsqueda normaliza tildes (NFD + regex)
- Tags: filtro OR (si seleccionas "vegetariano" O "fácil", se muestran los que tengan cualquiera de los dos)

---

## Docker

Solo se usa para desarrollo local. La producción se sirve desde GitHub Pages.

### Desarrollo (hot-reload)

```bash
docker compose up        # levanta el servidor de desarrollo
docker compose up --build  # reconstruye la imagen primero (primera vez o tras cambios en Dockerfile/package.json)
# -> http://localhost:4321
```

El volumen monta el código fuente en el contenedor. `node_modules` se mantiene en un volumen nombrado para no interferir con el host.

### Comandos útiles con Docker

```bash
# Ejecutar npm commands sin instalar nada en el host:
docker compose run --rm app npm install
docker compose run --rm app npm run build
docker compose run --rm app npx astro add <integration>

# Instalar una nueva dependencia:
docker compose run --rm app npm install <paquete>

# Ver logs en tiempo real:
docker compose logs -f
```

---

## Accesibilidad (a11y)

Criterios aplicados, orientados al público objetivo (personas mayores):

- **Fuente base:** 18px (mayor que el estándar de 16px)
- **Skip link:** "Saltar al contenido principal" visible al hacer focus con teclado
- **Focus visible:** Outline de 3px en color terracota para todos los elementos interactivos
- **Touch targets:** Mínimo 44×44px en todos los botones y enlaces
- **HTML semántico:** `<header>`, `<main>`, `<nav>`, `<article>`, `<aside>`, `<footer>`
- **ARIA:** `aria-label`, `aria-current`, `aria-pressed`, `aria-live`, `role` donde necesario
- **Imágenes:** `alt` descriptivo siempre presente
- **Print CSS:** Oculta elementos de navegación al imprimir; útil para imprimir recetas

---

## Paleta de Colores (Design Tokens)

Definidos en `src/styles/global.css` con `@theme` de Tailwind v4:

| Token | Hex | Uso |
|---|---|---|
| `--color-cream-50` | `#fffbf5` | Fondo principal |
| `--color-cream-100` | `#fef3e2` | Fondos secundarios, tags |
| `--color-terracotta-500` | `#c0392b` | Color primario/CTA |
| `--color-terracotta-600` | `#a93226` | Hover primario |
| `--color-earth-900` | `#2d1b00` | Texto principal, header, footer |
| `--color-saffron-400` | `#f4d03f` | Acentos dorados (header) |

---

## Despliegue en GitHub Pages

### Arquitectura del pipeline

```
push a main
    └─► GitHub Actions (.github/workflows/deploy.yml)
            ├─ npm ci
            ├─ npm run build   ← genera dist/ con SITE_URL y BASE_PATH correctos
            └─ peaceiris/actions-gh-pages@v4
                    └─► push de dist/ al branch "deploy" (orphan, sin historial)
                                └─► GitHub Pages sirve el contenido
```

### Configuración inicial (una sola vez)

1. Hacer push del código al repo de GitHub
2. En el repo -> **Settings -> Pages**:
   - Source: **Deploy from a branch**
   - Branch: **deploy** / Folder: **/ (root)**
3. El primer deploy se lanza automáticamente al hacer push a `main`, o manualmente desde la pestaña **Actions -> 🚀 Publicar en GitHub Pages -> Run workflow**

### Variable de repositorio para dominio personalizado

Una única variable controla todo. En **Settings -> Variables -> Actions**:

| Variable | Valor | Efecto |
|---|---|---|
| *(no definida)* | — | URLs auto (`usuario.github.io/repo`), sin CNAME |
| `CUSTOM_DOMAIN` | `tudominio.com` | `SITE_URL=https://tudominio.com`, `BASE_PATH=/`, crea `CNAME` automáticamente |

### Lógica de URLs en el workflow

```yaml
# Sin CUSTOM_DOMAIN:
SITE_URL  -> https://USUARIO.github.io
BASE_PATH -> /nombre-del-repo

# Con CUSTOM_DOMAIN=tudominio.com:
SITE_URL  -> https://tudominio.com
BASE_PATH -> /
cname     -> tudominio.com  (fichero CNAME creado por peaceiris en el branch deploy)
```

### Archivos clave del pipeline

- `.github/workflows/deploy.yml` — workflow de GitHub Actions
- `astro.config.mjs` — lee `SITE_URL` y `BASE_PATH` del entorno para configurar `site` y `base`