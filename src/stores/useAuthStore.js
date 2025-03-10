import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import userDataService from "@/services/UserDataService";
import { useCheckStore } from "./useCheackStore";
import router from "@/app/router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuth: false,
    userRole: null,
    userId: null,
    profileId: null,
    isRegistered: false,
    selectedDepartment: null,
    verificationStatus: null,
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
          localStorage.setItem("user_id", this.userId);
          router.push({ name: "sending-questionnaire" });
          console.log(response);
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

    async initializeMockData() {
      const savedData = sessionStorage.getItem("mockVerification");
      if (savedData) {
        const { userId, status, count } = JSON.parse(savedData);
        this.userId = userId;
        this.verificationStatus = status;
        this.verificationCheckCount = count;
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
            const checkStore = useCheckStore();
            const status = checkStore.checkVerificationStatus();
            const currentStaus = status.data.status;
            this.verificationStatus = currentStaus;

            const routeName = this.getRedirectRoute(currentStaus);
            router.push({ name: routeName });

            return { success: true, data: response.data };
          })
          .catch((e) => {
            console.log(e);
            this.resetAuthState();
            sessionStorage.clear();
          });
      } catch (error) {
        console.error("Ошибка авторизации:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw error;
      }
    },

    getRedirectRoute(status) {
      const editStatuses = [
        "Отправлен на доработку",
        "Отклонена верификация по СБ",
        "Отклонена анкета исполнителя",
      ];

      return editStatuses.includes(status)
        ? "edit-questionnaire"
        : status === "Принят"
        ? "home"
        : "sending-questionnaire";
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

    resetAuthState() {
      this.isAuth = false;
      this.userRole = null;
      this.verificationStatus = null;
    },

    setStudentCardPhoto(file) {
      this.data.student_card.photo = file;
    },

    setSelectedDepartment(department) {
      this.selectedDepartment = department;
    },
  },
});
