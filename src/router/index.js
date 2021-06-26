import Vue from 'vue'
import VueRouter from 'vue-router'
import Error from '../views/Error/404.vue'
import Layout from '../views/Layout'
import Login from '../views/Login'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect:'/product',
    children: [
      {
        path: 'product',
        name: 'Product',
        component: () => import('../views/Product/index.vue') 
      },
      {
        path: 'params',
        name: 'Params',
        component: () => import('../views/Params/index.vue')
      },
      { 
        path: 'advert',
        name: 'Advert',
        component: () => import('../views/Advert/index.vue')
      },
      {
        path: 'center',
        name: 'Center',
        component: () => import('../views/Center/index.vue')
      }
    ],
    meta:{
      isLogin:true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    component: Error
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})




export default router
