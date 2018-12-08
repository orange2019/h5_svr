<template>
  <div class="page bg-white">
    <div class="page-top row bg-primary">
      <div class="col-2">
        <a href="javascript:history.go(-1);">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="col-8 text-center">团队贡献</div>
    </div>

    <div class="row bg-white pt-2 pb-2 text-center">
      <div class="col-12">
        共邀请好友
        <span class="text-primary h5">{{userTeamCount}}</span>
        人 , 总计贡献
        <span class="text-warning h5">{{ userAssets.invest_child || 0 }}</span>
      </div>
    </div>
    <div class="bg-light pt-1"></div>

    <template v-if="userInvestChild.length">
      <div class="row mt-3" v-for="item in userInvestChild">
        <div class="col-6">
          <div class>{{ item.user_info ? item.user_info.realname: '无名' }}</div>
          <div class>{{ formatTime(item.create_time) }}</div>
        </div>
        <div class="col-6 text-right">
          <div class="mt-2 h4">{{ item.num }}</div>
        </div>
        <dir class="col-12">
          <hr>
        </dir>
      </div>
    </template>
    <template v-else>
      <div class="mt-5 text-center">
        <span class="text-muted">无数据</span>
      </div>
    </template>
  </div>
</template>

<script>
import Moment from "moment";
export default {
  asyncData({ store, route }) {
    store.dispatch("userInvestChildGet", { route: route });
  },
  computed: {
    userInvestChild() {
      return this.$store.state.userInvestChild;
    },
    userAssets() {
      return this.$store.state.userAssets;
    },
    userTeamCount() {
      return this.$store.state.userTeamCount;
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

