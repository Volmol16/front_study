<template>
    <div>
        <HeaderPersonalAccount />
        <ChartCommunity class="mt-8" />
        <ChartAuction class="mt-8" />
    </div>
</template>

<script setup>
import HeaderPersonalAccount from '@/components/HeaderPersonalAccount.vue';
import ChartCommunity from '@/widgets/chart/ChartCommunity.vue';
import ChartAuction from '@/widgets/auction/ChartAuction.vue';
</script>