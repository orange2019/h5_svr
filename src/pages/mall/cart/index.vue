<template>
  <div class="page bg-light">
    <div class="page-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1)" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="text-center col-8">购物车</div>
    </div>

    <div class="mb-2">
      <v-touch @swipeleft="onSwipeCartItemLeft(0)" @swiperight="onSwipeCartItemRight(0)">
        <div class="row bg-white mb-2">
          <div class="col-2 pt-3 pb-3 align-middle" id="cart-item-check-0">
            <input type="checkbox" class="mt-3">
          </div>
          <div class="col-3 pt-3 pb-3">
            <img src alt height="100" width="100%">
          </div>
          <div class="col-7 pt-3 pb-3">
            <div class="pb-3" style="height:64px;overflow:hidden;">
              <span>产品标题产品标题产品标题产品标题产品标题产</span>
            </div>

            <div class="row">
              <div class="col-6 pl-0">
                <span class="text-danger">200000</span>
              </div>
              <div class="col-6 text-right">
                <span>-</span>
                <span>10</span>
                <span>+</span>
              </div>
            </div>
          </div>
          <div
            class="col-2 text-center bg-danger text-white align-middle pt-5"
            id="cart-item-del-0"
            style="display:none"
            @click="cartDel"
          >删除</div>
        </div>
      </v-touch>

      <v-touch @swipeleft="onSwipeCartItemLeft(1)" @swiperight="onSwipeCartItemRight(1)">
        <div class="row bg-white mb-2">
          <div class="col-2 pt-3 pb-3 align-middle" id="cart-item-check-1">
            <input type="checkbox" class="mt-3">
          </div>
          <div class="col-3 pt-3 pb-3">
            <img src alt height="100" width="100%">
          </div>
          <div class="col-7 pt-3 pb-3">
            <div class="pb-3" style="height:64px;overflow:hidden;">
              <span>产品标题产品标题产品标题产品标题产品标题产</span>
            </div>

            <div class="row">
              <div class="col-6 pl-0">
                <span class="text-danger">200000</span>
              </div>
              <div class="col-6 text-right">
                <span>-</span>
                <span>10</span>
                <span>+</span>
              </div>
            </div>
          </div>
          <div
            class="col-2 text-center bg-danger text-white align-middle pt-5"
            id="cart-item-del-1"
            style="display:none"
            @click="cartDel"
          >删除</div>
        </div>
      </v-touch>
    </div>

    <div class="p-5"></div>

    <div class="position-fixed fixed-bottom w-100 bg-white pt-3 pb-3">
      <div class="row">
        <div class="col-3">
          <input type="checkbox" class="d-inline-block" style="width:1rem;">
          <small class="text-muted">全选</small>
        </div>
        <div class="col-6">
          <span>合计</span>
          <span class="text-danger">{{ cart.total || 0}}</span>
        </div>
        <div class="col-3 text-right">
          <a href="javascript:;" class="btn btn-primary btn-sm btn-block">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ store, route }) {
    store.dispatch("cartInfoGet");
  },
  computed: {
    cart() {
      return this.$store.state.cart || {};
    }
  },
  methods: {
    onSwipeCartItemLeft(i) {
      console.log("left");
      document.getElementById("cart-item-check-" + i).style.display = "none";
      document.getElementById("cart-item-del-" + i).style.display = "block";
    },
    onSwipeCartItemRight(i) {
      console.log("right");
      document.getElementById("cart-item-check-" + i).style.display = "block";
      document.getElementById("cart-item-del-" + i).style.display = "none";
    },
    cartDel() {}
  }
};
</script>
