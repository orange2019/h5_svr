<template>
  <div class="page bg-light">
    <div class="page-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1)" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="text-center col-8">地址管理</div>
    </div>

    <template v-for="(item,i) in address.list">
      <div class="row mb-2 pt-3 pb-3 bg-white">
        <div class="col-1 pt-2" @click="chooseDefault(i)">
          <i class="far fa-check-square" v-if="i == 0"></i>
        </div>
        <div class="col-9" @click="chooseDefault(i)">
          <div>
            <span>{{ item.name }}</span>
            <span>{{ item.mobile }}</span>
          </div>
          <div class="mt-1">
            <small class="text-muted">{{ item.info }}</small>
          </div>
        </div>
        <div
          class="col-2 pl-0 pr-0 pt-2 text-muted text-center"
          @click="goToUpdateAddress(item , i)"
        >
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>
    </template>

    <div class="mt-5 text-center" v-if="address.list.length == 0">无地址</div>

    <div class="position-fixed fixed-bottom p-3">
      <a
        href="javascript:;"
        @click="goToUpdateAddressnNew"
        class="btn btn-primary btn-lg btn-block btn-radius-big"
      >+ 新增地址</a>
    </div>
    <div class="p-5"></div>
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

    store.dispatch("mallUserGetAddress", { route });
  },
  computed: {
    address() {
      return this.$store.state.address;
    },
    token() {
      return this.$route.query.token;
    }
  },
  methods: {
    goToUpdateAddress(item, i) {
      console.log(item);
      this.$store.state.address.modify = item;
      this.$store.state.address.modifyIndex = i;

      this.$router.push({
        path: "/user/address/update",
        query: {
          token: this.$route.query.token
        }
      });
    },
    goToUpdateAddressnNew() {
      // console.log(item);
      this.$store.state.address.modify = {
        name: "",
        mobile: "",
        info: "",
        city: ""
      };

      store.state.address.modifyIndex = store.state.address.list.length;
      this.$router.push({
        path: "/user/address/update",
        query: {
          token: this.$route.query.token
        }
      });
    },
    async chooseDefault(i) {
      // console.log(i);
      let addressList = this.address.list;
      if (i == 0) {
        this.address.default = addressList[0];
        history.go(-1);
        return;
      }

      let newAddressList = [];
      addressList.forEach((item, index) => {
        // console.log(index);
        if (index != i) {
          // console.log(index, i);
          newAddressList.push(item);
        }
      });

      // console.log(newAddressList);
      newAddressList.unshift(addressList[i]);

      let data = { address: newAddressList };
      // console.log(data);

      let ret = await Request.post(
        "/api/mall/user/address/update?token=" + this.token,
        data
      );
      // console.log(ret);
      if (ret.code == 0) {
        this.address.default = newAddressList[0];
        history.go(-1);
      }
    }
  }
};
</script>

