<!-- src/components/AdminTable.vue -->
<template>
    <div class="mt-10">
        <h2 class="text-black text-2xl font-semibold">Список заявок</h2>
        <div class="mt-5">
            <ul class="flex gap-x-6 text-xl">
                <li><router-link class="space-x-4 pb-2 px-3"
                        :class="route.path === '/adminPanel/all' ? 'border-b-2 border-[#8C8C8E]' : ''"
                        to="/adminPanel/all">Все <span class="px-4 py-1 bg-black text-white rounded-2xl text-sm">{{
                            userStore.listUsers.length }}</span></router-link></li>
                <li><router-link class="pb-2 px-3"
                        :class="route.path === '/adminPanel/postponed' ? 'border-b-2 border-[#8C8C8E]' : ''"
                        to="/adminPanel/postponed">Отложенные</router-link></li>
                <li><router-link class="pb-2 px-3"
                        :class="route.path === '/adminPanel/new' ? 'border-b-2 border-[#8C8C8E]' : ''"
                        to="/adminPanel/new">Новые</router-link></li>
            </ul>
        </div>
        <div class="my-7">
            <TheFilter />
        </div>
        <div>
            <TheModalUser v-if="showModal" :user="selectedUser" @close-modal="closeModal" />
        </div>
        <RouterView @open-modal="handleOpenModel" />
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import TheFilter from '@/widgets/TheFilter.vue';
import TheModalUser from '@/widgets/TheModalUser.vue';
import { useStudentCardStore } from '@/stores/StudentCard';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const studentCardStore = useStudentCardStore();
const selectedUser = ref([]);
const showModal = ref(false);
const isLoading = ref(true);

watch(() => route.query.userId, (newId) => {
    if (newId) {
        const user = studentCardStore.studentCard.results?.find(
            u => u.id === parseInt(newId)
        );
        if (user) {
            selectedUser.value = user;
            showModal.value = true;
        }
    } else {
        showModal.value = false;
    }
})

const handleOpenModel = (user) => {
    router.push({
        query: { ...route.query, userId: user.id }
    })
}

const closeModal = () => {
    const query = { ...route.query };
    delete query.userId;
    router.replace({ query });
}

onMounted(async () => {
    await studentCardStore.getStudentCard();
    isLoading.value = false;
})
</script>