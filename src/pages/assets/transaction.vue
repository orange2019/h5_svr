<template>
  <div class="page bg-white">
    <div class="page-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1);" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="col-8 text-center">我的账单</div>
      <!-- <div class="col-2">筛选</div> -->
    </div>
    <!-- <div class="row pt-2 pb-2 bg-light">
      <div class="col-3 text-truncate">
        <small class="text-muted">开始时间</small>
      </div>
      <div class="col-3">
        <input type="date" class="border-0 bg-light">
      </div>
      <div class="col-3 text-truncate">
        <small class="text-muted">截止时间</small>
      </div>
      <div class="col-3">
        <input type="date" class="border-0 bg-light">
      </div>
    </div>-->
    <template v-if="userTransactions && userTransactions.length">
      <div class="row mt-2" v-for="item in userTransactions">
        <div class="col-6 pt-2 pb-2">
          <a
            href="javascript:;"
            @click="viewTransactionDetail(item)"
            class="text-dark"
          >{{ userTransactionTypes[item.type] || ''}}</a>
        </div>
        <div class="col-6 pt-2 pb-2 text-right">
          <a href="javascript:;" class="text-dark" @click="viewTransactionDetail(item)">
            <span v-if="item.type == 2 || item.type == 3 || item.type == 4 || item.type == 7">
              <strong class="text-danger">- {{ item.num }}</strong>
            </span>
            <span v-else>
              <strong class>+ {{ item.num }}</strong>
            </span>
          </a>
        </div>
        <div class="col-12">
          <small class="text-muted">{{ formatTime(item.create_time)}}</small>
          <hr>
        </div>
      </div>
      <div class="mt-1 text-center">
        <a href="javascript:;" @click="getMoreList" class="btn btn-link" v-if="more == 1">更多...</a>
        <a href="javascript:;" class="btn btn-link text-muted" v-else>无更多</a>
      </div>
    </template>
    <template v-else>
      <div class="mt-5 text-center text-muted">无数据</div>
    </template>

    <div class="pt-5"></div>
  </div>
</template>

<script>
import Moment from "moment";
export default {
  asyncData({ store, route }) {
    store.dispatch("userTransactionGet", { route: route });
  },
  data() {
    return {
      more: 1
    };
  },
  computed: {
    token() {
      return this.$route.query.token;
    },
    userTransactions() {
      return this.$store.state.userTransactions;
    },
    userTransactionTypes() {
      return this.$store.state.userTransactionTypes;
    }
  },
  methods: {
    formatTime(timestamp, format = "YYYY-MM-DD HH:mm") {
      let date = new Date(timestamp * 1000);
      return Moment(date).format(format);
    },
    viewTransactionDetail(item) {
      this.$store.state.userTransactionDetail = item;
      this.$router.push("/assets/detail");
    },
    getMoreList() {
      this.$store
        .dispatch("userTransactionGet", { route: this.$route })
        .then(ret => {
          if (ret.data.rows.length == 0 || !ret.data.rows) {
            this.more = 0;
          }
        });
    }
  }
};
</script>
