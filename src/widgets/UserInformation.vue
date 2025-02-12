<!-- src/widgets/UserInformation.vue -->
<template>
    <div>
        <div class="flex flex-col gap-y-4">
            <input class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none"
                type="text" placeholder="Логин*" v-model="auth.username">
            <input class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none"
                type="text" placeholder="Фамилия*" v-model="auth.surname">
            <input class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none"
                type="text" placeholder="Имя*" v-model="auth.name">
            <input class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none"
                type="text" placeholder="Отчество" v-model="auth.patronymic">
            <input class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none"
                type="email" placeholder="Email*" v-model="auth.email">
            <!-- <input class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none"
                type="text" placeholder="Id vk\telegram*" v-model="auth.socialId"> -->
            <input class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none"
                type="password" placeholder="Пароль" v-model="auth.password">
            <input class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none"
                type="password" placeholder="Повторите пароль" v-model="passwordRepeat">
        </div>
        <div class="mt-8 flex flex-col gap-y-3">
            <BoxingCheckForReg v-model:isChecked="isAgreementChecked">
                <p>Согласие на обработку персональных данных</p>
            </BoxingCheckForReg>
            <BoxingCheckForReg v-model:isChecked="isPrivacyPolicyChecked">
                <p>Соглашаюсь с политикой конфиденциальности</p>
            </BoxingCheckForReg>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { computed, watchEffect, ref } from 'vue';
import BoxingCheckForReg from '@/ui/BoxingCheckForReg.vue';

const emit = defineEmits(['update:isValid']);
const authStore = useAuthStore();
const auth = computed(() => authStore.user);
const isDataLoaded = ref(false);
const passwordRepeat = ref('');
const isAgreementChecked = ref(false);
const isPrivacyPolicyChecked = ref(false);

const isFormValid = computed(() => {
    if (!auth.value) return false;

    return auth.value.username.trim() !== '' &&
        auth.value.surname.trim() !== '' &&
        auth.value.name.trim() !== '' &&
        auth.value.email.trim() !== '' &&
        auth.value.password.trim() !== '' &&
        auth.value.password === passwordRepeat.value &&
        isAgreementChecked.value &&
        isPrivacyPolicyChecked.value
    // &&
    // // auth.value.socialId.Vk.trim() !== '';
});

watchEffect(() => {
    if (isDataLoaded.value) emit('update:isValid', isFormValid.value);
});

watchEffect(() => {
    if (auth.value) {
        isDataLoaded.value = true;
    }
});
</script>