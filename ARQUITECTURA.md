# 🏗️ Arquitectura del Proyecto Nuxt 4

Este documento describe la arquitectura y estructura del proyecto para servir como referencia y plantilla para futuras aplicaciones.

---

## 📋 Índice

1. [Stack Tecnológico](#stack-tecnológico)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Configuración Principal](#configuración-principal)
4. [Arquitectura de Carpetas](#arquitectura-de-carpetas)
5. [Patrones y Convenciones](#patrones-y-convenciones)
6. [Base de Datos](#base-de-datos)
7. [API Server](#api-server)
8. [Guía de Implementación](#guía-de-implementación)

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Nuxt** | ^4.2.1 | Framework principal |
| **Vue** | ^3.5.24 | Framework UI reactivo |
| **TypeScript** | Integrado | Tipado estático |
| **Tailwind CSS** | ^4.1.17 | Estilos utility-first |
| **@nuxt/ui** | ^4.2.1 | Componentes UI |
| **Prisma** | 6.19.0 | ORM para base de datos |
| **PostgreSQL** | - | Base de datos relacional |
| **Zod** | ^4.1.13 | Validación de esquemas |

### Módulos Nuxt Instalados

```typescript
modules: [
  "@nuxt/eslint",    // Linting
  "@nuxt/fonts",     // Gestión de fuentes
  "@nuxt/icon",      // Sistema de iconos
  "@nuxt/image",     // Optimización de imágenes
  "@nuxt/ui",        // Componentes UI
  "@prisma/nuxt",    // Integración Prisma
]
```

---

## 📁 Estructura del Proyecto

```
proyecto/
├── app/                          # Código principal de la aplicación
│   ├── app.vue                   # Componente raíz
│   ├── app.config.ts             # Configuración de UI/tema
│   ├── error.vue                 # Página de error global
│   ├── assets/
│   │   └── css/
│   │       └── global.css        # Estilos globales (Tailwind)
│   ├── components/               # Componentes Vue
│   │   ├── shared/               # Componentes compartidos
│   │   ├── home/                 # Componentes de página home
│   │   ├── dashboard/            # Componentes del dashboard
│   │   ├── product/              # Componentes de producto
│   │   ├── products/             # Componentes de listado
│   │   ├── pricing/              # Componentes de precios
│   │   ├── modal/                # Componentes modales
│   │   └── icons/                # Componentes de iconos
│   ├── composables/              # Composables (lógica reutilizable)
│   ├── layouts/                  # Layouts de la aplicación
│   ├── pages/                    # Páginas (rutas automáticas)
│   │   ├── (public)/             # Rutas públicas (grupo)
│   │   ├── (auth)/               # Rutas de autenticación (grupo)
│   │   └── dashboard/            # Rutas del dashboard
│   └── utils/                    # Utilidades específicas del cliente
├── server/                       # Servidor Nitro (API)
│   └── api/                      # Endpoints de API
│       ├── home/                 # APIs de home
│       ├── product/              # APIs de producto
│       └── products/             # APIs de productos
├── shared/                       # Código compartido (cliente/servidor)
│   ├── types/                    # Tipos TypeScript
│   └── utils/                    # Utilidades compartidas
├── lib/                          # Librerías externas
│   └── prisma.ts                 # Cliente Prisma singleton
├── prisma/                       # Configuración Prisma
│   ├── schema.prisma             # Esquema de base de datos
│   └── migrations/               # Migraciones
├── seed/                         # Scripts de seed
│   ├── seed-database.ts          # Script principal
│   └── *.seed.ts                 # Datos de seed
├── public/                       # Archivos estáticos
├── nuxt.config.ts                # Configuración de Nuxt
├── package.json                  # Dependencias
└── tsconfig.json                 # Configuración TypeScript
```

---

## ⚙️ Configuración Principal

### `nuxt.config.ts`

```typescript
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // CSS global
  css: ["~/assets/css/global.css"],

  // Configuración de la app
  app: {
    head: {
      title: "Mi Sitio con Nuxt",
      meta: [
        { name: "description", content: "Descripción del sitio" },
      ],
    },
  },

  // Módulos
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "@prisma/nuxt",
  ],

  // Configuración Vite para Prisma
  vite: {
    resolve: {
      alias: {
        ".prisma/client/index-browser":
          "./node_modules/.prisma/client/index-browser.js",
      },
    },
  },

  // Prerendering de rutas
  nitro: {
    prerender: {
      routes: ["/", "/about", "/contact", "/pricing", "/products"],
      ignore: ["/dashboard", "/dashboard/**"],
    },
  },
});
```

### `app/app.config.ts`

```typescript
export default defineAppConfig({
  ui: {
    colors: {
      neutral: "stone",
      primary: "amber",
      secondary: "rose",
    },
  },
});
```

### `app/app.vue`

```vue
<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
```

---

## 🗂️ Arquitectura de Carpetas

### Componentes (`app/components/`)

Estructura organizada por **dominio/feature**:

```
components/
├── shared/           # Reutilizables en toda la app
│   ├── Header.vue
│   ├── Footer.vue
│   └── Pagination.vue
├── home/             # Específicos de la página home
│   ├── CTA.vue
│   ├── Features.vue
│   ├── Stack.vue
│   └── Testimonials.vue
├── dashboard/        # Específicos del dashboard
│   ├── Navbar.vue
│   └── Sidebar.vue
├── product/          # Detalle de producto
│   ├── Card.vue
│   ├── Reviews.vue
│   └── Suggestions.vue
├── products/         # Listado de productos
│   └── Grid.vue
├── pricing/          # Sección de precios
│   └── Table.vue
├── modal/            # Modales
│   └── Review.vue
└── icons/            # Iconos SVG
    └── Nuxtui.vue
```

**Auto-import**: Nuxt importa automáticamente usando el prefijo de carpeta:
- `components/shared/Header.vue` → `<SharedHeader />`
- `components/home/CTA.vue` → `<HomeCTA />`
- `components/dashboard/Sidebar.vue` → `<DashboardSidebar />`

### Páginas (`app/pages/`)

Sistema de **grupos de rutas** usando paréntesis `()`:

```
pages/
├── dashboard.vue              # /dashboard (layout especial)
├── (public)/                  # Grupo público (no afecta URL)
│   ├── index.vue              # /
│   ├── about.vue              # /about
│   ├── contact.vue            # /contact
│   ├── products.vue           # /products
│   ├── pricing/
│   │   └── index.vue          # /pricing
│   └── product/
│       └── [slug].vue         # /product/:slug
├── (auth)/                    # Grupo autenticación
│   ├── login.vue              # /login
│   └── register.vue           # /register
└── dashboard/                 # Rutas anidadas dashboard
    ├── index.vue              # /dashboard
    └── products/
        └── index.vue          # /dashboard/products
```

**Grupos `()` sirven para**:
- Organizar archivos sin afectar la URL
- Agrupar páginas con lógica similar
- Aplicar middleware a grupos específicos

### Layouts (`app/layouts/`)

```typescript
// layouts/default.vue - Layout público
<template>
  <div class="flex flex-col h-screen">
    <SharedHeader />
    <main class="container mx-auto flex-1 mt-2">
      <slot />
    </main>
    <SharedFooter />
  </div>
</template>

// layouts/dashboard-layout.vue - Layout dashboard
<template>
  <UDashboardGroup>
    <DashboardSidebar />
    <UDashboardPanel>
      <DashboardNavbar />
      <div class="flex-1 overflow-auto p-6">
        <slot />
      </div>
    </UDashboardPanel>
  </UDashboardGroup>
</template>

// layouts/login-layout.vue - Layout auth
```

**Uso en páginas**:
```vue
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout'
})
</script>
```

### Composables (`app/composables/`)

Lógica reutilizable auto-importada:

```typescript
// composables/usePaginatedProducts.ts
export const usePaginatedProducts = async () => {
  const route = useRoute();

  const page = computed(() => {
    const pageParam = route.query.page as string;
    return isNaN(+pageParam) ? 1 : +pageParam;
  });

  const limit = computed(() => {
    const limitParam = route.query.limit as string;
    return isNaN(+limitParam) ? 10 : +limitParam;
  });

  const offset = computed(() => (page.value - 1) * limit.value);

  const { data, error, status, pending } = await useFetch("/api/products", {
    query: { limit, offset },
    watch: [page, limit],
  });

  return {
    products: computed(() => data.value?.products || []),
    totalPages: computed(() => data.value?.totalPages || 0),
    currentPage: computed(() => data.value?.currentPage || 1),
    total: computed(() => data.value?.total || 0),
    error,
    status,
    pending,
  };
};

// composables/useProduct.ts
export const useProduct = async (slug: string) => {
  const { data, error, status, refresh, pending } = 
    await useFetch(`/api/product/${slug}`);

  return { product: data, error, status, refresh, pending };
};
```

### Shared (`shared/`)

Código compartido entre cliente y servidor:

```typescript
// shared/types/product.ts
export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
}

// shared/utils/format-currency.ts
export const formatCurrency = (
  amount: number,
  currency: string = "EUR",
  locale: string = "es-ES"
) => {
  return new Intl.NumberFormat(locale, { 
    style: "currency", 
    currency 
  }).format(amount);
};

// shared/utils/shuffle-array.ts
export const shuffleArray = <T>(array: T[]): T[] => {
  // Fisher-Yates shuffle
};
```

### Utils del Cliente (`app/utils/`)

```typescript
// app/utils/sleep.ts
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
```

---

## 🗄️ Base de Datos

### Configuración Prisma

**`lib/prisma.ts`** - Cliente Singleton:
```typescript
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => new PrismaClient()

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
```

**`prisma/schema.prisma`**:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model SiteReviews {
  id           Int      @id @default(autoincrement())
  name         String
  subtitle     String
  description  String
  profileImage String
  createdAt    DateTime @default(now())
}

model Product {
  id          Int      @id @default(autoincrement())
  slug        String   @unique
  name        String
  description String
  price       Int
  images      String[]
  tags        String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Seeding

**`seed/seed-database.ts`**:
```typescript
import prisma from "../lib/prisma.ts";
import { siteReviews } from "./site-reviews.seed.ts";
import { products } from "./products.seed.ts";

async function seedDatabase() {
  await prisma.siteReviews.deleteMany();
  await prisma.product.deleteMany();

  await prisma.siteReviews.createMany({ data: siteReviews });
  await prisma.product.createMany({ data: products });

  console.log("Database seeded successfully");
}

seedDatabase();
```

**Ejecutar**: `pnpm seed` o `ts-node seed/seed-database.ts`

---

## 🔌 API Server

### Estructura de Endpoints

```
server/api/
├── home/
│   ├── cta-info.get.ts         # GET /api/home/cta-info
│   └── reviews.get.ts          # GET /api/home/reviews
├── product/
│   ├── [slug].get.ts           # GET /api/product/:slug
│   └── [slug]/
│       └── suggestions.get.ts  # GET /api/product/:slug/suggestions
└── products/
    └── index.get.ts            # GET /api/products
```

### Ejemplo: Listado Paginado

**`server/api/products/index.get.ts`**:
```typescript
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let limit = parseInt(query.limit as string);
  let offset = parseInt(query.offset as string);
  
  // Validación
  if (isNaN(limit) || limit < 1) limit = 10;
  if (isNaN(offset) || offset < 0) offset = 0;

  const products = await prisma.product.findMany({
    take: limit,
    skip: offset,
  });

  const total = await prisma.product.count();
  const totalPages = Math.ceil(total / limit);

  return {
    products,
    totalPages,
    currentPage: Math.floor(offset / limit) + 1,
    perPage: limit,
    total,
  };
});
```

### Ejemplo: Detalle con Error 404

**`server/api/product/[slug].get.ts`**:
```typescript
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event, "slug");

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: `Producto no encontrado con ${slug}`,
    });
  }

  return product;
});
```

---

## 📐 Patrones y Convenciones

### Naming Conventions

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Componentes | PascalCase | `ProductCard.vue` |
| Composables | camelCase con `use` | `useProduct.ts` |
| Páginas | kebab-case | `about.vue` |
| API endpoints | kebab-case + método | `index.get.ts` |
| Types | PascalCase | `Product.ts` |
| Utils | kebab-case | `format-currency.ts` |

### Estructura de un Componente

```vue
<script setup lang="ts">
// 1. Imports (si no son auto-importados)
import type { Product } from '~~/shared/types/product'

// 2. Props y Emits
const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  'update:selected': [value: boolean]
}>()

// 3. Composables
const route = useRoute()

// 4. Estado reactivo
const isLoading = ref(false)

// 5. Computed
const formattedPrice = computed(() => 
  formatCurrency(props.product.price)
)

// 6. Métodos
const handleClick = () => { /* ... */ }

// 7. Lifecycle hooks
onMounted(() => { /* ... */ })
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Estilos locales si necesario */
</style>
```

### Manejo de Errores Global

**`app/error.vue`**:
```vue
<template>
  <UError
    :error="error"
    :clear="{
      size: 'xl',
      icon: 'i-lucide-arrow-left',
      class: 'rounded-full',
      label: 'Vuelve al inicio'
    }"
  />
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
  error: NuxtError;
}>();
</script>
```

---

## 🚀 Guía de Implementación

### 1. Iniciar Nuevo Proyecto

```bash
# Crear proyecto
npx nuxi@latest init mi-proyecto

# Instalar dependencias base
pnpm add @nuxt/ui @nuxt/eslint @nuxt/fonts @nuxt/icon @nuxt/image
pnpm add @prisma/client @prisma/nuxt zod
pnpm add -D prisma @iconify-json/lucide @iconify-json/simple-icons
```

### 2. Configurar Prisma

```bash
# Inicializar Prisma
npx prisma init

# Después de definir schema
npx prisma migrate dev --name init
npx prisma generate
```

### 3. Estructura de Carpetas Inicial

```bash
mkdir -p app/{components/{shared,home,dashboard},composables,layouts,pages/{(public),(auth)},utils,assets/css}
mkdir -p server/api
mkdir -p shared/{types,utils}
mkdir -p lib seed
```

### 4. Scripts de package.json

```json
{
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare",
    "seed": "ts-node seed/seed-database.ts"
  }
}
```

### 5. Estilos Base

**`app/assets/css/global.css`**:
```css
@import "tailwindcss";
@import "@nuxt/ui";

@theme {
  --radius: 0.5rem;
}
```

---

## 📝 Checklist para Nuevos Proyectos

- [ ] Crear estructura de carpetas
- [ ] Configurar `nuxt.config.ts`
- [ ] Configurar `app.config.ts` con tema
- [ ] Crear layout default y layouts adicionales
- [ ] Configurar Prisma y schema
- [ ] Crear cliente Prisma singleton
- [ ] Definir tipos en `shared/types/`
- [ ] Crear utilidades en `shared/utils/`
- [ ] Implementar componentes shared (Header, Footer)
- [ ] Crear composables base
- [ ] Configurar error.vue
- [ ] Crear scripts de seed
- [ ] Definir rutas pre-renderizadas

---

## 🔗 Referencias

- [Documentación Nuxt](https://nuxt.com/docs)
- [Nuxt UI](https://ui.nuxt.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vue 3 Docs](https://vuejs.org/guide)

---

*Generado el 18 de diciembre de 2025*
