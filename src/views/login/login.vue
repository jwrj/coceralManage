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
			
			<div class="bottomNav">
				<div>
					<span>没有商会</span>
					<a @click="openChamberList = true">{{text}}</a>
				</div>
				<Button @click="record = true" type="text" size="small">查看我的申请记录</Button>
			</div>
				
		</Card>
		
		<Modal
	        v-model="openChamberList"
	        :title="titleTxt"
	        width="80%"
	        :footer-hide="true"
	       	>
	       	
	       	<Button slot="close">关闭</Button>
	        
	        <join-chamber v-if="formInline.identity === 1" :isModule="true"></join-chamber>
	        
			<create-chamber v-if="formInline.identity === 2"></create-chamber>
	        
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

import createChamber from '@/views/chamber/createChamber.vue';

import joinChamber from '@/views/user/joinChamber.vue';

import applyRecord from '@/views/user/applyRecord.vue';

export default {
	name: 'login',
	components:{//组件模板
		createChamber,
		joinChamber,
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
        	
        }
    },
    methods: {//方法
    	
    	radioGroupChange(val){ //商会类型切换
    		
    		if(val === 1){//我加入的商会
    			
    			this.setSelectData('user.Comm/myJoinOrganize', {company_id: -1}, {label: 'org_name', value: 'mid'});
    			
    		}else if(val === 2){//我加创建的商会
    			
    			this.setSelectData('user.Comm/myCreateOrganize', {}, {label: 'name', value: 'id'});
    			
    		}
    		
    	},
    	
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
    	
    	login(name){//提交数据
    		
    		this.$refs[name].validate((valid) => {
    			
                if (valid) {
                    
                    if(this.formInline.identity === 1){//会员
	                    $ax.getAjaxData('user.Comm/loginMember', {
	                    	mid: this.formInline.chamberId
	                    }, (res)=> {
	                    	if(res.code == 0){
	                    		sessionStorage.identityType = this.formInline.identity;//身份类型
	                    		sessionStorage.chamberId = this.formInline.chamberId;//身份类型
					    		this.$router.replace({name: 'home'});
								this.$Message.success('普通会员进入成功');
	                    	}
	                    });
                    }else if(this.formInline.identity === 2){//管理者
	                    $ax.getAjaxData('user.Comm/loginManage', {
	                    	oid: this.formInline.chamberId
	                    }, (res)=> {
	                    	if(res.code == 0){
	                    		sessionStorage.identityType = this.formInline.identity;//身份类型
	                    		sessionStorage.chamberId = this.formInline.chamberId;//商会ID
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
		
		$ax.getAjaxData('user.Comm/myJoinOrganize', {//我加入的商会数据列表
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
	.bottomNav{
		margin-top: 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>