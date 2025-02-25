<!-- src/widgets/TheModalUser.vue -->
<template>
    <div
        class="fixed top-0 right-0 w-full h-full bg-black bg-opacity-50 flex justify-end items-start transition-transform duration-300">
        <div class="bg-[#E9E9EB] rounded-lg w-[500px] h-full shadow-lg overflow-y-auto py-10">
            <div class="flex p-4 justify-between items-center">
                <div class="flex items-center gap-x-4">
                    <img class="w-14" src="/image/avatar/LogoUser.png" alt="">
                    <div>
                        <span class="text-xl font-medium">{{ user.user.role }}</span>
                        <h1 class="text-xl font-medium">{{ user.user.first_name + ' ' + user.user.last_name }}</h1>
                    </div>
                </div>
                <button @click="$emit('close-modal')"><img src="/image/modal/Close_LG.svg" alt="Close"></button>
            </div>
            <LineHR />
            <div class="px-4 mt-3">
                <div class="flex">
                    <div class="grid grid-cols-[auto_1fr] items-start gap-x-10 gap-y-3 mt-7">
                        <p class="text-[#8C8C8E] text-lg">Логин:</p>
                        <p class="text-black font-medium break-words">{{ user.user.username }}</p>

                        <p class="text-[#8C8C8E] text-lg">Email:</p>
                        <p class="text-black font-medium break-words">{{ user.user.email }}</p>

                        <p class="text-[#8C8C8E] text-lg"
                            v-if="user.profile.vk_profile !== '' || user.profile.telegram_username !== ''">Соц.сети:</p>
                        <div class="flex gap-4"
                            v-if="user.profile.vk_profile !== '' && user.profile.telegram_username !== ''">
                            <a v-if="user.profile.vk_profile !== ''" :href="normalizeVkUrl(user.profile.vk_profile)"
                                target="_blank" rel="noopener noreferrer"><img src="/image/modal/vkontacte.svg"
                                    alt=""></a>
                            <a v-if="user.profile.telegram_username !== ''"
                                :href="normalizeTelegramUrl(user.profile.telegram_username)" target="_blank"
                                rel="noopener noreferrer"><img src="/image/modal/telegram.svg" alt="">
                            </a>
                        </div>

                    </div>
                </div>
                <LineHR />
                <div class="grid grid-cols-[auto_1fr] items-start gap-x-6 gap-y-3 mt-7">
                    <p class="text-[#8C8C8E] text-lg">Вуз:</p>
                    <p class="text-black font-medium break-words">{{ university?.name || 'Не указан' }}</p>

                    <p class="text-[#8C8C8E] text-lg">Факультет:</p>
                    <p class="text-black font-medium break-words">{{ faculty?.name || 'Не указан' }}</p>

                    <p class="text-[#8C8C8E] text-lg">Кафедра:</p>
                    <p class="text-black font-medium break-words">{{ department?.name || 'Не указан' }}</p>

                    <p class="text-[#8C8C8E] text-lg">Курс:</p>
                    <p class="text-black font-medium">{{ user.profile.form_of_study || 'Не указан' }} курс</p>
                </div>
            </div>
            <LineHR />
            <div class="px-4">
                <h3 class="text-[#8C8C8E] text-xl">Дисциплины</h3>
                <div>
                    <p class="mt-5">Дисциплины, которые я решаю:</p>
                    <p>
                        - {{ disciplines?.name || 'Не указаны' }}
                    </p>
                </div>
            </div>
            <LineHR />
            <div class="px-4">
                <h3 class="text-[#8C8C8E] text-xl">О себе</h3>
                <p class="mt-5 text-lg leading-6">{{ user.about_self }}</p>
            </div>
            <LineHR />
            <div class="flex flex-col justify-between gap-y-4 px-4">
                <div class="flex items-center gap-x-4">
                    <input class="w-full py-2.5 px-6 text-[#8C8C8E] bg-[#E9E9EB] border border-[#8C8C8E] rounded-lg"
                        type="text" placeholder="Напишите сообщение" v-model="comment">
                    <button @click="statusСhecks('Отправлен на доработку')" class="px-6 py-3 bg-black rounded-lg"><img
                            src="/image/modal/Stop_Sign.svg"></button>
                </div>
                <div class="flex items-center gap-x-4">
                    <input class="w-full py-2.5 px-6 text-[#8C8C8E] bg-[#E9E9EB] border border-[#8C8C8E] rounded-lg"
                        type="text" placeholder="Введите номер студенческого билета" v-model="student_card_number">
                    <button @click="statusСhecks('Принять')" class="px-6 py-3 bg-white rounded-lg"><img
                            src="/image/modal/Circle_Check.svg"></button>
                </div>
            </div>
            <!-- <div class="px-4">
                <div class="flex justify-between gap-x-4">
                    <button class="w-full py-3 bg-white rounded-lg text-xl font-medium text-black">Одобрить</button>
                    <button class="w-full py-3 bg-black rounded-lg text-xl font-medium text-white">Отказ</button>
                </div>
                <button class="w-full py-3 bg-[#8C8C8E] rounded-lg text-xl font-medium text-white mt-4">Запросить доп
                    информацию</button>
            </div> -->
        </div>
    </div>
</template>



<script setup>
import LineHR from '@/ui/LineHR.vue';
import {
    getUniversitiesForStudentCard,
    getFacultiesForStudentCard,
    getDepartmentsForStudentCard,
    getDisciplinesForStudentCard,
    postQuestionnaireAuditing
} from '@/app/global/api';
import { onMounted, ref } from 'vue';


const comment = ref('');
const student_card_number = ref('');
const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
});
const university = ref({ name: '' });
const faculty = ref({ name: '' });
const department = ref({ name: '' });
const disciplines = ref({ name: '' });
const emit = defineEmits(['close-modal']);

const statusСhecks = async (status) => {
    await postQuestionnaireAuditing(props.user.id, status, student_card_number.value, comment.value);
}


const fetchData = async () => {
    try {
        if (props.user.profile.university) {
            const universityData = await getUniversitiesForStudentCard(props.user.profile.university);
            university.value = universityData;
        }
        if (props.user.profile.faculty) {
            const facultyData = await getFacultiesForStudentCard(props.user.profile.faculty);
            faculty.value = facultyData;
        }
        if (props.user.profile.department) {
            const departmentData = await getDepartmentsForStudentCard(props.user.profile.department);
            department.value = departmentData;
        }
        if (props.user.profile.disciplines?.length) {
            const disciplinesData = await getDisciplinesForStudentCard(props.user.profile.disciplines);
            disciplines.value = disciplinesData;
        }
    } catch (error) {
        console.error('Ошибка получения данных:', error);
        university.value = { name: 'Не указан' };
        faculty.value = { name: 'Не указан' };
        department.value = { name: 'Не указан' };
        disciplines.value = [];
    }
}


const normalizeVkUrl = (url) => {
    if (url.startsWith('http')) return url;
    if (url.startsWith('@')) return `https://vk.com/${url.slice(1)}`;
    return `https://vk.com/${url}`;
}

const normalizeTelegramUrl = (url) => {
    if (url.startsWith('http')) return url;
    if (url.startsWith('@')) return `https://t.me/${url.slice(1)}`;
    return `https://t.me/${url}`;
}

onMounted(async () => {
    fetchData();
})
</script>
