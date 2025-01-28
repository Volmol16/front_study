<template>
    <div class="max-w-[800px] mx-auto h-screen">
        <div class="flex justify-between">
            <h1 class="text-4xl font-semibold">Сообщества</h1>
            <button><img src="/image/communities/heart.svg" alt="heart"></button>
        </div>
        <NotCommunity class="mt-8" />
    </div>
</template>

<script setup>
import NotCommunity from '@/widgets/NotCommunity.vue';
</script>