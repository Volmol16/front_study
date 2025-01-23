<template>
    <div class="fixed top-0 right-0 w-full h-full bg-black bg-opacity-50 flex justify-end items-start">
        <div class="bg-white rounded-lg w-[500px] h-full">
            <div class="flex p-4 pt-10 justify-between items-center">
                <div class="flex items-center gap-x-4">
                    <img class="w-14" :src="user.image" alt="">
                    <h1 class="text-xl font-medium">{{ user.name }}</h1>
                </div>
                <button @click="$emit('close-modal')"><img src="/image/modal/Close_LG.svg" alt="Close"></button>
            </div>
            <hr class="bg-[#D9D9D9] mt-5">
            <div class="p-4 mt-8">
                <p>Email: <span>{{ user.email }}</span></p>
                <div class="flex items-center mt-3">
                    <p>Соц.сети:</p>
                    <div class="flex gap-4">
                        <a v-for="social in filteredSocial" :key="social.platform" :href="social.link" target="_blank"
                            rel="noopener noreferrer">
                            <img :src="`/image/modal/${social.platform}.svg`" :alt="social.platform" class="w-6">
                        </a>
                    </div>
                </div>
                <p>Специальность: <span>{{ user.speciality }}</span></p>
                <p>Вуз: <span>{{ user.university }}</span></p>
                <p>Факультет: <span>{{ user.faculty }}</span></p>
                <p>Кафедра: <span>{{ user.department }}</span></p>
                <p>Курс: <span>{{ user.course }}</span></p>
                <p>Студенческий билет: <span>{{ user.studentID }}</span></p>
            </div>
            <hr class="bg-[#D9D9D9] mt-5">
            <div class="p-4 mt-8">
                <h3>Дисциплины:</h3>
                <p>Дисциплины, которые я решаю:</p>
                <p v-for="discipline in user.Disciplines" :key="discipline.id">{{ discipline.name }}</p>
            </div>
            <hr class="bg-[#D9D9D9] mt-5">
            <div class="p-4 mt-8">
                <h3>О себе</h3>
                <p>{{ user.description }}</p>
            </div>
        </div>
    </div>
</template>



<script setup>
import { computed } from 'vue';


const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
});
const emit = defineEmits(['close-modal']);

const filteredSocial = computed(() => {
    const supportedPlartforms = ['telegram', 'vkontacte'];
    return props.user.social.filter((social) => supportedPlartforms.includes(social.platform));
})
</script>
