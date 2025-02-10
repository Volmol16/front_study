import {defineStore} from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuth: true,
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
})