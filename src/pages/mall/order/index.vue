<template>
  <div class="page bg-light">
    <div class="page-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1)" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="text-center col-8">订单列表</div>
    </div>

    <div class="bg-white text-center text-muted">
      <!-- <div class="col-2 pt-3 pb-3 pl-0 pr-0">全部</div>
      <div class="col-2 pt-3 pb-3 pl-0 pr-0">待付款</div>
      <div class="col-2 pt-3 pb-3 pl-0 pr-0">待发货</div>
      <div class="col-2 pt-3 pb-3 pl-0 pr-0">待收货</div>
      <div class="col-2 pt-3 pb-3 pl-0 pr-0">已完成</div>-->
      <ul class="nav nav-order">
        <li class="nav-item" @click="chooseStatusAll">
          <a class="nav-link text-primary" href="javascript:;" v-if="quertStatus == 'all'">全部</a>
          <a class="nav-link" href="javascript:;" v-else>全部</a>
        </li>
        <li class="nav-item" @click="chooseStatus(1)">
          <a class="nav-link text-primary" href="javascript:;" v-if="quertStatus == 1">待付款</a>
          <a class="nav-link" href="javascript:;" v-else>待付款</a>
        </li>
        <li class="nav-item" @click="chooseStatus(2)">
          <a class="nav-link text-primary" href="javascript:;" v-if="quertStatus == 2">待发货</a>
          <a class="nav-link" href="javascript:;" v-else>待发货</a>
        </li>
        <li class="nav-item" @click="chooseStatus(3)">
          <a class="nav-link text-primary" href="javascript:;" v-if="quertStatus == 3">待收货</a>
          <a class="nav-link" href="javascript:;" v-else>待收货</a>
        </li>
        <li class="nav-item" @click="chooseStatus(0)">
          <a class="nav-link text-primary" href="javascript:;" v-if="quertStatus == 0">已完成</a>
          <a class="nav-link" href="javascript:;" v-else>已完成</a>
        </li>
      </ul>
    </div>

    <div class="mt-2 bg-white" v-for="item in list">
      <div class="row pt-3">
        <div class="col-9">
          <span>订单号:</span>
          <small class="text-muted">{{ item.order_no }}</small>
        </div>
        <div class="col-3 text-right">
          <small class="text-primary" v-if="item.status == 1">待付款</small>
          <small class="text-warning" v-if="item.status == 2">待发货</small>
          <small class="text-danger" v-if="item.status == 3">待收货</small>
          <small class="text-info" v-if="item.status == 0">已完成</small>
          <small class="text-muted" v-if="item.status == -1">已取消</small>
        </div>
      </div>
      <hr>
      <div class="row pb-3" v-for="goods in item.goods_items">
        <div class="col-3">
          <img :src="goods.cover" alt width="100%" height="70">
        </div>
        <div class="col-9">
          <div class>{{ goods.name }}</div>
          <div class="row mt-3">
            <div class="col-8 text-danger pl-0">{{ goods.price }}</div>
            <div class="col-4 text-right pr-0">
              <span class="badge badge-light">{{ goods.count }}</span>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="text-right pr-3 pb-3">
        <span>共 {{getOrderNo(item.goods_items)}} 件商品,</span>
        <span>
          合计:
          <span class="text-danger">{{ item.amount }}</span>
        </span>
      </div>
      <div class="row pb-3">
        <div class="col-8">
          <small class="text-muted">下单时间: {{ formatTime(item.create_time )}}</small>
        </div>
        <div class="col-4 text-right">
          <router-link
            :to="{path:'/mall/order/info' , query: {token: token, order_id: item.id}}"
            v-html="getOrderActionName(item.status)"
          ></router-link>
        </div>
      </div>
    </div>

    <div v-if="list.length == 0" class="text-muted text-center mt-5">{{listErrMsg}}</div>
    <div v-else class="text-center mt-5" id="btn-choose-more">
      <a href="javascript:;" @click="chooseMore">查看更多</a>
    </div>

    <div class="p-5"></div>
  </div>
</template>

<script>
import Moment from "moment";
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

    let body = {};
    if (route.query.status) {
      body.status = route.query.status;
    }
    store.dispatch("mallOrderListGet", { route: route, body: body });
  },
  data() {
    return {
      listErrMsg: "无订单"
    };
  },
  computed: {
    token() {
      return this.$route.query.token;
    },
    list() {
      return this.$store.state.order.list;
    },
    quertStatus() {
      return this.$route.query.hasOwnProperty("status")
        ? this.$route.query.status
        : "all";
    }
  },
  methods: {
    formatTime(timestamp, format = "YYYY-MM-DD HH:mm") {
      let date = new Date(timestamp * 1000);
      return Moment(date).format(format);
    },
    getOrderActionName(status) {
      switch (status) {
        case 1:
          return `<span class="btn btn-sm btn-outline-primary btn-block">去支付</span>`;
          break;
        case 3:
          return `<span class="btn btn-sm btn-outline-info btn-block">确认收货</span>`;
          break;
        default:
          return `<span class="btn btn-sm btn-outline-secondary btn-block">查看</span>`;
          break;
      }
    },
    getOrderNo(items) {
      let count = 0;
      items.forEach(item => {
        count += item.count;
      });
      return count;
    },
    chooseMore() {
      let body = {};
      if (this.$route.query.status) {
        body.status = this.$route.query.status;
      }

      this.$store
        .dispatch("mallOrderListGet", {
          route: this.$route,
          body: body
        })
        .then(ret => {
          if (ret.data.rows.length == 0) {
            document.getElementById("btn-choose-more").innerHTML = "无更多";
          }
        });
    },
    chooseStatusAll() {
      this.$store.state.order.list = [];
      this.$store.state.order.offset = 0;

      this.$store.dispatch("mallOrderListGet", {
        route: this.$route,
        body: {}
      });
      this.$router.push({ path: "/mall/order", query: { token: this.token } });
    },
    chooseStatus(status) {
      this.$store.state.order.list = [];
      this.$store.state.order.offset = 0;

      this.$store.dispatch("mallOrderListGet", {
        route: this.$route,
        body: { status: status }
      });
      this.$router.push({
        path: "/mall/order",
        query: { token: this.token, status: status }
      });
    }
  }
};
</script>

