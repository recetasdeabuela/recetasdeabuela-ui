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

La ubicación exacta es:
1. Ve a la pestaña **Settings** de tu repositorio en GitHub.
2. En el menú lateral izquierdo, busca la sección **Security** (abajo del todo).
3. Despliega **Secrets and variables** y pulsa en **Actions**.
4. Verás dos pestañas: *Secrets* y *Variables*. **Haz clic en la pestaña "Variables"**.
5. Pulsa el botón verde **New repository variable**.

| Nombre | Valor |
|---|---|
| `CUSTOM_DOMAIN` | `recetasdeabuela.es` *(sin `https://`)* |

El workflow creará automáticamente el fichero `CNAME` en el branch `deploy` y configurará las URLs internas de Astro correctamente (`SITE_URL` y `BASE_PATH`).

### 2. Configura el dominio en GitHub Pages

1. Ve a **Settings** -> **Pages**.
2. En la sección **Build and deployment**, asegúrate de que el **Source** sea `Deploy from a branch`.
3. Selecciona el branch `deploy` y la carpeta `/(root)`. Dale a **Save**.
4. **IMPORTANTE:** Una vez guardado el branch, aparecerá justo debajo la sección **Custom domain**.
5. Escribe `recetasdeabuela.es` y dale a **Save**.
6. Marca la casilla **Enforce HTTPS** (puede tardar unos minutos en estar disponible mientras GitHub genera el certificado SSL).

---