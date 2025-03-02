<template>
    <div class="main min-h-screen" :class="{ 'bg-[#171717]': activeSocial || status === 'true' }"
        :style="activeSocial || status === 'true' ? {} : { backgroundImage: 'url(/image/auth/Background_img.png)' }">
        <header class="px-[60px] py-6">
            <Header />
        </header>
        <div>
            <RouterView v-if="!activeSocial && status !== 'true'" />
        </div>
        <AddSocialCard v-if="activeSocial" :social-type="activeSocial" @close="closeModal" />
        <SendingQuestionnaire v-if="status === 'true'" />
    </div>
</template>

<script setup>
import Header from '@/components/sign-in/widgets/HeaderSign-in.vue';
import AddSocialCard from '@/components/sign-in/widgets/AddSocialCard.vue';
import SendingQuestionnaire from '@/components/sign-in/register/SendingQuestionnaire.vue';
import { useModalStore } from '@/stores/modalStore';
import { storeToRefs } from 'pinia';
import { ref, watchEffect } from 'vue';

const modalStore = useModalStore();
const { activeSocial } = storeToRefs(modalStore);
const { closeModal } = modalStore;

const status = ref(localStorage.getItem("Verefication"));

watchEffect(() => {
    status.value = localStorage.getItem("Verefication");
});
</script>

<style scoped>
.main {
    background-size: cover;
    background-repeat: no-repeat;
}
</style>