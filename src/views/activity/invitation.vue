<template>
	
	<div>
		
		<user-list
    	ref="userListInstance"
    	:titleShow="false"
    	:selectShow="true"
    	:styleShow="false"
    	@on-select-change="memberSelect"
    	></user-list>
		
		{{checkedMembers}}
		
		<div style="text-align: center;margin-top: 16px;">
			<Button type="primary">发送邀请</Button>
		</div>
		
	</div>
	
</template>

<script>
import userList from '@/views/user/userList.vue';
export default {
	name: 'invitation',
	components:{//组件模板
		userList
	},
	props:{//组件道具（参数）
		/* ****属性用法*****
		 * 
		 * 传递类型 type: Array | Number | String | Object
		 * 为必传 required: true
		 * 默认值 default: ''
		 * 
		 */
	},
    data () {//数据
        return {
        	
        	checkedMembers: [],//选中的会员
        	
        }
    },
    methods: {//方法
    	
    	memberSelect(data){//选择会员时触发
    		this.checkedMembers = data;
    	},
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
	},
    mounted () {//模板被渲染完毕之后执行
    	
	},
	
	//=================组件路由勾子==============================
	
	beforeRouteEnter (to, from, next) {//在组件创建之前调用（放置页面加载时请求的Ajax）
		
		(async() => {//执行异步函数
			
			//async、await错误处理
			try {
				
				/*
				 * 
				 * ------串行执行---------
				 * console.log(await getAjaxData());
				 * ...
				 * 
				 * ---------并行：将多个promise直接发起请求（先执行async所在函数），然后再进行await操作。（执行效率高、快）----------
				 * let abc = getAjaxData();//先执行promise函数
				 * ...
				 * console.log(await abc);
				 * ...
				*/
				next(vm => {
					
				});
				
			} catch(err) {
				console.log(err);
			}
			
		})();
		
	},
	
}
</script>

<style scoped lang="less">

</style>