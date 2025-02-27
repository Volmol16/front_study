<!-- src/components/sign-in/register/StudentСard.vue -->
<template>
    <div>

        <div class="flex flex-col items-center gap-y-4">
            <!-- Университеты -->
            <select v-model="selectedUniversity" @change="fetchFaculties" :disabled="loading"
                class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none">
                <option value="" disabled>Выберите вуз</option>
                <option v-for="university in universities" :key="university.id" :value="university.id">
                    {{ university.name }}
                </option>
            </select>

            <!-- Факультеты -->
            <select v-model="selectedFaculty" @change="fetchDepartments" :disabled="!selectedUniversity || loading"
                class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none">
                <option value="" disabled>
                    {{ faculties.length ? 'Выберите факультет' : 'Нет доступных факультетов' }}
                </option>
                <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">
                    {{ faculty.name }}
                </option>
            </select>

            <!-- Кафедры -->
            <select v-model="selectedDepartment" @change="fetchEducationForms" :disabled="!selectedFaculty || loading"
                class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none">
                <option value="" disabled>
                    {{ departments.length ? 'Выберите кафедру' : 'Нет доступных кафедр' }}
                </option>
                <option v-for="department in departments" :key="department.id" :value="department.id">
                    {{ department.name }}
                </option>
            </select>

            <!-- Форма обучения -->
            <select v-model="selectEducationForm" :disabled="!selectedDepartment || loading"
                class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none">
                <option value="" disabled>
                    {{ educationForms.length ? 'Выберите форму обучения' : 'Нет доступных форм обучения' }}
                </option>
                <option v-for="forms in educationForms" :key="forms.id" :value="forms.id">
                    {{ forms.name }}
                </option>
            </select>

            <!-- Курс -->
            <select v-model="course" :disabled="!selectedDepartment || loading"
                class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none">
                <option value="" disabled>{{ course.length ? 'Выберите курс' : 'Нет доступных курсов' }}</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>

            <input class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none"
                type="email" placeholder="Id vk" v-model="vk">
            <input class="w-[356px] px-6 py-3 bg-[#D9D9D9] rounded-lg text-[#8C8C8E] font-medium focus:outline-none"
                type="email" placeholder="Id telegram*" v-model="telegram">
        </div>
        <!-- src/widgets/StudentСard.vue -->
        <!-- <div class="flex flex-col gap-y-4 mt-4">
            <LoadingFilesForRegistration>
                <h4>Прикрепите фото студенческого билета</h4>
            </LoadingFilesForRegistration>
        </div> -->
        <div>
            <ForgotThePassword @toggle-auth="$emit('toggle-auth')" :typeAuth="typeAuth" />
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect, watch } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRegistrationStore } from '@/stores/useRegistrationStore';
import UserDataService from "@/services/UserDataService";
import LoadingFilesForRegistration from '@/ui/LoadingFilesForRegistration.vue';

const universities = ref([]);
const faculties = ref([]);
const departments = ref([]);
const educationForms = ref([]);
const course = ref('');
const vk = ref('');
const telegram = ref('');
const selectedUniversity = ref('');
const selectedFaculty = ref('');
const selectedDepartment = ref('');
const selectEducationForm = ref('');
const loading = ref(false);
const authStore = useAuthStore();
const registrationStore = useRegistrationStore();
const emit = defineEmits(['update:isValid']);

const isFormValid = computed(() => {
    return selectedUniversity.value &&
        selectedFaculty.value &&
        selectedDepartment.value &&
        selectEducationForm.value &&
        course.value &&
        telegram.value;
});

watchEffect(() => {
    emit('update:isValid', isFormValid.value);
});

onMounted(async () => {
    loading.value = true;
    try {
        await UserDataService.getUniversities().then((response) => {
            universities.value = response.data.results || [];
        })
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
        await UserDataService.getFaculties(selectedUniversity.value).then((response) => {
            faculties.value = response.data.results || [];
        })
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
        await UserDataService.getDepartments(selectedFaculty.value).then((response) => {
            departments.value = response.data.results || [];
        })
    } catch (error) {
        console.error('Ошибка получения факультетов:', error);
        departments.value = [];
    } finally {
        loading.value = false;
    }
}

const fetchEducationForms = async () => {
    if (!selectedDepartment.value) return;

    loading.value = true;
    try {
        await UserDataService.getEducationForms(selectedDepartment.value).then((response) => {
            educationForms.value = response.data.results || [];
        })
    } catch (error) {
        console.error('Ошибка получения факультетов:', error);
        educationForms.value = [];
    } finally {
        loading.value = false;
    }
}

watch([selectedUniversity, selectedFaculty, selectEducationForm, selectedDepartment, course, vk, telegram], () => {
    authStore.setSelectedDepartment(selectedDepartment.value)
    authStore.data.profile.university = selectedUniversity.value;
    authStore.data.profile.faculty = selectedFaculty.value;
    authStore.data.profile.department = selectedDepartment.value;
    authStore.data.profile.form_of_study = selectEducationForm.value;
    authStore.data.profile.course = course.value;
    authStore.data.profile.vk_profile = vk.value;
    authStore.data.profile.telegram_username = telegram.value;
    // registrationStore.setSelectedUniversity();
    // registrationStore.setSelectedFaculuty();
    // registrationStore.setSelectedDepartment();
    // registrationStore.setSelectedEducationForm();
    // registrationStore.setSelectedCourse();
    // registrationStore.setVkProfile();
    // registrationStore.setTelegramUsername();
});


watch(isFormValid, (newVal) => {
    emit('update:isValid', Boolean(newVal));
});
</script>