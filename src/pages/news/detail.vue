<template>
  <div class="page page-news-update">
    <h3 class="text-center">{{ newsData.title }}</h3>
    <hr>
    <div class="text-right">
      <time>{{ newsData.post_time.replace('T' , ' ') }}</time>
    </div>
    <div class="news-content mt-5" v-html="newsData.content" >
    </div>
  </div>
</template>

<script>
  import Request from "./../../api/common/request";
  import Moment from "moment";
  export default {
    asyncData({
      store,
      route
    }) {
  
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
