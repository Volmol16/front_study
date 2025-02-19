import { defineStore } from "pinia";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuth: false,
    data: {
      user: {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "исполнитель",
        referral_code: "Avs3213123",
      },
      profile: {
        university: null,
        faculty: null,
        department: null,
        disciplines: [null],
        form_of_study: "бакалавр",
        vk_profile: "@test",
        telegram_username: "@test",
      },
      student_card: {
        photo: "",
      },
    },
  }),
  actions: {
    async register() {
      try {
        const formData1 = {
          username: this.data.user.username,
          first_name: this.data.user.first_name,
          last_name: this.data.user.last_name,
          email: this.data.user.email,
          password: this.data.user.password,
          role: this.data.user.role,
          referral_code: this.data.user.referral_code,
        };

        const formData2 = {
          username: this.data.user.username,
          role: "исполнитель",
          university: this.data.profile.university,
          faculty: this.data.profile.faculty,
          department: this.data.profile.department,
          disciplines: this.data.profile.disciplines,
          form_of_study: this.data.profile.form_of_study,
          vk_profile: this.data.profile.vk_profile,
          telegram_username: this.data.profile.telegram_username,
        };

        const [response1, response2, response3] = await Promise.all([
          axios.post(
            `${API_BASE_URL}/api/auth/registration/general-info/`,
            formData1,
            {
              headers: { "Content-Type": "application/json" },
            }
          ),
          axios.post(
            `${API_BASE_URL}/api/auth/registration/profile`,
            formData2,
            {
              headers: { "Content-Type": "application/json" },
            }
          ),
          axios.post(`${API_BASE_URL}/api/`),
        ]);
      } catch (error) {
        console.error("Ошибка отправки:", error);
      }
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

        console.log("Успешная авторизация:", response.data);
        return response.data;
      } catch (error) {
        console.error("Ошибка авторизации:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw error;
      }
    },

    // Добавим метод для проверки аутентификации
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
