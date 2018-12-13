<template>
  <div class="page bg-primary">
    <div class="page-top page-new-list-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:android.close();" class="pl-3 d-block">
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
          <img :src="inviteInfo.avatar" alt width="100" height="100" class="rounded-circle">
        </div>
        <div v-if="inviteInfo.user_name" class="mt-3">{{ inviteInfo.user_name }}</div>

        <div class="text-center mt-3">
          <!-- <small class="text-muted">邀请码</small> -->
          <!-- <div class="mt-3">{{ inviteInfo.qrcode_url }}</div> -->
          <div id="qrcode" ref="qrcode" style="width:120px;height:120px;margin:auto;"></div>
          <hr>
          <small class="text-muted">扫码下载APP,输入邀请人号码注册</small>
        </div>

        <div class="text-center mt-5">
          <router-link
            :to="{path: '/invite/list' , query: {token : token}}"
            class="btn btn-outline-primary btn-lg btn-block btn-radius-big"
          >我的好友</router-link>
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
    token() {
      return this.$route.query.token;
    }
  },
  methods: {
    close() {}
  }
};
</script>
