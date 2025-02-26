<template>
    <div>
        <header class="mb-10">
            <Header />
        </header>
        <main class="mx-10">
            <RouterView />
        </main>
        <footer class="mt-10">
            <Footer />
        </footer>
    </div>
</template>

<script setup>
import Header from '@/widgets/TheHeader.vue';
import Footer from '@/widgets/TheFooter.vue';
import { useAuthStore } from './stores/useAuthStore';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(() => {
    authStore.checkAuth();
});
</script>