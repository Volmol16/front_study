<!-- src/components/RegisterForm.vue -->
<template>
    <div class="flex justify-between items-center min-h-screen">
        <img src="/image/auth/Group 67.png" alt="Group">
        <div class="flex flex-col justify-center items-center">
            <h1 class="text-4xl font-semibold">Присоединяйтесь к нашей команде!</h1>
            <p class="mt-2">Заполните пожалуйста три формы необходимых для регистрации</p>
            <div class="mt-6">
                <component :is="currentComponent" @next-step="nextPage" @prev-step="prevStep"
                    @update:isValid="isValid = $event" />
                <div class="flex justify-end gap-x-4 mt-8">
                    <button class="px-8 py-3 bg-white text-black rounded-lg text-xl font-medium leading-7"
                        @click="prevStep" v-if="countPages > 1" :disabled="countPages === 1">Назад</button>
                    <button class="px-8 py-3 bg-black text-white rounded-lg text-xl font-medium leading-7"
                        v-if="countPages <= 3" @click="nextPage" :disabled="!isValid">
                        {{ countPages === 3 ? 'Готово' : 'Далее' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import UserInformation from '@/widgets/UserInformation.vue';
import StudentСard from '@/widgets/StudentСard.vue';
import RegistrationSummary from '@/widgets/RegistrationSummary.vue';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { computed } from 'vue';

const countPages = ref(1);
const isValid = ref(false);
const authStore = useAuthStore();

const currentComponent = computed(() => {
    switch (countPages.value) {
        case 1:
            return UserInformation;
        case 2:
            return StudentСard;
        case 3:
            return RegistrationSummary;
        default:
            return null;
    }
})

const nextPage = () => {
    if (countPages.value < 3) {
        countPages.value++;
    }
    if (countPages.value === 3) {
        authStore.login();
    }
};

const prevStep = () => {
    if (countPages.value > 1) {
        countPages.value--;
    }
};

</script>