<script setup lang="ts">
/**
 * █ [PAGE] :: REGISTER
 * =====================================================================
 * DESC:   Página de registro de usuario.
 * PATH:   /register
 * META:   - Usa 'login-layout'
 *         - Redirige si ya está autenticado
 * STATUS: ESTABLE
 * =====================================================================
 */
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'


// =============================================================================
// █ PAGE META
// =============================================================================
definePageMeta({
    layout: 'login-layout',
    middleware: 'not-athenticated'
})

// =============================================================================
// █ NÚCLEO / DEPENDENCIAS
// =============================================================================
const toast = useToast()

// =============================================================================
// █ CONFIGURACIÓN DEL FORMULARIO
// =============================================================================
const fields: AuthFormField[] = [
    {
        name: 'name',
        type: 'text',
        label: 'Nombre completo',
        placeholder: 'Ingresa tu nombre completo',
        required: true
    },
    {
        name: 'email',
        type: 'email',
        label: 'Correo electrónico',
        placeholder: 'Ingresa tu correo electrónico',
        required: true
    }, {
        name: 'password',
        label: 'Contraseña',
        type: 'password',
        placeholder: 'Ingresa tu contraseña',
        required: true
    }, {
        name: 'confirmPassword',
        label: 'Confirmar contraseña',
        type: 'password',
        placeholder: 'Confirma tu contraseña',
        required: true
    }]


// =============================================================================
// █ ESQUEMA DE VALIDACIÓN
// =============================================================================
const schema = z.object({
    name: z.string('El nombre es requerido').min(2, 'Debe tener al menos 2 caracteres'),
    email: z.email('Correo electrónico inválido'),
    password: z.string('La contraseña es requerida').min(8, 'Debe tener al menos 8 caracteres'),
    confirmPassword: z.string('Confirma tu contraseña')
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
})

type Schema = z.output<typeof schema>

// =============================================================================
// █ MANEJADORES DE INTERACCIÓN
// =============================================================================
function onSubmit(payload: FormSubmitEvent<Schema>) {
    console.log('Registro submitted', payload)
}
</script>

<template>
    <!-- ======================================================================= -->
    <!-- █ PÁGINA: REGISTRO -->
    <!-- ======================================================================= -->
    <div class="flex flex-col items-center justify-center gap-4 p-4">
        <UPageCard class="w-full max-w-md">
            <UAuthForm :schema="schema" title="Registrarse"
                description="Crea una nueva cuenta para acceder a la plataforma." icon="i-lucide-user" :fields="fields"
                @submit="onSubmit" :ui="{
                    leadingIcon: 'text-5xl'
                }" />
        </UPageCard>
        <UButton color="primary" variant="ghost" label="¿Ya tienes cuenta? Inicia sesión" to="/login" />
    </div>
</template>
