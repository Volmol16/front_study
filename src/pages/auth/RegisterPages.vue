<!-- src/pages/RegisterPages.vue -->
<template>
    <div class="px-4">
        <RegisterForm v-if="!typeAuth" @toggle-auth="toggleAuth" :typeAuth="typeAuth"
            @registration-success="handleSuccess" />
        <AuthorizationForm v-else @toggle-auth="toggleAuth" :typeAuth="typeAuth" />
    </div>
</template>

<script setup>
import RegisterForm from '@/components/auth/RegisterForm.vue';
import AuthorizationForm from '@/components/auth/AuthorizationForm.vue';
import { ref } from 'vue';

const typeAuth = ref(true);

const toggleAuth = () => {
    typeAuth.value = !typeAuth.value;
};

</script>