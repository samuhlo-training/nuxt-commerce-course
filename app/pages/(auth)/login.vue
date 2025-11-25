<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'


definePageMeta({
    layout: 'login-layout'
})

const toast = useToast()

const fields: AuthFormField[] = [{
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
    name: 'remember',
    label: 'Recordarme',
    type: 'checkbox'
}]

const providers = [{
    label: 'Google',
    icon: 'i-simple-icons-google',
    onClick: () => {
        toast.add({ title: 'Google', description: 'Iniciar sesión con Google' })
    }
}, {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    onClick: () => {
        toast.add({ title: 'GitHub', description: 'Iniciar sesión con GitHub' })
    }
}]

const schema = z.object({
    email: z.email('Correo electrónico inválido'),
    password: z.string('La contraseña es requerida').min(8, 'Debe tener al menos 8 caracteres')
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
    console.log('Submitted', payload)
}
</script>

<template>
    <div class="flex flex-col items-center justify-center gap-4 p-4">
        <UPageCard class="w-full max-w-md">
            <UAuthForm :schema="schema" title="Iniciar sesión"
                description="Ingresa tus credenciales para acceder a tu cuenta." icon="i-lucide-user" :fields="fields"
                :providers="providers" @submit="onSubmit" />
        </UPageCard>
        <UButton color="primary" variant="ghost" label="¿No tienes cuenta? Regístrate" to="/register" />
    </div>
</template>
