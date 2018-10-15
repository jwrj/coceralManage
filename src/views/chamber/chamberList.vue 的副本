<template>
	
	<div>
		
		<Card>
			
			<div slot="title" style="display: flex;align-items: center;">
				<h1>商协会列表</h1>
				<Button style="margin-left: 10px;" type="primary" size="small" @click="establish">创建商会</Button>
			</div>
			
			<table-list :tableColumns="tableColumns" :tableData="tableData" :modalTitle="modalTitle" @on-btn-click="onBtnClick">
				
				<div slot="header" style="margin-right: 10px;display: flex;align-items: center;">
					
					<div style="border: 1px solid #dcdee2;margin-right: 10px;padding: 5px 7px;border-radius: 4px;">
						<RadioGroup>
					        <Radio label="1">全部</Radio>
					        <Radio label="2">商会</Radio>
					        <Radio label="3">协会</Radio>
					    </RadioGroup>
					</div>
				    
				    <div style="border: 1px solid #dcdee2;padding: 5px 7px;border-radius: 4px;">
						<RadioGroup>
					        <Radio label="1">我创建的商会</Radio>
					        <Radio label="2">我加入的商会</Radio>
					    </RadioGroup>
					</div>
					
				</div>
				
				<div slot="modalContent">
					
					<post-config v-if="btnKey === 'config'" style="width: 50%;"></post-config>
					
					<create-chamber v-if="btnKey === 'details'"></create-chamber>
					
					<create-chamber v-if="btnKey === 'edit'"></create-chamber>
					
					<approve v-if="btnKey === 'approval'"></approve>
					
					<user-list v-if="btnKey === 'member'"></user-list>
					
				</div>
				
			</table-list>
			
		</Card>
		
		<Modal v-model="modal2" width="80%" :footer-hide="true">
	        <p slot="header">创建商/协会</p>
	        <create-chamber></create-chamber>
	        <!--<div slot="footer">
	        	
	        </div>-->
	    </Modal>
		
	</div>
	
</template>

<script>

import tableList from '@/components/tableList/table-list.vue';

import postConfig from '@/components/postConfig/post-config.vue';//岗位配置

import createChamber from '@/views/chamber/createChamber.vue';

import approve from '@/views/chamber/approve.vue';

import userList from '@/views/user/userList.vue';

export default {
	name: 'chamberList',
	components:{//组件模板
		tableList,
		postConfig,
		createChamber,
		approve,
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
        	
        	modal2: false,
        	
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
    				align: 'center',
    				width: 300,
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
    	
    	establish(){
    		
    		this.modal2 = true;
    		
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