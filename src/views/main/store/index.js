
import routers from '@/router/router.js'; //调用路由表
import { getMenuByRouter, getHomeRoute } from '@/toolBox'; //调用工具

const mainFrame = {
	
	state: {//数据
		
		menuList: [],//菜单列表
		
		menuChildrenList: [],//子菜单列表
		
		homeRoute: getHomeRoute(routers),//name属性等于home路由数据
		
	},
	
	mutations: { //事件集,mutation是同步的
		
		getMenuList(state){//获取菜单列表
			let userAccess = sessionStorage.userAccess;
			state.menuList = getMenuByRouter(routers, (userAccess ? userAccess.split(',') : false));
		},
		
	},
	
	getters: {//计算属性
		
	},
	
	actions: {//专门放置异步交互代码,Action 是异步的
		
	},
	
	modules: {//模板
		
	}
	
}

export default mainFrame;
