import { createRouter, createWebHistory } from 'vue-router'
import routes from './config'

const use = window.location.pathname.split("/")[1]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
