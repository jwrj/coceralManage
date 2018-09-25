<template>
	
	<div>
		
		<!--表格列表-->
		<Card style="position: initial;">
			
			<h1 slot="title">表格列表</h1>
			
			<table-list
			:tableColumns="tableColumns"
			:tableData="tableData"
			>
		
				<div class="header-content" slot="header" slot-scope="{ selectChange }">
			
					<Select @on-change="selectChange" style="max-width: 200px;margin-right: 10px;">
				        <Option :value="0">1232</Option>
				    </Select>
		    
					<Select @on-change="selectChange" style="max-width: 200px;margin-right: 10px;">
				        <Option :value="666">5555</Option>
				    </Select>
		    
				    <Input :search="true" enter-button clearable placeholder="搜索..." class="seek" />
		    
				</div>
		
				<div slot="footer">页脚</div>
		
			</table-list>
			
		</Card>
		
		
		<!--岗位配置树-->
		<Card style="margin-top: 16px;">
			
			<h1 slot="title">岗位配置</h1>
			
			<post-config></post-config>
			
		</Card>
		
	</div>
	
</template>

<script>

import tableList from '@/components/tableList/table-list.vue'

import postConfig from '@/components/postConfig/post-config.vue'

export default {
	name: 'comPage',
	components:{//组件模板
		tableList,
		postConfig,
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
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    key: 'address'
                },
                {
                	align: 'center',
                	width: 130,
                    title: '操作',
                    handle: ['edit','details'],
                }
        	],
        	
        	tableData: [
        		{
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
        	],
        	
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