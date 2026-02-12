<div align="center">
  <br />
  <br />
  
  # <code>NUXT_E-COMMERCE_TRAINING</code>
  
  **MINIMALIST E-COMMERCE TEMPLATE**
  <br />

  <img src="https://img.shields.io/badge/NUXT-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white" alt="Nuxt" />
  <img src="https://img.shields.io/badge/VUE-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue" />
  <img src="https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TAILWIND-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/NEON-00E599?style=for-the-badge&logo=postgresql&logoColor=white" alt="NeonDB" />
  <img src="https://img.shields.io/badge/CLOUDINARY-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />


  <br />
  <br />
</div>

---

### 00 __ PREVIEW

![Hero Preview](public/preview_dashboard.webp)

> **ABSTRACT:** A robust e-commerce platform built with Nuxt 3, featuring a custom admin dashboard, product management, and secure authentication. Engineered with a strict "Brutalist" coding style for maximum readability and maintainability.
>
> <br />
>
> **ORIGIN:** Based on [Nuxt 3 - The Complete Guide](https://cursos.devtalles.com/courses/nuxt-3-guia-completa) by **Fernando Herrera**.
> *Adapted with strict architectural rules and "Brutalist" commenting standards.*
>
> <br />
>


---

### 01 __ ARCHITECTURE & DECISIONS

| COMPONENT | TECH | NOTE |
| :--- | :--- | :--- |
| **Core** | `Nuxt 3` | Composition API / Script Setup |
| **State** | `Composables` | Native `useState` / `h3` Session |
| **Database** | `NeonDB` | Serverless PostgreSQL via Prisma |
| **Storage** | `Cloudinary` | Image Optimization & Uploads |
| **Styles** | `Tailwind CSS` | Utility-first / Nuxt UI |

<br>

### 02 __ INSTALLATION

*Run local environment:*

```bash
# 1. Clone
git clone <repository-url>

# 2. Install dependencies
bun install

# 3. Setup Environment
cp .env.template .env
# (Fill in DATABASE_URL, NUXT_OAUTH_*, CLOUDINARY_*)

# 4. Database Setup
bunx prisma migrate dev
bun seed

# 5. Ignite
bun dev
```

### 03 __ KEY FEATURES

-   **Admin Dashboard:** Full CRUD for products with image upload support.
-   **Authentication:** Multi-provider support (GitHub) via H3 and server-side sessions.
-   **Cloud Native:** Powered by **NeonDB** (Database) and **Cloudinary** (Media Assets).
-   **Brutalist Codebase:** Every component and API handler features standardized "Dog Tag" headers for instant context.

A. THE HOOK (API Handler Pattern)
Using `defineEventHandler` with strict commentary:

```typescript
/**
 * █ [API] :: PRODUCT_DETAIL
 * =====================================================================
 * DESC:   Fetches product by slug.
 * META:   - Caches response for performance
 * STATUS: STABLE
 * =====================================================================
 */
export default defineEventHandler(async (event) => {
  // Logic...
})
```

<div align="center">
<br />

<code>DESIGNED & CODED BY <a href='https://github.com/samuhlo'>samuhlo</a></code>

<small>Lugo, Galicia</small>

</div>