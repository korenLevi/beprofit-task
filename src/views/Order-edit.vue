<template>
  <div class="order-edit" v-if="orderToEdit">
    <form @submit.prevent="" class="form">
      <div class="btns">
        <button class="button-icon icon-list" @click="$router.push('/')">Back</button>
        <button class="button-icon icon-list" @click="saveOrder">Save</button>
      </div>
      <div class="content-container">
        <div class="warp" v-for="(dataKey, idx) in dataKeys" :key="idx">
          <label :for="dataKey">{{ dataKey }}</label>
          <input v-if="dataKey === 'created_at'" type="date" :placeholder="dataKey" v-model="orderToEdit[dataKey]" />
          <input autocomplete="off" v-else class="input" type="value" :placeholder="dataKey" v-model="orderToEdit[dataKey]" />
        </div>
      </div>
    </form>

    <div class="prev">
      <button class="button-icon icon-list" @click="nextPrevious(-10)">
        <span class="material-icons-outlined"> arrow_back </span>
      </button>
      <button class="button-icon icon-list" @click="nextPrevious(10)">
        <span class="material-icons-outlined"> arrow_forward </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderToEdit: null,
      dataKeys: null,
      ObjectKeys: null,
      noOfKeys: 10,
      index: 10,
    };
  },
  created() {
    this.order();
  },
  methods: {
    order() {
      this.orderToEdit = this.$store.getters.orderToEdit;
      this.orderToEdit["created_at"] = this.orderToEdit["created_at"].match(/^[0-9-0-9-0-9]*/)[0];
      this.ObjectKeys = Object.keys(this.orderToEdit);
      this.dataKeys = this.ObjectKeys;
      this.dataKeys = this.dataKeys.slice(0, this.index);
    },
    getDate(date) {
      return date.match(/^[0-9-0-9-0-9]*/)[0];
    },
    nextPrevious(num) {
      if ((this.index === 10 && num < 0) || (this.dataKeys.length < 10 && num > 0)) return;
      if (num < 0) this.dataKeys = this.ObjectKeys.slice(this.index + 2 * num, this.index + num);
      else this.dataKeys = this.ObjectKeys.slice(this.index, this.index + num);
      this.index += num;
    },
    saveOrder() {
      this.$store.dispatch({ type: "saveOrder", orderToSave: this.orderToEdit });
      this.$router.push("/orders");
    },
  },
};
</script>

<style lang="scss">
button {
  cursor: pointer;
}
.order-edit {
  margin: 0 auto;
  width: 70%;
}
.form {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
.btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.warp {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  min-width: 250px;
  label {
    margin-bottom: 5px;
  }
  input {
    min-height: 30px;
    box-sizing: border-box;
    width: 100%;
    width: 250px;
    height: 30px;
    padding: 20px;
    margin: 0;
    border: 1px solid rgba(91, 97, 110, 0.2);
    border-radius: 6px;
    background: none;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.15;
  }
}
.prev {
  display: flex;
  position: relative;
  justify-content: space-between;
  button {
    cursor: pointer;
  }
}
</style>
