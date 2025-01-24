<template>
    <div class="bg-[#D9D9D9] rounded-2xl py-[102px] px-8">
        <div class="max-w-[413px]">
            <h2 class="text-4xl font-medium">Аукцион</h2>
            <div class="mt-4 flex flex-col gap-y-4 text-xl">
                <p>Просматривайте открытые заказы, откликайтесь на интересные вам проекты и предлагайте
                    свои услуги.</p>
                <p>Покажите заказчикам ваши навыки и опыт, чтобы получить новые интересные задания.</p>
            </div>
            <button class="px-8 py-3 bg-white text-black text-xl rounded-lg mt-6">Вступить</button>
        </div>
        <div>
            <ChartAuctionCard v-for="user in users" :key="user.id" :user="users" />
        </div>
    </div>
</template>

<script setup>
import ChartAuctionCard from './ChartAuctionCard.vue';
import { useUserStore } from '@/stores';

const userStore = useUserStore();
const users = userStore.listUsers
</script>