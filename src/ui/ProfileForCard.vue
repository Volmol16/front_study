<template>
    <div>
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