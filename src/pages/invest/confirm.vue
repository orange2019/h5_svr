<template>
  <div class="page bg-white">
    <div class="page-top bg-primary row">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1);" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="text-center col-8">产品购买</div>
    </div>

    <div class="page-invest-list">
      <div class="row mt-3 bg-white pt-3 pb-3">
        <div class="col-12 mt-3 text-center">
          <div class="h5">确认付款</div>
          <div class="h2">{{ investInfo.num }}</div>

          <div>
            <small>可用余额</small>
            <div class>{{userCanUseTokenNum}}</div>
          </div>
        </div>

        <div class="col-12 pt-3" v-if="userCanUseTokenNum >= investInfo.num">
          <form @submit.prevent="confirmInvest()">
            <div class="form-group p-3">
              <input type="password" v-model="postData.password" class="form-control">
              <div class="text-muted text-center mt-3">请输入账户密码</div>
            </div>

            <div class="form-group">
              <hr>
              <input
                type="submit"
                class="btn-radius-big btn btn-block btn-lg btn-primary"
                value="立即支付"
              >
            </div>
          </form>
        </div>

        <div v-else class="col-12 text-center mt-5">
          <div class="text-danger">余额不足</div>
        </div>
      </div>
    </div>

    <alert-box
      :isOpen="alertBoxObj.isOpen"
      :messageType="alertBoxObj.type"
      :content="alertBoxObj.content"
      :closeText="alertBoxObj.closeText"
      @closeAction="alertBoxClose()"
    ></alert-box>
  </div>
</template>

<script>
import Request from "./../../api/common/request.js";

export default {
  asyncData({ store, route }) {
    // store.dispatch("userAssetsGet", { route: route });
  },
  data() {
    return {
      postData: {
        password: ""
      },
      alertBoxObj: {
        type: 0,
        isOpen: 0,
        content: "SUCCESS",
        closeText: "确认"
      }
    };
  },
  computed: {
    investInfo() {
      return this.$store.state.investInfo;
    },
    token() {
      return this.$route.query.token;
    },
    userCanUseTokenNum() {
      return this.$store.state.userCanUseTokenNum;
    }
  },
  methods: {
    alertBox(
      isOpen = 0,
      type = 0,
      content = "SUCCESS",
      closeText = "确认",
      cb = () => {}
    ) {
      this.alertBoxObj.type = type;
      this.alertBoxObj.isOpen = isOpen;
      this.alertBoxObj.content = content;
      this.alertBoxObj.closeText = closeText;
      cb();
    },
    alertBoxClose() {
      this.alertBoxObj.isOpen = 0;
    },
    async confirmInvest() {
      let postData = this.postData;
      postData.invest_id = this.investInfo.id;

      console.log("confirmInvest postData", postData);
      let token = this.token;
      let url = "/api/investApply?token=" + token;
      console.log("confirmInvest url", url);

      this.alertBox(1);
      this.alertBoxObj.content = "交易提交中...";
      this.alertBoxObj.closeText = "";

      try {
        let ret = await Request.post(url, postData);
        if (ret.code == 0) {
          this.alertBoxObj.content = "交易成功";
          this.alertBoxObj.closeText = "确认";
          this.alertBoxObj.type = 0;

          this.$router.push({ path: "/invest/list", query: { token: token } });
        } else {
          this.alertBoxObj.content = ret.message;
          this.alertBoxObj.closeText = "关闭";
          this.alertBoxObj.type = 1;
        }
      } catch (err) {
        this.alertBoxObj.content = err.message || "位置错误";
        this.alertBoxObj.closeText = "关闭";
        this.alertBoxObj.type = 1;
      }
    }
  }
};
</script>