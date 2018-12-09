<template>
  <div class="page bg-white">
    <div class="p-5 text-center">
      <span></span>
      <div v-if="errCode == -100">
        <div>
          <span class="text-danger h1">授权失败</span>
        </div>
        <div>
          <hr>
          <small class="text-muted">请返回重新登录</small>
        </div>
      </div>
      <div v-if="errCode == -101">
        <p>您的账号还未通过审核，请耐心等待！</p>
        <hr>
        <p>若还未上传实名认证资料，请到 我的 - 实名认证 中上传真实资料信息</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    errCode() {
      return this.$route.query.code;
    }
  }
};
</script>

