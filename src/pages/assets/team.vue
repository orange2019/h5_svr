<template>
  <div class="page bg-white">
    <div class="page-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1);" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="col-8 text-center">团队贡献</div>
    </div>

    <div class="row bg-white pt-2 pb-2 text-center">
      <div class="col-12">
        <!-- <span class="text-primary h5">{{userTeamCount}}</span> -->
        团队总计贡献
        <span class="text-warning h5">{{ userAssets.invest_child || 0 }}</span>,
        <router-link :to="{path:'/assets/teamInfo' , query: {token:token}}">团队购买详情</router-link>
      </div>
    </div>
    <div class="bg-light pt-1"></div>

    <div class="row mt-3" v-for="item in userInvestChild">
      <div class="col-2" v-if="item.user_info && item.user_info.avatar ">
        <img :src="item.user_info.avatar" alt width="40" height="40" class="rounded-circle">
      </div>
      <div class="col-2" v-else>
        <img src="./../../images/avatar.png" alt width="40" height="40" class="rounded-circle">
      </div>

      <div class="col-6">
        <div class>
          {{ item.user_info ? item.user_info.realname: '无名' }}
          <span
            class="text-muted"
          >{{ mobileFormat(item.user.mobile)}}</span>
        </div>
        <div class>{{ formatTime(item.create_time) }}</div>
      </div>
      <div class="col-4 text-right">
        <div class="mt-2 h4 text-word-break">{{ item.num }}</div>
      </div>
      <dir class="col-12">
        <hr>
      </dir>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
export default {
  asyncData({ store, route }) {
    store.dispatch("userInvestChildGet", { route: route });
  },
  computed: {
    token() {
      return this.$route.query.token;
    },
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
    },
    mobileFormat(mobile) {
      return mobile.slice(0, 3) + "****" + mobile.slice(7, 11);
    }
  }
};
</script>

