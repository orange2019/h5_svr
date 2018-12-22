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
        <video width="100%" controls="controls" :poster="videoInfo.cover" preload="preload">
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
            <div class="col-5 pr-0 bg-light">
              <img src alt width="100%" height="100%">
            </div>
            <div class="col-7">
              <div class="mt-2">{{ item.title}}</div>
              <div class="text-muted mt-2">
                <small>{{ item.description }}</small>
              </div>
              <div class="text-black-50 mt-2 mb-2">
                <small>{{ formatTime(item.create_time) }}</small>
              </div>
            </div>
          </div>
        </template>
        <!-- <div class="row mt-3">
          <div class="col-5 pr-0 bg-light">
            <img src alt width="100%" height="100%">
          </div>
          <div class="col-7">
            <div class="mt-2">视频名称</div>
            <div class="text-muted mt-2">
              <small>秒速</small>
            </div>
            <div class="text-black-50 mt-2 mb-2">
              <small>发布时间</small>
            </div>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
export default {
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
        `" preload="preload">
          <source src="${video.url}" type="video/mp4">
        </video>`;
    }
  }
};
</script>
