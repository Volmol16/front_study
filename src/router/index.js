import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/account',
    },
    {
      path: '/myBegunOrder',
      component: () => import('@/pages/MyOrdersPages.vue'),
    },
    {
      path: '/listOrders',
      component: () => import('@/pages/ListOrdersPages.vue'),
    },
    {
      name: 'Account',
      path: '/account',
      component: () => import('@/pages/PersonalAccountPages.vue'),
    },
    {
      name: 'orderPage',
      path: '/orderPage/:id', // Динамический сегмент id на уровне родительского маршрута
      component: () => import('@/pages/OrderPages.vue'),
      props: true,
      children: [
        {
          name: 'order-details',
          path: 'order', 
          component: () => import('@/components/OrderPagesOrder.vue'),
          props: true
        },
        {
          name: 'order-examination', // добавьте имя
          path: 'examination',
          component: () => import('@/components/OrderPagesExamination.vue'),
          props: true
        },
        {
          name: 'order-editing', // добавьте имя
          path: 'editing',
          component: () => import('@/components/OrderPagesEditing.vue'),
          props: true
        }
      ]
    },
    {
      path: '/adminPanel',
      component: () => import('@/pages/AdminPages.vue'),
      children: [
        {
          path: '',
          component: () => import('@/components/Alllist.vue'),
        },
        {
          path: 'all',
          component: () => import('@/components/Alllist.vue'),
        },
        {
          path: 'postponed',
          component: () => import('@/components/PostponedList.vue')
        },
        {
          path: 'new',
          component: () => import('@/components/NewList.vue')
        }
      ]
    }
  ],
})

export default router
