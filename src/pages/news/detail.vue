<template>
  <div class="page page-news-detail">
    <div class="page-top page-new-list-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1)" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="text-center col-8">新闻详情</div>
    </div>
    <div class="page-news-title bg-white p-3">
      <h3 class="text-left">{{ newsData.title }}</h3>
      <time class="text-muted text-xs">{{ newsData.post_time.replace('T' , ' ') }}</time>
    </div>

    <div class="mt-3 bg-white p-3 page-new-content">
      <div class="news-content mt-5" v-html="newsData.content"></div>
    </div>
  </div>
</template>

<script>
import Request from "./../../api/common/request";
import Moment from "moment";
export default {
  asyncData({ store, route }) {
    let newsId = route.query.news_id || 0;

    if (newsId) {
      Request.get("/api/newsDetail", {
        news_id: newsId
      }).then(ret => {
        console.log("request news detail", ret);
        store.state.newsData = ret.data;
      });
    } else {
      store.state.newsData = {
        id: "",
        title: "",
        description: "",
        post_time: "",
        content: "",
        cover: "",
        status: 1,
        type: 0,
        category: "",
        sort: 0
      };
    }
  },
  data() {
    return {};
  },
  computed: {
    newsData() {
      return this.$store.state.newsData;
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
