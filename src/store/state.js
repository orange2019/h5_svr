const userTransactionTypes = [
  '',
  '充值',
  '提币',
  '转账',
  '购买产品',
  '产品收益',
  '团队收益',
  '资产冻结',
  '资产解冻',
  '购买产品解冻'
]

export default {
  newsData: {},
  listItems: [],
  listCount: 0,
  listOffset: 0,
  listCurrentNum: 1,
  listLimit: 10,
  newsCategory: {
    notice: true,
    industry: false
  },
  investList: [],
  investInfo: {},
  userCanUseTokenNum: {},
  investUserList: [],
  investDetail: {},
  investDetailSum: 0,
  investDetailTotal: 0,
  investDetailTotalLeave: 0,
  userAssets: {},
  userAssetsOutLogs: [],
  userTransactions: [],
  userTransactionsCount: 0,
  userTransactionsOffset: 0,
  userTransactionTypes: userTransactionTypes,
  userTransactionDetail: {},
  userInvestChild: [],
  userInvestChildCount: 0,
  userInvestChildOffset: 0,
  userInvestChildInfo: {},
  userTeamCount: 0,
  inviteList: [],
  inviteCount: 0,
  inviteInfo: {},
  inviteUser: {},
  tradePwd: '',
  isSetTradePwd: 0,
  // 上面太乱了，从这里分模块 \(^o^)/~

  video: {
    list: [],
    offset: 0,
    limit: 0,
    count: 0,
    info: {}
  },
  mallUser: {
    auth: false,
    info: {}
  },
  cart: {

  },
  cartCheck: {
    itemCheck: [],
    itemCheckVal: {},
    itemCheckTotal: 0,
  },
  mallCategory: [],
  goods: {
    list: [],
    offset: 0,
    limit: 10,
    info: {}
  },
  order: {
    list: [],
    offset: 0,
    limit: 10,
    info: {}
  },
  address: {
    list: [],
    default: {},
    modify: {},
    modifyIndex: 0
  },
  mallBanners: {
    list: [],
    current: 0
  },
  goodsBanners: {
    list: [],
    current: 0
  }

}