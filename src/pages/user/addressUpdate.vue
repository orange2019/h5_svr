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

    <div class="bg-white">
      <div class="row form-group pt-2 pb-2 border-bottom">
        <div class="col-3 pt-2">收货人</div>
        <div class="col-9">
          <input type="text" class="form-control border-0" placeholder="姓名" required>
        </div>
      </div>
      <div class="row form-group pt-2 pb-2 border-bottom">
        <div class="col-3 pt-2">联系方式</div>
        <div class="col-9">
          <input type="text" class="form-control border-0" placeholder="手机号码" required>
        </div>
      </div>

      <div class="row form-group pt-2 pb-2 border-bottom">
        <div class="col-3 pt-2">详细地址</div>
        <div class="col-8">
          <input
            type="text"
            class="form-control border-0"
            placeholder
            required
            v-model="postData.address"
          >
        </div>
        <div class="col-1 pr-0 pl-0 pt-2" @click="mapShow">
          <i class="fas fa-map-marker-alt"></i>
        </div>
      </div>
    </div>

    <div class="mt-5 p-3">
      <div class="btn btn-primary btn-lg btn-block btn-radius-big">保存</div>
    </div>

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
export default {
  data() {
    return {
      postData: {
        address: ""
      }
    };
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
          }

          this.postData.address = loc.poiaddress;
          document.getElementById("map-choose").style.display = "none";
        },
        false
      );
    }
  }
};
</script>
