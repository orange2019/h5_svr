<template>
  <div class="page bg-white">
    <div class="page-top bg-primary row">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1);" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="text-center col-8">产品详情</div>
    </div>

    <div class="page-invest-list">
      <div class="row mt-3 bg-white pt-3 pb-3">
        <div class="col-6">{{ investInfo.name }}</div>
        <div class="col-6 text-right">每日等比收益</div>
        <div class="col-12 mt-3">
          <hr>
        </div>
        <div class="col-3 text-left">
          <div class>
            <span class="text-orange invest-item-rate">{{ investInfo.rate }}</span>
            <small class="text-muted">%</small>
          </div>
          <div class="text-muted">
            <small>收益率</small>
          </div>
        </div>
        <div class="col-3 text-center">
          <div class>
            <span>{{ investInfo.days }}</span>
            <small class="text-muted">天</small>
          </div>
          <div class="text-muted">
            <small>期限</small>
          </div>
        </div>
        <div class="col-3 text-center">
          <div class>
            <span>{{ investInfo.num / 10000 }}</span>
            <small class="text-muted">万</small>
          </div>
          <div class="text-muted">
            <small>细胞通证</small>
          </div>
        </div>

        <div class="col-12 mt-5 pt-5" v-if="isSetTradePwd == 1">
          <router-link
            :to="{path:'/invest/confirm' , query: {token: token , invest_id: investId }}"
            class="btn-radius-big btn btn-block btn-lg btn-primary"
          >立即投入</router-link>
        </div>
        <div class="col-12 mt-5 pt-5" v-else>
          <a href="javascript:;" class="btn-radius-big btn btn-block btn-lg btn-secondary">立即投入</a>
          <div class="mt-3 text-muted text-center">还未设置交易密码，请到 [资产] 栏目中进行设置</div>
        </div>
      </div>
    </div>

    <alert-box
      :isOpen="alertBoxObj.isOpen"
      :messageType="alertBoxObj.type"
      :content="alertBoxObj.content"
      :closeText="alertBoxObj.closeText"
      @closeAction="alertBoxClose()"
    ></alert-box>
  </div>
</template>

<script>
export default {
  asyncData({ store, route }) {
    store.dispatch("investInfoGet", { route: route });
  },
  data() {
    return {
      alertBoxObj: {
        type: 0,
        isOpen: 0,
        message: "SUCCESS",
        closeText: "确认"
      }
    };
  },
  computed: {
    investInfo() {
      return this.$store.state.investInfo;
    },
    token() {
      return this.$route.query.token;
    },
    investId() {
      return this.$route.query.invest_id;
    },
    isSetTradePwd() {
      return this.$store.state.isSetTradePwd;
    }
  },
  methods: {
    alertBox(
      isOpen = 0,
      type = 0,
      message = "SUCCESS",
      closeText = "确认",
      cb = () => {}
    ) {
      this.alertBoxObj.type = type;
      this.alertBoxObj.isOpen = isOpen;
      this.alertBoxObj.message = message;
      this.alertBoxObj.closeText = closeText;
      cb();
    },
    alertBoxClose() {
      this.alertBoxObj.isOpen = 0;
    }
  }
};
</script>