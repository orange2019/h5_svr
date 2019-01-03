<template>
  <div class="page bg-light">
    <div class="page-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1)" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="text-center col-8">订单详情</div>
    </div>

    <div class="row pt-3 bg-white">
      <div class="col-1 pr-0">
        <small class="text-muted">
          <i class="fas fa-map-marker-alt"></i>
        </small>
      </div>
      <div class="col-9">
        <span class>
          {{ address.name }}
          <small>&nbsp;{{ address.mobile }}</small>
        </span>
        <div class="text-truncate">
          <small>{{ address.info }}</small>
        </div>
      </div>

      <!-- <div class="col-2 pr-0 text-right">
          <router-link
            :to="{path: '/user/address' ,query: {token : token}}"
            class="pr-3 d-block text-muted"
          >
            <i class="fas fa-chevron-right"></i>
          </router-link>
      </div>-->
      <div class="col-12">
        <div class="pb-3"></div>
      </div>
    </div>

    <div class="mt-2 bg-white">
      <!-- <div class="row pt-3">
          <div class="col-9">
            <span>订单号:</span>
            <small class="text-muted">102020409329588</small>
          </div>
          <div class="col-3 text-right">
            <small class="text-primary">待支付</small>
          </div>
        </div>
      <hr>-->
      <div
        class="row pt-3 pb-3"
        v-for="item in orderInfo.goods_items"
        v-if="orderInfo.goods_items && orderInfo.goods_items.length"
      >
        <div class="col-3">
          <img :src="item.cover" alt width="100%" height="60">
        </div>
        <div class="col-9">
          <div class>{{ item.name }}</div>
          <div class="row mt-3">
            <div class="col-8 text-danger pl-0">{{ item.price }}</div>
            <div class="col-4 text-right pr-0">
              <span class="badge badge-light">{{ item.count }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="row pt-3 pb-3">
          <div class="col-6">运费</div>
          <div class="col-6 text-right">600.00</div>
      </div>-->
      <div class="row pt-3 pb-3">
        <div class="col-6">运费</div>
        <div class="col-6 text-right text-danger">{{ orderInfo.amount_logistics }}</div>
      </div>
      <div class="row pt-3 pb-3">
        <div class="col-6">总计</div>
        <div class="col-6 text-right text-danger">{{ orderInfo.amount + orderInfo.amount_logistics }}</div>
      </div>
    </div>

    <div class="row mt-2 bg-white pt-3 pb-3 border-bottom">
      <div class="col-6">支付方式</div>
      <div class="col-6 text-right">
        <span class="text-muted">积分支付</span>
      </div>
    </div>
    <div class="row mt-2 bg-white pt-3 pb-3">
      <div class="col-2">备注</div>
      <div class="col-10 text-right">
        <span class="text-muted">
          <textarea
            cols="3"
            class="form-control bg-light"
            v-if="orderInfo.remark"
            readonly
            v-model="orderInfo.remark"
          ></textarea>
          <textarea cols="3" class="form-control bg-light" v-model="postData.remark" v-else></textarea>
        </span>
      </div>
    </div>

    <div class="row pt-5 pb-5 bg-white">
      <div class="col-12" v-if="orderInfo.status == 1">
        <a
          href="javascript:;"
          class="btn btn-primary btn-lg btn-radius-big btn-block"
          @click="orderPay"
        >支付</a>
        <a
          href="javascript:;"
          class="btn btn-danger btn-lg btn-radius-big btn-block"
          @click="orderCancel"
        >取消</a>

        <div class="mt-3 text-center" v-html="errMsg"></div>
      </div>
      <div class="col-12" v-if="orderInfo.status == 3">
        <a
          href="javascript:;"
          class="btn btn-info btn-lg btn-radius-big btn-block"
          @click="orderConfirm"
        >确认收货</a>
      </div>
    </div>
    <div class="p-5"></div>

    <number-keyboard
      :isOpen="orderPaySubmit.isOpen"
      :message="orderPaySubmit.msg"
      :title="orderPaySubmit.title"
      @close="orderPaySubmitClose"
      @submit="orderPaySubmitRequest"
    ></number-keyboard>
  </div>
</template>

<script>
import Request from "./../../../api/common/request.js";
import MD5 from "md5.js";
export default {
  asyncData({ store, route }) {
    store.dispatch("mallOrderInfoGet", {
      route: route,
      body: {
        order_id: route.query.order_id
      }
    });

    // store.dispatch("mallUserGetAddress", { route });
  },
  data() {
    return {
      postData: {
        remark: ""
      },
      orderPaySubmit: {
        isOpen: 0,
        msg: "",
        title: "确认支付"
      },
      errMsg: ""
    };
  },
  computed: {
    token() {
      return this.$route.query.token || "";
    },
    orderInfo() {
      return this.$store.state.order.info;
    },
    address() {
      return this.$store.state.order.info.address || {};
    }
  },
  methods: {
    async orderCancel() {
      let ret = await Request.post(
        "/api/mall/order/cancel?token=" + this.token,
        {
          order_id: this.orderInfo.id
        }
      );

      if (ret.code == 0) {
        this.errMsg = "取消成功";
        setTimeout(() => {
          this.$store.state.order.list = [];
          this.$store.state.order.offset = 0;
          this.$router.push({
            path: "/mall/order",
            query: {
              token: this.token
            }
          });
        }, 100);
      } else {
        this.errMsg = ret.message;
      }
    },
    async orderConfirm() {
      let ret = await Request.post(
        "/api/mall/order/cancel?token=" + this.token,
        {
          order_id: this.orderInfo.id
        }
      );

      if (ret.code == 0) {
        this.errMsg = "确认成功";
        setTimeout(() => {
          this.$store.state.order.list = [];
          this.$store.state.order.offset = 0;
          this.$router.push({
            path: "/mall/order",
            query: {
              token: this.token
            }
          });
        }, 100);
      } else {
        this.errMsg = ret.message;
      }
    },

    orderPay() {
      this.orderPaySubmit.isOpen = 1;
      this.orderPaySubmit.msg =
        `<div class="text-danger h4">` + (this.orderInfo.amount + this.orderInfo.amount_logistics) +  `</div>`;
    },
    orderPaySubmitClose() {
      this.orderPaySubmit.isOpen = 0;
    },
    async orderPaySubmitRequest(val) {
      let password = new MD5().update(val).digest("hex");
      console.log("orderPaySubmitRequest password", password);
      this.orderPaySubmit.msg = `<small class="text-muted">提交中...</small>`;

      let ret = await Request.post("/api/mall/order/pay?token=" + this.token, {
        password: password,
        order_id: this.orderInfo.id,
        remark: this.postData.remark
      });
      console.log("orderPaySubmitRequest ret", ret);
      if (ret.code == 0) {
        this.orderPaySubmit.msg = "支付成功";

        setTimeout(() => {
          this.setTradePwbIsOpen = 0;

          this.$store.state.order.list = [];
          this.$store.state.order.offset = 0;
          this.$router.push({
            path: "/mall/order",
            query: {
              token: this.token,
              status: 2
            }
          });
        }, 1500);
      } else {
        this.orderPaySubmit.msg = `<small class="text-danger">支付失败，${
          ret.message
        }</small>`;
      }
    }
  }
};
</script>

