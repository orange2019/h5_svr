<template>
  <div class="page">
    <div class="page-top bg-primary text-center">首页</div>
    <div class="page-sub-nav bg-white text-center border-bottom">
      <div class="btn-group" role="group" aria-label="Basic">
        <router-link
          :to="{path : '/invest' , query : {token: token}}"
          class="btn btn-outline-primary btn-sm text-primary pl-3 pr-3"
        >产品列表</router-link>
        <a href="javascript:;" class="btn btn-primary btn-sm text-white">已购买产品</a>
      </div>
    </div>

    <div class="page-invest-list">
      <div v-for="item in investUserList">
        <div class="row mt-3 bg-white pt-3 pb-3">
          <div class="col-6">{{ item.invest.name }}</div>
          <div class="col-6 text-right">每日等比收益</div>
          <div class="col-12">
            <hr>
          </div>
          <div class="col-4 text-left border-right">
            <div class>
              <span class="text-orange invest-item-rate big">{{item.rate}}</span>
              <small class="text-muted">%</small>
            </div>
            <div class="text-muted">
              <small>收益率</small>
            </div>
          </div>
          <div class="col-4 text-left text-muted border-right">
            <div class>期限：{{item.days}} 天</div>
            <div class="mt-2">通证：{{item.num / 10000}} 万</div>
          </div>
          <div class="col-4 text-center">
            <router-link
              :to="{path: '/invest/detail' , query : {uuid: item.uuid , token: token}}"
              class="btn-invest-detail"
            ></router-link>
          </div>
        </div>
        <div class="bg-light pt-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ store, route }) {
    store.dispatch("investUserListGet", { route: route });
  },
  computed: {
    investUserList() {
      return this.$store.state.investUserList;
    },
    token() {
      return this.$route.query.token;
    }
  }
};
</script>