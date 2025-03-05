<!-- src/layout/ProfileSettingLayout.vue -->
<template>
    <div class="bg-[#171717] min-h-screen">
        <header class="px-[60px] py-6">
            <h1 class="text-4xl font-semibold text-white">LOGO</h1>
        </header>
        <main>
            <RouterView />
        </main>
    </div>
</template>

<script setup>
import { onUnmounted } from 'vue';
import { useCheckStore } from '@/stores/useCheackStore';

const checkStore = useCheckStore();

const intervalId = setInterval(() => {
    checkStore.checkVerificationStatus();
}, 5000);

onUnmounted(() => {
    clearInterval(intervalId);
});
</script>