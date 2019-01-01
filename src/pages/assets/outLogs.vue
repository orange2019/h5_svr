<template>
  <div class="page bg-light">
    <div class="page-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1);" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="col-8 text-center">提币申请记录</div>
    </div>

    <div class="row mt-2 bg-white pt-3 pb-3" v-for="item in userAssetsOutLogs">
      <div class="col-6">数量: {{ item.num }}</div>
      <div class="col-6 text-right text-muted">{{formatTime(item.create_time)}}</div>
      <div class="col-12 mt-3">
        <span v-if="item.status == 0">未审核</span>
        <span v-if="item.status == 1" class="text-primary">审核通过</span>
        <span v-if="item.status == 2" class="text-danger">审核不通过: {{ item.remark }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
export default {
  asyncData({ store, route }) {
    store.dispatch("userAssetsOutLogsGet", { route });
  },
  computed: {
    userAssetsOutLogs() {
      return this.$store.state.userAssetsOutLogs;
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

