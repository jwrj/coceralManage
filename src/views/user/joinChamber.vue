<template>
	
	<div>
		
		<Card>
			
			<div slot="title" class="cardTitle">
				<h1>申请加入商会</h1>
				<Button style="margin-left: auto;">查看个人资料（这里会跳到用户中心）</Button>
			</div>
			
			<div style="padding-bottom: 16px;">
				
				<Alert show-icon>
			    	温馨提示：如果您选择了公司将会以公司的名义加入商会，反之就以个人的名义加入商会。
			    </Alert>
			    
				<Select filterable clearable placeholder="选择公司" style="width:300px;margin-bottom: 16px;display: block;">
			        <Option :value="0">公司1</Option>
			    </Select>
				
			</div>
		    
			<Divider orientation="left"><span style="font-size: 16px;">商会列表</span></Divider>
			
			<table-list :tableColumns="tableColumns" :tableData="tableData" @on-btn-click="tabBtnClick">
				<div slot="header" style="width: 100%;display: flex;align-items: center;">
					
					<Select v-model="type" placeholder="选择类型" style="width:60px;margin-right: 10px;">
				        <Option value="0">全部</Option>
				        <Option value="1">商会</Option>
				        <Option value="2">协会</Option>
				    </Select>
					
				    <al-cascader v-model="res_c" placeholder="选择地区" style="width: 260px;" />
		    
				</div>
			</table-list>
			
		</Card>
		
	</div>
	
</template>

<script>

import tableList from '@/components/tableList/table-list.vue'

export default {
	name: 'joinChamber',
	components:{//组件模板
		tableList,
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
        	
        	res_c: [],
        	
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
			        title: '日期',
			        key: 'date'
			    },
			    {
			    	align: 'center',
			    	width: 130,
			        title: '操作',
			        handle: [
			        	{
			        		name: '申请加入',
			        		key: 0,
			        		props: {
			        			loading: false
			        		}
			        	}
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
    	
    	tabBtnClick(params){
    		
    		params.loading = true;
    		
    		this.tableColumns.forEach(item => {
    			
    			if(item.handle){
    				item.handle.forEach(item2 => {
    					if(item2.key === 0){
    						item2.props.loading = true;
    						setTimeout(() => {
    							item2.props.loading = false;
    						},2000);
    					}
    				})
    			}
    			
    		});
    		
    		console.log(params);
    		
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