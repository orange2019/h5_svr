<template>
  <div class="page bg-white">
    <div class="page-top page-new-list-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1)" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="text-center col-8">好友列表</div>
    </div>
    <div class="row">
      <div class="col-12 pt-2 pb-2 text-center text-muted">
        共邀请好友
        <strong class="text-primary">{{ inviteCount }}</strong> 人
      </div>
      <div class="col-12 bg-light pt-2"></div>
    </div>

    <div class="text-center pt-3">{{ errMsg }}</div>
    <div v-for="(items,i) in inviteList">
      <div class="p-3" v-if="i == 0">{{i+1}}星</div>
      <div class="p-3" v-if="i == 1">{{i+1}}星</div>
      <div v-for="item in items" class="row pt-3">
        <div class="col-2" v-if="item.user_info && item.user_info.avatar ">
          <img :src="item.user_info.avatar" alt width="40" height="40" class="rounded-circle">
        </div>
        <div class="col-2" v-else>
          <img src="./../../images/avatar.png" alt width="40" height="40" class="rounded-circle">
        </div>
        <div class="col-5">
          {{ item.user_info ? item.user_info.realname : '未实名'}}
          <div class="text-muted">{{ mobileFormat(item.mobile)}}</div>
        </div>
        <div class="col-5 text-muted text-right pt-2">{{ formatTime(item.create_time) }}</div>
        <div class="col-12">
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
export default {
  asyncData({ store, route }) {
    store.dispatch("inviteListGet", { route: route });
  },
  data() {
    return {
      errMsg: "数据加载中..."
    };
  },
  computed: {
    inviteList() {
      return this.$store.state.inviteList;
    },
    inviteCount() {
      return this.$store.state.inviteCount;
    }
  },
  mounted() {
    if (this.$store.state.inviteCount) {
      this.errMsg = "";
    } else {
      this.errMsg = "";
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
