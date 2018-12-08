<template>
  <div class="page bg-primary">
    <div class="page-top row">
      <div class="col-2">
        <a href="javascript:history.go(-1);">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="col-8 text-center">产品详情</div>
    </div>

    <div class="row pt-3 pb-3">
      <div class="col-6 text-white">{{ investInfo.name }}</div>
      <div class="col-6 text-right text-white">每日等比收益</div>
    </div>

    <div class="invest-detail-title row bg-white m-3 pt-3 pb-3 rounded shadow-sm">
      <div class="col-12">
        <small class="text-muted">产品投入</small>
      </div>
      <div class="col-12 h1 text-primary mt-2">
        <strong>{{ investDetail.num }}</strong>
      </div>

      <div class="col-4">
        <small class="text-muted">投入总时长</small>
      </div>
      <div class="col-4">
        <small class="text-muted">已奔跑</small>
      </div>
      <div class="col-4">
        <small class="text-muted">剩余时长</small>
      </div>

      <div class="col-4">
        <span class="h3">{{ investDetail.days }}</span>
        <small class="text-muted">天</small>
      </div>
      <div class="col-4">
        <span class="h3">{{ getDays(investDetail.start_time) }}</span>
        <small class="text-muted">天</small>
      </div>
      <div class="col-4">
        <span class="h3">{{ investDetail.days - getDays(investDetail.start_time) }}</span>
        <small class="text-muted">天</small>
      </div>

      <div class="col-12 mt-3">
        <small
          class="text-muted"
        >起止时间:{{ formatTime(investDetail.start_time , 'YYYY-MM-DD')}} - {{ formatTime(investDetail.end_time , 'YYYY-MM-DD')}}</small>
      </div>
    </div>

    <div class="invest-detail-info">
      <div class="h5 text-center text-secondary">收益明细</div>

      <div class="row bg-white m-3 pt-3 pb-3 rounded shadow-sm">
        <div class="col-6">
          <span class="text-muted">预计收益</span>
        </div>
        <div class="col-6 text-right">
          <strong
            class="text-dark"
          >{{ parseInt(investDetail.num * investDetail.days / investDetail.rate / 100 * 100000000) / 100000000 }}</strong>
        </div>
      </div>

      <div class="row bg-white m-3 pt-3 pb-3 rounded shadow-sm">
        <div class="col-6">
          <span class="text-muted">已收益</span>
        </div>
        <div class="col-6 text-right">
          <strong class="text-danger">15</strong>
        </div>
      </div>

      <div class="row bg-white m-3 pt-3 pb-3 rounded shadow-sm">
        <div class="col-6">
          <span class="text-muted">剩余收益</span>
        </div>
        <div class="col-6 text-right">
          <strong class="text-primary">10050.00</strong>
        </div>
      </div>

      <div class="row bg-white m-3 pt-3 pb-3 rounded shadow-sm">
        <div class="col-12"></div>
        <div class="col-12 text-center">
          <span class="text-primary h6">距离丰收又进一步</span>
          <br>
          <small class="text-muted">每天向前迈出一步，总有一天达到目的地</small>
        </div>

        <div class="col-12 text-center">
          <span class="h1 text-primary">{{ getDays(investDetail.start_time) }}</span>
          <small class="text-muted">天</small>
        </div>

        <div class="col-1"></div>
        <div class="col-10">
          <div class="progress mt-3" style="height:5px;">
            <div
              class="progress-bar"
              role="progressbar"
              style="width:5%"
              aria-valuenow="5"
              aria-valuemin="0"
              aria-valuemax="100"
              id="progress-days"
            ></div>
          </div>
        </div>
        <div class="col-1 text-left pl-0">
          <i class="fas fa-map-marker-alt text-muted"></i>
        </div>

        <div class="mt-3 col-12 pt-3">
          <router-link
            :to="{path:'/invest'}"
            class="btn-radius-big btn btn-block btn-lg btn-primary"
          >其他产品</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
export default {
  asyncData({ store, route }) {
    store.dispatch("investDetailGet", { route: route }).then(() => {
      document.getElementById("progress-days").style.width = "25%";
    });
  },
  computed: {
    investDetail() {
      return this.$store.state.investDetail;
    },
    investInfo() {
      return this.$store.state.investInfo;
    },
    token() {
      return this.$route.query.token;
    }
  },
  methods: {
    formatTime(timestamp, format = "YYYY-MM-DD HH:mm") {
      let date = new Date(timestamp * 1000);
      return Moment(date).format(format);
    },
    getDays(timestamp) {
      let now = parseInt(Date.now() / 1000);
      return Math.ceil((now - timestamp) / 24 / 3600);
    },
    getDaysRate(timestamp, days) {
      let now = parseInt(Date.now() / 1000);
      let val = (Math.ceil((now - timestamp) / 24 / 3600) / days) * 100;
      val = val + "%";
    }
  }
};
</script>
