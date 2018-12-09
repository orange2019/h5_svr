<template>
  <div class="alert-box" :style="style">
    <div class="alert-box-bg"></div>
    <div class="alert-box-content">
      <div class="alert-box-hd">
        <a
          v-if="closeText != ''"
          href="javascript:;"
          @click="close()"
          class="text-white alert-box-close"
        >&nbsp;</a>
      </div>
      <div class="alert-box-main">
        <div class="alert-box-icon success text-center" v-if="messageType == 0">
          <img src="./../images/icon/alert-box-success.png" alt width="60%">
        </div>
        <div class="alert-box-icon fail text-center" v-if="messageType == 1">
          <img src="./../images/icon/alert-box-fail.png" alt width="60%">
        </div>
        <div class="alert-box-message mt-3 pb-3" v-html="content"></div>
        <div class="alert-box-close">
          <a
            v-if="closeText != ''"
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

