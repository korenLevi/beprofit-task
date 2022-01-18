import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { orderService } from '../services/orders.service'
export default new Vuex.Store({
  state: {
    orders: null,
    orderToEdit: null,
  },
  getters:{
    orderToEdit(state){
      return state.orderToEdit;
    }
  },
  mutations: {
    orderToEdit(state, {order}) {
      state.orderToEdit = order;
    },
    saveOrders(state,{orders}){
      state.orders = orders;
    },
  },
  actions: {
    getOrderById({commit},{orderId}) {
      const order = orderService.getOrderById(orderId)
      commit({type: 'orderToEdit',order})
    },
    saveOrder({commit},{orderToSave}){
      const orders = orderService.saveOrder(orderToSave)
      commit({type: 'saveOrders',orders})
    },
    removeOrder({commit},{orderId}){
      const orders = orderService.removeOrder(orderId)
      commit({type: 'saveOrders',orders})
    },
    orderToEdit({commit},{orderToEdit}){
      commit({type:'orderToEdit',order:orderToEdit})
    }
  }
})