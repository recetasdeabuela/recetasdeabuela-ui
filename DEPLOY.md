# Guía de Despliegue — Recetas de Abuela

El repositorio incluye un workflow de GitHub Actions (`.github/workflows/deploy.yml`) que construye y publica el sitio automáticamente en cada push a `main`.

---

## Configuración inicial (una sola vez)

**1. Sube el repositorio a GitHub.**

**2. Activa GitHub Pages con el branch `deploy` como fuente:**

Settings -> Pages y configura:
- **Source:** `Deploy from a branch`
- **Branch:** `deploy` / **Folder:** `/ (root)`

**3. Listo.** El primer despliegue ocurre automáticamente en el siguiente push a `main`, o puedes lanzarlo manualmente desde **Actions -> Publicar en GitHub Pages -> Run workflow**.

Para un repositorio estándar (sin dominio personalizado), el sitio quedará en:

```
https://TU_USUARIO.github.io/recetasdeabuela/
```

---

## Dominio personalizado

Todo se gestiona con **una sola variable de repositorio**.

### 1. Añade la variable `CUSTOM_DOMAIN`

Settings -> Variables -> Actions -> **New repository variable**

| Nombre | Valor |
|---|---|
| `CUSTOM_DOMAIN` | `tudominio.com` *(sin `https://`)* |

El workflow creará automáticamente el fichero `CNAME` en el branch `deploy` y configurará las URLs internas de Astro correctamente (`SITE_URL` y `BASE_PATH`).

### 2. Configura el dominio en GitHub Pages

Settings  Pages -> **Custom domain** -> escribe tu dominio -> Save

---
