<template>
    <div class="bg-[#D9D9D9] py-5 px-10 flex justify-between items-center">
        <button>
            <router-link class="text-3xl font-semibold text-black uppercase" to="/">Logo</router-link>
        </button>
        <div class="flex gap-x-8">
            <router-link class="uppercase" to="/myOrders"
                :class="route.path === '/myOrders' ? 'text-[#8C8C8E]' : ''">Мои заказы</router-link>
            <router-link class="uppercase" to="/myReviews"
                :class="route.path === '/myReviews' ? 'text-[#8C8C8E]' : ''">Мои отзывы</router-link>
            <router-link class="uppercase" to="/сommunities"
                :class="route.path === '/сommunities' ? 'text-[#8C8C8E]' : ''">Сообщество</router-link>
            <router-link class="uppercase" to="/auction"
                :class="route.path === '/auction' ? 'text-[#8C8C8E]' : ''">Аукцион</router-link>
            <router-link class="uppercase" to="/adminPanel"
                :class="route.path === '/adminPanel' ? 'text-[#8C8C8E]' : ''">Admin</router-link>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>