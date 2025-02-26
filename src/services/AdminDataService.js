import http from "../http-common";

export default {
  getProfile() {
    return http.get("api/auth/student-card/");
  },
};
