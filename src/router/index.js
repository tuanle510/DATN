import { createRouter, createWebHistory } from "vue-router";
import DashBoard from "../views/DashBoard.vue";
import ChuNhaView from "../views/ChuNhaView.vue";
import CanHoView from "../views/CanHoView.vue";
import KhachHangView from "../views/KhachHangView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashBoard,
    },
    {
      path: "/chunha",
      name: "chunha",
      component: ChuNhaView,
    },
    {
      path: "/canho",
      name: "canho",
      component: CanHoView,
    },
    {
      path: "/khachhang",
      name: "khachhang",
      component: KhachHangView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
