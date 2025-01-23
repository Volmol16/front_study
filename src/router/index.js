import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/myOrders',
      component: () => import('@/pages/MyOrdersPages.vue'),
    },
    {
      path: '/listOrders',
      component: () => import('@/pages/ListOrdersPages.vue'),
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
