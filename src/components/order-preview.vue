<template>
  <tr class="order-preview">
    <td>{{ order.order_ID }}</td>
    <td>{{ order.created_at }}</td>
    <td>{{ order.total_items }}</td>
    <td>{{ order.total_price }}</td>
    <td>
      <button class="button-icon" @click="removeOrder(order.order_ID)">
        <span title="Remove" class="material-icons-outlined">delete</span>
      </button>
 
      <button class="button-icon" @click="editOrder(order)">
        <span title="Edit" class="material-icons-outlined">edit</span>
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      sort: {
        key: "",
        isAsc: false,
      },
      isLoading: false
    };
  },
  methods: {
    sortedClass(key) {
      return this.sort.key === key ? `sorted ${this.sort.isAsc ? "asc" : "desc"}` : "";
    },
    sortBy(key) {
      this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : false;
      this.sort.key = key;
    },
    editOrder(order) {
      this.$store.dispatch({ type: "orderToEdit", orderId: order.order_ID })
      .then(res => {
        this.$router.push(`/orderEdit/${res.order_ID}`);
      })
    },
    removeOrder(orderId) {
      this.$store.dispatch({ type: "removeOrder", orderId });
    },
  },
 
};
</script>
