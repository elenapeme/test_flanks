import { createRouter, createWebHistory } from 'vue-router'
import OverviewView from '../Overview/OverviewView.vue'
import InvestmentAnalyticsView from '../InvestmentAnalytics/InvestmentAnalyticsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'overview',
      component: OverviewView
    },
    {
      path: '/investment-analytics',
      name: 'investment analytics',
      component: InvestmentAnalyticsView
    },
  ]
})

export default router
