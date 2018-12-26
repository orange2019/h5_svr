<template>
  <div class="page bg-primary">
    <div class="page-top page-new-list-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:window.android.close();" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="text-center col-8">我的邀请</div>
    </div>

    <div class="text-center text-white mt-1">
      <!-- <div class="h1">邀请好友</div>
      <div class="h1">&nbsp;&nbsp;送健康</div>-->
      <div>
        <img src="./../../images/invite-top.png" alt width="100%">
      </div>
      <div class="mt-3">谱写生命永恒的美丽</div>
    </div>

    <div class="p-3 mt-3" v-if="inviteInfo">
      <div class="bg-white rounded p-3">
        <div v-if="inviteInfo.avatar" class="text-center mt-3">
          <img :src="inviteInfo.avatar" alt width="80" height="80" class="rounded-circle">
        </div>
        <div v-if="inviteInfo.user_name" class="mt-3 text-center">{{ inviteInfoName }}</div>

        <div class="text-center mt-3">
          <!-- <small class="text-muted">邀请码</small> -->
          <!-- <div class="mt-3">{{ inviteInfo.qrcode_url }}</div> -->
          <div id="qrcode" ref="qrcode" style="width:120px;height:120px;margin:auto;"></div>
          <hr>
          <small class="text-muted">扫码输入邀请人号码注册,下载APP</small>
          <!-- <div class="text-center">
            <a :href="inviteInfo.qrcode_url">测试地址</a>
          </div>-->
        </div>

        <div class="text-center mt-5">
          <router-link
            :to="{path: '/invite/list' , query: {token : token}}"
            class="btn btn-outline-primary btn-lg btn-block btn-radius-big"
          >我的好友</router-link>
          <a
            href="javascript:;"
            class="btn btn-primary btn-lg btn-block btn-radius-big mt-3"
            @click="zhuanfa"
          >转发</a>
        </div>

        <div class="mb-5"></div>
      </div>
    </div>

    <div class="mb-5"></div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";

export default {
  asyncData({ store, route }) {
    store.dispatch("inviteInfoGet", { route: route }).then(() => {
      let url = store.state.inviteInfo.qrcode_url;
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
    });
  },
  computed: {
    inviteInfo() {
      return this.$store.state.inviteInfo;
    },
    inviteInfoName() {
      return (
        this.$store.state.inviteInfo.user_name.slice(
          0,
          this.$store.state.inviteInfo.user_name.length - 1
        ) + "*"
      );
    },
    token() {
      return this.$route.query.token;
    }
  },
  methods: {
    close() {},
    zhuanfa() {
      // 截图
      if (window.android) {
        window.android.captureScreen();
      }
    }
  }
};
</script>
