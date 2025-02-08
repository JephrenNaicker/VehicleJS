import { createRouter, createWebHistory } from 'vue-router'
import VehicleCapture from '@/components/VehicleCapture.vue'
import NotFoundView from '@/components/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: VehicleCapture,
    },
    {
      path: '/vehicleView',
      name: 'Vehicle View',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/VehicleView.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: NotFoundView
    }
  ],
})

export default router
