<template>
  <div class="page bg-white">
    <div class="page-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1);" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="col-8 text-center">充值 / 收款</div>
      <div class="col-2"></div>
    </div>

    <div class="text-muted mt-3 p-3">
      <div class="text-center mb-3">收款二维码</div>

      <div id="qrcode" ref="qrcode" style="width:120px;height:120px;margin:auto;"></div>
      <hr>
    </div>

    <div class="mt-3 text-center">
      <div>
        <small>{{ userAssets.address }}</small>
      </div>

      <div class="mt-2">
        <small class="text-muted">复制钱包地址,从交易所提币到本钱包</small>
      </div>

      <div class="mt-3 pl-3 pr-3">
        <a
          href="javascript:;"
          class="btn btn-primary btn-lg btn-radius-big btn-copy btn-block"
          @click="copyAddress"
        >点击复制</a>
      </div>

      <div class="mt-3 text-center text-danger">{{errMsg}}</div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import XECommand from "xe-command";
export default {
  data() {
    return {
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
  mounted() {
    let url = this.$store.state.userAssets.address;
    console.log("qrcode_url", url);
    let qrcode = new QRCode("qrcode", {
      width: 120, //图像宽度
      height: 120, //图像高度
      colorDark: "#000000", //前景色
      colorLight: "#ffffff", //背景色
      typeNumber: 4,
      correctLevel: QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
    });
    qrcode.clear(); //清除二维码
    qrcode.makeCode(url); //生成另一个新的二维码
  },
  methods: {
    copyAddress() {
      this.errMsg = "";
      let content = this.$store.state.userAssets.address;
      if (XECommand.copy(content)) {
        this.errMsg = "复制成功";
      } else {
        this.errMsg = "你所使用的手机不支持复制，请手动操作";
      }
    }
  }
};
</script>

