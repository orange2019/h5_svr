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

    <div class="bg-white">
      <div class="row pt-3 pb-3" v-if="mallUser.auth">
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
      </div>
    </div>

    <div class="mt-2 mb-2" v-if="cart.count > 0">
      <template v-for="item in cart.list">
        <div class="row bg-white">
          <div class="col-3 pt-3 pb-3" v-if="itemCheck.indexOf(item.id) > -1">
            <img :src="item.cover" alt height="60" width="100%">
          </div>
          <div class="col-7 pt-3">
            <div class="pb-3 text-truncate">
              <span>{{ item.name }}</span>
            </div>
            <div class>
              <span class="text-danger">{{ item.price }}</span>
              <small class="text-muted">x {{ item.count}}</small>
            </div>
          </div>
        </div>
      </template>

      <div class="row bg-white pt-3 pb-3 border-top">
        <div class="col-6">运费</div>
        <div class="col-6 text-right text-danger">{{ itemCheckTotalLogistics }}</div>
      </div>

      <div class="row bg-white pt-3 pb-3 border-top">
        <div class="col-6">总计</div>
        <div class="col-6 text-right "><strong>{{ itemCheckTotal + itemCheckTotalLogistics }}</strong></div>
      </div>

      <div class="row mt-2 bg-white pt-3 pb-3">
        <div class="col-2">备注</div>
        <div class="col-10 text-right">
          <span class="text-muted">
            <textarea cols="3" class="form-control bg-light" v-model="orderRemark"></textarea>
          </span>
        </div>
      </div>
    </div>

    <div class="p-3">
      <a
        href="javascript:;"
        class="btn btn-primary btn-block btn-lg btn-radius-big"
        @click="orderCreate"
      >{{ submitCreateOrder.text }}</a>
    </div>

    <div class="text-center col-12 mt-2" v-html="errMsg"></div>

    <div class="p-5"></div>
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
    },
    itemCheckTotalLogistics() {
      return this.$store.state.cartCheck.itemCheckTotalLogistics;
    },
  },
  data() {
    return {
      errMsg: "",
      submitCreateOrder: {
        text: "确认",
        isSubmit: 0
      },
      chooseAddressStyle: {
        display: "none"
      },
      orderRemark: ""
    };
  },
  methods: {
    checkItemAll() {
      this.errMsg = "";

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

    orderCreateSubmit(type = 1) {
      if (type == 1) {
        this.submitCreateOrder.isSubmit = 1;
        this.submitCreateOrder.text = "提交...";
      } else {
        this.submitCreateOrder.isSubmit = 0;
        this.submitCreateOrder.text = "结算";
      }
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
      body.remark = this.orderRemark;
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

