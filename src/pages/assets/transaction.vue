<template>
  <div class="page bg-white">
    <div class="page-top row bg-primary">
      <div class="col-2">
        <a href="javascript:history.go(-1);">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="col-8 text-center">我的账单</div>
      <div class="col-2">筛选</div>
    </div>
    <div class="row pt-2 pb-2 bg-light">
      <div class="col-3 text-truncate">
        <small class="text-muted">开始时间</small>
      </div>
      <div class="col-3">
        <input type="date" class="border-0 bg-light">
      </div>
      <div class="col-3 text-truncate">
        <small class="text-muted">截止时间</small>
      </div>
      <div class="col-3">
        <input type="date" class="border-0 bg-light">
      </div>
    </div>

    <div class="row">
      <div class="col-6 pt-2 pb-2">
        <router-link :to="{path:'/assets/detail',query: {token:token}}" class="text-dark">购买产品</router-link>
      </div>
      <div class="col-6 pt-2 pb-2 text-right">
        <router-link :to="{path:'/assets/detail',query: {token:token}}" class="text-dark">
          <strong>100000.00</strong>
        </router-link>
      </div>
      <div class="col-12">
        <small class="text-muted">2018-10-12 17:00</small>
        <hr>
      </div>
    </div>

    <div class="row">
      <div class="col-6 pt-2 pb-2">购买产品</div>
      <div class="col-6 pt-2 pb-2 text-right">
        <strong>100000.00</strong>
      </div>
      <div class="col-12">
        <small class="text-muted">2018-10-12 17:00</small>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    token() {
      return this.$route.query.token;
    }
  }
};
</script>
