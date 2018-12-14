<template>
  <div class="page">
    <div class="page-top page-new-list-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:window.android.close();" class="pl-3 d-block">
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
            type="password_again"
            class="form-control border-top-0 border-left-0 border-right-0"
            placeholder="请再次输入密码"
            required
            v-model="postData.password_again"
          >
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
        password_again: ""
      },
      errMsg: ""
    };
  },
  computed: {
    token() {
      return this.$route.query.token;
    }
  },
  methods: {
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
