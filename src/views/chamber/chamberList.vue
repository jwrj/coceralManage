<template>
	
	<div>
		
		<Card>
			
			<table-list :tableColumns="tableColumns" :tableData="tableData" :modalTitle="modalTitle" @on-btn-click="onBtnClick">
				
				<div slot="header" style="margin-right: 10px;">
					
					<Select v-model="type" placeholder="选择类型" style="width:60px">
				        <Option value="0">全部</Option>
				        <Option value="1">商会</Option>
				        <Option value="2">协会</Option>
				    </Select>
				    
				</div>
				
				<div slot="modalContent">
					
					<post-config v-if="btnKey === 'config'"></post-config>
					
				</div>
				
			</table-list>
			
		</Card>
		
	</div>
	
</template>

<script>

import tableList from '@/components/tableList/table-list.vue';

import postConfig from '@/components/postConfig/post-config.vue';//岗位配置

export default {
	name: 'chamberList',
	components:{//组件模板
		tableList,
		postConfig
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
        	
        	type: '0',
        	
        	btnKey: '',
        	
        	modalTitle: '',
        	
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
			        title: '秘书长',
			        key: 'secretary'
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
    						key: 'details',
    						modalShow: true,
    					},
    					{
    						name: '编辑',
    						key: 'edit',
    						modalShow: true,
    					},
    					{
    						name: '审批',
    						key: 'approval',
    						modalShow: true,
    					},
    					{
    						name: '岗配',
    						key: 'config',
    						modalShow: true,
    					},
    					{
    						name: '会员',
    						key: 'member',
    						modalShow: true,
    					},
    				],
    			}
    		],
    		
    		tableData: [
    			{
    				id: 1,
    				name: '广西湖北商会1',
    				president: '张三',
    				secretary: '李四',
    				date: '2018-10-08'
    			},
    			{
    				id: 2,
    				name: '广西湖北商会2',
    				president: '张三',
    				secretary: '李四',
    				date: '2018-10-08'
    			},
    			{
    				id: 3,
    				name: '广西湖北商会3',
    				president: '张三',
    				secretary: '李四',
    				date: '2018-10-08'
    			},
    		]
        	
        }
    },
    methods: {//方法
    	
    	onBtnClick(val){
    		
    		console.log(val);
    		this.btnKey = val.key;
    		this.modalTitle = val.params.row.name + '（' + val.name + '）';
    		
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