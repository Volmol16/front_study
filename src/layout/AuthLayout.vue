<!-- /* src/layout/AuthLayout.vue -->
<template>
    <div class="main min-h-screen" :class="{ 'bg-[#171717]': activeSocial || status === 'true' }"
        :style="activeSocial || status === 'true' ? {} : { backgroundImage: 'url(/image/auth/Background_img.png)' }">
        <header class="px-[60px] py-6">
            <Header />
        </header>

        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>

        <AddSocialCard v-if="activeSocial" :social-type="activeSocial" @close="closeModal" />
        <ModalGift v-if="modalGift" @close-modal="modalGift = false" />
    </div>
</template>

<script setup>
import Header from '@/components/sign-in/widgets/HeaderSign-in.vue';
import AddSocialCard from '@/components/sign-in/widgets/AddSocialCard.vue';
import SendingQuestionnaire from '@/components/sign-in/register/SendingQuestionnaire.vue';
import ModalGift from '@/components/sign-in/widgets/ModalGift.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { useModalStore } from '@/stores/modalStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watchEffect } from 'vue';

const authStore = useAuthStore();
const modalGift = ref(false);
const modalStore = useModalStore();
const { activeSocial } = storeToRefs(modalStore);
const { closeModal } = modalStore;

const status = ref(localStorage.getItem("Verefication"));

watchEffect(() => {
    status.value = localStorage.getItem("Verefication");
});

onMounted(async () => {
    await authStore.statusVerefication();
});

</script>

<style scoped>
.main {
    background-size: cover;
    background-repeat: no-repeat;
}
</style>