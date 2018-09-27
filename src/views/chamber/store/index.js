
const mainFrame = {
	
	state: {//数据
		
		showstaff:false
		
	},
	
	mutations: { //事件集,mutation是同步的
		
	showstaffModal(state, list) {//显示modal
				
			if(list) {
				
				state.showstaff = list
				
			}else{
				state.showstaff=false
			}
			
	}
		
	},
	
	getters: {//计算属性
		
		
	},
	
	actions: {//专门放置异步交互代码,Action 是异步的
		
	},
	
	modules: {//模板
		
	}
	
}

export default mainFrame;



