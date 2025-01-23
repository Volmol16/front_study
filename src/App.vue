<template>
    <div>
        <header>
            <Header />
        </header>
        <main class="mx-10">
            <RouterView />
        </main>
    </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Header from './widgets/TheHeader.vue';
</script>