<template>
  <div class="page">
    <div class="page-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1);" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="col-8 text-center">积分兑换</div>
    </div>

    <div class="mt-5">
      <div class="text-center">
        <small class="text-muted">最大可兑换余额</small>
        <div class="h3">{{ userAssets.token_balance}}</div>
      </div>
      <div class="mt-5">
        <div class="form-group row">
          <label for class="col-3 col-form-label">数量</label>
          <div class="col-9">
            <input
              type="text"
              class="form-control text-right border-top-0 border-left-0 border-right-0"
              v-model="postData.num"
              placeholder="请输入兑换数量"
            >
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-12">
            <hr>
            <a
              href="javascript:;"
              @click="setTradePwdBoxShow"
              class="btn btn-lg btn-primary btn-radius-big btn-block"
            >确认</a>
          </div>

          <div class="col-12 mt-3 text-center">
            <small class="text-danger">{{ errMsg }}</small>
          </div>
        </div>
      </div>
    </div>

    <number-keyboard
      :isOpen="setTradePwbIsOpen"
      :title="setTradePwbTitle"
      :message="setTradePwbMsg"
      @close="setTradePwbClose"
      @submit="transferSubmit"
    ></number-keyboard>
  </div>
</template>

<script>
import Request from "./../../api/common/request.js";
import MD5 from "md5.js";
export default {
  asyncData({ store, route }) {
    let userAssets = store.state.userAssets;
    if (!userAssets.hasOwnProperty("token_balance")) {
      store.dispatch("userAssetsGet", { route: route });
    }
  },
  data() {
    return {
      setTradePwbIsOpen: 0,
      setTradePwbMsg: "",
      setTradePwbTitle: "",
      errMsg: "",
      postData: {
        num: "",
        type: 2
      }
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
    setTradePwdBoxShow() {
      let num = this.postData.num;

      if (num > this.userAssets.token_balance || isNaN(num) || num <= 0) {
        this.errMsg = "请输入正确的转账金额";
      } else {
        this.errMsg = "";
        this.setTradePwbIsOpen = 1;
        this.setTradePwbTitle = `<small class="text-muted">提现数量</small><div class="mt-3 h3">${num}</div>`;
        this.setTradePwbMsg = "请输入6位数字交易密码";
      }
    },
    setTradePwbClose() {
      this.setTradePwbIsOpen = 0;
    },
    async transferSubmit(val) {
      let password = new MD5().update(val).digest("hex");

      let postData = this.postData;
      postData.password = password;

      this.setTradePwbMsg = `提交中...`;

      let ret = await Request.post(
        "/api/assetsToScore?token=" + this.token,
        postData
      );
      console.log("request assetsToScore ret", ret);
      if (ret.code == 0) {
        this.setTradePwbMsg = `兑换成功`;

        setTimeout(() => {
          this.setTradePwbIsOpen = 0;
          this.postData.num = "";
          this.postData.to_address = "";
          this.searchMobile = "";
          this.$store.dispatch("userAssetsGet", { route: this.$route });
        }, 500);
      } else {
        this.setTradePwbMsg = `<span class="text-danger">${ret.message}</span>`;
      }
    }
  }
};
</script>
