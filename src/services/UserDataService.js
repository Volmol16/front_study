import http from "../http-common";

export default {
  login(user) {
    return http.post("api/auth/login/", user);
  },

  register(user) {
    return http.post("api/auth/register/", user);
  },
};
