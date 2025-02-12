import {defineStore} from 'pinia'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuth: false,
        user: 
            {
                id: '',
                username: '',
                name: '',
                surname: '',
                patronymic: '', 
                email: '',
                password: '',
                roleUser: '',
                university: null,
                faculty: null,
                department: null,
                course: null,
                disciplines: '',
                FormTtraining: '',
                socialId: '',
                socialMedia: 
                    {Vk: '', Telegram: ''}
            }
        
    }),
    actions: {
        async login() {
            try {
                const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.user)
                });
                const data = await response.json();
                console.log(data);
                
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