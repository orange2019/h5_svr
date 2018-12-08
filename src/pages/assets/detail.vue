<template>
  <div class="page bg-white">
    <div class="page-top row bg-primary">
      <div class="col-2">
        <a href="javascript:history.go(-1);">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="col-8 text-center">账单详情</div>
    </div>

    <div class="text-center mt-5">
      <div class>图标</div>
      <div class="mt-2">{{ userTransactionTypes[userTransactionDetail.type]}}</div>
      <div class="mt-2">
        <strong class="h4">{{ userTransactionDetail.num }}</strong>
      </div>
      <div class="p-3">
        <hr>
      </div>
    </div>

    <div class="row">
      <div class="col-4">当前状态</div>
      <div class="col-8">{{ userTransactionTypes[userTransactionDetail.type]}} 完成</div>
    </div>

    <div class="row mt-3">
      <div class="col-4">交易时间</div>
      <div class="col-8">{{ formatTime(userTransactionDetail.create_time) }}</div>
    </div>

    <div class="row mt-3" v-if="userTransactionDetail.hash">
      <div class="col-4">交易单号</div>
      <div class="col-8 text-wrap-break">{{ userTransactionDetail.hash }}</div>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
export default {
  computed: {
    token() {
      return this.$route.query.token;
    },
    userTransactionDetail() {
      return this.$store.state.userTransactionDetail;
    },
    userTransactionTypes() {
      return this.$store.state.userTransactionTypes;
    }
  },
  methods: {
    formatTime(timestamp, format = "YYYY-MM-DD HH:mm") {
      let date = new Date(timestamp * 1000);
      return Moment(date).format(format);
    }
  }
};
</script>
