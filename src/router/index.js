import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Orders from '../views/Orders.vue'
import OrderEdit from '../views/Order-edit.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Orders',
    component: Orders,
  },
  {
    path: '/orderEdit/:orderId',
    name: 'orderEdit',
    component: OrderEdit
  },
 
]

const router = new VueRouter({
  routes
})

export default router