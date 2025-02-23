<template>
    <div class="max-w-[357px]">
        <slot></slot>
        <input type="file" class="hidden" @change="handleFileChange" accept="image/*,.pdf" ref="fileInput">
        <div class="flex flex-col justify-center items-center p-8 border-dashed border-2 border-[#8C8C8E] rounded-2xl mt-2 cursor-pointer"
            @click="$refs.fileInput.click()">
            <img src="/image/auth/Vector.svg" alt="Download" loading="lazy" class="mb-4">
            <p class="text-center font-medium text-[#8C8C8E]">
                <span v-if="!fileSelected">Перетащите файлы сюда или нажмите, чтобы загрузить</span>
                <span v-else class="text-black">
                    Выбран файл: {{ fileName }}
                </span>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const fileInput = ref(null);
const fileSelected = ref(false);
const fileName = ref('');

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Валидация размера файла (пример для 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Файл слишком большой. Максимальный размер: 5MB');
            return;
        }

        // Валидация типа файла
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            alert('Недопустимый формат файла');
            return;
        }

        authStore.setStudentCardPhoto(file);
        fileSelected.value = true;
        fileName.value = file.name;
    }
};
</script>