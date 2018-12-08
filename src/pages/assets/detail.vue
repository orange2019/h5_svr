<template>
  <div class="page bg-white">
    <div class="page-top row bg-primary">
      <div class="col-2">
        <a href="javascript:history.go(-1);">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="col-8 text-center">账单详情</div>
    </div>

    <div class="text-center mt-5">
      <div class>图标</div>
      <div class="mt-2">购买产品</div>
      <div class="mt-2">
        <strong class="h4">100000</strong>
      </div>
      <div class="p-3">
        <hr>
      </div>
    </div>

    <div class="row">
      <div class="col-4">当前状态</div>
      <div class="col-8">完成</div>
    </div>

    <div class="row mt-3">
      <div class="col-4">交易时间</div>
      <div class="col-8">2018-10-11 12:11</div>
    </div>

    <div class="row mt-3">
      <div class="col-4">交易单号</div>
      <div class="col-8">2018-10-11 12:11</div>
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
