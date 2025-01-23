<template>
    <div class="max-w-[800px] mx-auto">
        <ListOrdersHeader />
        <div class="grid grid-cols-3 gap-x-7 mt-8">
            <TheCardListOrder v-for="card in users" :key="card.id" :card="card" />
        </div>
    </div>
</template>

<script setup>
import ListOrdersHeader from '@/components/ListOrdersHeader.vue';
import TheCardListOrder from '@/widgets/TheCardListOrder.vue';
import { useUserStore } from '@/stores';

const useStore = useUserStore();
const users = useStore.listOrderCards
</script>