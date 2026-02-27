# 🫕 Recetas de Abuela

> Un archivo vivo de la cocina casera española. Recetas auténticas de abuelas, preservadas para que no se pierdan.

---

## ¿Qué es este proyecto?

**Recetas de Abuela** es un sitio web estático construido con [Astro](https://astro.build) que recopila y preserva recetas tradicionales de abuelas españolas. El foco está en la **memoria histórica culinaria** y en la **accesibilidad**, especialmente para personas mayores.

### Características

- 🗂️ **Astro Content Collections** — cada receta es un fichero Markdown con metadatos tipados
- 👵 **Perfiles de cocineras** — cada receta puede referenciar a su cocinera (datos en JSON)
- 🔍 **Búsqueda y filtrado** — por texto libre y por etiquetas, en el cliente (sin backend)
- ♿ **Accesibilidad** — fuentes grandes, alto contraste, skip links, ARIA, touch targets de 44px
- 🖨️ **Imprimible** — estilos CSS específicos para imprimir recetas

---

### Desarrollo (con hot-reload)

```bash
# Primera vez: construye la imagen e instala dependencias
docker compose up --build

# Las siguientes veces
docker compose up
```

Abre tu navegador en **[http://localhost:4321](http://localhost:4321)**

Los cambios en el código se reflejan automáticamente sin reiniciar.

> La producción se sirve directamente desde **GitHub Pages**. Consulta [DEPLOY.md](DEPLOY.md) para el proceso de despliegue.

---

## Estructura del Proyecto

```
recetasdeabuela/
├── src/
│   ├── content/
│   │   ├── config.ts           ← Definición de colecciones (Zod)
│   │   ├── recipes/            ← Recetas en Markdown (.md)
│   │   └── cooks/              ← Cocineras en JSON (.json)
│   ├── layouts/
│   │   └── Layout.astro        ← Layout base
│   ├── components/
│   │   ├── RecipeCard.astro    ← Tarjeta de receta
│   │   ├── SearchFilter.astro  ← Buscador + filtros
│   │   └── CookProfile.astro   ← Perfil de cocinera
│   ├── pages/
│   │   ├── index.astro         ← Página principal
│   │   ├── sobre-el-proyecto.astro
│   │   ├── 404.astro
│   │   └── recetas/[slug].astro ← Página de receta individual
│   └── styles/
│       └── global.css          ← Tailwind v4 + tokens de diseño
├── public/
│   └── favicon.svg
├── Dockerfile                  ← Imagen de desarrollo
├── docker-compose.yml
├── AGENT.md                    ← Bitácora técnica para agentes IA
└── README.md
```

---

## Añadir una nueva receta

### 1. Crea el fichero Markdown

```bash
# src/content/recipes/nombre-de-la-receta.md
```

### 2. Añade el frontmatter

```yaml
---
title: "Nombre de la Receta"
description: "Una descripción breve y apetitosa."
cook_id: "abuela-pepita"         # opcional — ID del JSON de la cocinera
tags: ["tag1", "tag2", "región"]
servings: 4
prep_time: "15 min"
cook_time: "45 min"
total_time: "1 hora"
difficulty: "fácil"              # fácil | media | difícil
image: "https://..."             # opcional
image_alt: "Descripción de la imagen"
region: "Andalucía"              # opcional
date: 2024-01-01                 # opcional
featured: false                  # si es true, aparece primero en el listado
---
```

### 3. Escribe la receta en Markdown

```markdown
Introducción a la receta...

## Ingredientes

- 2 huevos
- ...

## Preparación

### 1. Primer paso
...
```

---

## Añadir una nueva cocinera

Crea un fichero JSON en `src/content/cooks/`:

```json
// src/content/cooks/abuela-pepita.json
{
  "name": "Pepa García López",
  "origin": "Valencia",
  "region": "Comunidad Valenciana",
  "bio": "Texto breve sobre su historia y su cocina.",
  "picture_profile_link": "https://...",
  "born": "1940"
}
```

El `cook_id` en el frontmatter de la receta debe coincidir con el nombre del fichero (sin la extensión `.json`).
