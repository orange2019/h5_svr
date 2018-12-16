<template>
  <div class="page bg-white">
    <div class="page-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1);" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="col-8 text-center">提币</div>
      <div class="col-2"></div>
    </div>

    <div class="mt-5 text-center">
      <small class="text-muted">最大可提取数量</small>
      <div class="mt-3 p-3">
        <span class="h3">{{ userAssets.token_balance }}</span>
      </div>

      <div class="text-muted mt-5 p-3">
        <hr>
        <small class="text-muted">请上交易所进行提现操作</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    token() {
      return this.$route.query.token;
    },
    userAssets() {
      return this.$store.state.userAssets;
    }
  }
};
</script>

