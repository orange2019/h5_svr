<template>
  <div class="number-keyboard" :style="style">
    <div class="text-right p-3">
      <a href="javascript:;" @click="btnClose">关闭</a>
    </div>

    <div class="mt-5 p-5 text-center">
      <div v-html="title"></div>
      <div class="mt-3">
        <div class="text-center" v-html="message"></div>
      </div>
    </div>
    <div class="box">
      <div class="row text-center pt-2 pb-2">
        <div class="col-2 p-2">
          <div class="border pt-2 pb-2 rounded">{{ numbers[0] || '&nbsp;'}}</div>
        </div>
        <div class="col-2 p-2">
          <div class="border pt-2 pb-2 rounded">{{ numbers[1] || '&nbsp;'}}</div>
        </div>
        <div class="col-2 p-2">
          <div class="border pt-2 pb-2 rounded">{{ numbers[2] || '&nbsp;'}}</div>
        </div>
        <div class="col-2 p-2">
          <div class="border pt-2 pb-2 rounded">{{ numbers[3] || '&nbsp;'}}</div>
        </div>
        <div class="col-2 p-2">
          <div class="border pt-2 pb-2 rounded">{{ numbers[4] || '&nbsp;'}}</div>
        </div>
        <div class="col-2 p-2">
          <div class="border pt-2 pb-2 rounded">{{ numbers[5] || '&nbsp;'}}</div>
        </div>
      </div>

      <div class="bg-light pt-2"></div>

      <div class="row text-center">
        <div class="col-4 pl-0 pr-0 pt-3 pb-3 border-bottom border-right" @click="add(1)">
          <strong>1</strong>
        </div>
        <div class="col-4 pl-0 pr-0 pt-3 pb-3 border-bottom border-right" @click="add(2)">
          <strong>2</strong>
        </div>
        <div class="col-4 pl-0 pr-0 pt-3 pb-3 border-bottom" @click="add(3)">
          <strong>3</strong>
        </div>
        <div class="col-4 pl-0 pr-0 pt-3 pb-3 border-bottom border-right" @click="add(4)">
          <strong>4</strong>
        </div>
        <div class="col-4 pl-0 pr-0 pt-3 pb-3 border-bottom border-right" @click="add(5)">
          <strong>5</strong>
        </div>
        <div class="col-4 pl-0 pr-0 pt-3 pb-3 border-bottom" @click="add(6)">
          <strong>6</strong>
        </div>
        <div class="col-4 pl-0 pr-0 pt-3 pb-3 border-bottom border-right" @click="add(7)">
          <strong>7</strong>
        </div>
        <div class="col-4 pl-0 pr-0 pt-3 pb-3 border-bottom border-right" @click="add(8)">
          <strong>8</strong>
        </div>
        <div class="col-4 pl-0 pr-0 pt-3 pb-3 border-bottom" @click="add(9)">
          <strong>9</strong>
        </div>
        <div class="col-4 pl-0 pr-0 pt-3 pb-3 border-bottom border-right bg-light"></div>
        <div class="col-4 pl-0 pr-0 pt-3 pb-3 border-bottom border-right" @click="add(0)">
          <strong>0</strong>
        </div>
        <div class="col-4 pl-0 pr-0 pt-3 pb-3 border-bottom bg-light" @click="del">
          <strong>del</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pwd: {
      type: String,
      default: ""
    },
    isOpen: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: "验证身份"
    },
    message: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      numbers: [],
      trueNumber: "",
      style: {
        display: "none"
      }
    };
  },
  watch: {
    isOpen(newVal, oldVal) {
      console.log("isOpen======", newVal);
      if (newVal == 1) {
        this.open();
      } else {
        this.close();
      }
    },
    message(newVal, oldVal) {
      this.message = newVal;
    }
  },
  computed: {},
  methods: {
    add(number) {
      if (this.numbers.length < 6) {
        this.numbers.push("*");
        this.trueNumber = this.trueNumber + number.toString();
        console.log(this.trueNumber);
        // this.pwd = this.trueNumber;
        // this.$emit("setPwd", this.trueNumber);
      }

      if (this.trueNumber.length == 6) {
        this.$emit("submit", this.trueNumber);
      }
    },
    del() {
      this.numbers.pop();
      let trueNumber = "";
      let trueNumberArr = this.trueNumber.split("");
      for (let index = 0; index < trueNumberArr.length - 1; index++) {
        trueNumber += trueNumberArr[index].toString();
      }
      this.trueNumber = trueNumber;
      // this.$emit("setPwdClose", this.trueNumber);
    },
    open() {
      this.style.display = "block";
      this.numbers = [];
      this.trueNumber = "";
    },
    close() {
      this.style.display = "none";
      this.numbers = [];
      this.trueNumber = "";
    },
    btnClose() {
      this.$emit("close");
    }
  }
};
</script>
