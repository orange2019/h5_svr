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

    <div class="mb-2" v-if="cart.count > 0">
      <template v-for="item in cart.list">
        <v-touch
          @swipeleft="onSwipeCartItemLeft(item.id)"
          @swiperight="onSwipeCartItemRight(item.id)"
        >
          <div class="row bg-white mb-2">
            <div
              class="col-2 pt-4 pb-3 align-middle"
              :id="'cart-item-check-'  + item.id"
              @click="cartItemCheck(item)"
            >
              <i class="far fa-check-square" v-if="itemCheck.indexOf(item.id) > -1"></i>
              <i class="far fa-square" v-else></i>
            </div>
            <div class="col-3 pt-3 pb-3">
              <img :src="item.cover" alt height="60" width="100%">
            </div>
            <div class="col-7 pt-3">
              <div class="pb-3 text-truncate">
                <span>{{ item.name }}</span>
              </div>

              <div class="row">
                <div class="col-4 pl-0 pr-0">
                  <span class="text-danger">{{ item.price }}</span>
                </div>
                <div class="col-8 text-center pr-0">
                  <span class="text-muted p-2" @click="cartItemMinus(item)">
                    <i class="fas fa-minus"></i>
                  </span>
                  <span class="bg-light d-inline-block" style="min-width:2rem;">{{item.count}}</span>
                  <span class="p-2" @click="cartItemPlus(item)">
                    <i class="fas fa-plus"></i>
                  </span>
                </div>
              </div>
            </div>
            <div
              class="col-2 text-center bg-danger text-white align-middle pt-5"
              :id="'cart-item-del-' + item.id"
              style="display:none"
              @click="cartDel(item)"
            >删除</div>
          </div>
        </v-touch>
      </template>
    </div>

    <div class="text-center mt-5" v-else>购物车是空的，
      <router-link :to="{path:'/mall', query: {token:token} }">去逛逛</router-link>
    </div>

    <div class="p-5"></div>

    <div class="position-fixed fixed-bottom w-100 bg-white pt-3 pb-3">
      <div class="row">
        <div class="col-3" @click="checkItemAll">
          <i
            class="far fa-check-square"
            v-if="cart.list && cart.list.length > 0 && itemCheck.length == cart.list.length"
          ></i>
          <i class="far fa-square" v-else></i>
          <small class="text-muted">全选</small>
        </div>
        <div class="col-6">
          <span>合计</span>
          <span class="text-danger">{{itemCheckTotal}}</span>
        </div>
        <div class="col-3 text-right">
          <a
            href="javascript:;"
            class="btn btn-primary btn-sm btn-block"
            @click="orderCreateStart"
          >结算</a>
        </div>
      </div>
    </div>

    <div class="position-fixed fixed-bottom w-100 text-center" style="bottom:5rem;" v-html="errMsg"></div>

    <div class="position-fixed fixed-bottom w-100 bg-white" :style="chooseAddressStyle">
      <div class="text-right mt-3">
        <a href="javascript:;" class="p-3" @click="orderCreateClose">
          <i class="far fa-times-circle"></i>
        </a>
      </div>
      <div class="row pt-3" v-if="mallUser.auth">
        <div class="col-1 pr-0 pt-2">
          <small class="text-muted">
            <i class="fas fa-map-marker-alt"></i>
          </small>
        </div>
        <div class="col-9" v-if="address.list.length > 0">
          <span class>
            {{ address.default.name }}
            <small class="text-muted">{{ address.default.mobile}}</small>
          </span>
          <div class="text-truncate">
            <small class="text-muted">{{ address.default.info }}</small>
          </div>
        </div>
        <div class="col-2 pr-0 pt-2 text-right">
          <router-link
            :to="{ path :'/user/address' , query: {token: token}}"
            class="pr-3 d-block text-muted"
          >
            <i class="fas fa-chevron-right"></i>
          </router-link>
        </div>

        <div class="col-12 mt-3">
          <a
            href="javascript:;"
            class="btn btn-primary btn-block btn-lg btn-radius-big"
            @click="orderCreate"
          >{{ submitCreateOrder.text }}</a>
        </div>

        <div class="text-center col-12 mt-2" v-html="errMsg"></div>
      </div>

      <dir class="p-5"></dir>
    </div>
  </div>
</template>

