import { createRouter, createWebHistory } from "vue-router";
import DashBoard from "../views/DashBoard/DashBoardView.vue";
import ChuNhaList from "../views/ChuNha/ChuNhaList.vue";
import CanHoView from "../views/CanHo/CanHoView.vue";
import KhachHangView from "../views/KhachHang/KhachHangView.vue";

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
      component: ChuNhaList,
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
