import { createRouter, createWebHistory } from "vue-router";
import DashBoard from "@/views/DashBoard/DashBoardView.vue";
import OwnerList from "@/views/Owner/OwnerList.vue";
import BuildingList from "@/views/Building/BuildingList.vue";
import ApartmentList from "@/views/Apartment/ApartmentList.vue";
import ClientList from "@/views/Client/ClientList.vue";
import ContractList from "@/views/Contract/ContractList.vue";
import ContractGroupList from "@/views/ContractGroup/ContractGroupList.vue";

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
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('@/views/AboutView.vue')
    // }
  ],
});

export default router;
