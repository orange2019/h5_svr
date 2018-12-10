<template>
  <div class="page">
    <div class="page-top bg-primary text-center">首页</div>
    <div class="page-sub-nav bg-white text-center border-bottom">
      <div class="btn-group" role="group" aria-label="Basic">
        <a href="javascript:;" class="btn btn-primary btn-sm pl-3 pr-3 text-white">产品列表</a>
        <router-link
          :to="{path: '/invest/list' , query: {token: token}}"
          class="btn btn-outline-primary btn-sm text-primary"
        >已购买产品</router-link>
      </div>
    </div>

    <div class="page-invest-list">
      <div v-for="item in investList">
        <div class="row mt-3 bg-white pt-3 pb-3">
          <div class="col-6">{{ item.name }}</div>
          <div class="col-6 text-right">每日等比收益</div>
          <div class="col-12">
            <hr>
          </div>
          <div class="col-3 text-left">
            <div class>
              <span class="text-orange invest-item-rate">{{ item.rate }}</span>
              <small class="text-muted">%</small>
            </div>
            <div class="text-muted">
              <small>收益率</small>
            </div>
          </div>
          <div class="col-3 text-center">
            <div class>
              <span>{{ item.days }}</span>
              <small class="text-muted">天</small>
            </div>
            <div class="text-muted">
              <small>期限</small>
            </div>
          </div>
          <div class="col-3 text-center">
            <div class>
              <span>{{ item.num / 10000 }}</span>
              <small class="text-muted">万</small>
            </div>
            <div class="text-muted">
              <small>投入卡路里</small>
            </div>
          </div>
          <div class="col-3 text-right">
            <router-link
              :to="{path:'/invest/apply' , query: {invest_id : item.id , token : token}}"
              class="btn-invest-action"
            >&nbsp;</router-link>
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
    store.dispatch("investListGet", { route: route });
  },
  computed: {
    investList() {
      return this.$store.state.investList;
    },
    token() {
      return this.$route.query.token;
    }
  }
};
</script>
