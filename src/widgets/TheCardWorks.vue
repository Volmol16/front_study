<template>
    <div class="flex flex-col p-4">
        <img class="w-[353px] h-[194px] rounded-lg" :src="card.image" alt="Background" loading="lazy">
        <div class="mt-4">
            <h5 class="text-xl font-semibold">{{ card.title }}</h5>
            <div class="flex justify-between mt-4">
                <p class="flex flex-col text-xl font-semibold">Начало <span
                        class="text-base text-[#AFB9BB] font-normal">{{ card.DateStart }}</span></p>
                <img src="/image/works/refresh.svg" alt="Refresh" loading="lazy">
                <p class="flex flex-col text-xl font-semibold">Крайний срок <span
                        class="text-base text-[#AFB9BB] font-normal">{{ card.DateEnd
                        }}</span></p>
            </div>
            <div class="flex justify-between items-center mt-5">
                <div class="flex items-center gap-x-4">
                    <img :src="card.imageUser" alt="Logo" loading="lazy">
                    <div>
                        <p class="font-medium">{{ card.nameUser }}</p>
                        <span class="flex gap-x-1 mt-2"><img src="/image/works/star.svg" alt="Star">{{ card.rating
                            }}</span>
                    </div>
                </div>
                <button><img src="/image/works/Dialog.svg" alt="Dialog" loading="lazy"></button>
            </div>
            <button class="mt-8 w-full py-3 bg-black rounded-lg text-xl font-medium text-white">Продолжить</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    card: {
        type: Object,
        required: true
    }
})
</script>