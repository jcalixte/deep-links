import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/link/create',
    name: 'LinkCreate',
    props: true,
    component: () =>
      import(/* webpackChunkName: "link-create" */ '@/views/LinkCreatePage.vue')
  },
  {
    path: '/link/:slug',
    name: 'Link',
    props: true,
    component: () =>
      import(/* webpackChunkName: "link" */ '@/views/LinkPage.vue')
  },
  {
    path: '/link/share/:slug',
    name: 'LinkShare',
    props: true,
    component: () =>
      import(/* webpackChunkName: "link-share" */ '@/views/LinkSharePage.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
