<template>
    <div class="space-y-6">
        <!-- Header with Action Button -->
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
                    Productos
                </h1>
                <p class="text-gray-600 dark:text-gray-400 mt-2">
                    Gestiona y organiza tu catálogo de productos
                </p>
            </div>
            <UButton to="/dashboard/product/new" icon="i-lucide-plus" label="Agregar Producto" color="primary" size="lg" />
        </div>

        <UTable :loading="status !== 'success'" :data="products" :columns="columns" class="flex-1" />
    </div>
    <SharedPagination :total="total" :model-value="currentPage" :per-page="perPage" />
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue';
import type { TableColumn } from '@nuxt/ui';
const UBadge = resolveComponent('UBadge');
const NuxtLink = resolveComponent('NuxtLink');

const { products, total, currentPage, perPage, status } = await usePaginatedProducts();
definePageMeta({
    breadcrumbName: 'Productos',
    icon: 'i-lucide-box',
})




const columns: TableColumn<Product>[] = [
    {
        accessorKey: 'id',
        header: '#',
        cell: ({ row }) => `#${row.getValue('id')}`,
    },


    {
        accessorKey: 'images',
        header: 'Imagen',
        cell: ({ row }) => {
            const images = row.getValue('images') as string[];
            if (images && images.length > 0) {
                return h('img', { src: images[0], class: 'w-12 h-12 rounded-md object-cover' });
            } else {
                return h('span', { class: 'text-gray-600' }, 'No image');
            }
        },
    },
    {
        accessorKey: 'name',
        header: 'Nombre',
        cell: ({ row }) => {
            const productName = row.getValue('name');
            const productId = row.getValue('id');
            return h(NuxtLink, {
                to: `/dashboard/product/${productId}`,
                class: 'text-yellow-500 hover:text-yellow-700 underline cursor-pointer',
            }, () => productName);
        },
    },
    {
        accessorKey: 'description',
        header: 'Descripción',
        cell: ({ row }) => {
            return h(
                'div',
                {
                    class: 'truncate-text whitespace-normal break-words max-w-[350px] ',
                },
                String(row.getValue('description')).slice(0, 50) + '...'
            );
        },
    },
    {
        accessorKey: 'price',
        header: 'Precio',
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue('price'));
            return formatCurrency(amount);

        },
    },
    {
        accessorKey: 'tags',
        header: 'Etiquetas',
        cell: ({ row }) => {
            const tags = row.getValue('tags') as string[] | undefined;
            if (!tags || tags.length === 0) {
                return h('div', { class: 'flex-1 text-gray-600' }, 'Sin etiquetas');
            }
            return h(
                'div',
                { class: 'flex  flex-wrap gap-2' },
                tags.map((tag) =>
                    h(UBadge, { key: tag, color: 'secondary', size: 'md', variant: 'subtle', class: 'mr-0.5' }, () => tag)
                )
            );
        },
    },
    {
        accessorKey: 'createdAt',
        header: () => h('div', { class: 'text-right' }, 'Creado'),
        cell: ({ row }) => {
            const date = new Date(row.getValue('createdAt')).toLocaleString('es-ES', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });
            return h('div', { class: 'text-right font-medium' }, date);
        },
    },
];
</script>