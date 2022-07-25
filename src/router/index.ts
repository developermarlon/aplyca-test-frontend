import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/Home/index.vue"
import { authenticated, unauthenticated } from "../middlewares"

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('../views/auth/Login.vue'),
    beforeEnter: unauthenticated,
    children: []
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/users/index.vue'),
    beforeEnter: authenticated
  },
  {
    path: '/users/create',
    name: 'create-user',
    component: () => import('../views/users/create/index.vue'),
    beforeEnter: authenticated
  },
  {
    path: '/users/:userId/todos',
    name: 'todos-user',
    component: () => import('../views/users/todos/index.vue'),
    beforeEnter: authenticated
  },
  {
    path: '/users/:userId/todos/create',
    name: 'create-todos-user',
    component: () => import('../views/users/todos/create/index.vue'),
    beforeEnter: authenticated
  },
  {
    path: '/users/:userId/todos/:id/edit',
    name: 'edit-todos-user',
    component: () => import('../views/users/todos/edit/index.vue'),
    beforeEnter: authenticated
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
