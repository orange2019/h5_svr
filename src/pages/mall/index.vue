<template>
  <div class="page">
    <div class="page-top row bg-primary">
      <div class="col-1"></div>
      <div class="col-10">
        <div class="top-search">
          <input type="text" class="form-control mt-1 text-muted" placeholder="请输入搜索关键字">
          <div class="icon text-muted">
            <i class="fas fa-search"></i>
          </div>
        </div>
      </div>
      <div class="col-1">
        <span></span>
      </div>
    </div>

    <div class="banner bg-light">
      <img src alt width="100%" height="200">
    </div>

    <div class="bg-light" v-for="item in goods.list">
      <div class="pt-2">
        <div class="bg-white" @click="goToGoodsInfo">
          <img :src="item.cover" alt width="100%" height="180">
        </div>

        <div class="row bg-white pt-3" @click="goToGoodsInfo">
          <div class="col-8 text-truncate">
            <span>{{ item.name }}</span>
          </div>
          <div class="col-4 text-right">
            <span class="text-danger">{{ item.price }}</span>
          </div>
        </div>

        <div class="row bg-white pt-3 pb-3">
          <div class="col-8 text-truncate" @click="goToGoodsInfo">
            <small class="text-muted">{{ item.description }}</small>
          </div>
          <div class="col-4 text-right" @click="cartAdd(item)">
            <a href="javascript:;" class="btn btn-sm btn-outline-warning btn-buy">立即购买</a>
          </div>
        </div>
      </div>
    </div>

    <div class="p-5"></div>

    <div
      class="position-fixed fixed-top w-100 h-100 bg-dark"
      :class="addCartClass"
      style="opacity:0.6"
      @click="cartAddClose"
    ></div>
    <div
      class="position-fixed fixed-bottom w-100 bg-white pb-3 border-top pt-2"
      :class="addCartClass"
    >
      <div class="text-right">
        <a href="javascript:;" @click="cartAddClose" class="p-2">
          <i class="far fa-times-circle"></i>
        </a>
      </div>

      <div class="row">
        <div class="col-3 pr-0">
          <img :src="cartItem.cover" alt width="100%" height="100">
        </div>
        <div class="col-9 pt-1">
          <div class>{{cartItem.name}}</div>
          <div class="pt-3 text-danger">{{ cartItem.price }}</div>
        </div>
        <div class="col-12">
          <div class="border-bottom pb-3"></div>
        </div>
      </div>

      <!-- <div class="row pt-3" v-if="mallUser.auth">
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
        <div class="col-2 pr-0 text-right">
          <router-link
            :to="{ path :'/user/address' , query: {token: token}}"
            class="pr-3 d-block text-muted"
          >
            <i class="fas fa-chevron-right"></i>
          </router-link>
        </div>

        <div class="col-12">
          <div class="border-bottom pb-3"></div>
        </div>
      </div>-->
      <div class="row pt-3">
        <div class="col-6 text-muted">购买数量</div>
        <div class="col-6 text-right">
          <span class="text-muted p-2" @click="cartItemMinus">
            <i class="fas fa-minus"></i>
          </span>
          <span class="bg-light d-inline-block" style="min-width:3rem;">{{cartItemCount}}</span>
          <span class="p-2" @click="cartItemPlus">
            <i class="fas fa-plus"></i>
          </span>
        </div>
        <div class="col-12">
          <div class="border-bottom pb-3"></div>
        </div>
        <div class="text-danger text-center col-12 mt-3">{{addCartMsg}}</div>
      </div>

      <div class="row mt-5 pb-5">
        <div class="col-12">
          <a
            href="javascript:;"
            class="btn btn-lg btn-primary btn-block btn-radius-big"
            @click="addCartConfim"
          >确定</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Request from "./../../api/common/request.js";

export default {
  asyncData({ store, route }) {
    let goodsList = store.state.goods.list;
    let offset = store.state.goods.offset;
    if (offset == 0 && goodsList.length == 0) {
      store.dispatch("mallGoodsListGet", { route: route, body: {} });
    }

    store.dispatch("mallUserGet", { route });
  },
  computed: {
    token() {
      return this.$route.query.token;
    },
    goods() {
      return this.$store.state.goods;
    },
    mallUser() {
      return this.$store.state.mallUser;
    }
  },
  data() {
    return {
      addCartClass: { "d-none": true },
      addCartMsg: "",
      cartItem: {
        id: 0,
        name: "",
        cover: "",
        price: "",
        count: 1,
        stock: 0
      },
      cartItemCount: 1,
      cartItemStock: 0
    };
  },
  methods: {
    goToGoodsInfo() {
      this.$router.push({
        path: "/mall/goods"
      });
    },
    async cartAdd(item) {
      // 判断是否登录
      // if (!this.$store.state.mallUser.auth) {
      //   window.android.goToLogin();
      //   return;
      // }

      this.addCartMsg = "";
      console.log(item);
      this.addCartClass["d-none"] = false;
      this.cartItem.id = item.id;
      this.cartItem.name = item.name;
      this.cartItem.cover = item.cover;
      this.cartItem.price = item.price;
      this.cartItem.stock = item.stock;
      this.cartItemStock = item.stock;

      // this.cartItemCount = item.count || 1;

      let userScore = this.$store.state.mallUser.info.score || 0;
      console.log("user score ", userScore);

      if (userScore < this.cartItemCount * this.cartItem.price) {
        this.cartItemCount = 0;
      } else {
        let cartItem = await Request.get("/cart/item", { id: item.id });
        console.log("request from cart", cartItem);
        let cartItemCount = cartItem.item ? cartItem.item.count : 0;

        this.cartItemCount = cartItemCount || 1;
      }
    },
    cartAddClose() {
      this.addCartClass["d-none"] = true;
    },
    cartItemMinus() {
      this.addCartMsg = "";
      this.cartItemCount--;
      if (this.cartItemCount <= 0) {
        this.cartItemCount = 0;
      }
    },
    cartItemPlus() {
      this.addCartMsg = "";
      // let userScore = this.$store.state.mallUser.info.score || 0;
      // if (userScore < (this.cartItemCount + 1) * this.cartItem.price) {
      //   this.addCartMsg = "积分余额不足";
      //   return;
      // }

      this.cartItemCount++;
      if (this.cartItemStock != -1 && this.cartItemCount > this.cartItemStock) {
        this.addCartMsg = "库存不足";
        this.cartItemCount = this.cartItemStock;
      }
    },
    goToCart() {
      this.$router.push({ path: "/mall/cart" });
    },
    async addCartConfim() {
      let cartItem = this.cartItem;
      console.log("addCartConfim cart item ", cartItem);
      let cartItemCount = this.cartItemCount;

      if (cartItemCount) {
        let ret = await Request.post("/cart/add", {
          item: cartItem,
          count: cartItemCount
        });

        if (ret.code == 0) {
          this.$router.push({
            path: "/mall/cart?token=" + this.$route.query.token
          });
        }
      }
    }
  }
};
</script>
