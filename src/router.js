import Vue from 'vue'
import Router from 'vue-router'
import routes from 'vue-auto-routing'
import { createRouterLayout } from 'vue-router-layout'

Vue.use(Router)

const RouterLayout = createRouterLayout(layout => {
  return import('@/layouts/' + layout + '.vue')
})

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: RouterLayout,
      children: routes
    },
    {
      path: '*',
      component: RouterLayout,

      children: [{
        name: 'page-404',
        path: '',
        component: () => import('@/pages/404.vue')
      }]
    }
  ]
})

router.beforeEach((to, _, next) => {
  if (to.fullPath === '/') next('people')
  else next()
})

export default router
