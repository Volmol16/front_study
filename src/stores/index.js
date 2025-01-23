import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        listUsers: [
            {
                id: 1,
                name: "Алексей Чацкий",
                jobTitle: "Специалист в математике",
                state: "Accepted",
                image: "/image/avatar/LogoUser.png",
                email: 'bM4t0@example.com',
                social: [
                    { platform: 'telegram', link: 'https://t.me/alekschatskiy' },
                    { platform: 'github', link: 'https://github.com/alekschatskiy' }
                ],
                speciality: 'Математика',
                university: 'МГТУ им. Баумана',
                Faculty: 'Математика и информатика',
                department: 'Математический',
                course: '3',
                studentID: '123456789',
                Disciplines: [
                    { name: 'Общая физика',},
                    { name: 'Общая биология', },
                    { name: 'Общая химия', },
                    { name: 'Общая математика', },
                ],
                description: 'Я являюсь дипломированным химиком с 5-летним опытом работы в различных научно-исследовательских лабораториях. Обладаю глубокими знаниями в области химических наук и постоянно совершенствую свои навыки. Ответственно подхожу к выполнению любых заказов, гарантируя высокое качество  и точность результатов. Всегда открыт к сотрудничеству и готов оказать помощь в решении сложных химических задач.'
            },
            {
                id: 2,
                name: "Виктор Захаров",
                jobTitle: "Специалист в информатике",
                state: "rejected",
                image: "/image/avatar/LogoUser.png",
                email: 'j6zZM@example.com',
                social: [
                    { platform: 'telegram', link: 'https://t.me/viktorzaharov' },
                    { platform: 'vkontacte', link: 'https://vk.com/viktorzaharov' }
                ],
                speciality: 'Информатика',
                university: 'СПбГУ',
                Faculty: 'Математика и информатика',
                department: 'Информатика',
                course: '3',
                studentID: '123456789',
                Disciplines: [
                    { name: 'Общая физика',},
                    { name: 'Общая биология', },
                    { name: 'Общая химия', },
                    { name: 'Общая математика', },
                ],
                description: ''
            },
            {
                id: 3,
                name: "Виктория Лытова",
                jobTitle: "Специалист в химии",
                state: "postponed",
                image: "/image/avatar/LogoUser.png",
                email: 'sQpMl@example.com',
                social: [
                    { platform: 'telegram', link: 'https://t.me/victoria_lytova' },
                ],
                speciality: 'Химия',
                university: 'СПбГУ',
                Faculty: 'Химическая',
                department: 'Химия',
                course: '3',
                studentID: '123456789',
                Disciplines: [
                    { name: 'Общая физика',},
                    { name: 'Общая биология', },
                    { name: 'Общая химия', },
                    { name: 'Общая математика', },
                ],
                description: 'Я являюсь химиком'
            }
        ]
    })
})