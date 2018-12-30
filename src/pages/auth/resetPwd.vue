<template>
  <div class="page">
    <div class="page-top page-new-list-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:window.android.close();" class="pl-3 d-block" v-if="isAndroid">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
        <a href="javascript:history.go(-1);" class="pl-3 d-block" v-else>
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="text-center col-8">修改密码</div>
    </div>

    <div class="p-3">
      <form @submit.prevent="confirmResetPwd()">
        <div class="form-group">
          <input
            type="password"
            class="form-control border-top-0 border-left-0 border-right-0"
            placeholder="请输入密码"
            required
            v-model="postData.password"
          >
        </div>
        <div class="form-group mt-4">
          <input
            type="password"
            class="form-control border-top-0 border-left-0 border-right-0"
            placeholder="请再次输入密码"
            required
            v-model="postData.password_again"
          >
        </div>

        <div class="form-group mt-4 row">
          <div class="col-8 pl-0">
            <input
              type="number"
              class="form-control border-top-0 border-left-0 border-right-0"
              placeholder="输入验证码"
              required
              v-model="postData.verify_code"
            >
          </div>
          <div class="col-4 pl-0 pr-0">
            <a href="javascript:;" class="btn btn-block btn-primary" @click="sendSms">{{ sms.text }}</a>
          </div>
        </div>

        <div class="form-group mt-4">
          <input type="submit" class="btn btn-primary btn-block btn-lg btn-radius-big" value="提交">
        </div>
        <div class="mt-3 text-center">{{ errMsg }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import Request from "./../../api/common/request.js";
export default {
  asyncData() {},
  data() {
    return {
      postData: {
        password: "",
        password_again: "",
        verify_code: ""
      },
      errMsg: "",
      sms: {
        text: "发送",
        second: 60
      }
    };
  },
  computed: {
    token() {
      return this.$route.query.token;
    },
    isAndroid() {
      return window.hasOwnProperty("android") ? true : false;
    }
  },
  methods: {
    async sendSms() {
      if (this.sms.second == 60) {
        let ret = await Request.post("/api/verifyCodeAuth?token=" + this.token);
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
    async confirmResetPwd() {
      let postData = this.postData;
      let token = this.token;

      if (postData.password != postData.password_again) {
        this.errMsg = "两次输入密码不一致";
        return;
      }

      let ret = await Request.post("/api/resetPwd?token=" + token, postData);
      console.log(ret);
      if (ret.code == 0) {
        this.errMsg = "修改成功";
        if (window.android) {
          window.android.goToLogin();
        }
      } else {
        this.errMsg = "修改失败";
      }
    }
  }
};
</script>
