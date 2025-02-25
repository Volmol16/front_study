<template>
    <div class="flex justify-between items-center min-h-screen">
        <img src="/image/auth/Group 67.png" alt="Group">
        <div class="flex flex-col justify-center items-center">
            <h1 class="text-4xl font-semibold">Присоединяйтесь к нашей команде!</h1>
            <p class="mt-2">Заполните пожалуйста три формы необходимых для регистрации</p>
            <div class="mt-6">
                <div class="flex flex-col items-center">
                    <CountPageRegister :countPages="countPages" />
                    <component :typeAuth="typeAuth" @toggle-auth="$emit('toggle-auth')" class="mt-8"
                        :is="currentComponent" @next-step="nextPage" @prev-step="prevStep"
                        @update:isValid="isValid = $event" @file-selected="handleFileSelected" />
                </div>
                <div class="flex justify-end gap-x-4 mt-8">
                    <button class="px-8 py-3 bg-white text-black rounded-lg text-xl font-medium leading-7"
                        @click="prevStep" v-if="countPages > 1" :disabled="countPages === 1">Назад</button>
                    <button class="px-8 py-3 bg-black text-white rounded-lg text-xl font-medium leading-7"
                        @click="handleClick" :disabled="!isValid">
                        {{ countPages === 3 ? 'Готово' : 'Далее' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import UserInformation from '@/widgets/auth/UserInformation.vue';
import StudentСard from '@/widgets/auth/StudentСard.vue';
import RegistrationSummary from '@/widgets/auth/RegistrationSummary.vue';
import CountPageRegister from '@/ui/CountPageRegister.vue';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const countPages = ref(1);
const isValid = ref(false);
const authStore = useAuthStore();

const props = defineProps({
    typeAuth: {
        type: Boolean,
    }
})

const emit = defineEmits(['toggle-auth', 'registration-success']);
emit('registration-success');

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

const handleClick = async () => {
    if (countPages.value === 3) {
        try {
            await authStore.register();

            await authStore.postPhoto();

            router.push({ name: 'register-success' });
        } catch (error) {
            console.error("Ошибка регистрации:", error);
        }
    } else {
        nextPage();
    }
};

const handleFileSelected = (file) => {
    authStore.setStudentCardPhoto(file);
};

const nextPage = () => {
    if (countPages.value < 3) {
        countPages.value++;
    }
};

const prevStep = () => {
    if (countPages.value > 1) {
        countPages.value--;
    }
};
</script>