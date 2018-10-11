<template>
	
	<div style="height: 100%;background: #001529;display: flex;">
		
		<Card style="width: 50%;margin: auto;">
			
			<Divider orientation="left">申请记录列表</Divider>
			<Table :columns="columns1" :data="data1"></Table>
			
			<Divider orientation="left">选择商会进入系统</Divider>
			<div style="width: 50%;margin: auto;">
				
				<Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="70">
					
					<FormItem prop="identity" label="选择">
						
						<RadioGroup v-model="formInline.identity">
					        <Radio :label="1">我加入的商会</Radio>
					        <Radio :label="2">我创建的商会</Radio>
					    </RadioGroup>
					    
					</FormItem>
					
					<FormItem prop="chamberId" label="选择商会">
						
						<Select v-model="formInline.chamberId" filterable clearable :placeholder="placeholder">
					        <Option :value="1">商会1</Option>
					        <Option :value="2">商会2</Option>
					        <Option :value="3">商会3</Option>
					    </Select>
						
					</FormItem>
					
				</Form>
				
				<div style="text-align: center;">
					<Button type="primary" long @click="login('formInline')">确定</Button>
				</div>
				
				<div style="margin-top: 16px;text-align: center;">
					没有商会
					<a @click="modalOpen">{{text}}</a>
				</div>
				
			</div>
			
		</Card>
		
		<Modal
	        v-model="openChamberList"
	        title="商会列表"
	        width="60%"
	        :footer-hide="true"
	       	>
	       	
	       	<Button slot="close">关闭</Button>
	        
	        <table-list v-if="formInline.identity === 1" :tableColumns="tableColumns" :tableData="tableData" @on-btn-click="tabBtnClick">
	        	
	        	<div slot="header" style="width: 100%;display: flex;align-items: center;">
					
					<Select v-model="type" placeholder="选择类型" style="width:60px;margin-right: 10px;">
				        <Option value="0">全部</Option>
				        <Option value="1">商会</Option>
				        <Option value="2">协会</Option>
				    </Select>
					
				    <al-cascader v-model="res_c" placeholder="选择地区" style="width: 260px;" />
		    
				</div>
	        	
			</table-list>
			
			<create-chamber v-if="formInline.identity === 2"></create-chamber>
	        
	    </Modal>
		
	</div>
	
</template>

<script>

import tableList from '@/components/tableList/table-list.vue'

import createChamber from '@/views/chamber/createChamber.vue';

export default {
	name: 'login',
	components:{//组件模板
		tableList,
		createChamber
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
        	
        	openChamberList: false,
        	
        	formInline: {
        		identity: 1,
                chamberId: '',
            },
            
            ruleInline: {
                identity: [
                    { type: 'number', required: true, message: '请选择您的身份', trigger: 'change' }
                ],
                chamberId: [
                    { type: 'number', required: true, message: '请选择商会', trigger: 'change' }
                ],
            },
        	
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
			        		button_props: {
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
    		],
    		
    		columns1: [
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
			        title: '审核状态',
			        key: 'state'
			    },
			    {
			        title: '申请日期',
			        key: 'date'
			    },
            ],
            data1: [
                {
    				name: '广西湖北商会1',
    				president: '张三',
    				secretary: '李四',
    				state: '已通过',
    				date: '2018-10-08'
    			},
                {
    				name: '广西湖北商会2',
    				president: '张三',
    				secretary: '李四',
    				state: '审核中',
    				date: '2018-10-08'
    			},
                {
    				name: '广西湖北商会3',
    				president: '张三',
    				secretary: '李四',
    				state: '已拒绝',
    				date: '2018-10-08'
    			},
            ]
        	
        }
    },
    methods: {//方法
    	
    	modalOpen(){
    		
    		this.openChamberList = true;
    		
    	},
    	
    	tabBtnClick(params){
    		
    		this.tableColumns.forEach(item => {
    			
    			if(item.handle){
    				item.handle.forEach(item2 => {
    					if(item2.key === 0){
    						item2.button_props.loading = true;
    						setTimeout(() => {
    							item2.button_props.loading = false;
    							this.$Message.success('申请成功');
    						},2000);
    					}
    				})
    			}
    			
    		});
    		
    	},
    	
    	login(name){
    		
    		this.$refs[name].validate((valid) => {
    			
                if (valid) {
                    
                    sessionStorage.chamberId = this.formInline.chamberId;
                    
		    		this.$router.replace({
						name: 'home'
					});
					
					this.$Message.success('选择成功!');
					
                }
                
            });
    		
    	},
    	
    },
    computed: {//计算属性
        
        placeholder(){
        	
        	let txt = '选择您已加入的商会';
        	
        	if(this.formInline.identity === 1){
        		txt = '选择您已加入的商会';
        	}else if(this.formInline.identity === 2){
        		txt = '选择您已创建的商会';
        	}
        	
        	return txt;
        	
        },
        
        text(){
        	
        	let txt = '立即申请加入';
        	
        	if(this.formInline.identity === 1){
        		txt = '立即申请加入';
        	}else if(this.formInline.identity === 2){
        		txt = '立即创建';
        	}
        	
        	return txt;
        	
        }
        
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