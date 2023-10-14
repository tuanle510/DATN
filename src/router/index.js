import { createRouter, createWebHistory } from 'vue-router';
import DashBoard from '../views/DashBoard.vue';
import ChuNhaView from '../views/ChuNhaView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoard,
    },
    {
      path: '/client',
      name: 'chunha',
      component: ChuNhaView,
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
