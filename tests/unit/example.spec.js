import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import ordersList from '@/components/orders-list.vue'
import orderPreview from '@/components/order-preview.vue'

// describe('orders-list.vue', () => {
//   it('renders props.orders when passed', () => {
//     const orders = require('../../src/services/orders.json')
//     const wrapper = shallowMount(ordersList, {
//       propsData: { orders }
//     })
//     expect(wrapper.props('orders')).to.include(orders)
//   })
// })
describe('order-preview.vue', () => {
  it('renders props.orders when passed', () => {
    const order = require('../../src/services/orderTest.json')
    const wrapper = shallowMount(orderPreview, {
      propsData: { order }
    })
    expect(wrapper.props('order')).to.include(order)
  })
})
