<template>
  <div class="page page-news-list">

    <div v-for="item in items" class="row">
      <div class="col-12">
        <router-link :to="{path: 'news/detail' , query: {news_id: item.id}}">
          <img :src="item.cover" :alt="item.title" width="100%">
          <p class="mt-3 text-muted">{{ item.title }}</p>
        </router-link>
        <hr>
      </div>
      
    </div>
  
  
  </div>
</template>

<script>
  import Request from "./../../api/common/request";
  import Moment from "moment";
  
  export default {
    data() {
      return {
      };
    },
    asyncData({
      store,
      route
    }) {
      store.dispatch('newsListGet', {
        route: route
      })
    },
    computed: {
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
        return this.$store.state.listCurrentNum
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
