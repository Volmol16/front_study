<template>
    <div>
        <header class="mb-10">
            <Header />
        </header>
        <main v-if="authStore.isAuth" class="mx-10">
            <RouterView />
        </main>
        <main v-else-if="authStore.isRegistered" class="mx-10">
            <RegistrySuccessfulPages />
        </main>
        <main v-else class="mx-10">
            <RegisterPages />
        </main>
        <footer class="mt-10">
            <Footer />
        </footer>
    </div>
</template>

<script setup>
import Header from './shared/TheHeader.vue';
import Footer from './widgets/TheFooter.vue';
import RegisterPages from './pages/auth/RegisterPages.vue';
import RegistrySuccessfulPages from './pages/auth/RegistrySuccessfulPages.vue';
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(() => {
    authStore.checkAuth();
});
</script>