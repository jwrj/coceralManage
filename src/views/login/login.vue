<template>
	
	<div style="height: 100%;background: #001529;display: flex;">
		
		<Card style="width: 400px;margin: auto;">
			
			<Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="70">
				
				<FormItem prop="identity">
					
					<RadioGroup v-model="formInline.identity" @on-change="radioGroupChange">
				        <Radio :label="1">我加入的商会</Radio>
				        <Radio :label="2">我创建的商会</Radio>
				    </RadioGroup>
				    
				</FormItem>
				
				<FormItem prop="chamberId" label="选择商会">
					
					<Select v-model="formInline.chamberId" filterable clearable :placeholder="placeholder">
				        <Option v-for="item in chamberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
				
		</Card>
		
		<Modal
	        v-model="openChamberList"
	        :title="titleTxt"
	        width="80%"
	        :footer-hide="true"
	       	>
	       	
	       	<Button slot="close">关闭</Button>
	        
	        <Button v-if="formInline.identity === 1" @click="record = true" type="primary" size="small" style="margin-bottom: 16px;">查看我的申请记录</Button>
	        
	        <table-list v-if="formInline.identity === 1" :tableColumns="tableColumns" :tableData="tableData" @on-btn-click="tabBtnClick">
	        	<div slot="header" style="width: 100%;display: flex;align-items: center;">
					<div style="border: 1px solid #dcdee2;margin-right: 10px;padding: 5px 7px;border-radius: 4px;">
						<RadioGroup v-model="type">
					        <Radio label="1">全部</Radio>
					        <Radio label="2">商会</Radio>
					        <Radio label="3">协会</Radio>
					    </RadioGroup>
					</div>
				    <al-cascader v-model="res_c" placeholder="选择地区" style="width: 260px;" />
				</div>
			</table-list>
			
			<create-chamber v-if="formInline.identity === 2"></create-chamber>
	        
	    </Modal>
	    
	    <Modal
	        v-model="record"
	        title="申请记录列表"
	        width="60%"
	        :footer-hide="true"
	       	>
	       	<Table :columns="columns1" :data="data1"></Table>
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
        	
        	record: false,
        	
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
        	
        	chamberList: [],//商会列表
        	
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
    	
    	setSelectData(url, param, type){ //设置下拉列表数据切换
    		
    		$ax.getAjaxData(url, param, (res)=> {
    			let newArr = [];
				res.data.forEach(item => {
					newArr.push({
						label: item[type.label],
						value: Number(item[type.value]),
					});
				});
				this.chamberList = newArr;
				if(this.chamberList.length > 0){
					this.formInline.chamberId = this.chamberList[0].value;
				}
			});
    		
    	},
    	
    	radioGroupChange(val){ //商会类型切换
    		
    		if(val === 1){//我加入的商会
    			
    			this.setSelectData('user.Comm/myJoinOrganize', {company_id: -1}, {label: 'org_name', value: 'mid'});
    			
    		}else if(val === 2){//我加创建的商会
    			
    			this.setSelectData('user.Comm/myCreateOrganize', {}, {label: 'name', value: 'id'});
    			
    		}
    		
    	},
    	
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
    	
    	login(name){//提交数据
    		
    		this.$refs[name].validate((valid) => {
    			
                if (valid) {
                    
                    if(this.formInline.identity === 1){//普通会员
	                    $ax.getAjaxData('user.Comm/loginMember', {
	                    	mid: this.formInline.chamberId
	                    }, (res)=> {
	                    	if(res.code == 0){
	                    		sessionStorage.identityType = this.formInline.identity;
	                    		sessionStorage.chamberId = this.formInline.chamberId;
					    		this.$router.replace({name: 'home'});
								this.$Message.success('普通会员进入成功');
	                    	}
	                    });
                    }else if(this.formInline.identity === 2){//管理者
	                    $ax.getAjaxData('user.Comm/loginManage', {
	                    	oid: this.formInline.chamberId
	                    }, (res)=> {
	                    	if(res.code == 0){
	                    		sessionStorage.identityType = this.formInline.identity;
	                    		sessionStorage.chamberId = this.formInline.chamberId;
					    		this.$router.replace({name: 'home'});
								this.$Message.success('管理者进入成功');
	                    	}
	                    });
                    }
                    
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
        },
        
        titleTxt(){
        	let txt = '';
        	if(this.formInline.identity === 1){
        		txt = '商协会列表';
        	}else if(this.formInline.identity === 2){
        		txt = '创建商协会';
        	}
        	return txt;
        },
        
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
		
		let newArr = [];
		
		$ax.getAjaxData('user.Comm/myJoinOrganize', {
			company_id: -1
		}, (res)=> {
			res.data.forEach(item => {
				newArr.push({
					label: item.org_name,
					value: Number(item.mid),
				});
			});
			next(vm => {
				vm.chamberList = newArr;
				if(vm.chamberList.length > 0){
					vm.formInline.chamberId = vm.chamberList[0].value;
				}
			});
		});
		
	},
	
}
</script>

<style scoped lang="less">

</style>