import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from './pages/main.vue'
import NewsList from './pages/news/list.vue'
import NewsDetail from './pages/news/detail.vue'
import Invest from './pages/invest/index.vue'
import InvestList from './pages/invest/list.vue'
import InvestDetail from './pages/invest/detail.vue'
import InvestApply from './pages/invest/apply.vue'
import InvestConfirm from './pages/invest/confirm.vue'
import Assets from './pages/assets/index.vue'
import AssetsTransaction from './pages/assets/transaction.vue'
import AssetsDetail from './pages/assets/detail.vue'
import AssetsIn from './pages/assets/in.vue'
import AssetsOut from './pages/assets/out.vue'
import AssetsOutLogs from './pages/assets/outLogs.vue'
import AssetsTeam from './pages/assets/team.vue'
import AssetsTeamInfo from './pages/assets/teamInfo.vue'
import AssetsTransfer from './pages/assets/transfer.vue'
import AssetsScore from './pages/assets/score.vue'
import AuthError from './pages/auth/error.vue'
import Invite from './pages/invite/index.vue'
import InviteList from './pages/invite/list.vue'
import InviteDownload from './pages/invite/download.vue'
import ResetPwd from './pages/auth/resetPwd.vue'
import ResetMobile from './pages/auth/resetMobile.vue'
import ResetPwdA from './pages/auth/resetPwdA.vue'
import ResetMobileA from './pages/auth/resetMobileA.vue'
import Register from './pages/auth/register.vue'
import ResetTradePwd from './pages/auth/resetTradePwd.vue'
import Show from './pages/show/index.vue'
import ShowInfo from './pages/show/detail.vue'
import Mall from './pages/mall/index.vue'
import MallGoods from './pages/mall/goods/index.vue'
import MallCart from './pages/mall/cart/index.vue'
import MallCartConfirm from './pages/mall/cart/confirm.vue'
import MallOrder from './pages/mall/order/index.vue'
import MallOrderInfo from './pages/mall/order/info.vue'
import UserCenter from './pages/user/index.vue'
import UserAddress from './pages/user/address.vue'
import UserAddressUpdate from './pages/user/addressUpdate.vue'

let routes = [{
		path: '/',
		component: Home
	},

	{
		path: '/news',
		component: NewsList
	},
	{
		path: '/news/detail',
		component: NewsDetail
	},
	{
		path: '/invest',
		component: Invest
	},
	{
		path: '/invest/list',
		component: InvestList
	},
	{
		path: '/invest/detail',
		component: InvestDetail
	},
	{
		path: '/invest/apply',
		component: InvestApply
	},
	{
		path: '/invest/confirm',
		component: InvestConfirm
	},
	{
		path: '/assets',
		component: Assets
	},
	{
		path: '/assets/transaction',
		component: AssetsTransaction
	},
	{
		path: '/assets/detail',
		component: AssetsDetail
	},
	{
		path: '/assets/in',
		component: AssetsIn
	},
	{
		path: '/assets/out',
		component: AssetsOut
	},
	{
		path: '/assets/outLogs',
		component: AssetsOutLogs
	},
	{
		path: '/assets/transfer',
		component: AssetsTransfer
	},
	{
		path: '/assets/team',
		component: AssetsTeam
	},
	{
		path: '/assets/score',
		component: AssetsScore
	},
	{
		path: '/assets/teamInfo',
		component: AssetsTeamInfo
	},
	{
		path: '/auth/err',
		component: AuthError
	},
	{
		path: '/invite',
		component: Invite
	},
	{
		path: '/invite/download',
		component: InviteDownload
	},
	{
		path: '/invite/list',
		component: InviteList
	},
	{
		path: '/resetPwd',
		component: ResetPwd
	},
	{
		path: '/resetPwdA',
		component: ResetPwdA
	},
	{
		path: '/resetTradePwd',
		component: ResetTradePwd
	},
	{
		path: '/resetMobile',
		component: ResetMobile
	},
	{
		path: '/resetMobileA',
		component: ResetMobileA
	},
	{
		path: '/register',
		component: Register
	},

	//商城部分了

	{
		path: '/show',
		component: Show
	},

	{
		path: '/show/info',
		component: ShowInfo
	},
	{
		path: '/mall',
		component: Mall
	},
	{
		path: '/mall/goods',
		component: MallGoods
	},
	{
		path: '/mall/cart',
		component: MallCart
	},
	{
		path: '/mall/cart/confirm',
		component: MallCartConfirm
	},
	{
		path: '/mall/order',
		component: MallOrder
	},
	{
		path: '/mall/order/info',
		component: MallOrderInfo
	},

	{
		path: '/user',
		component: UserCenter
	},
	{
		path: '/user/address',
		component: UserAddress
	},
	{
		path: '/user/address/update',
		component: UserAddressUpdate
	},


]

export function createRouter() {
	return new Router({
		mode: 'history',
		routes: routes

	})
}