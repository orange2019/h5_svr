<template>
  <div class="page bg-light">
    <div class="page-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1)" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="text-center col-8">地址管理</div>
    </div>

    <div class="row mb-2 pt-3 pb-3 bg-white" @click="goToUpdateAddress">
      <div class="col-1 pr-0 pt-2">
        <input type="radio">
      </div>
      <div class="col-10">
        <div>
          <span>姓名</span>
          <span>手机号</span>
        </div>
        <div class="mt-1">
          <small class="text-muted">地址详细地址详细地址详细地址详细地址详细</small>
        </div>
      </div>
      <div class="col-1 pl-0 pt-2 text-muted">
        <i class="fas fa-chevron-right"></i>
      </div>
    </div>

    <div class="position-fixed fixed-bottom p-3">
      <router-link
        to="/user/address/update"
        class="btn btn-primary btn-lg btn-block btn-radius-big"
      >+ 新增地址</router-link>
    </div>
    <div class="p-5"></div>
  </div>
</template>

<script>
export default {
  methods: {
    goToUpdateAddress() {
      this.$router.push({
        path: "/user/address/update"
      });
    }
  }
};
</script>

