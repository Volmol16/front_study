import {defineStore} from 'pinia'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuth: false,
            user: {
              username: "",
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              role: "заказчик",
              referral_code: "Afdsfsdf23",
            },
            profile: {
              university: null,
              faculty: null,
              department: null,
              disciplines: [null],
              form_of_study: null,
              vk_profile: "@test",
              telegram_username: "@test"
            },
            student_card: {
              photo: ""
            } 
    }),
    actions: {
        async login() {
            try {
                const requestBody = {
                    user: this.user,
                    profile: this.profile,
                    student_card: this.student_card
                }
                const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
                const data = await response.json();
                console.log(data);
                console.log(requestBody)
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    this.isAuth = true;
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
})