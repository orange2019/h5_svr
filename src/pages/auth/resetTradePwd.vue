<template>
  <div class="page">
    <div class="page-top page-new-list-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1);" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="text-center col-8">修改交易密码</div>
    </div>

    <div class="mt-3 p-3">
      <div class="text-muted">发送手机验证码</div>
      <div class="form-group mt-3 row">
        <div class="col-8 pl-0">
          <input
            type="number"
            class="form-control"
            placeholder="输入验证码"
            required
            v-model="postData.verify_code"
          >
        </div>
        <div class="col-4 pl-0 pr-0">
          <a href="javascript:;" class="btn btn-block btn-primary" @click="sendSms">{{ sms.text }}</a>
        </div>
      </div>

      <div class="form-group">
        <hr>
        <a
          href="javascript:;"
          class="btn btn-primary btn-block btn-lg btn-radius-big"
          @click="resetConfirm"
        >确认修改</a>
      </div>

      <div class="mt-3 text-center text-danger" v-html="errMsg"></div>
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
      setTradePwbMsg: "",
      postData: {
        verify_code: ""
      },
      sms: {
        text: "发送",
        second: 60
      },
      submit: {
        isPost: 0,
        text: "提交"
      },
      errMsg: ""
    };
  },
  computed: {
    token() {
      return this.$route.query.token;
    },
    userAssets() {
      return this.$store.state.userAssets;
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
          history.go(-1);
        }, 1500);
      } else {
        this.setTradePwbMsg = `<small class="text-danger">设置失败</small>`;
      }
    },
    async sendSms() {
      this.errMsg = "";
      if (this.sms.second == 60) {
        let ret = await Request.post(
          "/api/verifyCodeAuth?token=" + this.token,
          {}
        );
        console.log("/api/verifyCodeAuth", ret);

        if (ret.code == 0) {
          this.errMsg = "";

          for (let index = 0; index < 60; index++) {
            setTimeout(() => {
              if (this.sms.second > 0) {
                this.sms.second--;

                if (this.sms.second == 0) {
                  this.sms.second = 60;
                  this.sms.text = "发送";
                } else {
                  this.sms.text = `(${this.sms.second} s)`;
                }
              }
            }, index * 1000);
          }
        } else {
          this.errMsg = "发送验证码失败，请稍后重试";
        }
      }
    },
    async resetConfirm() {
      let postData = this.postData;

      let ret = await Request.post(
        "/api/verifyCodeAuthCheck?token=" + this.token,
        postData
      );

      if (ret.code == 0) {
        this.setTradePwdBoxShow();

        this.postData.mobile = "";
        this.postData.verify_code = "";
      } else {
        this.errMsg = ret.message || "验证码错误";
      }
    }
  }
};
</script>

