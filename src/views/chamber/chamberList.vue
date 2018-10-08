<template>
	
	<div>
		
		<Card>
			
			<table-list :tableColumns="tableColumns" :tableData="tableData">
				<div slot="header" style="margin-right: 10px;">
				    1231
				</div>
			</table-list>
			
		</Card>
		
	</div>
	
</template>

<script>

import tableList from '@/components/tableList/table-list.vue'

export default {
	name: 'chamberList',
	components:{//组件模板
		tableList
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
        	
        	tableColumns: [
    			{
    				title: 'ID',
    				key: 'id'
    			},
    			{
    				title: '名称',
    				key: 'name'
    			},
    			{
    				title: '会长',
    				key: 'president'
    			},
    			{
    				title: '创建日期',
    				key: 'date'
    			},
    			{
    				width: 180,
    				title: '操作',
    				handle: [
    					{
    						name: '详情',
    						key: 0,
    					},
    					{
    						name: '审批',
    						key: 1,
    					},
    					{
    						name: '编辑',
    						key: 2,
    					},
    					{
    						name: '岗位配置',
    						key: 3,
    					}
    				],
    			}
    		],
    		
    		tableData: [
    			{
    				id: 1,
    				name: '广西湖北商会1',
    				president: '张三',
    				date: '2018-10-08'
    			},
    			{
    				id: 2,
    				name: '广西湖北商会2',
    				president: '张三',
    				date: '2018-10-08'
    			},
    			{
    				id: 3,
    				name: '广西湖北商会3',
    				president: '张三',
    				date: '2018-10-08'
    			},
    		]
        	
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