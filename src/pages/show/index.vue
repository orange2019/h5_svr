<template>
  <div class="page bg-primary">
    <div class="page-top page-new-list-top row bg-primary">
      <div class="text-center col-12">细胞展厅</div>
    </div>
    <v-touch @swipeleft="onSwipeLeft" @swiperight="onSwipeRight">
      <div class="p-5 m-3 show-box">
        <div class="show-box-0 bg-secondary" style="height:300px;">
          <img :src="getVideoCover(videoList[0])" alt width="100%" height="300px">
        </div>
        <div class="show-box-1 bg-secondary" style="height:260px;">
          <img :src="getVideoCover(videoList[2])" alt width="100%" height="260px">
        </div>
        <div class="show-box-2 bg-secondary" style="height:260px;">
          <img :src="getVideoCover(videoList[3])" alt width="100%" height="260px">
        </div>
        <div class="show-box-3 bg-secondary" style="height:220px;">
          <img :src="getVideoCover(videoList[4])" alt width="100%" height="220px">
        </div>
        <div class="show-box-4 bg-secondary" style="height:220px;">
          <img :src="getVideoCover(videoList[5])" alt width="100%" height="220px">
        </div>
      </div>
    </v-touch>

    <div class="show-info" @click="goToDetail">
      <div class="row mt-5">
        <div class="col-12">
          <div class="border-top border-white mb-4"></div>
        </div>
        <div class="col-6 text-warning h5">{{videoInfo.title}}</div>
        <div class="col-6 text-right">
          <small class="text-white">发布时间:{{formatTime(videoInfo.create_time)}}</small>
        </div>
        <div class="col-12 text-white mt-2">{{videoInfo.description}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
export default {
  asyncData({ store, route }) {
    if (store.state.video.list.length == 0) {
      let body = {
        limit: 5
      };
      store.dispatch("videoListGet", { route, body });
    }
  },
  data() {
    return {
      // videoList: ["1", "2", "3", "4", "5"]
    };
  },
  computed: {
    videoList() {
      return this.$store.state.video.list;
    },
    videoInfo() {
      return this.$store.state.video.list[0] || {};
    }
  },
  methods: {
    getVideoCover(video) {
      if (video) {
        return video.cover;
      } else {
        return "";
      }
    },
    formatTime(timestamp, format = "YYYY-MM-DD HH:mm") {
      let date = new Date(timestamp * 1000);
      return Moment(date).format(format);
    },
    onSwipeLeft() {
      console.log("onSwipeLeft ...");
      let list = this.videoList;
      let newList = [];
      for (let index = 0; index < list.length; index++) {
        if (index == list.length - 1) {
          newList[index] = list[0];
        } else {
          newList[index] = list[index + 1];
        }
      }

      console.log("onSwipeRight onSwipeLeft", newList);
      this.$store.state.video.list = newList;
    },
    onSwipeRight() {
      console.log("onSwipeRight ...");

      let list = this.videoList;
      let newList = [];
      for (let index = 0; index < list.length; index++) {
        if (index == 0) {
          newList[index] = list[list.length - 1];
        } else {
          newList[index] = list[index - 1];
        }
      }

      console.log("onSwipeRight onSwipeRight", newList);
      this.$store.state.video.list = newList;
    },
    goToDetail() {
      console.log("goToDetail", this.videoList[0]);
      this.$store.state.video.info = this.videoList[0];
      this.$router.push("/show/info");
    }
  }
};
</script>

