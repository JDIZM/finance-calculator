import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mortgage-calculator',
      name: 'mortgage-calculator',
      component: () => import('../views/MortgageView.vue')
    },
    {
      path: '/compound-interest-calculator',
      name: 'compound-interest-calculator',
      component: () => import('../views/CompoundInterestView.vue')
    },
  ]
})

export default router
