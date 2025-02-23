<!-- src/components/Alllist.vue -->
<template>
    <div v-if="isLoading">Загрузка...</div>
    <div class="grid grid-cols-4 gap-8">
        <CardUser v-for="user in users" :key="user.id" :user="user" @open-modal="openModal(user)" />
    </div>
</template>

<script setup>
import CardUser from '@/widgets/admin/TheCardUser.vue';
import { useStudentCardStore } from '@/stores/StudentCard';
import { onMounted, ref } from 'vue';

const studentCardStore = useStudentCardStore();
const users = ref([]);
const isLoading = ref(true);


const emit = defineEmits(['open-modal']);

const openModal = (user) => {
    emit('open-modal', user);
};

onMounted(async () => {
    await studentCardStore.getStudentCard();
    users.value = studentCardStore.studentCard.results || [];
    isLoading.value = false;
})
</script>