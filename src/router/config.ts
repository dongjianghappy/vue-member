import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/login', component: () => import('../views/login/index.vue')},
  { path: '/test', component: () => import('../views/layout/test.vue')},
  { path: '/ceshi', component: () => import('../views/layout/ceshi.vue')},
  {
    path: '/',
    name: 'home',
    component: () => import('../views/layout/index.vue'),
    children: [
      { path: '/u/:id', component: () => import('../views/index/HomeView.vue')},
      { path: '/talk', component: () => import('../views/index/HomeView.vue')},
      { path: '/search', component: () => import('../views/search/index.vue')},
      { path: '/u/:id/appstore/', component: () => import('../views/appstore/index.vue')},
      { path: '/u/:id/manage/', component: () => import('../views/manage/index.vue')},
      { path: '/u/:id/content/', component: () => import('../views/content/index.vue')},
      { path: '/u/:id/home/', component: () => import('../views/home/index.vue')},
      { path: '/u/:id/about/', component: () => import('../views/home/index.vue')},
      { path: '/u/:id/:id/', component: () => import('../views/channel/index.vue')},
      // { path: '/channel/', component: () => import('../views/channel/index.vue')},
      // { path: '/channel/action', component: () => import('../views/channel/article_action.vue')},
      // { path: '/articleList/', component: () => import('../views/channel/articleList2.vue')},
      // { path: '/articleList/action', component: () => import('../views/channel/articleAction2.vue')},
      { path: '/u/:id/info/', component: () => import('../views/basicInfo/index.vue')},
      { path: '/u/:id/service/', component: () => import('../views/service/index.vue')},
      { path: '/u/:id/setting/', component: () => import('../views/setting/index.vue')},
      { path: '/u/:id/application/', component: () => import('../views/application/message_board/index.vue')},
      { path: '/u/:id/journal/', component: () => import('../views/application/journal/index.vue')},
      { path: '/u/:id/bookmark/', component: () => import('../views/application/bookmark/index.vue')},
      { path: '/activity/', component: () => import('../views/activity/index.vue')},
      { path: '/sound/', component: () => import('../views/activity/test.vue')},
      { path: '/u/:id/concern/', component: () => import('../views/concern/index.vue')},
      { path: '/u/:id/album/', component: () => import('../views/index/album/index.vue')},
      { path: '/u/:id/information/', component: () => import('../views/information/index.vue')},      
      { path: '/u/:id/haosite/', component: () => import('../views/application/haosite/index.vue')},
      { path: '/u/:id/solar_terms/', component: () => import('../views/system/jieqi.vue')},
      { path: '/u/:id/constellation/', component: () => import('../views/system/constellation.vue')},
    ]
  }
]

export default routes
