<!-- src/widgets/TheCardUser.vue -->
<template>
    <div class="p-4 pb-8 bg-[#8C8C8E14] rounded-2xl">
        <img :src="statusLogo" alt="Status">
        <div class="flex flex-col items-center mt-10 px-6">
            <img src="/image/avatar/LogoUser.png" alt="Logo">
            <h1 class="mt-2 text-2xl font-semibold">{{ user.user.first_name + ' ' + user.user.last_name }}</h1>
            <!-- <p class="mt-1 text-[#8C8C8E]">{{ user.jobTitle }}</p> -->
            <button @click="$emit('open-modal', user)" class="mt-14 px-8 py-3 bg-black rounded-lg text-white">
                Просмотреть заявку
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStudentCardStore } from '@/stores/StudentCard';


const studentCardStore = useStudentCardStore();
const emit = defineEmits(['open-modal'])
const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})


const statusLogo = computed(() => {
    if (!studentCardStore.studentCard.results) {
        return '/image/state/Unreviewed.svg';
    }

    const status = studentCardStore.studentCard.results.find(user => user.id === props.user.id).status;

    switch (status) {
        case 'Принят':
            return '/image/state/Accepted.svg';
        case 'rejected':
            return '/image/state/Rejected.svg';
        case 'На проверке':
            return '/image/state/Postponed.svg';
        default:
            return '/image/state/Unreviewed.svg';
    }
})
</script>