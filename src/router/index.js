import Vue from 'vue'
import Router from 'vue-router'
import routers from './router.js'; //调用路由表
import { pathImperfect, canTurnTo } from '@/toolBox'; //调用工具

Vue.use(Router)

export const router = new Router({
	routes: routers
});

router.beforeEach((to, from, next) => {//路由跳转前
	
	//检测用户中心登录
	if(!sessionStorage.login && to.name !== 'mainLogin'){//未登录
		
		next({
			name: 'mainLogin'
		});
		
	}else if(sessionStorage.login){//已未登录
		
		//检测系统内部登录
		if(!sessionStorage.identityType && to.name !== 'login'){//未登录
			
			next({
				name: 'login'
			});
			
		}else if(sessionStorage.identityType){//已未登录
			
			if(to.name === 'login'){
				
				next({
					name: 'home'
				});
				
			}else{
				
				//检测页面权限
				if(canTurnTo(routers, window.USE_RACCESS, to.name)){
		
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