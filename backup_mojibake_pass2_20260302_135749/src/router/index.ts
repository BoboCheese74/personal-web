import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/',
      name: '',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../components/home/homePage.vue'),
        },
      ],
    },
  ],
})

export default router
