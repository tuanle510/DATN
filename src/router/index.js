import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index.js";

import DashBoard from "@/views/DashBoard/DashBoardView.vue";
import OwnerList from "@/views/Owner/OwnerList.vue";
import BuildingList from "@/views/Building/BuildingList.vue";
import ApartmentList from "@/views/Apartment/ApartmentList.vue";
import ClientList from "@/views/Client/ClientList.vue";
import ContractList from "@/views/Contract/ContractList.vue";
import ContractGroupList from "@/views/ContractGroup/ContractGroupList.vue";
import Login from "@/views/Login/Login.vue";
import MainLayout from "@/components/layout/MainLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
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
          path: "/owner",
          name: "chunha",
          component: OwnerList,
        },
        {
          path: "/apartment",
          name: "apartment",
          component: ApartmentList,
        },
        {
          path: "/building",
          name: "building",
          component: BuildingList,
        },
        {
          path: "/client",
          name: "client",
          component: ClientList,
        },
        {
          path: "/contract",
          name: "contract",
          component: ContractList,
        },
        {
          path: "/contractgroup",
          name: "contractgroup",
          component: ContractGroupList,
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
});

// Chặn
router.beforeEach((to, from, next) => {
  let isAuthenticated = !!localStorage.getItem("token");
  if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
  else next();
});

export default router;
