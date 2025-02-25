<template>
    <div>
        <div class="flex flex-col gap-y-4">
            <select v-model="selectDicsipline"
                class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none">
                <option value="" disabled>
                    Какие дисциплины вы решаете
                </option>
                <option v-for="forms in descipline" :key="forms.id" :value="forms.id">
                    {{ forms.name }}
                </option>
            </select>
            <input class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none"
                type="text" placeholder="О себе" v-model="authStore.data.student_card.about_self">
        </div>
    </div>
    <div class="mt-4 flex flex-col gap-y-4">
        <LoadingFilesForRegistration>
            <h4>Прикрепите фото студенческого билета</h4>
        </LoadingFilesForRegistration>
        <!-- <LoadingFilesForRegistration>
            <h4>Прикрепите материалы ваших работ</h4>
        </LoadingFilesForRegistration> -->
    </div>
</template>

<script setup>
import LoadingFilesForRegistration from '@/ui/LoadingFilesForRegistration.vue';
import { useAuthStore } from '@/stores/auth';
import { getDepartments } from '@/app/global/api';
import { onMounted, ref, watch } from 'vue';


const authStore = useAuthStore();
const descipline = ref([])
const selectDicsipline = ref('')
const emit = defineEmits(['update:isValid']);

watch([selectDicsipline], () => {
    authStore.data.profile.disciplines = [Number(selectDicsipline.value)];
})

const isFormValid = () => {
    return descipline.value.length > 0;
}

const fetchDiscipline = async () => {
    try {
        const response = await getDepartments();
        descipline.value = response.results || [];
    } catch (error) {
        console.error('Ошибка загрузки дисциплин:', error);
        descipline.value = [];
    }
}

onMounted(() => {
    fetchDiscipline();
})
</script>