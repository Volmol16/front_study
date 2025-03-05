import { defineStore } from "pinia";
import UserDataService from "@/services/UserDataService";
import router from "@/app/router";

export const useCheckStore = defineStore("check", {
  state: () => ({}),
  actions: {
    async checkVerificationStatus() {
      try {
        const user_id = localStorage.getItem("user_id");
        await UserDataService.chechStatusVerification(user_id).then(
          (response) => {
            this.handleStatusResponse(response.data);
          }
        );
      } catch (error) {
        console.log(error);
      }
    },

    async handleStatusResponse(response) {
      const statusMap = {
        "На проверке": "sending-questionnaire",
        "Повторная проверка": "sending-questionnaire",
        "Отклонена верификация по СБ": "unshaked-questionnaire",
        "Отклонена анкета исполнителя": "unshaked-questionnaire",
        "Отправлен на доработку": "edit-questionnaire",
        Принят: "success-questionnaire",
      };

      const routeName = statusMap[response.status];

      if (routeName) {
        router.push({ name: routeName });
      } else {
        console.log("Неизвестный статус", response.status);
        router.push({ name: "404" });
      }
    },
  },
});
