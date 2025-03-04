import { defineStore } from "pinia";
import axios from "axios";
import { useRoute } from "vue-router";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import userDataService from "@/services/UserDataService";
import router from "@/app/router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuth: false,
    userRole: null,
    userId: null,
    profileId: null,
    isRegistered: false,
    selectedDepartment: null,
    verificationStatus: null, // 'pending', 'approved', 'rejected'
    data: {
      user: {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "исполнитель",
        // referral_code: "",
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
    // async statusVerefication() {
    //   const status = localStorage.getItem("Verefication");
    //   if (status === "true") {
    //     const interval = setInterval(async () => {
    //       try {
    //         const response = await userDataService.getStatus(this.userId);
    //         if (response.status === 200) {
    //           await this.handleStatusResponse(response);
    //           clearInterval(interval);
    //         }
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }, 5000);
    //   }
    // },

    async statusVerefication() {
      if (this.verificationStatus === "pending") {
        const interval = setInterval(async () => {
          try {
            const mockResponse = await new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve({
                  data: {
                    status: "Пользователь успешно принят",
                  },
                });
              }, 2000);
            });

            await this.handleStatusResponse(mockResponse);
            clearInterval(interval);
          } catch (error) {
            console.error("Ошибка при проверке статуса:", error);
          }
        }, 5000);
      }
    },

    async handleStatusResponse(response) {
      const { status } = response.data;

      if (status === "Пользователь успешно принят") {
        router.push({ name: "success-questionnaire" });
      } else if (status === "Отправлено на доработку") {
        router.push({ name: "edit-questionnaire" });
      } else {
        console.log("Неизвестный статус:", status);
      }
    },

    async checkVerification() {
      try {
        const response = await userDataService.getVerificationStatus(
          this.userId
        );
        this.verificationStatus = response.data.status;
        return response.data.status;
      } catch (error) {
        console.error("Ошибка проверки статуса:", error);
        return null;
      }
    },

    async referralCode() {
      const route = useRoute();
      const referralCode = route.query.referral_code;
      if (referralCode) {
        await userDataService.referral_code(referralCode).then((response) => {
          if (response.status === 200) {
            this.data.user.referral_code = referralCode;
          }
        });
      }
    },

    async register() {
      try {
        await userDataService.register(this.data).then((response) => {
          this.isRegistered = true;
          this.userId = response.data.user_id;
          this.profileId = response.data.profile_id;
          this.verificationStatus = "pending";
        });
      } catch (error) {
        console.error("Ошибка регистрации:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw error;
      }
    },

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
        await userDataService.postPhoto(formData);
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
        await userDataService
          .login(data)
          .then((response) => {
            sessionStorage.setItem("access_token", response.data.access_token);
            sessionStorage.setItem("user", response.data.user.role);
            this.isAuth = true;
            this.userRole = response.data.user.role;
            router.push({ name: "home" });
          })
          .catch((e) => {
            console.log(e);
          });

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
      router.push({ name: "login" });
    },

    resetRegistration() {
      this.isRegistered = false;
      this.userId = null;
      this.profileId = null;
    },

    setStudentCardPhoto(file) {
      this.data.student_card.photo = file;
    },

    setSelectedDepartment(department) {
      this.selectedDepartment = department;
    },
  },
});
