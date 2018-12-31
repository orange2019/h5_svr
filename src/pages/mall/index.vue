<template>
  <div class="page">
    <div class="page-top row bg-primary">
      <div class="col-1 pl-0 pr-0 text-right">
        <a href="javascript:;" @click="categoryShow">
          <i class="fas fa-list-ul text-white pl-3"></i>
        </a>
      </div>
      <div class="col-10">
        <div class="top-search">
          <input
            type="text"
            class="form-control mt-1 text-muted"
            placeholder="请输入搜索关键字"
            @keydown="searchGoods"
            v-model="keyword"
          >
          <div class="icon text-muted">
            <i class="fas fa-search"></i>
          </div>
        </div>
      </div>
      <div class="col-1 pl-0 pr-0 text-left">
        <router-link :to="{path: '/mall/cart' ,query: {token: token}}" class="pr-3 d-block">
          <i class="fas fa-shopping-cart text-white"></i>
        </router-link>
      </div>
    </div>

    <div class="position-fixed fixed-top bg-white" :style="categoryStyle">
      <div class="row">
        <div class="col-2 text-center pt-3 pb-3" @click="chooseCategory(0)">
          <span v-if="!category" class="text-primary">全部</span>
          <span v-else>全部</span>
        </div>
        <template v-for="(item,i) in categorys">
          <div
            class="col-2 text-center pt-3 pb-3 pl-0 pr-0 text-truncate"
            v-if="i < 4"
            @click="chooseCategory(item.id)"
          >
            <span v-if="category == item.id" class="text-primary">{{ item.name }}</span>
            <span v-else>{{ item.name }}</span>
          </div>
          <div class="col-2 text-center pt-3 pb-3" v-if="i == 4" @click="categoryShowMore">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </template>
      </div>
      <div class :style="categoryMoreStyle">
        <template v-for="(item,i) in categorys">
          <div class="pt-2 pb-2 text-center" v-if="i >= 4" @click="chooseCategory(item.id)">
            <span v-if="category == item.id" class="text-primary">{{ item.name }}</span>
            <span v-else>{{ item.name }}</span>
          </div>
        </template>
      </div>
    </div>

    <v-touch @swipeleft="onSwipeLeft" @swiperight="onSwipeRight">
      <div class="banner bg-light">
        <div v-if="mallBanners.list.length > 0">
          <img :src="mallBanners.list[0].photo" alt width="100%" height="200">
        </div>
        <div class="text-center position-relative" style="top:-2rem;line-height:2rem;">
          <span class="ml-1" v-for="(item,i) in mallBanners.list">
            <small class="fas fa-circle text-primary" v-if="mallBanners.current == i"></small>
            <small class="fas fa-circle text-muted" v-else></small>
          </span>
        </div>
      </div>
    </v-touch>

    <div class="bg-light" v-for="item in goods.list">
      <div class="pt-2">
        <div class="bg-white" @click="goToGoodsInfo(item)">
          <img :src="item.cover" alt width="100%" height="180">
        </div>

        <div class="row bg-white pt-3" @click="goToGoodsInfo(item)">
          <div class="col-8 text-truncate">
            <span>{{ item.name }}</span>
          </div>
          <div class="col-4 text-right">
            <span class="text-danger">{{ item.price }}</span>
          </div>
        </div>

        <div class="row bg-white pt-3 pb-3">
          <div class="col-8 text-truncate" @click="goToGoodsInfo(item)">
            <small class="text-muted">{{ item.description }}</small>
          </div>
          <div class="col-4 text-right" @click="cartAdd(item)">
            <a href="javascript:;" class="btn btn-sm btn-outline-warning btn-buy">立即购买</a>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-3 text-center">
      <a href="javascript:;" v-html="listMore" @click="getMore"></a>
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
import ArrUtils from "./../../utils/arr.js";
export default {
  asyncData({ store, route }) {
    let goodsList = store.state.goods.list;
    let offset = store.state.goods.offset;
    if (offset == 0 && goodsList.length == 0) {
      store
        .dispatch("mallGoodsListGet", { route: route, body: {} })
        .then(ret => {
          console.log(ret.data.count);
          if (ret.data.count > store.state.goods.limit) {
            this.listMore = "更多...";
          } else {
            this.listMore = "";
          }
        });
    }

    if (!store.state.mallCategory.length) {
      store.dispatch("mallCategoryGet");
    }

    if (store.state.mallBanners.list.length == 0) {
      store.dispatch("mallBannersGet");
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
    },
    categorys() {
      return this.$store.state.mallCategory;
    },
    keywordQuery() {
      return this.$route.query.keyword;
    },
    category() {
      return this.$route.query.c_id;
    },
    mallBanners() {
      return this.$store.state.mallBanners;
    },
    swipeAutoBanner() {
      return this.$store.state.swipeAutoBanner;
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
      cartItemStock: 0,
      categoryStyle: {
        top: "50px",
        display: "none"
      },
      categoryMoreStyle: {
        display: "none"
      },
      keyword: "",
      listMore: "更多..."
    };
  },
  created() {
    console.log(
      "created this.$store.state.mallBanners.list",
      this.$store.state.mallBanners.list
    );

    if (!this.swipeAutoBanner) {
      let swipeAuto = () => {
        this.onSwipeRight();
        setTimeout(() => {
          swipeAuto();
        }, 5000);
      };
      this.$store.state.swipeAutoBanner = true;
      swipeAuto();
    }
  },
  methods: {
    getMore() {
      this.$store
        .dispatch("mallGoodsListGet", {
          route: this.$route,
          body: {}
        })
        .then(ret => {
          console.log(ret);
          if (ret.data.list.length == 0) {
            this.listMore = `<span class='text-muted'>无更多</span>`;
            setTimeout(() => {
              this.listMore = "";
            }, 2000);
          }
        });
    },
    searchGoods() {
      this.$router.push({
        path: "/mall",
        query: {
          token: this.token,
          keyword: keyword
        }
      });

      this.$store.state.goods.list = [];
      this.$store.state.goods.offset = 0;
      this.$store
        .dispatch("mallGoodsListGet", {
          route: this.$route,
          body: {}
        })
        .then(ret => {
          if (ret.data.count > this.$store.state.goods.limit) {
            this.listMore = "更多...";
          } else {
            this.listMore = "";
          }
        });
    },
    chooseCategory(category) {
      console.log(category);
      this.$router.push({
        path: "/mall",
        query: { c_id: category, token: this.$route.query.token }
      });

      // let query = this.$route.query;
      // query.category = category;
      console.log(this.$route.query);
      this.$store.state.goods.list = [];
      this.$store.state.goods.offset = 0;
      this.$store
        .dispatch("mallGoodsListGet", {
          route: this.$route,
          body: {}
        })
        .then(ret => {
          if (ret.data.count > this.$store.state.goods.limit) {
            this.listMore = "更多...";
          } else {
            this.listMore = "";
          }
        });
    },
    categoryShow() {
      console.log("this.categoryStyle.display", this.categoryStyle.display);
      if (this.categoryStyle.display == "none") {
        this.categoryStyle.display = "block";
      } else {
        this.categoryStyle.display = "none";
      }
    },
    categoryShowMore() {
      if (this.categoryMoreStyle.display == "none") {
        this.categoryMoreStyle.display = "block";
      } else {
        this.categoryMoreStyle.display = "none";
      }
    },
    goToGoodsInfo(item) {
      this.$router.push({
        path: "/mall/goods",
        query: {
          token: this.token,
          id: item.id
        }
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
          this.$router.push({
            path: "/mall/cart?token=" + this.$route.query.token
          });
        }
      }
    },

    onSwipeLeft() {
      console.log("onSwipeLeft ...");
      let list = this.$store.state.mallBanners.list;
      let newList = ArrUtils.moveLeft(list);

      this.$store.state.mallBanners.current--;
      if (this.$store.state.mallBanners.current < 0) {
        this.$store.state.mallBanners.current =
          this.$store.state.mallBanners.list.length - 1;
      }
      console.log("onSwipeRight onSwipeLeft", newList);
      this.$store.state.mallBanners.list = newList;
    },
    onSwipeRight() {
      console.log("onSwipeRight ...");

      let list = this.$store.state.mallBanners.list;

      let newList = ArrUtils.moveRight(list);
      this.$store.state.mallBanners.current++;
      if (
        this.$store.state.mallBanners.current >
        this.$store.state.mallBanners.list.length - 1
      ) {
        this.$store.state.mallBanners.current = 0;
      }

      console.log("onSwipeRight onSwipeRight", newList);
      this.$store.state.mallBanners.list = newList;
    }
  }
};
</script>
