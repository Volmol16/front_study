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
                    <div class="w-[224px] flex flex-col gap-y-6 text-lg text-[#8C8C8E]">
                        <p>Логин:</p>
                        <p>Email:</p>
                        <p v-if="user.profile.vk_profile !== '' || user.profile.telegram_username !== ''">Соц.сети</p>
                    </div>
                    <div class="flex flex-col gap-y-6 font-medium">
                        <span>{{ user.user.username }}</span>
                        <span>{{ user.user.email }}</span>
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
                <p class="mt-5">Дисциплины, которые я решаю:</p>
                <!-- <p v-for="discipline in user.Disciplines" :key="discipline.id">{{ discipline.name }}</p> -->
            </div>
            <LineHR />
            <div class="px-4">
                <h3 class="text-[#8C8C8E] text-xl">О себе</h3>
                <!-- <p class="mt-5 text-lg leading-6">{{ user.description }}</p> -->
            </div>
            <LineHR />
            <div class="px-4">
                <div class="flex justify-between gap-x-4">
                    <button class="w-full py-3 bg-white rounded-lg text-xl font-medium text-black">Одобрить</button>
                    <button class="w-full py-3 bg-black rounded-lg text-xl font-medium text-white">Отказ</button>
                </div>
                <button class="w-full py-3 bg-[#8C8C8E] rounded-lg text-xl font-medium text-white mt-4">Запросить доп
                    информацию</button>
            </div>
        </div>
    </div>
</template>



<script setup>
import LineHR from '@/ui/LineHR.vue';
import { getUniversitiesForStudentCard, getFacultiesForStudentCard, getDepartmentsForStudentCard } from '@/global/api';
import { onMounted, ref } from 'vue';


const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
});
const university = ref({ name: '' });
const faculty = ref({ name: '' });
const department = ref({ name: '' });
const emit = defineEmits(['close-modal']);

const fetchData = async () => {
    try {

        const universitys = await getUniversitiesForStudentCard(props.user.profile.university);
        const facultys = await getFacultiesForStudentCard(props.user.profile.faculty);
        const departments = await getDepartmentsForStudentCard(props.user.profile.department);
        university.value = universitys;
        faculty.value = facultys;
        department.value = departments;
    } catch (error) {
        console.error("Ошибка загрузки данные:", error);
        university.value = { name: 'Не удалось загрузить' };
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
