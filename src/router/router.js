import Main from '@/views/main/main.vue';
import secondaryView from '@/components/secondary-view.vue';

/**
 * meta属性:
 * 
 * @param {Boolean : false} hideMenu 设置不在左侧菜单显示的路由
 * @param {Array} access 设置路由权限[1,2,3...] 或 ['admin','user'...]
 * @param {Boolean : false} showAlways 设置路由永远显示为二级菜单
 * @param {Boolean : false} hideBreadcrumb 设置不显示在面包屑导航中
 * @param {String : '定向到xxx路由的name'} highlightName 点击该路由后在菜单中高亮重定向
 * 
 */

export default [
	{
	    path: '/mainLogin',
	    name: 'mainLogin',
	    meta: {
	      hideMenu: true,
	    },
	    component: () => import('@/views/login/mainLogin.vue')
	},
	{
	    path: '/login',
	    name: 'login',
	    meta: {
	      hideMenu: true,
	    },
	    component: () => import('@/views/login/login.vue')
	},
	{
		path: '/',
		name: '_home',
	    redirect: '/home',
	    meta: {//里面的参数用来做各种显示效果的判断（关键字段）
	    	title: '首页',
	    },
	    component: Main,
	    children: [
		    {
		    	path: 'home',
		    	name: 'home',
	            meta: {
	            	title: '首页',
	            	icon: 'ios-paper',
			    },
	            component: () => import('@/views/home.vue')
		    }
		]
	},
	
	
	//管理员身份
	{
		path: '/coceralManage',
		name: 'coceralManage',
		meta: {
			title: '商会管理',
			icon: 'md-alarm',
			access: ['admin']
		},
		component: Main,
		children: [
			{
				path: 'createChamber',
				name: 'createChamber',
				meta: {
					title: '创建商会',
					icon: 'md-alarm',
					access: ['admin']
				},
				component: () => import('@/views/chamber/createChamber.vue')
			},
			{
				path: 'postSet',
				name: 'postSet',
				meta: {
					title: '岗位配置',
					icon: 'md-alarm',
					access: ['admin']
				},
				component: () => import('@/views/chamber/postSet.vue')
			},
			{
				path: 'sessionSet',
				name: 'sessionSet',
				meta: {
					title: '届次配置',
					icon: 'md-alarm',
					access: ['admin']
				},
				component: () => import('@/views/chamber/sessionSet.vue')
			},
			{
				path: 'staffSet',
				name: 'staffSet',
				meta: {
					title: '人员配置',
					icon: 'md-alarm',
					access: ['admin']
				},
				component: () => import('@/views/chamber/staffSet.vue')
		  	},
		]
	},
	{
		path: '/memberManage',
		name: 'memberManage',
		meta: {
			title: '会员管理',
			icon: 'md-alarm',
			access: ['admin']
		},
		component: Main,
		children: [
			{
				path: 'approve',
				name: 'approve',
				meta: {
					title: '会员审批',
					icon: 'md-alarm',
					access: ['admin']
				},
				component: () => import('@/views/chamber/approve.vue')
			},
			{
				path: 'userList',
				name: 'userList',
				meta: {
					title: '会员列表',
					icon: 'md-alarm',
					access: ['admin']
				},
				component: () => import('@/views/user/userList.vue')
			},
		]
	},
	{
		path: '/financeManage',
		name: 'financeManage',
		meta: {
			title: '财务管理',
			icon: 'md-alarm',
			access: ['admin']
		},
		component: Main,
		children: [
			{
				path: 'a3',
				name: 'a3',
				meta: {
					title: '测试页3',
					icon: 'md-alarm',
				},
				component: () => import('@/views/test.vue')
			},
		]
	},
	{
		path: '/meeting',
		name: 'meeting',
		meta: {
			title: '会议活动',
			icon: 'md-alarm',
			access: ['admin']
		},
		component: Main,
		children: [
			{
				path: 'createActivity',
				name: 'createActivity',
				meta: {
					title: '创建会议活动',
					icon: 'md-alarm',
					access: ['admin']
				},
				component: () => import('@/views/activity/createActivity.vue')
			},
			{
				path: 'activityList',
				name: 'activityList',
				meta: {
					title: '会议活动列表',
					icon: 'md-alarm',
					access: ['admin']
				},
				component: () => import('@/views/activity/activityList.vue')
			},
		]
	},
	{
		path: '/PBWork',
		name: 'PBWork',
		meta: {
			title: '党建工作',
			icon: 'md-alarm',
			access: ['admin']
		},
		component: Main,
		children: [
			{
				path: 'a5',
				name: 'a5',
				meta: {
					title: '测试页5',
					icon: 'md-alarm',
				},
				component: () => import('@/views/test.vue')
			},
		]
	},
	{
		path: '/resourceInfo',
		name: 'resourceInfo',
		meta: {
			title: '资源信息',
			icon: 'md-alarm',
			access: ['admin']
		},
		component: Main,
		children: [
			{
				path: 'a6',
				name: 'a6',
				meta: {
					title: '测试页6',
					icon: 'md-alarm',
				},
				component: () => import('@/views/test.vue')
			},
		]
	},
	{
		path: '/creditManage',
		name: 'creditManage',
		meta: {
			title: '信用管理',
			icon: 'md-alarm',
			access: ['admin']
		},
		component: Main,
		children: [
			{
				path: 'a7',
				name: 'a7',
				meta: {
					title: '测试页7',
					icon: 'md-alarm',
				},
				component: () => import('@/views/test.vue')
			},
		]
	},
	{
		path: '/dataStatis',
		name: 'dataStatis',
		meta: {
			title: '数据统计',
			icon: 'md-alarm',
			access: ['admin']
		},
		component: Main,
		children: [
			{
				path: 'a8',
				name: 'a8',
				meta: {
					title: '测试页8',
					icon: 'md-alarm',
				},
				component: () => import('@/views/test.vue')
			},
		]
	},
	{
		path: '/fileManage',
		name: 'fileManage',
		meta: {
			title: '文件管理',
			icon: 'md-alarm',
			access: ['admin']
		},
		component: Main,
		children: [
			{
				path: 'a9',
				name: 'a9',
				meta: {
					title: '测试页9',
					icon: 'md-alarm',
				},
				component: () => import('@/views/test.vue')
			},
		]
	},
	{
		path: '/systemSet',
		name: 'systemSet',
		meta: {
			title: '系统设置',
			icon: 'md-alarm',
			access: ['admin']
		},
		component: Main,
		children: [
			{
				path: 'a10',
				name: 'a10',
				meta: {
					title: '测试页10',
					icon: 'md-alarm',
				},
				component: () => import('@/views/test.vue')
			},
		]
	},
	
	//会员身份
	{
		path: '/member1',
		name: 'member1',
		meta: {
			access: ['member']
		},
		component: Main,
		children: [
			{
				path: 'memberList',
				name: 'memberList',
				meta: {
					title: '会员列表',
					icon: 'md-alarm',
					access: ['member']
				},
				component: () => import('@/views/member/memberList.vue')
			},
		]
	},
	{
		path: '/member2',
		name: 'member2',
		meta: {
			access: ['member']
		},
		component: Main,
		children: [
			{
				path: 'myActivityList',
				name: 'myActivityList',
				meta: {
					title: '我的活动列表',
					icon: 'md-alarm',
					access: ['member']
				},
				component: () => import('@/views/member/myActivityList.vue')
			},
		]
	},
	
	
	
//	{
//		path: '/user',
//		name: 'user',
//		meta: {
//			title: '申请加入商会',
//			icon: 'md-alarm',
//		},
//		component: Main,
//		children: [
//			{
//				path: 'joinChamber',
//				name: 'joinChamber',
//				meta: {
//					title: '申请加入商会',
//					icon: 'md-alarm',
//				},
//				component: () => import('@/views/user/joinChamber.vue')
//			},
//		]
//	},
//	{
//		path: '/member1',
//		name: 'member1',
//		meta: {
//			access: ['member']
//		},
//		component: Main,
//		children: [
//			{
//				path: 'memberList',
//				name: 'memberList',
//				meta: {
//					title: '会员列表',
//					icon: 'md-alarm',
//					access: ['member']
//				},
//				component: () => import('@/views/member/memberList.vue')
//			},
//		]
//	},
//	{
//		path: '/member2',
//		name: 'member2',
//		meta: {
//			access: ['member']
//		},
//		component: Main,
//		children: [
//			{
//				path: 'myActivityList',
//				name: 'myActivityList',
//				meta: {
//					title: '我的活动列表',
//					icon: 'md-alarm',
//					access: ['member']
//				},
//				component: () => import('@/views/member/myActivityList.vue')
//			},
//		]
//	},
//	{
//		path: '/chamber',
//		name: 'chamber',
//		meta: {
//			title: '商会管理',
//			icon: 'md-alarm',
//			showAlways: true,
//			access: ['admin']
//		},
//		component: Main,
//		children: [
//			{
//				path: 'createChamber',
//				name: 'createChamber',
//				meta: {
//					title: '创建商会',
//					icon: 'md-alarm',
//					access: ['admin']
//				},
//				component: () => import('@/views/chamber/createChamber.vue')
//			},
//			{
//				path: 'postSet',
//				name: 'postSet',
//				meta: {
//					title: '岗位配置',
//					icon: 'md-alarm',
//					access: ['admin']
//				},
//				component: () => import('@/views/chamber/postSet.vue')
//			},
//			{
//				path: 'sessionSet',
//				name: 'sessionSet',
//				meta: {
//					title: '届次配置',
//					icon: 'md-alarm',
//					access: ['admin']
//				},
//				component: () => import('@/views/chamber/sessionSet.vue')
//			},
//			{
//				path: 'staffSet',
//				name: 'staffSet',
//				meta: {
//					title: '人员配置',
//					icon: 'md-alarm',
//					access: ['admin']
//				},
//				component: () => import('@/views/chamber/staffSet.vue')
//		  	},
//			{
//				path: 'approve',
//				name: 'approve',
//				meta: {
//					title: '会员审批',
//					icon: 'md-alarm',
//					access: ['admin']
//				},
//				component: () => import('@/views/chamber/approve.vue')
//			},
//			{
//				path: 'userList',
//				name: 'userList',
//				meta: {
//					title: '会员列表',
//					icon: 'md-alarm',
//					access: ['admin']
//				},
//				component: () => import('@/views/user/userList.vue')
//			}
//		]
//	},
//	{
//		path: '/activity',
//		name: 'activity',
//		meta: {
//			title: '会议活动',
//			icon: 'md-alarm',
//			showAlways: true,
//			access: ['admin']
//		},
//		component: Main,
//		children: [
//			{
//				path: 'createActivity',
//				name: 'createActivity',
//				meta: {
//					title: '创建会议活动',
//					icon: 'md-alarm',
//					access: ['admin']
//				},
//				component: () => import('@/views/activity/createActivity.vue')
//			},
//			{
//				path: 'activityList',
//				name: 'activityList',
//				meta: {
//					title: '会议活动列表',
//					icon: 'md-alarm',
//					access: ['admin']
//				},
//				component: () => import('@/views/activity/activityList.vue')
//			},
//		]
//	},
	{
		path: '/price',
		name: 'price',
		meta: {
			title: '会费管理',
			icon: 'md-alarm',
			access: ['admin']
		},
		component: Main,
		children: [
			{
				path: 'dues',
				name: 'dues',
				meta: {
					title: '会费情况',
					icon: 'md-alarm',
					access: ['admin']
				},
				component: () => import('@/views/price/dues.vue')
			}
		]
	},

	{
		path: '/testPages',
		name: 'testPages',
		meta: {
			icon: 'md-alarm',
			hideBreadcrumb: true,
			access: ['admin']
		},
		component: Main,
		children: [
			{
				path: 'comPage',
				name: 'comPage',
				meta: {
					title: '组件',
					icon: 'md-alarm',
					access: ['admin'],
				},
				component: () => import('@/views/testPages/comPage.vue')
			},
		]
	},
	
	{
	    path: '/401',
	    name: 'error-401',
	    meta: {
	      hideMenu: true,
	    },
	    component: () => import('@/views/error-page/401.vue')
	},
	{
	    path: '/403',
	    name: 'error-403',
	    meta: {
	      hideMenu: true,
	    },
	    component: () => import('@/views/error-page/401.vue')
	},
	{
	    path: '*',
	    name: 'error-404',
	    meta: {
	      hideMenu: true,
	    },
	    component: () => import('@/views/error-page/404.vue')
	}
]