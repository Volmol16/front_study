import { defineStore } from "pinia";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuth: false,
    userRole: null,
    userId: null,
    profileId: null,
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
        disciplines: [],
        form_of_study: null,
        vk_profile: "",
        telegram_username: "",
      },
      student_card: {
        photo: null,
        about_self: "",
      },
    },
  }),
  actions: {
    // Первый этап регистрации
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
        this.userId = response.data.user_id; // Сохраняем user_id
        this.profileId = response.data.profile_id; // Сохраняем profile_id
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

    // Второй этап регистрации (загрузка файла и дополнительной информации)
    async postPhoto() {
      if (!this.userId || !this.profileId) {
        throw new Error("User ID или Profile ID отсутствуют");
      }

      const formData = new FormData();
      formData.append("user", this.userId);
      formData.append("profile", this.profileId);
      formData.append("photo", this.data.student_card.photo);
      formData.append("about_self", this.data.student_card.about_self);

      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/auth/registration/education-info/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return response.data;
      } catch (error) {
        console.error("Ошибка загрузки фото:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw error;
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
        sessionStorage.setItem("user", response.data.user.role);

        this.isAuth = true;
        this.userRole = response.data.user.role;
        console.log(this.userRole);

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

    checkAuth() {
      const token = sessionStorage.getItem("access_token");
      const role = sessionStorage.getItem("user");
      this.userRole = role;
      this.isAuth = !!token;
      return this.isAuth;
    },

    logout() {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("user");
      this.userRole = null;
      this.isAuth = false;
    },

    resetRegistration() {
      this.isRegistered = false;
      this.userId = null;
      this.profileId = null;
    },

    setStudentCardPhoto(file) {
      this.data.student_card.photo = file;
    },
  },
});
