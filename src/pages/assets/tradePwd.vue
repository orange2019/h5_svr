<template>
  <div class="page">
    <div class="page-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1);" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="col-8 text-center">设置交易密码</div>
    </div>

    <div class="text-center p-5">
      <span class="text-muted">输入6位数字密码</span>
    </div>

    <number-keyboard @setPwd="setPwd"></number-keyboard>

    <div class="mt-5 p-3">
      <a
        href="javascript:;"
        @click="confirm()"
        class="btn btn-primary btn-lg btn-block btn-radius-big"
      >确认</a>
    </div>
  </div>
</template>

<script>
import Request from "./../../api/common/request.js";
import MD5 from "md5.js";

export default {
  asyncData({ store, route }) {},
  data() {
    return {
      password: ""
    };
  },
  computed: {
    token() {
      return this.$route.query.token;
    }
  },
  methods: {
    confirm() {
      let md5Str = new MD5().update(this.password).digest("hex");
      console.log(md5Str.length);
    },
    setPwd(str) {
      console.log(str);
      this.password = str;
    }
  }
};
</script>
