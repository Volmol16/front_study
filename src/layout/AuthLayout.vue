<template>
    <div class="main min-h-screen">
        <header class="px-[60px] py-6">
            <Header />
        </header>
        <div class="">
            <RouterView />
        </div>

    </div>
</template>

<script setup>
import Header from '@/components/sign-in/widgets/HeaderSign-in.vue';
</script>

<style scoped>
.main {
    background-image: url('/image/auth/Background_img.png');
    background-size: cover;
    background-repeat: no-repeat;
}
</style>