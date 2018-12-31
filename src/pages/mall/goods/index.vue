<template>
  <div class="page">
    <div class="page-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1)" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="text-center col-8">商品详情</div>
      <div class="col-2 text-right pr-0">
        <router-link :to="{path: '/mall/cart' ,query: {token: token}}" class="pr-3 d-block">
          <i class="fas fa-shopping-cart text-white"></i>
        </router-link>
      </div>
    </div>

    <v-touch @swipeleft="onSwipeLeft" @swiperight="onSwipeRight">
      <div class v-if="goodsBanners.list.length > 0">
        <div class="goods-info-imgs bg-light">
          <img :src="goodsBanners.list[0]" alt width="100%" height="248" class="d-block">
          <div class="text-right imgs-count">
            <small
              class="bg-secondary text-white"
            >{{goodsBanners.current + 1}}/{{goodsBanners.list.length}}</small>
          </div>
        </div>
      </div>
    </v-touch>

    <div class="bg-light">
      <div class="mt-2">
        <div class="row bg-white pt-3 pb-3">
          <div class="col-12">
            <div class>{{goodsInfo.name}}</div>
            <div class="text-muted">
              <small>{{ goodsInfo.description }}</small>
            </div>
            <div class="text-danger mt-2">{{ goodsInfo.price}}</div>
          </div>
        </div>
      </div>

      <div class="bg-white mt-2">
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

      <div class="mt-2">
        <div class="bg-white">
          <div class="row">
            <div class="col-4 text-center" @click="goodsInfoClickTab(0)">
              <span class="pt-2 pb-2 d-inline-block goods-info-tab-btn" :class="infoTabBtn[0]">产品详情</span>
            </div>
            <div class="col-4 text-center" @click="goodsInfoClickTab(1)">
              <span class="pt-2 pb-2 d-inline-block goods-info-tab-btn" :class="infoTabBtn[1]">规格参数</span>
            </div>
            <div class="col-4 text-center" @click="goodsInfoClickTab(2)">
              <span class="pt-2 pb-2 d-inline-block goods-info-tab-btn" :class="infoTabBtn[2]">售后保障</span>
            </div>
          </div>

          <div :class="infoTab[0]" class="p-3">{{ goodsInfo.info }}</div>

          <div :class="infoTab[1]" class="p-3"></div>

          <div :class="infoTab[2]" class="p-3"></div>
        </div>
      </div>
    </div>

    <div class="p-5"></div>

    <div class="position-fixed fixed-bottom w-100">
      <div class="row">
        <div
          class="col-6 pl-0 pr-0 pt-3 pb-3 bg-warning text-white text-center"
          @click="goCartAdd(goodsInfo)"
        >加入购物车</div>
        <div
          class="col-6 pl-0 pr-0 pt-3 pb-3 bg-danger text-white text-center"
          @click="goToBuy(goodsInfo)"
        >立即购买</div>
      </div>
    </div>

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
import Request from "./../../../api/common/request.js";
import ArrUtils from "./../../../utils/arr.js";
export default {
  asyncData({ store, route }) {
    store.dispatch("mallGoodsInfoGet", { route }).then(ret => {
      console.log("mallGoodsInfoGet", ret);
      store.state.goodsBanners.list = store.state.goods.info.pics || [];
    });
    store.dispatch("mallUserGet", { route }).then(ret => {
      // if (ret.code != 0) {
      //   window.android.goToLogin();
      // }
      if (store.state.mallUser.auth) {
        store.dispatch("mallUserGetAddress", { route });
      }
    });
  },
  data() {
    return {
      infoTab: [{ "d-none": false }, { "d-none": true }, { "d-none": true }],
      infoTabBtn: [{ active: true }, { active: false }, { active: false }],
      buyType: 0, // 0加入购物车，1立即购买
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
  computed: {
    goodsInfo() {
      return this.$store.state.goods.info;
    },
    mallUser() {
      return this.$store.state.mallUser;
    },
    address() {
      return this.$store.state.address;
    },
    token() {
      return this.$route.query.token;
    },
    cart() {
      return this.$store.state.cart;
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
    goodsBanners() {
      return this.$store.state.goodsBanners;
    },
    swipeAutoGoodsBanner() {
      return this.$store.state.swipeAutoGoodsBanner;
    }
  },
  created() {
    if (!this.swipeAutoGoodsBanner) {
      let swipeAuto = () => {
        this.onSwipeRight();
        setTimeout(() => {
          swipeAuto();
        }, 5000);
      };
      this.$store.state.swipeAutoGoodsBanner = true;
      swipeAuto();
    }
  },
  methods: {
    itemCheckTotalGet() {
      let total = 0;
      this.cart.list.forEach(item => {
        if (this.$store.state.cartCheck.itemCheck.indexOf(item.id) > -1) {
          total += parseInt(item.price * 100 * item.count);
        }
      });
      this.$store.state.cartCheck.itemCheckTotal = total / 100;
    },
    goodsInfoClickTab(i = 0) {
      this.infoTab.forEach((item, index) => {
        if (index == i) {
          item["d-none"] = false;
        } else {
          item["d-none"] = true;
        }
      });

      this.infoTabBtn.forEach((item, index) => {
        if (index == i) {
          item["active"] = true;
        } else {
          item["active"] = false;
        }
      });
    },
    goToBuy(item) {
      // 加入购物车
      this.buyType = 1;
      this.cartAdd(item);
    },
    goCartAdd(item) {
      this.buyType = 1;
      this.cartAdd(item);
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

        if (this.cartItem.stock == 0) {
          this.cartItemCount = 0;
        }
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
        this.cartItemCount--;
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
          if (this.buyType == 0) {
            this.$router.push({
              path: "/mall/cart?token=" + this.$route.query.token
            });
          } else {
            this.cart.list.forEach(item => {
              if (this.$store.state.cartCheck.itemCheck.indexOf(item.id) < -0) {
                this.$store.state.cartCheck.itemCheck.push(item.id);
              }
            });
            this.itemCheckTotalGet();

            this.$router.push({
              path: "/mall/cart/confirm?token=" + this.$route.query.token
            });
          }
        }
      }
    },
    onSwipeLeft() {
      console.log("onSwipeLeft ...");
      let list = this.$store.state.goodsBanners.list || [];
      let newList = ArrUtils.moveLeft(list);

      this.$store.state.goodsBanners.current--;
      if (this.$store.state.goodsBanners.current < 0) {
        this.$store.state.goodsBanners.current =
          this.$store.state.goodsBanners.list.length - 1;
      }
      console.log("onSwipeRight onSwipeLeft", newList);
      this.$store.state.goodsBanners.list = newList;
    },
    onSwipeRight() {
      console.log("onSwipeRight ...");

      let list = this.$store.state.goodsBanners.list;

      let newList = ArrUtils.moveRight(list);
      this.$store.state.goodsBanners.current++;
      if (
        this.$store.state.goodsBanners.current >
        this.$store.state.goodsBanners.list.length - 1
      ) {
        this.$store.state.goodsBanners.current = 0;
      }

      console.log("onSwipeRight onSwipeRight", newList);
      this.$store.state.goodsBanners.list = newList;
    }
  }
};
</script>
