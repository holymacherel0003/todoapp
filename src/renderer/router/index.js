import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todo-base',
      component: require('@/components/TodoBase').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
