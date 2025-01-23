<template>
    <div class="flex flex-col p-4">
        <img class="w-[214px] h-[194px]" :src="card.image" alt="Image" loading="lazy">
        <div class="mt-4">
            <h3 class="text-xl font-semibold">{{ card.title }}</h3>
            <div class="flex justify-between items-center mt-3">
                <span class="flex items-center gap-x-2"><img src="/image/works/Calendar.svg" alt="Calendar">
                    Дедлайн:</span>
                <span>12.12.2023</span>
            </div>
            <div class="flex justify-between items-center mt-2">
                <img src="/image/works/Circle.svg" alt="Circle">
                <span>12 часов</span>
            </div>
            <div class="flex justify-between items-center mt-4">
                <div class="flex items-center gap-x-4">
                    <img :src="card.imageUser" alt="Logo" loading="lazy">
                    <div>
                        <p class="font-medium">{{ card.nameUser }}</p>
                        <span class="flex gap-x-1 mt-1"><img src="/image/works/star.svg" alt="Star">{{ card.rating
                            }}</span>
                    </div>
                </div>
                <button><img src="/image/works/Dialog.svg" alt="Dialog" loading="lazy"></button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    card: {
        type: Object,
        required: true
    }
})
</script>