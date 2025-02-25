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
      component: () => import("@/pages/order/MyOrdersPages.vue"),
    },
    {
      path: "/listOrders",
      component: () => import("@/pages/order/ListOrdersPages.vue"),
    },
    {
      name: "Account",
      path: "/account",
      component: () => import("@/pages/profile/PersonalAccountPages.vue"),
    },
    {
      name: "communities",
      path: "/communities",
      component: () => import("@/pages/communities/CommunitiesPages.vue"),
    },
    {
      name: "communities-create",
      path: "/communitiesCreate",
      component: () => import("@/pages/communities/CreateCommunitiesPages.vue"),
    },
    {
      name: "communities-list",
      path: "/communitiesList",
      component: () => import("@/pages/communities/CommunitiesListPages.vue"),
    },
    {
      name: "communities-page",
      path: "/communitiesPage/:id",
      component: () => import("@/pages/communities/CommunityDetailedPages.vue"),
      props: true,
    },
    {
      name: "register",
      path: "/register",
      component: () => import("@/pages/auth/RegisterPages.vue"),
      meta: { requiresGuest: true },
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/components/auth/AuthorizationForm.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/register-success",
      name: "register-success",
      component: () => import("@/pages/auth/RegistrySuccessfulPages.vue"),
      meta: { requiresRegistration: true },
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/pages/sign-in/ForbiddenPages.vue"),
    },
    {
      name: "orderPage",
      path: "/orderPage/:id",
      component: () => import("@/pages/order/OrderPages.vue"),
      props: true,
      children: [
        {
          name: "order-details",
          path: "order",
          component: () => import("@/components/opder/OrderPagesOrder.vue"),
          props: true,
        },
        {
          name: "order-examination",
          path: "examination",
          component: () =>
            import("@/components/opder/OrderPagesExamination.vue"),
          props: true,
        },
        {
          name: "order-editing",
          path: "editing",
          component: () => import("@/components/opder/OrderPagesEditing.vue"),
          props: true,
        },
      ],
    },
    {
      name: "myReviews",
      path: "/myReviews",
      component: () => import("@/pages/order/MyReviewsPages.vue"),
    },
    {
      name: "customerProfile",
      path: "/customerProfile/:id",
      component: () => import("@/pages/profile/CustomerProfilePages.vue"),
      props: true,
    },
    {
      name: "customerProfile-messages",
      path: "/messages/:id",
      component: () =>
        import("@/pages/profile/CustomerProfileMessagePages.vue"),
      props: true,
    },
    {
      path: "/adminPanel",
      component: () => import("@/pages/admin/AdminPages.vue"),
      meta: { requiresAdmin: true },
      children: [
        {
          path: "",
          component: () => import("@/components/admin/pages/Alllist.vue"),
        },
        {
          path: "all",
          component: () => import("@/components/admin/pages/Alllist.vue"),
        },
        {
          path: "accepted",
          component: () => import("@/components/admin/pages/AcceptedList.vue"),
        },
        {
          path: "rejectedSb",
          component: () =>
            import("@/components/admin/pages/RejectedbySBList.vue"),
        },
        {
          path: "check",
          component: () =>
            import("@/components/admin/pages/AtTheCheckList.vue"),
        },
        {
          path: "refinement",
          component: () =>
            import("@/components/admin/pages/ForRefinementList.vue"),
        },
        {
          path: "performerRejected",
          component: () =>
            import("@/components/admin/pages/PerformerRejectedList.vue"),
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
    next({ name: "login" });
  } else if (to.meta.requiresGuest && authStore.isAuth) {
    next({ name: "home" });
  } else if (to.name === "register-success" && !authStore.isRegistered) {
    next({ name: "register" });
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAdmin) {
    const allowedRoles = ["администратор", "проверяющий"];
    if (!allowedRoles.includes(authStore.userRole)) {
      next("/404");
    }
  }
  next();
});

export default router;
