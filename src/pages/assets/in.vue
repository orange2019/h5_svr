<template>
  <div class="page bg-white">
    <div class="page-top row bg-primary">
      <div class="col-2">
        <a href="javascript:history.go(-1);">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="col-8 text-center">充值</div>
      <div class="col-2"></div>
    </div>

    <div class="mt-5 text-center">
      <small class="text-muted">钱包地址</small>
      <div class="mt-3">
        <small>{{ userAssets.address }}</small>
      </div>

      <div class="text-muted mt-5 p-3">
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
    },
    userAssets() {
      return this.$store.state.userAssets;
    }
  }
};
</script>

