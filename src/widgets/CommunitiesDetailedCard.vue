<template>
    <div class="flex gap-x-[30px]">
        <div class="max-w-[547px]">
            <img class="w-[547px] h-[228px] rounded-2xl" :src="card.image" alt="Background" loading="lazy">
            <div class="flex justify-between mt-6">
                <h1>{{ card.title }}</h1>
                <button><img src="/image/communities/heart.svg" alt="heart"></button>
            </div>
            <p>{{ card.description }}</p>
            <StatisticsCommunitiesCard :card="card" />
            <div class="flex items-center gap-x-4 mt-5 px-6 py-4 bg-[#D9D9D9] rounded-2xl">
                <img src="/image/communities/Verified.svg" alt="Verifield">
                <div class="flex flex-col">
                    <h2 class="text-xl font-semibold">2 500 рублей</h2>
                    <span class="text-[#8C8C8E]">Рыночная цена</span>
                </div>
            </div>
            <div>
                <h2 class="text-3xl font-medium mt-5">Описание</h2>
                <p class="mt-4 text-[#8C8C8E]">{{ card.description }}</p>
            </div>
        </div>
        <div>
            <h2>Капитан</h2>
            <div class="flex gap-x-3 mt-5">
                <img class="w-[60px]" src="/image/works/user.svg" alt="">
                <div>
                    <h3>Nickname</h3>
                    <span class="text-[#8C8C8E]">Русский язык</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import StatisticsCommunitiesCard from '@/ui/StatisticsCommunitiesCard.vue';

defineProps({
    card: {
        type: Object,
        required: true
    }
})
</script>