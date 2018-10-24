import Vue from 'vue'
import Router from 'vue-router'
import routers from './router.js'; //调用路由表
import { pathImperfect, canTurnTo } from '@/toolBox'; //调用工具

Vue.use(Router)

export const router = new Router({
	routes: routers
});

router.beforeEach((to, from, next) => {//会在任意路由跳转前执行，next一定要记着执行，不然路由不能跳转了
	
	router.app.$Loading.start();//加载进度条
	
	//检测用户中心登录
	if(!sessionStorage.userLogin && to.name !== 'mainLogin'){//用户中心未登录
		
		next({
			name: 'mainLogin'
		});
		
	}else if(sessionStorage.userLogin){//用户中心已登录
		
		//检测系统内部登录
		if(!sessionStorage.identityType && to.name !== 'login'){//系统身份未登录
			
			next({
				name: 'login'
			});
			
		}else if(sessionStorage.identityType){//系统身份已登录
			
			if(to.name === 'login'){
				
				next({
					name: 'home'
				});
				
			}else{
				
				let userAccess = sessionStorage.userAccess;
				//检测页面权限
				if(canTurnTo(routers, (userAccess ? userAccess.split(',') : false), to.name)){//用户权限判断
		
					if(pathImperfect(routers, to.name)){
						next({
							replace: true,
							name: 'error-401'
						});
					}else{
						next()
					}
				
				}else{
				
					next({
						replace: true,
						name: 'error-403'
					});
				
				}
				
			}
			
		}else{
			
			next();
			
		}
		
	}else{
		
		next();
		
	}
	
});

router.afterEach((to, from) => {//会在任意路由跳转后执行
	router.app.$Loading.finish();//加载进度条
});