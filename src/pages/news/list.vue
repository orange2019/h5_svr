<template>
  <div class="page">
    <div class="page-top page-new-list-top row bg-primary">
      <div class="text-center col-12">资讯列表</div>
    </div>
    <div class="page-sub-nav row border-bottom">
      <div class="col-3 offset-3">
        <a
          href="javascript:;"
          @click="changeCategory('notice')"
          :class="{active : active.notice}"
        >官方公告</a>
      </div>
      <div class="col-3">
        <a
          href="javascript:;"
          @click="changeCategory('industry')"
          :class="{active : active.industry}"
        >行业资讯</a>
      </div>
    </div>
    <div class="bg-light pt-2"></div>

    <div v-for="item in items" class="row page-news-list pt-2 pb-2 border-bottom">
      <div class="col-4">
        <router-link :to="{path: 'news/detail' , query: {news_id: item.id}}">
          <img :src="item.cover + '@!news_cover'" :alt="item.title" width="100%">
        </router-link>
      </div>
      <div class="col-7">
        <h3 class="news-list-item-title">
          <router-link :to="{path: 'news/detail' , query: {news_id: item.id}}">{{ item.title }}</router-link>
        </h3>
        <small class="time">
          <i class="far fa-clock"></i>
          {{ formatTime(item.post_time , 'YYYY-MM-DD') }}
        </small>
      </div>
    </div>

    <div class="pt-5">&nbsp;</div>
  </div>
</template>

<script>
import Request from "./../../api/common/request";
import Moment from "moment";

export default {
  data() {
    return {};
  },
  asyncData({ store, route }) {
    route.query.category = route.query.category || "NOTICE";
    route.query.type = route.query.type || 1;
    store.dispatch("newsListGet", {
      route: route
    });

    let category = route.query.category.toLowerCase() || "notice";
    Object.keys(store.state.newsCategory).forEach(key => {
      if (category == key) {
        store.state.newsCategory[key] = true;
      } else {
        store.state.newsCategory[key] = false;
      }
    });
  },
  computed: {
    active() {
      return this.$store.state.newsCategory;
    },
    items() {
      return this.$store.state.listItems;
    },
    count() {
      return this.$store.state.listCount;
    },
    size() {
      return this.$store.state.listLimit;
    },
    currentPage() {
      return this.$store.state.listCurrentNum;
    }
  },
  methods: {
    formatTime(timestamp, format = "YYYY-MM-DD HH:mm") {
      let date = new Date(timestamp * 1000);
      return Moment(date).format(format);
    },
    changeCategory(category) {
      let type = this.$route.query.type || 1;
      this.$router.push({
        path: "/news",
        query: { category: category, type: type }
      });

      let route = this.$route;
      route.query.category = category;
      this.$store.dispatch("newsListGet", {
        route: route
      });
      Object.keys(this.$store.state.newsCategory).forEach(key => {
        if (category == key) {
          this.$store.state.newsCategory[key] = true;
        } else {
          this.$store.state.newsCategory[key] = false;
        }
      });
    }
  }
};
</script>
