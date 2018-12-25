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
        <router-link to="/mall/cart" class="pr-3 d-block">
          <i class="fas fa-shopping-cart text-white"></i>
        </router-link>
      </div>
    </div>

    <div class>
      <div class="goods-info-imgs bg-light">
        <img src alt width="100%" height="248" class="d-block">
        <div class="text-right imgs-count">
          <small class="bg-secondary text-white">1/5</small>
        </div>
      </div>
    </div>

    <div class="bg-light">
      <div class="mt-2">
        <div class="row bg-white pt-3 pb-3">
          <div class="col-12">
            <div class>产品标题产品标题产品标题产品标题产品标题产品标题产品标题产品标题产品标题产品标题</div>
            <div class="text-danger mt-2">2000.00</div>
          </div>
        </div>
      </div>

      <div class="mt-2">
        <div class="row pt-3">
          <div class="col-1 pr-0">
            <small class="text-muted">
              <i class="fas fa-map-marker-alt"></i>
            </small>
          </div>
          <div class="col-9">
            <span class>姓名 130000000000</span>
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

          <div :class="infoTab[0]">产品详情。。。</div>

          <div :class="infoTab[1]">规格参数。。。</div>

          <div :class="infoTab[2]">售后保障。。。</div>
        </div>
      </div>
    </div>

    <div class="p-5"></div>

    <div class="position-fixed fixed-bottom w-100">
      <div class="row">
        <div
          class="col-6 pl-0 pr-0 pt-3 pb-3 bg-warning text-white text-center"
          @click="cartAdd"
        >加入购物车</div>
        <div
          class="col-6 pl-0 pr-0 pt-3 pb-3 bg-danger text-white text-center"
          @click="goToBuy"
        >立即购买</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoTab: [{ "d-none": false }, { "d-none": true }, { "d-none": true }],
      infoTabBtn: [{ active: true }, { active: false }, { active: false }]
    };
  },
  methods: {
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
    }
  }
};
</script>