<script>
import Request from "./../../../api/common/request.js";
export default {
  asyncData({ store, route }) {
    store.dispatch("cartInfoGet");
    store.dispatch("mallUserGet", { route }).then(ret => {
      // if (ret.code != 0) {
      //   window.android.goToLogin();
      // }
      if (store.state.mallUser.auth) {
        store.dispatch("mallUserGetAddress", { route });
      }
    });
  },
  computed: {
    token() {
      return this.$route.query.token || "";
    },
    cart() {
      return this.$store.state.cart || {};
    },
    mallUser() {
      return this.$store.state.mallUser;
    },
    address() {
      return this.$store.state.address;
    },
    itemCheck() {
      return this.$store.state.cartCheck.itemCheck;
    },
    itemCheckVal() {
      return this.$store.state.cartCheck.itemCheckVal;
    },
    itemCheckTotal() {
      return this.$store.state.cartCheck.itemCheckTotal;
    }
  },
  data() {
    return {
      // itemCheck: [],
      // itemCheckVal: {},
      // itemCheckTotal: 0,
      errMsg: "",
      submitCreateOrder: {
        text: "确认",
        isSubmit: 0
      },
      chooseAddressStyle: {
        display: "none"
      }
    };
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
    cartItemCheck(item) {
      this.errMsg = "";
      let itemId = item.id;

      if (this.$store.state.cartCheck.itemCheck.indexOf(itemId) > -1) {
        this.$store.state.cartCheck.itemCheck.splice(
          this.$store.state.cartCheck.itemCheck.indexOf(itemId),
          1
        );
      } else {
        // let score = this.mallUser.info.score;
        // let total =
        //   (this.itemCheckTotal * 100 + item.price * item.count * 100) / 100;
        // if (total > score) {
        //   this.errMsgAlert(
        //     `<span class="bg-dark text-white p-2">积分余额不足</span>`
        //   );
        //   return;
        // }

        this.$store.state.cartCheck.itemCheck.push(itemId);
      }
      this.itemCheckTotalGet();
    },
    checkItemAll() {
      this.errMsg = "";
      // let score = this.mallUser.info.score;
      // let total = this.cart.total;
      // if (total > score) {
      //   this.errMsgAlert(
      //     `<span class="bg-dark text-white p-2">积分余额不足</span>`
      //   );
      //   return;
      // }

      let itemCheckLen = this.$store.state.cartCheck.itemCheck.length || 0;
      let cartItemLen = this.cart.list.length || 0;
      if (itemCheckLen == cartItemLen) {
        this.$store.state.cartCheck.itemCheck = [];
      } else {
        this.cart.list.forEach(item => {
          if (this.$store.state.cartCheck.itemCheck.indexOf(item.id) < -0) {
            this.$store.state.cartCheck.itemCheck.push(item.id);
          }
        });
      }

      console.log(this.$store.state.cartCheck.itemCheck);
      this.itemCheckTotalGet();
    },
    itemCheckTotalGet() {
      let total = 0;
      this.cart.list.forEach(item => {
        if (this.$store.state.cartCheck.itemCheck.indexOf(item.id) > -1) {
          total += parseInt(item.price * 100 * item.count);
        }
      });
      this.$store.state.cartCheck.itemCheckTotal = total / 100;
    },
    itemCheckItemGet() {
      let items = [];
      this.cart.list.forEach(item => {
        if (this.$store.state.cartCheck.itemCheck.indexOf(item.id) > -1) {
          items.push(item);
        }
      });

      return items;
    },
    async cartDel(item) {
      let ret = await Request.post("/cart/minus", {
        item: item,
        count: item.count
      });
      this.$store.dispatch("cartInfoGet").then(ret => {
        this.$store.state.cartCheck.itemCheck.splice(
          this.$store.state.cartCheck.itemCheck.indexOf(item.id),
          1
        );
      });
    },
    async cartItemMinus(item) {
      if (item.count <= 1) {
        return;
      }
      let ret = await Request.post("/cart/minus", { item: item, count: 1 });
      this.$store.dispatch("cartInfoGet").then(ret => {
        this.itemCheckTotalGet();
      });
    },
    async cartItemPlus(item) {
      this.errMsg = "";
      // let score = this.mallUser.info.score;
      // let total = (this.itemCheckTotal * 100 + item.price * 100) / 100;
      // if (total > score) {
      //   this.errMsgAlert(
      //     `<span class="bg-dark text-white p-2">积分余额不足</span>`
      //   );
      //   return;
      // }

      if (item.stock != -1 && item.count + 1 > item.stock) {
        this.errMsgAlert(
          `<span class="bg-dark text-white p-2">库存不足</span>`
        );
        return;
      }

      let ret = await Request.post("/cart/plus", { item: item, count: 1 });
      this.$store.dispatch("cartInfoGet").then(ret => {
        this.itemCheckTotalGet();
      });
    },
    orderCreateSubmit(type = 1) {
      if (type == 1) {
        this.submitCreateOrder.isSubmit = 1;
        this.submitCreateOrder.text = "提交...";
      } else {
        this.submitCreateOrder.isSubmit = 0;
        this.submitCreateOrder.text = "结算";
      }
    },
    orderCreateClose() {
      this.chooseAddressStyle.display = "none";
    },
    orderCreateStart() {
      if (!this.mallUser.auth) {
        window.android.goToLogin();
      }

      let items = this.itemCheckItemGet();
      if (items.length <= 0) {
        this.errMsgAlert(
          `<span class="bg-dark text-white p-2">请选择结算物品</span>`
        );
        this.orderCreateSubmit(0);
        return;
      }

      this.chooseAddressStyle.display = "block";
    },
    async orderCreate() {
      if (!this.mallUser.auth) {
        window.android.goToLogin();
      }

      if (this.submitCreateOrder.isSubmit != 0) {
        return;
      }

      this.orderCreateSubmit(1);

      let items = this.itemCheckItemGet();
      if (items.length <= 0) {
        this.errMsgAlert(
          `<span class="bg-dark text-white p-2">请选择结算物品</span>`
        );
        this.orderCreateSubmit(0);
        return;
      }

      let address = this.address.default;

      let body = {};
      body.items = items;
      console.log("body items", items);
      body.address = address;
      let ret = await Request.post(
        "/api/mall/order/create?token=" + this.token,
        body
      );

      if (ret.code == 0) {
        // 去掉购物车
        console.log("del items", items);
        for (let index = 0; index < items.length; index++) {
          let item = items[index];
          await this.cartDel(item);
        }

        this.orderCreateSubmit(0);

        this.$router.push({
          path: "/mall/order/info",
          query: { token: this.token, order_id: ret.data.id }
        });
      } else {
        this.errMsgAlert(`<span class="text-danger p-2">${ret.message}</span>`);
        this.orderCreateSubmit(0);
        return;
      }
    },
    errMsgAlert(content) {
      this.errMsg = content;
      setTimeout(() => {
        this.errMsg = "";
      }, 3000);
    }
  }
};
</script>
