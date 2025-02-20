// src/stores/auth.js
import { defineStore } from "pinia";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuth: false,
    isRegistered: false,
    data: {
      user: {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "исполнитель",
      },
      profile: {
        university: null,
        faculty: null,
        department: null,
        disciplines: [1],
        form_of_study: null,
        vk_profile: "",
        telegram_username: "",
      },
      student_card: {
        photo: "здесь должен быть файл",
      },
    },
  }),
  actions: {
    async register() {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/auth/register/`,
          this.data,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        this.isRegistered = true;
        console.log("Успешная регистрация:", response.data);
        return response.data;
      } catch (error) {
        console.error("Ошибка регистрации:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw error;
      }
    },

    resetRegistration() {
      this.isRegistered = false;
    },

    async login() {
      const data = {
        username: this.data.user.username,
        password: this.data.user.password,
      };

      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/auth/login/`,
          data,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        sessionStorage.setItem("access_token", response.data.access_token);

        this.isAuth = true;

        return { success: true, data: response.data };
      } catch (error) {
        console.error("Ошибка авторизации:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw error;
      }
    },

    // метод для проверки аутентификации
    checkAuth() {
      const token = sessionStorage.getItem("access_token");
      this.isAuth = !!token;
      return this.isAuth;
    },

    // Метод для выхода
    logout() {
      sessionStorage.removeItem("access_token");
      this.isAuth = false;
    },
  },
});
