import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => ({
    activeSocial: null, // 'telegram' или 'vk'
  }),
  actions: {
    openModal(socialType) {
      this.activeSocial = socialType;
    },
    closeModal() {
      this.activeSocial = null;
    },
  },
});
