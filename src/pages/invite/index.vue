<template>
  <div class="page bg-primary">
    <div class="page-top page-new-list-top row bg-primary">
      <div class="col-2 pl-0">
        <!-- <a href="javascript:close();" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>-->
      </div>
      <div class="text-center col-8">我的邀请</div>
    </div>

    <div class="text-center text-white mt-3">
      <div class="h1">邀请好友</div>
      <div class="h1">&nbsp;&nbsp;送健康</div>
      <div class>谱写生命永恒的美丽</div>
    </div>

    <div class="p-3 mt-3" v-if="inviteInfo">
      <div class="bg-white rounded p-3">
        <div>{{ inviteInfo.user_name }}</div>

        <div class></div>

        <div class="text-center">
          <small class="text-muted">邀请码</small>
          <div class="h1 mt-3">{{ inviteInfo.invite_code }}</div>
        </div>

        <div class="text-center mt-5">
          <a
            href
            class="btn btn-primary btn-lg btn-block btn-radius-big"
            :href="inviteInfo.down_url"
          >下载地址</a>
          <hr>
          <small>下载app,注册用户，输入邀请码</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ store, route }) {
    store.dispatch("inviteInfoGet", { route: route });
  },
  computed: {
    inviteInfo() {
      return this.$store.state.inviteInfo;
    },
    token() {
      return this.$route.query.token;
    }
  }
};
</script>
