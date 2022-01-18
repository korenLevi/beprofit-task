<template>
  <tbody v-if="orders">
    <order-preview v-for="(order, idx) in orders" :order="order" :key="idx" @edit="this.$emit('edit')"> </order-preview>
    <tr>
      <button class="button-icon icon-list" @click="nextPrevious(-8)">
        <span class="material-icons-outlined"> arrow_back </span>
      </button>
      <td></td>
      <td></td>
      <td></td>
      <button class="button-icon icon-list" @click="nextPrevious(8)">
        <span class="material-icons-outlined"> arrow_forward </span>
      </button>
    </tr>
  </tbody>
</template>

<script>
import orderPreview from "../components/order-preview.vue";
export default {
  props: {
    orders: {
      type: Array,
      default: [],
    },
  },
  methods: {
    nextPrevious(num) {
      this.$emit("nextPrevious", num);
    },
  },
  components: {
    orderPreview,
  },
};
</script>
