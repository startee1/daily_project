import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import AnimationView from '../views/AnimationView.vue'
import DataVisualView from '../views/DataVisualView.vue'

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
    },
    {
      path: '/datavisual',
      name: 'datavisual',
      component: DataVisualView,
      children: [
        {
          path: 'dvtable',
          name: 'dvtable',
          component: () => import('../components/dataVisual/DvTable/DvTable.vue'),
        }
      ]
    }
  ]
})

export default router
