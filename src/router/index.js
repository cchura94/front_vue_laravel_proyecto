import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import App from '../App.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/LandingDemo.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: App,
      children: [
        {
            path: '',
            name: 'dashboard',
            component: () => import('../components/Dashboard.vue')
        },
        
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/Login.vue')
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../pages/Error.vue')
},
{
    path: '/notfound',
    name: 'notfound',
    component: () => import('../pages/NotFound.vue')
},
{
    path: '/access',
    name: 'access',
    component: () => import('../pages/Access.vue')
}
  ]
})

export default router
