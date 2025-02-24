import axios from "axios";
import { defineStore } from "pinia";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useUserProfileStore = defineStore("userProfile", {
  state: () => ({
    profile: null,
  }),
  actions: {
    async getProfile() {
      try {
        const token = sessionStorage.getItem("access_token");
        const response = await axios.get(
          `${API_BASE_URL}/api/auth/student-card/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.profile = response.data.results;
      } catch (error) {
        console.error("Ошибка загрузки профиля", error);
      }
    },
  },
});
