<template>
  <div class="alert-box" :style="style">
    <div class="alert-box-bg"></div>
    <div class="alert-box-content">
      <div class="alert-box-hd">
        <a href="javascript:;" @click="close()" class="text-white">关闭</a>
      </div>
      <div class="alert-box-main">
        <div class="alert-box-icon"></div>
        <div class="alert-box-message mt-3 pb-3" v-html="content"></div>
        <div class="alert-box-close">
          <a
            href="javascript:;"
            @click="close()"
            class="btn btn-primary btn-block btn-lg mt-3"
          >{{closeText}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: "SUCCESS"
    },
    isOpen: {
      type: Number,
      default: 0
    },
    messageType: {
      type: Number,
      default: 0
    },
    closeText: {
      type: String,
      default: "确认"
    }
  },
  data() {
    return {
      style: {
        display: this.isOpen ? "block" : "none"
      }
    };
  },
  watch: {
    isOpen(newVal, oldVal) {
      console.log("=====newVal", newVal);
      if (newVal == 1) {
        this.open();
      } else {
        this.close();
      }
    }
  },
  methods: {
    close() {
      this.style.display = "none";
      this.$emit("closeAction");
    },
    open() {
      this.style.display = "block";
    }
  }
};
</script>

