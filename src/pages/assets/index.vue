<template>
  <div class="page bg-primary">
    <div class="page-top row">
      <div class="col-12 text-center h3 mt-3">资产</div>
    </div>

    <div class="invest-detail-title row bg-white m-3 mt-5 pt-3 pb-3 rounded shadow-sm text-center">
      <div class="col-12 text-center">
        <span class="text-muted">总资产</span>
        <div class="h4 text-primary mt-2">{{ totalNum || 0 }}</div>
      </div>
      <div class="col-12 h1 text-primary">
        <hr>
      </div>

      <div class="col-4 border-right">
        <span class="text-muted">投资收益</span>
        <div class="text-truncate mt-2">
          <span class="h6">{{ userAssets.invest || 0 }}</span>
        </div>
      </div>
      <div class="col-4 border-right">
        <span class="text-muted">团队资产</span>
        <div class="text-truncate mt-2">
          <span class="h6">{{ userAssets.invest_child || 0}}</span>
        </div>
      </div>
      <div class="col-4">
        <span class="text-muted">可用资产</span>
        <div class="text-truncate mt-2">
          <span class="h6">{{ canUseNum || 0}}</span>
        </div>
      </div>
    </div>

    <div class="invest-detail-info">
      <div class="row shadow-sm border rounded m-3 pt-1 pb-1" @click="goTo('/assets/transaction')">
        <div class="col-2">
          <span class="assets-icon trans"></span>
        </div>
        <div class="col-8 pt-3 pb-3">
          <router-link
            :to="{path:'/assets/transaction' , query: {token: token}}"
            class="text-muted"
          >我的账单</router-link>
        </div>
        <div class="col-2 text-center">
          <router-link
            :to="{path:'/assets/transaction' , query: {token: token}}"
            class="text-muted p-3 d-inline-block"
          >
            <i class="fas fa-chevron-right"></i>
          </router-link>
        </div>
      </div>

      <div class="row shadow-sm border rounded m-3 pt-1 pb-1" @click="goTo('/assets/in')">
        <div class="col-2">
          <span class="assets-icon in"></span>
        </div>
        <div class="col-8 pt-3 pb-3">
          <router-link :to="{path:'/assets/in' , query: {token: token}}" class="text-muted">充值</router-link>
        </div>
        <div class="col-2 text-center">
          <router-link
            :to="{path:'/assets/in' , query: {token: token}}"
            class="text-muted p-3 d-inline-block"
          >
            <i class="fas fa-chevron-right"></i>
          </router-link>
        </div>
      </div>

      <div class="row shadow-sm border rounded m-3 pt-1 pb-1" @click="goTo('/assets/out')">
        <div class="col-2">
          <span class="assets-icon out"></span>
        </div>
        <div class="col-8 pt-3 pb-3">
          <router-link :to="{path:'/assets/out' , query: {token: token}}" class="text-muted">提现</router-link>
        </div>
        <div class="col-2 text-center">
          <router-link
            :to="{path:'/assets/out' , query: {token: token}}"
            class="text-muted p-3 d-inline-block"
          >
            <i class="fas fa-chevron-right"></i>
          </router-link>
        </div>
      </div>

      <div class="row shadow-sm border rounded m-3 pt-1 pb-1" @click="goTo('/assets/transfer')">
        <div class="col-2">
          <span class="assets-icon transfer"></span>
        </div>
        <div class="col-8 pt-3 pb-3">
          <router-link :to="{path:'/assets/transfer' , query: {token: token}}" class="text-muted">转账</router-link>
        </div>
        <div class="col-2 text-center">
          <router-link
            :to="{path:'/assets/transfer' , query: {token: token}}"
            class="text-muted p-3 d-inline-block"
          >
            <i class="fas fa-chevron-right"></i>
          </router-link>
        </div>
      </div>

      <div class="row shadow-sm border rounded m-3 pt-1 pb-1" @click="goTo('/assets/team')">
        <div class="col-2">
          <span class="assets-icon team"></span>
        </div>
        <div class="col-8 pt-3 pb-3">
          <router-link :to="{path:'/assets/team' , query: {token: token}}" class="text-muted">团队贡献</router-link>
        </div>
        <div class="col-2 text-center">
          <router-link
            :to="{path:'/assets/team' , query: {token: token}}"
            class="text-muted p-3 d-inline-block"
          >
            <i class="fas fa-chevron-right"></i>
          </router-link>
        </div>
      </div>

      <div
        v-if="userAssets.isSetTradePwd == 1"
        class="row shadow-sm border rounded m-3 pt-1 pb-1"
        @click="setTradePwdBoxShow"
      >
        <div class="col-2">
          <span class="assets-icon tradepwd"></span>
        </div>
        <div class="col-8 pt-3 pb-3">
          <span class="text-muted">修改交易密码</span>
        </div>
        <div class="col-2 text-center">
          <a href="javascript:;" class="text-muted p-3 d-inline-block">
            <i class="fas fa-chevron-right"></i>
          </a>
        </div>
      </div>

      <div class="pt-5"></div>
    </div>

    <div v-if="userAssets.isSetTradePwd == 0" class="assets-set-pwd">
      <div class="bg"></div>
      <div class="main p-5 text-white text-center">
        <div class="mb-3">您还未设置交易密码！</div>
        <a
          href="javascript:;"
          class="btn btn-primary btn-lg btn-block btn-radius-big"
          @click="setTradePwdBoxShow"
        >设置交易密码</a>
      </div>
    </div>

    <number-keyboard
      :isOpen="setTradePwbIsOpen"
      :message="setTradePwbMsg"
      @close="setTradePwbClose"
      @submit="setTradePwbSubmit"
    ></number-keyboard>
  </div>
</template>

<script>
import Request from "./../../api/common/request.js";
import Moment from "moment";
import MD5 from "md5.js";
export default {
  asyncData({ store, route }) {
    store.dispatch("userAssetsGet", { route: route });
  },
  data() {
    return {
      setTradePwbIsOpen: 0,
      setTradePwbMsg: ""
    };
  },
  computed: {
    token() {
      return this.$route.query.token;
    },
    userAssets() {
      return this.$store.state.userAssets;
    },
    canUseNum() {
      return this.$store.state.userAssets.token_balance;
    },
    totalNum() {
      return (
        this.$store.state.userAssets.token_balance +
        this.$store.state.userAssets.frozen_num
      );
    }
  },
  methods: {
    formatTime(timestamp, format = "YYYY-MM-DD HH:mm") {
      let date = new Date(timestamp * 1000);
      return Moment(date).format(format);
    },
    goTo(path) {
      this.$router.push({ path: path, query: { token: this.token } });
    },
    setTradePwdBoxShow() {
      this.setTradePwbIsOpen = 1;
      this.setTradePwbMsg = "请输入6位数字交易密码";
    },
    setTradePwbClose() {
      this.setTradePwbIsOpen = 0;
    },
    async setTradePwbSubmit(val) {
      let password = new MD5().update(val).digest("hex");
      console.log("password", password);
      this.setTradePwbMsg = `<small class="text-muted">提交中...</small>`;

      let ret = await Request.post("/api/setTradePwd?token=" + this.token, {
        password: password
      });
      console.log("setTradePwbSubmit ret", ret);
      if (ret.code == 0) {
        this.setTradePwbMsg = "设置成功";

        setTimeout(() => {
          this.setTradePwbIsOpen = 0;
          this.$store.state.userAssets.isSetTradePwd = 1;
        }, 500);
      } else {
        this.setTradePwbMsg = `<small class="text-danger">设置失败</small>`;
      }
    }
  }
};
</script>
