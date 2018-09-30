<template>
	
	<div>
		
		<Cascader placeholder="选择行业" :data="industryData"></Cascader>
		
	</div>
	
</template>

<script>

export default {
	name: 'industryCasc',
	components:{//组件模板
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
        	
        	industryData: [],
        	
        }
    },
    methods: {//方法
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
    	$ax.getAjaxData('http://192.168.2.200:802/cdn/hangye.js',{
    		
    	},(response) => {
    		
    		let newArr = [];
    		
    		response.forEach(item => {
    			
    			let newChildren = [];
    			
				item.children.forEach(item => {
					newChildren.push({
						label: item.name,
    					value: item.code,
					})
				})
				
				newArr.push({
    				label: item.name,
        			value: item.code,
        			children: newChildren
    			});
    			
    		});
    		
    		this.industryData = newArr;
    		
    	},{
    		baseURL: ''
    	});
    	
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