<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'


definePageMeta({
    layout: 'login-layout',
    middleware: 'not-athenticated'
})

const toast = useToast()
const cookieLoginEmail = useCookie<string | null>('loginEmail', {
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30, // 30 dias    
})

const {login} = useAuthentication()
const isPosting = ref(false)


const fields: AuthFormField[] = [{
    name: 'email',
    type: 'email',
    label: 'Correo electrónico',
    placeholder: 'Ingresa tu correo electrónico',
    required: true,
    defaultValue:   cookieLoginEmail.value || ''
}, {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
    placeholder: 'Ingresa tu contraseña',
    required: true
}, {
    name: 'remember',
    label: 'Recordarme',
    type: 'checkbox',
    defaultValue: !!cookieLoginEmail.value
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
    password: z.string('La contraseña es requerida').min(8, 'Debe tener al menos 8 caracteres'),
    remember: z.boolean().optional()
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
    const {email, password, remember} = payload.data
    isPosting.value = true
    if(remember){
        cookieLoginEmail.value = email
    }else{
        cookieLoginEmail.value = null
    }
    const success = await login(email, password)
    if(success){
        toast.add({ title: 'Login Success', description: 'Login exitoso' })
    }else{
        toast.add({ title: 'Login Error', description: 'Las credenciales son incorrectas' })
    }
    isPosting.value = false
  
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
