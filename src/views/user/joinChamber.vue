<template>
	
	<div>
		
		<Card dis-hover :bordered="false" :padding="isModule ? 0 : 16">
			
			<div slot="title" class="cardTitle" v-if="!isModule">
				<h1>申请加入商会</h1>
				<Button @click="record = true" type="primary" size="small" style="margin-left: 10px;">查看我的申请记录</Button>
				<Button size="small" disabled style="margin-left: 10px;">查看个人资料（这里会跳到用户中心）</Button>
			</div>
			
			<div>
				
			    <Tooltip max-width="200" content="如果您选择了公司将会以公司的名义加入商会，反之就以个人的名义加入商会。" :transfer="true" placement="top">
					<Icon type="md-information-circle" size="18" color="#2db7f5" style="cursor: pointer;padding-top: 6px;" />
			    </Tooltip>
			    
			    <Form ref="formInstance" :model="formData" :rules="ruleData" inline :label-width="70" style="display: inline-block;">
			    	
				    <FormItem label="加入方式">
					    <RadioGroup v-model="applyType">
					        <Radio :label="1">个人</Radio>
					        <Radio :label="2">公司</Radio>
					    </RadioGroup>
				    </FormItem>
			    	
			    	<FormItem prop="companyId" label="选择公司" v-if="applyType === 2">
						<Select v-model="formData.companyId" filterable placeholder="选择公司" style="width:300px;">
					        <Option v-for="item in myCompanyList" :value="item.value" :key="item.value">{{item.label}}</Option>
					    </Select>
				    </FormItem>
			    
			    </Form>
				
			</div>
		    
			<Divider v-if="!isModule" orientation="left"><span style="font-size: 16px;">商会列表</span></Divider>
			
			<xw-table
			:tableColumns="tableColumns"
			:tableData="coceralList"
			:pagingData="pagingData"
			@on-page-change="tabPageChange"
			@on-page-size-change="pageSizeChange"
			@on-btn-click="tabApplyBtnClick">
				
				<div slot="header" class="cardTitle">
					
					<Select v-model="type" placeholder="选择类型" style="width:60px;margin-right: 10px;">
				        <Option :value="0">全部</Option>
				        <Option :value="1">商会</Option>
				        <Option :value="2">协会</Option>
				    </Select>
					
				    <cascader-area v-model="res_c" style="width: 260px;"></cascader-area>
		    
				</div>
				
			</xw-table>
			
		</Card>
		
		<Modal v-model="applyModal" :closable="false" width="260" class="apply-modal" class-name="vertical-center-modal">
	        <p slot="header" style="text-align: center;">申请确认</p>
	        <div>
	       		您确认要申请加入<span style="color: #2db7f5;font-weight: 600;"> {{coceralName}} </span>吗?
	        </div>
	        <div slot="footer">
	        	<ButtonGroup>
	        		<Button type="primary" @click="submitApply">确认</Button>
			        <Button type="default" @click="applyModal = false">取消</Button>
			    </ButtonGroup>
	        </div>
	    </Modal>
	    
	    <Modal
	        v-model="record"
	        title="申请记录列表"
	        width="60%"
	        :footer-hide="true"
	       	>
	       	<apply-record v-if="record"></apply-record>
	    </Modal>
		
	</div>
	
</template>

<script>

import applyRecord from '@/views/user/applyRecord.vue';

let isCarryOutHook = false;

