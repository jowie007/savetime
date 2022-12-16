import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/sort',
      name: 'sort',
      component: () => import('../views/SortView.vue'),
    },
    {
      path: '/various',
      component: () => import('../views/VariousView.vue'),
      children: [
        {
          path: 'imageLoader',
          name: 'imageLoader',
          component: () => import('../components/TheImageLoader.vue'),
        },
        {
          path: 'internetRequest',
          name: 'internetRequest',
          component: () => import('../components/TheInternetRequest.vue'),
        },
        {
          path: 'localRequest',
          name: 'localRequest',
          component: () => import('../components/TheLocalRequest.vue'),
        },
        {
          path: 'longText',
          name: 'longText',
          component: () => import('../components/TheLongText.vue'),
        },
        {
          path: 'textAwaiter',
          name: 'textAwaiter',
          component: () => import('../components/TheTextAwaiter.vue'),
        },
        {
          path: 'numberGenerator',
          name: 'numberGenerator',
          component: () => import('../components/TheNumberGenerator.vue'),
        },
      ],
    },
  ],
})

export default router
