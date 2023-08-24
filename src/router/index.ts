import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import AnimationView from '../views/AnimationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView
    },
    {
      path: '/animation',
      name: 'animation',
      component: AnimationView,
      children: [
        {
          path: 'tree',
          name: 'tree',
          component: () => import('../components/animation/AmtTree.vue'),
        }
      ]
    }
  ]
})

export default router
