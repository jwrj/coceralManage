<template>
	
	<div>
		
		<Card :dis-hover="isModule" :bordered="!isModule" :padding="isModule ? 0 : 16">
			
			<div slot="title" class="cardTitle" v-if="!isModule">
				<h1>申请加入商会</h1>
				<Button disabled style="margin-left: 10px;">查看个人资料（这里会跳到用户中心）</Button>
			</div>
			
			<div>
				
				<Alert show-icon v-if="!isModule">
			    	温馨提示：如果您选择了公司将会以公司的名义加入商会，反之就以个人的名义加入商会。
			    </Alert>
			    
			    <Form ref="formInstance" :model="formData" :rules="ruleData" inline>
			    
				    <FormItem>
					    <RadioGroup v-model="applyType">
					        <Radio :label="1">个人</Radio>
					        <Radio :label="2">公司</Radio>
					    </RadioGroup>
				    </FormItem>
			    
			    	
			    	<FormItem prop="companyId" v-if="applyType === 2">
						<Select v-model="formData.companyId" filterable placeholder="选择公司" style="width:300px;">
					        <Option v-for="item in myCompanyList" :value="item.value">{{item.label}}</Option>
					    </Select>
				    </FormItem>
			    
			    </Form>
				
			</div>
		    
			<Divider v-if="!isModule" orientation="left"><span style="font-size: 16px;">商会列表</span></Divider>
			
			<table-list :tableColumns="tableColumns" :tableData="coceralList" @on-btn-click="tabApplyBtnClick">
				
				<div slot="header" style="width: 100%;display: flex;align-items: center;">
					
					<Select v-model="type" placeholder="选择类型" style="width:60px;margin-right: 10px;">
				        <Option :value="0">全部</Option>
				        <Option :value="1">商会</Option>
				        <Option :value="2">协会</Option>
				    </Select>
					
				    <al-cascader v-model="res_c" placeholder="选择地区" style="width: 260px;" />
		    
				</div>
				
			</table-list>
			
		</Card>
		
	</div>
	
</template>

<script>

import tableList from '@/components/tableList/table-list.vue';

let isCarryOutHook = false;

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
		isModule: {
			type: Boolean,
			default: false
		}
	},
    data () {//数据
        return {
        	
        	type: 0,//商会类型
        	
        	applyType: 1,//申请类型
        	
        	res_c: [],//已选地区数据
        	
        	myCompanyList: [],//公司列表
        	
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
			        			loading: false
			        		}
			        	}
			        ],
			    }
			],
			
			coceralList: []
        	
        }
    },
    methods: {//方法
    	
    	tabApplyBtnClick(val){
    		
    		if(val.key === 'apply'){//提交申请
    			let applyAjax = (companyId) => {
    				val.button_props.loading = true;
	    			$ax.getAjaxData('user.Comm/apply', {
						oid: Number(val.params.row.id),//商会ID
						company_id: companyId//公司ID
					}, res => {
						if(res.code == 0){
							this.$Message.success('申请成功');
						}
						val.button_props.loading = false;
					});
    			}
    			if(this.applyType === 1){//个人申请
    				applyAjax(0);
    			}else if(this.applyType === 2){//公司申请
    				this.$refs['formInstance'].validate((valid) => {
    					if(valid) applyAjax(this.formData.companyId);
    				});
    			}
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
    	
    	getCoceralData(){//获取商协会列表
    		$ax.getAjaxData('user.Comm/allOrgList', {
				cur_page: 1,//当前页
				page_size: 10//显示条数
			}, res => {
				if(res.code == 0){
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
    		this.getCoceralData();
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

</style>