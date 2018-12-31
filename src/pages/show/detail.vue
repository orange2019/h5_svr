<template>
  <div class="page page-top-no-padding">
    <div class="page-top row">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1)" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
    </div>

    <div class>
      <div class="bg-light" id="videoHtml">
        <video
          width="100%"
          controls="controls"
          :poster="videoInfo.cover +  '@!news_cover'"
          preload="preload"
        >
          <source :src="videoInfo.url" type="video/mp4">
        </video>
      </div>
      <div class="row mt-4">
        <div class="col-12">{{ videoInfo.title }}</div>
        <div class="col-12 text-muted mt-2">
          <small>{{ videoInfo.description }}</small>
        </div>
        <div class="col-12 text-black-50 mt-2">
          <small>{{ formatTime(videoInfo.create_time)}}</small>
        </div>
      </div>
    </div>

    <div class="bg-light pt-2 mt-3"></div>
    <div class="row pb-5">
      <div class="col-12 mt-3">相关视频</div>

      <div class="col-12">
        <template v-for="(item,i) in videoList" v-if="i != 0">
          <div class="row mt-3" @click="changeVideo(item)">
            <div class="col-5 pr-0">
              <img :src="item.cover + '@!news_cover'" alt width="100%">
            </div>
            <div class="col-7">
              <div class="text-truncate">{{ item.title}}</div>
              <div class="text-muted text-truncate">
                <small>{{ item.description }}</small>
              </div>
              <div class="text-black-50 mb-2">
                <small>{{ formatTime(item.create_time) }}</small>
              </div>
            </div>
          </div>
        </template>
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
        limit: 0
      };
      store.dispatch("videoListGet", { route, body }).then(ret => {
        store.state.video.info = store.state.video.list[0];
      });
    }

    if (store.state.video.list.length == 5) {
      let body = {
        offset: 5,
        limit: 100
      };
      store.dispatch("videoListGet", { route, body });
    }
  },
  data() {
    return {
      // videoInfo: {
      //   cover: "",
      //   url: "https://vjs.zencdn.net/v/oceans.mp4"
      // }
    };
  },
  computed: {
    videoList() {
      return this.$store.state.video.list;
    },
    videoInfo() {
      return this.$store.state.video.info;
    },
    videoHtml() {}
  },
  methods: {
    formatTime(timestamp, format = "YYYY-MM-DD HH:mm") {
      let date = new Date(timestamp * 1000);
      return Moment(date).format(format);
    },
    changeVideo(video) {
      console.log("change video", video);
      this.$store.state.video.info = video;

      document.getElementById("videoHtml").innerHTML =
        `<video width="100%" controls="controls" poster="` +
        video.cover +
        "@!news_cover" +
        `" preload="preload">
          <source src="${video.url}" type="video/mp4">
        </video>`;
    }
  }
};
</script>
