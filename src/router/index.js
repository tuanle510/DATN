import { createRouter, createWebHistory } from "vue-router";
import DashBoard from "../views/DashBoard/DashBoardView.vue";
import ChuNhaList from "../views/ChuNha/ChuNhaList.vue";
import CanHoList from "../views/CanHo/CanHoList.vue";
import KhachHangList from "../views/KhachHang/KhachHangList.vue";
import DemoCompoent from "../views/DemoCompoent.vue";

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
      component: CanHoList,
    },
    {
      path: "/khachhang",
      name: "khachhang",
      component: KhachHangList,
    },
    {
      path: "/demo",
      name: "demo",
      component: DemoCompoent,
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
