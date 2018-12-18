<template>
  <div class="page bg-white">
    <div class="page-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1);" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="col-8 text-center">团队购买详情</div>
    </div>

    <div class="row text-center pt-2 pb-2">
      <div class="col-6" @click="showTab(1)" :class="bClass.btn1">已购买产品</div>
      <div class="col-6" @click="showTab(2)" :class="bClass.btn2">未购买人员</div>
    </div>

    <div :style="style.tab1">
      <div class="row mb-3" v-for="item in userInvestChildInfo.lists">
        <div class="col-12">
          <hr>
        </div>
        <div class="col-6">
          <span>{{mobileFormat(item.user.mobile)}}</span>
          <span class="text-muted">{{ item.user.user_info ? item.user.user_info.realname : '' }}</span>
        </div>
        <div class="col-6 text-right">
          <span class="text-muted">{{ item.invest.name }}</span>
        </div>
        <div class="col-8">
          <small
            class="text-muted"
          >{{formatTime(item.start_time , 'YYYY/MM/DD ')}} - {{formatTime(item.end_time , 'YYYY/MM/DD ')}}</small>
        </div>
        <div class="col-4 text-right">{{ item.rate }}%</div>
      </div>
    </div>
    <div :style="style.tab2">
      <div class="row mb-3" v-for="item in userInvestChildInfo.noBuyUser">
        <div class="col-12">
          <hr>
        </div>
        <div class="col-4">{{ mobileFormat(item.mobile) }}</div>
        <div class="col-4">{{ item.user_info ? item.user_info.realname : ''}}</div>
        <div class="col-4 text-right">
          <small class="text-muted">{{formatTime(item.create_time , 'YYYY/MM/DD ')}}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
export default {
  asyncData({ store, route }) {
    store.dispatch("userInvestChildInfoGet", { route: route });
  },
  data() {
    return {
      style: {
        tab1: { display: "block" },
        tab2: { display: "none" }
      },
      bClass: {
        btn1: "text-primary",
        btn2: "text-muted"
      }
    };
  },
  computed: {
    userInvestChildInfo() {
      return this.$store.state.userInvestChildInfo;
    }
  },
  methods: {
    formatTime(timestamp, format = "YYYY-MM-DD HH:mm") {
      let date = new Date(timestamp * 1000);
      return Moment(date).format(format);
    },
    mobileFormat(mobile) {
      return mobile.slice(0, 3) + "****" + mobile.slice(7, 11);
    },
    showTab(val) {
      if (val == 1) {
        this.style.tab1.display = "block";
        this.style.tab2.display = "none";
        this.bClass.btn1 = "text-primary";
        this.bClass.btn2 = "text-muted";
      } else if (val == 2) {
        this.style.tab1.display = "none";
        this.style.tab2.display = "block";
        this.bClass.btn1 = "text-muted";
        this.bClass.btn2 = "text-primary";
      }
    }
  }
};
</script>

