import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";

const authRoutes = [
  {
    path: "/auth",
    component: () => import("@/layout/AuthLayout.vue"),
    children: [
      {
        name: "register",
        path: "register",
        component: () => import("@/pages/sign-in/RegisterPages.vue"),
        meta: { requiresGuest: true },
      },
      {
        name: "login",
        path: "login",
        component: () =>
          import("@/components/sign-in/login/AuthorizationForm.vue"),
        meta: { requiresGuest: true },
      },
      {
        path: "register-success",
        name: "register-success",
        component: () => import("@/pages/sign-in/RegistrySuccessfulPages.vue"),
        meta: { requiresGuest: true },
      },
    ],
  },
];

const adminRoutes = [
  {
    path: "/adminPanel",
    component: () => import("@/layout/DefaultLayout.vue"),
    meta: { requiresAdmin: true },
    children: [
      {
        path: "",
        component: () => import("@/pages/admin/AdminPages.vue"),
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
            component: () =>
              import("@/components/admin/pages/AcceptedList.vue"),
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
  },
];

const orderRoutes = [
  {
    path: "/myBegunOrder",
    component: () => import("@/layout/DefaultLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("@/pages/order/MyOrdersPages.vue"),
      },
    ],
  },
  {
    path: "/listOrders",
    component: () => import("@/layout/DefaultLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("@/pages/order/ListOrdersPages.vue"),
      },
    ],
  },
  {
    path: "/orderPage/:id",
    component: () => import("@/layout/DefaultLayout.vue"),
    children: [
      {
        name: "orderPage",
        path: "",
        component: () => import("@/pages/order/OrderPages.vue"),
        props: true,
        children: [
          {
            name: "order-details",
            path: "order",
            component: () => import("@/components/opder/OrderPagesHeader.vue"),
            props: true,
          },
          {
            name: "order-examination",
            path: "examination",
            component: () =>
              import("@/components/opder/ExaminationOrderHeader.vue"),
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
    ],
  },
  {
    path: "/myReviews",
    component: () => import("@/layout/DefaultLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("@/pages/order/MyReviewsPages.vue"),
      },
    ],
  },
];

const profileRoutes = [
  {
    path: "/account",
    component: () => import("@/layout/DefaultLayout.vue"),
    children: [
      {
        name: "Account",
        path: "",
        component: () => import("@/pages/profile/PersonalAccountPages.vue"),
      },
    ],
  },
  {
    path: "/customerProfile/:id",
    component: () => import("@/layout/DefaultLayout.vue"),
    children: [
      {
        name: "customerProfile",
        path: "",
        component: () => import("@/pages/profile/CustomerProfilePages.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/messages/:id",
    component: () => import("@/layout/DefaultLayout.vue"),
    children: [
      {
        name: "customerProfile-messages",
        path: "",
        component: () =>
          import("@/pages/profile/CustomerProfileMessagePages.vue"),
        props: true,
      },
    ],
  },
];

const communitiesRoutes = [
  {
    path: "/communities",
    component: () => import("@/layout/DefaultLayout.vue"),
    children: [
      {
        name: "communities",
        path: "",
        component: () => import("@/pages/communities/CommunitiesPages.vue"),
      },
    ],
  },
  {
    path: "/communitiesCreate",
    component: () => import("@/layout/DefaultLayout.vue"),
    children: [
      {
        name: "communities-create",
        path: "",
        component: () =>
          import("@/pages/communities/CreateCommunitiesPages.vue"),
      },
    ],
  },
  {
    path: "/communitiesList",
    component: () => import("@/layout/DefaultLayout.vue"),
    children: [
      {
        name: "communities-list",
        path: "",
        component: () => import("@/pages/communities/CommunitiesListPages.vue"),
      },
    ],
  },
  {
    path: "/communitiesPage/:id",
    component: () => import("@/layout/DefaultLayout.vue"),
    children: [
      {
        name: "communities-page",
        path: "",
        component: () =>
          import("@/pages/communities/CommunityDetailedPages.vue"),
        props: true,
      },
    ],
  },
];

const routes = [
  {
    path: "/",
    component: () => import("@/layout/DefaultLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "home",
        redirect: "/account",
      },
      ...adminRoutes,
      ...orderRoutes,
      ...profileRoutes,
      ...communitiesRoutes,
    ],
  },
  ...authRoutes,
  {
    path: "/404",
    name: "404",
    component: () => import("@/pages/sign-in/ForbiddenPages.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

const checkRole = (allowedRoles, userRole) => {
  return allowedRoles.includes(userRole);
};

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.checkAuth();

  if (to.meta.requiresAuth && !authStore.isAuth) {
    next({ name: "login" });
    return;
  }

  if (to.meta.requiresGuest && authStore.isAuth) {
    next({ name: "home" });
    return;
  }

  if (to.name === "register-success" && !authStore.isRegistered) {
    next({ name: "register" });
    return;
  }

  if (
    to.meta.requiresAdmin &&
    !checkRole(["администратор", "проверяющий"], authStore.userRole)
  ) {
    next("/404");
    return;
  }

  next();
});

export default router;
