<template>
  <div class="page bg-primary">
    <div class="page-top row">
      <div class="col-12 text-center h3 mt-3">资产</div>
    </div>

    <div class="invest-detail-title row bg-white m-3 mt-5 pt-3 pb-3 rounded shadow-sm text-center">
      <div class="col-12 text-center">
        <span class="text-muted">总资产</span>
        <div class="h4 text-primary mt-2">68888888</div>
      </div>
      <div class="col-12 h1 text-primary">
        <hr>
      </div>

      <div class="col-4 border-right">
        <span class="text-muted">投资收益</span>
        <div class="text-truncate mt-2">
          <span class="h6">10000.12345678</span>
        </div>
      </div>
      <div class="col-4 border-right">
        <span class="text-muted">团队资产</span>
        <div class="text-truncate mt-2">
          <span class="h6">10000.12345678</span>
        </div>
      </div>
      <div class="col-4">
        <span class="text-muted">可用资产</span>
        <div class="text-truncate mt-2">
          <span class="h6">10000.12345678</span>
        </div>
      </div>
    </div>

    <div class="invest-detail-info">
      <div class="row shadow-sm border rounded m-3 pt-1 pb-1">
        <div class="col-2">
          <span></span>
        </div>
        <div class="col-8 pt-3 pb-3">
          <router-link
            :to="{path:'/assets/transaction' , query: {token: token}}"
            class="text-muted"
          >我的账单</router-link>
        </div>
        <div class="col-2 text-center pt-3 pb-3">
          <router-link
            :to="{path:'/assets/transaction' , query: {token: token}}"
            class="text-muted"
          >
            <i class="fas fa-chevron-right"></i>
          </router-link>
        </div>
      </div>

      <div class="row shadow-sm border rounded m-3 pt-1 pb-1">
        <div class="col-2">
          <span></span>
        </div>
        <div class="col-8 pt-3 pb-3">
          <router-link :to="{path:'/assets/in' , query: {token: token}}" class="text-muted">充值</router-link>
        </div>
        <div class="col-2 text-center pt-3 pb-3">
          <router-link :to="{path:'/assets/in' , query: {token: token}}" class="text-muted">
            <i class="fas fa-chevron-right"></i>
          </router-link>
        </div>
      </div>

      <div class="row shadow-sm border rounded m-3 pt-1 pb-1">
        <div class="col-2">
          <span></span>
        </div>
        <div class="col-8 pt-3 pb-3">
          <router-link :to="{path:'/assets/out' , query: {token: token}}" class="text-muted">提现</router-link>
        </div>
        <div class="col-2 text-center pt-3 pb-3">
          <router-link :to="{path:'/assets/out' , query: {token: token}}" class="text-muted">
            <i class="fas fa-chevron-right"></i>
          </router-link>
        </div>
      </div>

      <div class="row shadow-sm border rounded m-3 pt-1 pb-1">
        <div class="col-2">
          <span></span>
        </div>
        <div class="col-8 pt-3 pb-3">
          <router-link :to="{path:'/assets/team' , query: {token: token}}" class="text-muted">团队贡献</router-link>
        </div>
        <div class="col-2 text-center pt-3 pb-3">
          <router-link :to="{path:'/assets/team' , query: {token: token}}" class="text-muted">
            <i class="fas fa-chevron-right"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
export default {
  asyncData({ store, route }) {
    store.dispatch("investDetailGet", { route: route }).then(() => {});
  },
  computed: {
    token() {
      return this.$route.query.token;
    }
  },
  methods: {
    formatTime(timestamp, format = "YYYY-MM-DD HH:mm") {
      let date = new Date(timestamp * 1000);
      return Moment(date).format(format);
    }
  }
};
</script>
