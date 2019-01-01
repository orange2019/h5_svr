<template>
  <div class="page bg-light">
    <div class="page-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1)" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="text-center col-8">新增地址</div>
    </div>

    <form @submit.prevent="addressSubmit">
      <div class="bg-white">
        <div class="row form-group pt-2 pb-2 border-bottom">
          <div class="col-3 pt-2">收货人</div>
          <div class="col-9">
            <input
              type="text"
              class="form-control border-0"
              placeholder="姓名"
              required
              v-model="addressModify.name"
            >
          </div>
        </div>
        <div class="row form-group pt-2 pb-2 border-bottom">
          <div class="col-3 pt-2">联系方式</div>
          <div class="col-9">
            <input
              type="text"
              class="form-control border-0"
              placeholder="手机号码"
              required
              v-model="addressModify.mobile"
            >
          </div>
        </div>

        <div class="row form-group pt-2 pb-2 border-bottom">
          <div class="col-3 pt-2">详细地址</div>
          <div class="col-8">
            <textarea
              class="form-control border-0"
              placeholder
              required
              v-model="addressModify.info"
              id="address-info"
            ></textarea>
          </div>
          <div class="col-1 pr-0 pl-0 pt-2" @click="mapShow">
            <i class="fas fa-map-marker-alt"></i>
          </div>
        </div>
      </div>

      <div class="mt-5 p-3">
        <input type="submit" class="btn btn-primary btn-lg btn-block btn-radius-big" value="保存">
      </div>
    </form>

    <div class="position-fixed fixed-top w-100 h-100" id="map-choose" style="display:none;">
      <iframe
        id="mapPage"
        width="100%"
        height="100%"
        frameborder="0"
        src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=NGYBZ-MYMCU-JCHVI-BNPO2-MVCYV-JPBUO&referer=myapp"
      ></iframe>
    </div>
  </div>
</template>

<script>
import Request from "./../../api/common/request.js";
export default {
  asyncData({ store, route }) {
    if (!store.state.mallUser.auth) {
      if (route.query.token) {
        store.dispatch("mallUserGet", { route }).then(ret => {
          if (ret.code != 0) {
            window.android.goToLogin();
          }
        });
      } else {
        window.android.goToLogin();
      }
    }

    // store.state.address.modifyIndex = store.state.address.list.length || 0;
  },
  data() {
    return {
      postData: {
        address: "",
        city: ""
      }
    };
  },
  computed: {
    address() {
      return this.$store.state.address;
    },
    addressModify() {
      return this.$store.state.address.modify;
    },
    token() {
      return this.$route.query.token;
    }
  },
  methods: {
    mapShow() {
      document.getElementById("map-choose").style.display = "block";

      window.addEventListener(
        "message",
        event => {
          // console.log(event);
          // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
          var loc = event.data;
          if (loc && loc.module == "locationPicker") {
            //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
            console.log("location", loc);
            // this.postData.address = loc.poiaddress + loc.poiname;
            // this.postData.city = loc.cityname;
            this.addressModify.info = loc.poiaddress + loc.poiname;
            this.addressModify.city = loc.city;
            // document.getElementById("address-info").value =
            //   loc.poiaddress + loc.poiname;

            document.getElementById("map-choose").style.display = "none";
          }
        },
        false
      );
    },
    async addressSubmit() {
      // console.log(this.address);
      let index = this.address.modifyIndex;
      let addressList = this.address.list;

      let address = this.addressModify;

      if (index == addressList.length) {
        addressList.unshift(address);
      } else {
        addressList[index] = address;
      }

      console.log(addressList);

      let data = { address: addressList };

      let ret = await Request.post(
        "/api/mall/user/address/update?token=" + this.token,
        data
      );
      // console.log(ret);
      if (ret.code == 0) {
        history.go(-1);
      }
    }
  }
};
</script>
