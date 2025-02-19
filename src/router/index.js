// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/account",
      meta: { requiresAuth: true },
    },
    {
      path: "/myBegunOrder",
      component: () => import("@/pages/MyOrdersPages.vue"),
    },
    {
      path: "/listOrders",
      component: () => import("@/pages/ListOrdersPages.vue"),
    },
    {
      name: "Account",
      path: "/account",
      component: () => import("@/pages/PersonalAccountPages.vue"),
    },
    {
      name: "communities",
      path: "/communities",
      component: () => import("@/pages/CommunitiesPages.vue"),
    },
    {
      name: "communities-create",
      path: "/communitiesCreate",
      component: () => import("@/pages/CreateCommunitiesPages.vue"),
    },
    {
      name: "communities-list",
      path: "/communitiesList",
      component: () => import("@/pages/CommunitiesListPages.vue"),
    },
    {
      name: "communities-page",
      path: "/communitiesPage/:id",
      component: () => import("@/pages/CommunityDetailedPages.vue"),
      props: true,
    },
    {
      name: "register",
      path: "/register",
      component: () => import("@/pages/RegisterPages.vue"),
      meta: { requiresGuest: true },
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/components/AuthorizationForm.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/register-success",
      name: "register-success",
      component: () => import("@/pages/RegistrySuccessfulPages.vue"),
      meta: { requiresRegistration: true },
    },
    {
      name: "orderPage",
      path: "/orderPage/:id",
      component: () => import("@/pages/OrderPages.vue"),
      props: true,
      children: [
        {
          name: "order-details",
          path: "order",
          component: () => import("@/components/OrderPagesOrder.vue"),
          props: true,
        },
        {
          name: "order-examination",
          path: "examination",
          component: () => import("@/components/OrderPagesExamination.vue"),
          props: true,
        },
        {
          name: "order-editing",
          path: "editing",
          component: () => import("@/components/OrderPagesEditing.vue"),
          props: true,
        },
      ],
    },
    {
      name: "myReviews",
      path: "/myReviews",
      component: () => import("@/pages/MyReviewsPages.vue"),
    },
    {
      name: "customerProfile",
      path: "/customerProfile/:id",
      component: () => import("@/pages/CustomerProfilePages.vue"),
      props: true,
    },
    {
      name: "customerProfile-messages",
      path: "/messages/:id",
      component: () => import("@/pages/CustomerProfileMessagePages.vue"),
      props: true,
    },
    {
      path: "/adminPanel",
      component: () => import("@/pages/AdminPages.vue"),
      children: [
        {
          path: "",
          component: () => import("@/components/Alllist.vue"),
        },
        {
          path: "all",
          component: () => import("@/components/Alllist.vue"),
        },
        {
          path: "postponed",
          component: () => import("@/components/PostponedList.vue"),
        },
        {
          path: "new",
          component: () => import("@/components/NewList.vue"),
        },
      ],
    },
  ],

  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.checkAuth();

  if (to.meta.requiresAuth && !authStore.isAuth) {
    // Если требуется аутентификация, но пользователь не авторизован
    next({ name: "login" });
  } else if (to.meta.requiresGuest && authStore.isAuth) {
    // Если пользователь уже авторизован, но пытается перейти на страницу для гостей
    next({ name: "home" });
  } else if (to.name === "register-success" && !authStore.isRegistered) {
    // Если пользователь пытается перейти на страницу успешной регистрации без регистрации
    next({ name: "register" });
  } else {
    next();
  }
});

export default router;
