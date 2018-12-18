<template>
  <div class="page">
    <div class="page-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1);" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="col-8 text-center">转账</div>
    </div>

    <div class="mt-5">
      <div class="text-center">
        <small class="text-muted">可用数量</small>
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
              placeholder="请输入转账数量"
            >
          </div>
        </div>

        <div class="form-group row mt-3">
          <label for class="col-3 col-form-label">转账至</label>
          <div class="col-9">
            <input
              type="number"
              class="form-control text-right border-top-0 border-left-0 border-right-0"
              placeholder="请输入对方手机号后4位进行查询"
              required
              v-model="searchMobile"
              @input="searchByMobile"
              maxlength="4"
            >
          </div>
        </div>

        <div class="row mt-3" v-for="item in searchList">
          <div class="col-12 pl-0 pr-0" @click="chooseTransferAddress(item.wallet_address)">
            <div class="row">
              <div class="col-9">
                <span>{{item.mobile.slice(0,3)}}****{{searchMobile}}</span>
                <span v-if="item.user_info && item.user_info.realname">{{ item.user_info.realname }}</span>
              </div>
              <div class="col-3 text-right">
                <a href="javascript:;" class="text-right btn btn-sm btn-outline-primary">选择</a>
              </div>
              <div class="col-12">
                <hr>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-3 text-center" v-if="postData.to_address">
          <small>转账地址</small>
          <div class="text-muted text-wrap-break pl-3 pr-3">{{ postData.to_address }}</div>
        </div>

        <div class="mt-3 p-3 text-center">
          <a
            href="javascript:;"
            @click="scanQrCode"
            class="btn btn-lg btn-outline-primary btn-radius-big btn-block"
          >点击扫描二维码</a>
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
        to_address: ""
      },
      searchMobile: "",
      searchList: []
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
    scanQrCode() {
      if (window.android) {
        window.android.scanQrCode();
      }

      let getResult = () => {
        setTimeout(() => {
          if (window.android.qrCodeCameraVisible()) {
            let result = window.android.getResult();

            if (result) {
              this.postData.to_address = result;
            } else {
              getResult();
            }
          }
        }, 1000);
      };

      getResult();
    },
    setTradePwdBoxShow() {
      let num = this.postData.num;
      let address = this.postData.to_address;
      if (!address) {
        this.errMsg = "请选择转账地址";
        return;
      }
      if (num > this.userAssets.token_balance || isNaN(num) || num <= 0) {
        this.errMsg = "请输入正确的转账数量";
      } else if (!address) {
        this.errMsg = "请输入正确的转账地址";
      } else {
        this.errMsg = "";
        this.setTradePwbIsOpen = 1;
        this.setTradePwbTitle = `<small class="text-muted">转账数量</small><div class="mt-3 h3">${num}</div>`;
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
        "/api/assetsTransfer?token=" + this.token,
        postData
      );
      console.log("request assetsTransfer ret", ret);
      if (ret.code == 0) {
        this.setTradePwbMsg = `转账成功`;

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
    },
    async searchByMobile() {
      let mobile = this.searchMobile;
      if (mobile.length == 4) {
        console.log(mobile);

        let ret = await Request.post(
          "/api/searchUserByMobile?token=" + this.token,
          {
            mobile: mobile
          }
        );

        console.log(ret);
        if (ret.code == 0) {
          this.searchList = ret.data.list;
        }
      } else {
        this.searchList = [];
        this.postData.to_address = "";
      }
    },
    chooseTransferAddress(address) {
      this.postData.to_address = address;
    }
  }
};
</script>