export default {
	name: 'joinChamber',
	components:{//组件模板
		applyRecord
	},
	props:{//组件道具（参数）
		/* ****属性用法*****
		 * 
		 * 传递类型 type: Array | Number | String | Object
		 * 为必传 required: true
		 * 默认值 default: ''
		 * 
		 */
		isModule: {
			type: Boolean,
			default: false
		}
	},
    data () {//数据
        return {
        	
        	record: false,
        	
        	applyModal: false,//申请确认弹窗
        	
        	type: 0,//商会类型
        	
        	applyType: 1,//申请类型
        	
        	res_c: [],//已选地区数据
        	
        	myCompanyList: [],//公司列表
        	
        	coceralId: null,//商会ID
        	
        	coceralName: '',//商会名称
        	
        	formData: {
        		companyId: null,//公司ID
        	},
        	
        	ruleData: {
        		companyId: [
                    { type: 'number', required: true, message: '请选择一个公司', trigger: 'change' }
                ],
        	},
        	
        	tableColumns: [
				{
					width: 60,
			        title: 'ID',
			        key: 'id'
			    },
			    {
			        title: '名称',
			        key: 'name'
			    },
			    {
			    	align: 'center',
			    	width: 130,
			        title: '操作',
			        handle: [
			        	{
			        		name: '申请加入',
			        		key: 'apply',
			        		button_props: {
			        			
			        		},
			        		callback: (params, btnParams) => {
			        			if(params.row.status != 0){
			        				btnParams.button_props.disabled = true;
			        			}else{
			        				btnParams.button_props.disabled = false;
			        			}
			        		}
			        	}
			        ],
			    }
			],
			
			coceralList: [],//商协会数据列表
			
			pagingData: {},//页码数据
        	
        }
    },
    methods: {//方法
    	
    	tabApplyBtnClick(val){
    		if(val.key === 'apply'){//提交申请按钮
    			
    			let param = () => {
    				this.coceralId = Number(val.params.row.id);//存储商会ID
	    			this.coceralName = val.params.row.name;//存储商会名称
	    			this.applyModal = true;//打开申请确认弹窗
    			}
    			
    			if(this.applyType === 1){//个人申请
    				param();
				}else if(this.applyType === 2){//公司申请
					this.$refs['formInstance'].validate((valid) => {
						if(valid){
							param();
						}else{
							this.$Message.error('请选择一个公司！');
						}
					});
				}
				
    		}
    	},
    	
    	submitApply(){//提交申请
    		let applyAjax = (companyId) => {
    			$ax.getAjaxData('user.Comm/apply', {
					oid: this.coceralId,//商会ID
					company_id: companyId//公司ID
				}, res => {
					if(res.code == 0){
						this.applyModal = false;
						this.coceralList.forEach(item => {
							if(item.id == this.coceralId){
								item.status = -1;
							}
						});
						this.$Message.success('申请成功，请等待审批！');
					}else if(res.code == 1042 || res.code == 1041){
						this.applyModal = false;
						this.coceralList.forEach(item => {
							if(item.id == this.coceralId){
								item.status = -1;
							}
						});
					}
				});
			}
			if(this.applyType === 1){//个人申请
				applyAjax(0);
			}else if(this.applyType === 2){//公司申请
				this.$refs['formInstance'].validate((valid) => {
					if(valid) applyAjax(this.formData.companyId);
				});
			}
    	},
    	
    	getCompanyData(){//获取公司数据
    		let sessionCompanyList = JSON.parse(sessionStorage.myCompanyList);
	    	let newArr = [];
	    	sessionCompanyList.forEach(item => {
	    		newArr.push({
	    			label: item.name,
	    			value: Number(item.id),
	    		});
	    	});
	      	this.myCompanyList = newArr;
    	},
    	
    	tabPageChange(page){//页码改变时触发
    		this.getCoceralData(page, 10);
    	},
    	
    	pageSizeChange(page_size){//切换每页条数时的回调
    		//this.getCoceralData(1, page_size);
    	},
    	
    	getCoceralData(current_page, page_size){//获取商协会列表
    		$ax.getAjaxData('user.Comm/allOrgList', {
				cur_page: current_page,//当前页
				page_size: page_size//显示条数
			}, res => {
				if(res.code == 0){
					this.pagingData = {
						total: Number(res.page.total),
						current_page: Number(res.page.cur_page),
						page_size: Number(res.page.page_size),
					};
					this.coceralList = res.data;
				}
			});
    	},
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
    	if(this.isModule || !isCarryOutHook){
    		this.getCoceralData(1, 10);
    	}
    	
    	this.getCompanyData();
    	
	},
    mounted () {//模板被渲染完毕之后执行
    	
	},
	destroyed(){//Vue 实例销毁后调用
		isCarryOutHook = false;
	},
	
	//=================组件路由勾子==============================
	
	beforeRouteEnter (to, from, next) {//在组件创建之前调用（放置页面加载时请求的Ajax）
		
		isCarryOutHook = true;
		
		(async () => { //执行异步函数
			
			try{
				
				//获取商协会列表
				let coceralData = await $ax.getAsyncAjaxData('user.Comm/allOrgList', {
					cur_page: 1,//当前页
					page_size: 10//显示条数
				});
				
				next(vm => {
					if(coceralData.code == 0){
						vm.pagingData = {
							total: Number(coceralData.page.total),
							current_page: Number(coceralData.page.cur_page),
							page_size: Number(coceralData.page.page_size),
						};
						vm.coceralList = coceralData.data;
					}
				});

			}catch (err) {
				console.log(err);
			}
			
			next();

		})();
		
	},
	
}
</script>

<style scoped lang="less">
	.apply-modal{
		.ivu-modal-footer{
			.ivu-btn-group{
				display: flex;
				width: 100%;
				.ivu-btn{
					width: 100%;
				}
			}
		}
	}
</style>

<style lang="less">
	.apply-modal{
		.ivu-modal-footer{
			border-top: none !important;
			padding: 4px !important;
			/*.ivu-btn-group{
				.ivu-btn{
					border-radius: initial !important;
				}
			}*/
		}
		.ivu-modal-content{
			overflow: hidden;
		}
	}
	.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
        .ivu-modal-header{
        	padding: 6px 16px !important;
        }
    }
</style>