<template>
  <section class="orders-page" v-if="orders">
    <table id="responsive-data-table" class="dt-responsive nowrap sortable" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th>ID</th>
          <th @click="sortBy('created_at')">Created At</th>
          <th @click="sortBy('total_items')">Items</th>
          <th @click="sortBy('subtotal_price')">Total Price</th>
          <th>
            Actions
            <button @click="addOrder" class="button-icon icon-header">
              <span title="Add" class="material-icons-outlined">add</span>
            </button>
          </th>
        </tr>
      </thead>
      <orders-list :orders="sortedItems" @nextPrevious="nextPrevious" @edit="editOrder(order)"></orders-list>
    </table>
  </section>
</template>

<script>
import ordersList from "../components/orders-list.vue";
import { orderService } from "../services/orders.service";
export default {
  data() {
    return {
      orders: null,
      sort: {
        key: "subtotal_price",
        isAsc: false,
      },
      isSorting: false,
      index: 8,
      startIdx: 0,
      ordersCpy: null,
    };
  },
  created() {
    this.orders = orderService.query();
  },
  computed: {
    sortedItems() {
      const list = this.orders;
      if (!!this.sort.key) {
        list.sort((a, b) => {
          a = a[this.sort.key];
          b = b[this.sort.key];
          return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1);
        });
      }
      this.ordersCpy = list.slice(this.startIdx, this.index);
      return this.ordersCpy;
    },
  },
  methods: {
    sortedClass(key) {
      return this.sort.key === key ? `sorted ${this.sort.isAsc ? "asc" : "desc"}` : "";
    },
    sortBy(key) {
      this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : false;
      this.sort.key = key;
    },
    nextPrevious(num) {
      if ((this.index === 8 && num < 0) || (this.ordersCpy.length < 8 && num > 0)) return;
      this.startIdx += num;
      this.index += num;
    },
    addOrder() {
      const emptyOrder = orderService.getEmptyOrder();
      this.$store.dispatch({ type: "orderToEdit", orderToEdit: emptyOrder });
      this.$router.push(`/orderEdit/${emptyOrder.order_ID}`);
    },
  },
  components: {
    ordersList,
  },
};
</script>
