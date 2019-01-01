<template>
  <div class="page bg-light">
    <div class="page-top row bg-primary">
      <div class="col-1"></div>
      <div class="col-10 text-center">账户体系</div>
      <div class="col-1">
        <span></span>
      </div>
    </div>

    <div class="bg-primary p-3">
      <div class="bg-white p-3 mt-3">
        <div class="row">
          <div class="col-3 pt-3 pl-0 pr-0">
            <img
              :src="mallUser.info.avatar"
              alt
              width="100%"
              class="rounded-circle"
              v-if="mallUser.info.avatar"
            >
            <img src="./../../images/avatar.png" alt width="100%" class="rounded-circle" v-else>
          </div>
          <div class="col-9 pt-3">
            <div class="h5">{{ mallUser.info.realname || '未设置' }}</div>
            <div class="mt-2">
              <router-link
                :to="{path: '/resetMobile' , query: {token: token}}"
              >{{ mallUser.info.mobile }}</router-link>
            </div>
            <div class="mt-1 text-muted">积分余额: {{ mallUser.info.score }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-3">
      <div class="bg-white p-3" @click="goTo('/mall/order')">
        <div class="row">
          <div class="col-3">
            <span class="assets-icon order"></span>
          </div>
          <div class="col-7 pt-3">订单管理</div>
          <div class="col-2 pt-3 text-right">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>

      <div class="bg-white p-3 mt-3" @click="goTo('/user/address')">
        <div class="row">
          <div class="col-3">
            <span class="assets-icon address"></span>
          </div>
          <div class="col-7 pt-3">地址管理</div>
          <div class="col-2 pt-3 text-right">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>

      <div class="bg-white p-3 mt-3" @click="goTo('/assets/score')">
        <div class="row">
          <div class="col-3">
            <span class="assets-icon transfer"></span>
          </div>
          <div class="col-7 pt-3">积分兑换</div>
          <div class="col-2 pt-3 text-right">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>

      <div class="bg-white p-3 mt-3" @click="goTo('/resetPwd')">
        <div class="row">
          <div class="col-3">
            <span class="assets-icon tradepwd"></span>
          </div>
          <div class="col-7 pt-3">修改登录密码</div>
          <div class="col-2 text-right pt-3">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>

      <div class="bg-white p-3 mt-3" @click="goTo('/resetTradePwd')">
        <div class="row">
          <div class="col-3">
            <span class="assets-icon pwd"></span>
          </div>
          <div class="col-7 pt-3">修改交易密码</div>
          <div class="col-2 text-right pt-3">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>

      <div class="bg-white p-3 mt-3" @click="goToLogout">
        <div class="row">
          <div class="col-3">
            <span class="assets-icon logout"></span>
          </div>
          <div class="col-7 pt-3">退出</div>
          <div class="col-2 text-right pt-3">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="p-5"></div>
  </div>
</template>

<script>
export default {
  asyncData({ store, route }) {
    store.dispatch("mallUserGet", { route }).then(ret => {
      if (ret.code != 0) {
        window.android.goToLogin();
      }
    });
  },
  computed: {
    token() {
      return this.$route.query.token;
    },
    mallUser() {
      return this.$store.state.mallUser;
    }
  },
  methods: {
    goTo(path) {
      this.$router.push({ path: path, query: { token: this.token } });
    },
    goToLogout() {
      window.android.logout();
    }
  }
};
</script>
