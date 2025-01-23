<template>
    <div class="flex justify-between">
        <div class="flex">
            <UserLogo v-for="(user) in users" :key="user.id" :user="user" />
        </div>
        <div class="flex gap-x-5 ">
            <blockquote>
                <select class="bg-white">
                    <option>Статус</option>
                    <option>Все</option>
                    <option>В работе</option>
                    <option>Отложенные</option>
                </select>
            </blockquote>

            <blockquote>
                <select class="bg-white">
                    <option>Сортировка</option>
                    <option>Приоритет</option>
                    <option>Низкий</option>
                    <option>Средний</option>
                </select>
            </blockquote>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores';

const userStore = useUserStore();
const users = userStore.listUsers
import UserLogo from './UserLogo.vue';
</script>