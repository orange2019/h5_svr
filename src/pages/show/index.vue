<template>
  <div class="page bg-primary">
    <div class="page-top page-new-list-top row bg-primary">
      <div class="text-center col-12">细胞展厅</div>
    </div>
    <v-touch @swipeleft="onSwipeLeft" @swiperight="onSwipeRight">
      <div class="p-5 m-3 show-box">
        <div class="show-box-0 bg-secondary" style="height:300px;" id="show-box-0">
          <img :src="getVideoCover(videoList[0])" alt width="100%" height="292px">
        </div>
        <div class="show-box-1 bg-secondary" style="height:260px;">
          <img :src="getVideoCover(videoList[1])" alt width="100%" height="252px">
        </div>
        <div class="show-box-2 bg-secondary" style="height:260px;">
          <img :src="getVideoCover(videoList[2])" alt width="100%" height="252px">
        </div>
        <div class="show-box-3 bg-secondary" style="height:220px;">
          <img :src="getVideoCover(videoList[3])" alt width="100%" height="212px">
        </div>
        <div class="show-box-4 bg-secondary" style="height:220px;">
          <img :src="getVideoCover(videoList[4])" alt width="100%" height="212px">
        </div>
      </div>
    </v-touch>

    <div class="show-info" @click="goToDetail">
      <div class="row mt-5">
        <div class="col-12">
          <div class="border-top border-white mb-4"></div>
        </div>
        <div class="col-6 text-warning h5 text-truncate">{{videoInfo.title}}</div>
        <div class="col-6 text-right pl-0">
          <small class="text-white">发布时间:{{formatTime(videoInfo.create_time)}}</small>
        </div>
        <div class="col-12 text-white mt-2">{{videoInfo.description}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
import ArrUtils from "./../../utils/arr.js";

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
        return video.cover + "@!video_cover";
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
      document.getElementById('show-box-0').style.animation = 'swipeLeft 0.5s'
      
      setTimeout(() => {
        document.getElementById('show-box-0').style.animation = 'none'

        let list = this.videoList;
        let newList = ArrUtils.moveLeft(list);

        console.log("onSwipeRight onSwipeLeft", newList);
        this.$store.state.video.list = newList;
      } , 500)
    },
    onSwipeRight() {
      console.log("onSwipeRight ...");
      document.getElementById('show-box-0').style.animation = 'swipeRight 0.5s'
      
      setTimeout(() => {
        let list = this.videoList;
        let newList = ArrUtils.moveRight(list);
        console.log("onSwipeRight onSwipeRight", newList);
        this.$store.state.video.list = newList;

        document.getElementById('show-box-0').style.animation = 'none'

      } , 500)
    },
    goToDetail() {
      console.log("goToDetail", this.videoList[0]);
      this.$store.state.video.info = this.videoList[0];
      this.$router.push("/show/info");
    }
  }
};
</script>

