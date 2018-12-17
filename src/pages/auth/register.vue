<template>
  <div class="page bg-primary">
    <div class="page-top"></div>

    <div class="bg-white rounded m-5 p-3">
      <div class="text-center h3 text-muted">邀请注册</div>
      <form @submit.prevent="registerSubmit">
        <div class="form-group mt-3">
          <input
            type="text"
            class="form-control"
            placeholder="输入手机号码"
            required
            v-model="postData.mobile"
          >
        </div>

        <div class="form-group mt-3">
          <input
            type="password"
            class="form-control"
            placeholder="设置账户密码"
            required
            v-model="postData.password"
          >
        </div>

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

        <div class="form-group mt-3">
          <input
            type="text"
            class="form-control"
            :placeholder="'邀请人:'  + inviteMobile"
            required
            v-if="inviteUser && inviteUser.mobile"
            readonly
          >
          <input
            type="text"
            class="form-control"
            placeholder="输入邀请人手机号"
            required
            v-model="postData.invite_code"
            v-else
          >
        </div>

        <div class="form-group">
          <hr>
          <input
            type="submit"
            :value="submit.text"
            class="btn btn-primary btn-block btn-lg btn-radius-big"
          >
        </div>

        <div class="form-group mt-3">
          <router-link
            to="/invite/download"
            class="btn btn-outline-primary btn-block btn-lg btn-radius-big"
          >下载APP</router-link>
        </div>

        <div class="mt-3 text-center text-danger" v-html="errMsg"></div>
      </form>
    </div>

    <div class="wx-bg" :style="wxStyle">
      <div class="text-right p-3 text-white">点击右上角
        <br>选择在默认浏览器中打开
      </div>
    </div>
  </div>
</template>

<script>
import Request from "./../../api/common/request.js";

export default {
  asyncData({ store, route }) {
    store.dispatch("getInviteUser", { route: route });
  },
  data() {
    return {
      postData: {
        mobile: "",
        password: "",
        invite_code: "",
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
      errMsg: "",
      wxStyle: {
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        "z-index": "100005",
        background: "#000",
        opacity: "0.8",
        display: "none"
      }
    };
  },
  computed: {
    inviteUser() {
      return this.$store.state.inviteUser || {};
    },
    inviteMobile() {
      if (this.inviteUser && this.inviteUser.mobile) {
        return (
          this.inviteUser.mobile.slice(0, 3) +
          "****" +
          this.inviteUser.mobile.slice(7, 11)
        );
      } else {
        return "";
      }
    }
  },
  methods: {
    async registerSubmit() {
      if (this.submit.isPost == 0) {
        this.submit.text = "提交中...";
        this.errMsg = "";
        this.submit.isPost == 1;

        let postData = this.postData;
        let inviteUser = this.inviteUser;
        if (inviteUser && inviteUser.mobile) {
          postData.invite_code = inviteUser.mobile;
        }

        let ret = await Request.post("/api/register", postData);
        console.log("/api/register ret", ret);
        if (ret.code == 0) {
          this.errMsg = "提交成功,前往下载APP";
          setTimeout(() => {
            this.$router.push({ path: "/invite/download" });
          }, 1000);
        } else {
          this.errMsg = ret.message;
        }

        this.submit.isPost == 0;
        this.submit.text = "提交";
      } else {
        this.submit.text = "请不要反复提交";
      }
    },
    async sendSms() {
      if (this.sms.second == 60) {
        let mobile = this.postData.mobile;
        if (mobile.length != 11) {
          return;
        }

        let ret = await Request.post("/api/verifyCode", { mobile: mobile });
        console.log("/api/verifyCode", ret);

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
    }
  },
  mounted() {
    console.log("页面加载完毕");
    console.log(this.wxStyle.display);

    function isWeiXin() {
      //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
      var ua = window.navigator.userAgent.toLowerCase();
      //通过正则表达式匹配ua中是否含有MicroMessenger字符串
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    }

    if (isWeiXin()) {
      this.wxStyle.display = "block";
    }
  }
};
</script>
