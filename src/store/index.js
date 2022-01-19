import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { orderService } from '../services/orders.service'
import { showMsg } from '../services/event-bus.service'
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
    async orderToEdit({commit},{orderId}) {
      try{
        const order = await orderService.getOrderById(orderId)
        commit({type: 'orderToEdit',order})
        return order
      }catch(err){
        showMsg('Error while getting order', 'danger')
      }
    },
    async saveOrder({commit},{orderToSave}){
      try{
        const orders = await orderService.saveOrder(orderToSave)
        commit({type: 'saveOrders',orders})
      }catch(err){
        showMsg('Error while saving order', 'danger')
      }
    },
    async removeOrder({commit},{orderId}){
      try{
        const orders = await orderService.removeOrder(orderId)
        commit({type: 'saveOrders',orders}) 
      }catch(err){
        showMsg('Error while deleting order', 'danger')
      }
    },
    addOrder({commit},{orderToEdit}){
      console.log('orderToEdit');
      commit({type:'orderToEdit',order:orderToEdit})
    }
  }
})