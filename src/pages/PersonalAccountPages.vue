<template>
    <div v-if="useProfile.profile">
        <HeaderPersonalAccount />
        <ChartCommunity class="mt-8" />
        <ChartAuction class="mt-8" />
    </div>
</template>

<script setup>
import HeaderPersonalAccount from '@/components/profile/HeaderPersonalAccount.vue';
import ChartCommunity from '@/widgets/chart/ChartCommunity.vue';
import ChartAuction from '@/widgets/auction/ChartAuction.vue';
import { useUserProfileStore } from '@/stores/UserProfile';
import { onMounted } from 'vue';

const useProfile = useUserProfileStore();

onMounted(() => {
    useProfile.getProfile();
});
</script>