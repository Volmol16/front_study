<!-- src/widgets/StudentСard.vue -->
<template>
    <div class="flex flex-col gap-y-4">
        <!-- Университеты -->
        <select v-model="selectedUniversity" @change="fetchFaculties" :disabled="loading"
            class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none">
            <option value="" disabled>Выберите вуз</option>
            <option v-for="university in universities" :key="university.id" :value="university.id">
                {{ university.name }}
            </option>
        </select>

        <!-- Факультеты -->
        <select v-model="selectedFaculty" @click="fetchDepartments" :disabled="!selectedUniversity || loading"
            class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none">
            <option value="" disabled>
                {{ faculties.length ? 'Выберите факультет' : 'Нет доступных факультетов' }}
            </option>
            <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">
                {{ faculty.name }}
            </option>
        </select>

        <!-- Кафедры -->
        <select v-model="selectedDepartment" :disabled="!selectedFaculty || loading"
            class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none">
            <option value="" disabled>
                {{ departments.length ? 'Выберите кафедру' : 'Нет доступных кафедр' }}
            </option>
            <option v-for="department in departments" :key="department.id" :value="department.id">
                {{ department.name }}
            </option>
        </select>

        <!-- Курс -->
        <select v-model="course"
            class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none">
            <option value="" disabled>Выберите курс</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue';
import { getUniversities, getFaculties, getDepartments } from '@/global/api';
import { useAuthStore } from '@/stores/auth';

const universities = ref([]);
const faculties = ref([]);
const departments = ref([]);
const course = ref('');
const selectedUniversity = ref('');
const selectedFaculty = ref('');
const selectedDepartment = ref('');
const loading = ref(false);
const authStore = useAuthStore();
const emit = defineEmits(['update:isValid']);
authStore.user.course = course.value;

const isFormValid = computed(() => {
    return selectedUniversity.value && selectedFaculty.value && selectedDepartment.value && course.value
});

watchEffect(() => {
    emit('update:isValid', isFormValid.value);
});

onMounted(async () => {
    loading.value = true;
    try {
        const response = await getUniversities();
        universities.value = response.results || [];
    } catch (error) {
        console.error("Ошибка при загрузке университетов:", error);
    } finally {
        loading.value = false;
    }
});

const fetchFaculties = async () => {
    if (!selectedUniversity.value) return;

    loading.value = true;
    try {
        const response = await getFaculties(selectedUniversity.value);
        authStore.user.university = selectedUniversity.value;
        faculties.value = Array.isArray(response) ? response : [response];
    } catch (error) {
        console.error('Ошибка получения факультетов:', error);
        faculties.value = [];
    } finally {
        loading.value = false;
    }
}


const fetchDepartments = async () => {
    if (!selectedFaculty.value) return;

    loading.value = true;
    try {
        const response = await getDepartments(selectedFaculty.value);
        authStore.user.faculty = selectedFaculty.value;
        departments.value = response.results || [];
    } catch (error) {
        console.error('Ошибка получения факультетов:', error);
        departments.value = [];
    } finally {
        loading.value = false;
    }
}

console.log(authStore.user);

</script>