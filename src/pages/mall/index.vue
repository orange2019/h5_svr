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

    <div class="bg-light">
      <div class="pt-2">
        <div class="bg-white" @click="goToGoodsInfo">
          <img src alt width="100%" height="180">
        </div>

        <div class="row bg-white pt-3" @click="goToGoodsInfo">
          <div class="col-8 text-truncate">
            <span>产品标题产品标题产品标题产品标题产品标题产品标题</span>
          </div>
          <div class="col-4 text-right">
            <span class="text-danger">200.00</span>
          </div>
        </div>

        <div class="row bg-white pt-3 pb-3">
          <div class="col-8 text-truncate" @click="goToGoodsInfo">
            <small class="text-muted">简单秒速简单秒速简单秒速简单秒速简单秒速简单秒速简单秒速简单秒速简单秒速简单秒速</small>
          </div>
          <div class="col-4 text-right" @click="cartAdd">
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
          <img src alt width="100%" height="100">
        </div>
        <div class="col-9 pt-1">
          <div class>产品标题产品标题产品标题产品标题产品标题产品标题</div>
          <div class="pt-3 text-danger">200.00</div>
        </div>
        <div class="col-12">
          <div class="border-bottom pb-3"></div>
        </div>
      </div>

      <div class="row pt-3">
        <div class="col-1 pr-0">
          <small class="text-muted">
            <i class="fas fa-map-marker-alt"></i>
          </small>
        </div>
        <div class="col-9">
          <span class="ml-2">姓名 130000000000</span>
          <div class="text-truncate">
            <small>广东省深圳市南山区</small>
          </div>
        </div>
        <div class="col-2 pr-0 text-right">
          <router-link to="/user/address" class="pr-3 d-block text-muted">
            <i class="fas fa-chevron-right"></i>
          </router-link>
        </div>

        <div class="col-12">
          <div class="border-bottom pb-3"></div>
        </div>
      </div>

      <div class="row pt-3">
        <div class="col-6 text-muted">购买数量</div>
        <div class="col-6 text-right"></div>
        <div class="col-12">
          <div class="border-bottom pb-3"></div>
        </div>
      </div>

      <div class="row mt-5 pb-5">
        <div class="col-12">
          <a
            href="javascript:;"
            class="btn btn-lg btn-primary btn-block btn-radius-big"
            @click="goToCart"
          >确定</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addCartClass: { "d-none": true }
    };
  },
  methods: {
    goToGoodsInfo() {
      this.$router.push({
        path: "/mall/goods"
      });
    },
    cartAdd() {
      this.addCartClass["d-none"] = false;
    },
    cartAddClose() {
      this.addCartClass["d-none"] = true;
    },
    goToCart() {
      this.$router.push({ path: "/mall/cart" });
    }
  }
};
</script>
