<template>

	<div>
		
		<Card dis-hover :bordered="false" :padding="cardStyle ? 16 : 0">
			
			<h1 slot="title" v-if="cardStyle">创建商会</h1>
			
			<Form ref="formInstance" :model="formData" :rules="ruleData" :label-width="100">
				
				<Row :gutter="16">
				
					<Col span="24">
						<FormItem label="性质" prop="nature">
							<RadioGroup v-model="formData.nature" @on-change="RadioGroupChange">
								<Radio :label="1">商会</Radio>
								<Radio :label="0">协会</Radio>
							</RadioGroup>
						</FormItem>
					</Col>
					
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem :label="title+'名称'" prop="name">
							<Input v-model="formData.name" clearable placeholder="请输入名称" style="max-width: 300px;" />
						</FormItem>
					</Col>
					
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem label="上级商会">
							<Input v-model="formData.superior" placeholder="这个字段为预留字段目前没用到" style="max-width: 300px;" />
						</FormItem>
					</Col>
					
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem label="注册地" prop="domicile" >
							<cascader-area v-model="formData.domicile" style="max-width: 300px;" />
						</FormItem>
					</Col>
						
					<!--商会-->
					<Col v-if="formData.nature === 1" :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem label="所属地" prop="originPlace">
							<cascader-area v-model="formData.originPlace" style="max-width: 300px;" />
						</FormItem>
					</Col>
					<!--商会-->
						
					<!--协会-->
					<Col v-if="formData.nature === 0" :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem label="行业" prop="industry">
							<industry-casc v-model="formData.industry" style="width: 300px;"></industry-casc>
						</FormItem>
					</Col>
					
					<Col v-if="formData.nature === 0" :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem label="成立时间" prop="establishTime">
				       		<DatePicker type="date" 
							@on-change="timeChange" 
							value="formData.establishTime" 
							placeholder="选择日期"
							style="width: 300px;">
							</DatePicker>
						</FormItem>
					</Col>
					<!--协会-->
					
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem label="联系人" prop="linkman">
							<Input v-model="formData.linkman" clearable placeholder="请输入联系人" style="max-width: 300px;" />
						</FormItem>
					</Col>
						
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem label="联系人电话" prop="linkmanPhone">
							<Input v-model="formData.linkmanPhone" clearable placeholder="请输入联系人电话" style="max-width: 300px;" />
						</FormItem>
					</Col>
					
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem :label="title+'网址'">
							<Input v-model="formData.website" clearable placeholder="请输入网址" style="max-width: 300px;" />
						</FormItem>
					</Col>
					
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem :label="title+'公众号'">
							<Input v-model="formData.vipcn" clearable placeholder="请输入公众号" style="max-width: 300px;" />
						</FormItem>
					</Col>
					
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem :label="title+'标志'">
							<Icon style="cursor: pointer;" type="md-image" @click.native="logoClick" size="40"/>
						</FormItem>
					</Col>
					
					<Col span="24">
						<FormItem :label="title+'介绍'">
							<Input v-model="formData.introduce" 
							type="textarea" placeholder="请输入介绍..." />
						</FormItem>
					</Col>
						
				</Row>
				
			</Form>
			
			<div style="text-align: center;padding-top: 16px;">
				<Button type="primary" @click="submit('formInstance')">立即创建</Button>
			</div>
			
		</Card>
		
        <Modal v-model="modalShow" width="80%">
	        <p slot="header">选择文件</p>
	        <file-yun v-model="selectFile"></file-yun>
	    </Modal>
	    
	</div>

</template>

<script>

import industryCasc from '@/components/industry/industry-casc.vue';//行业级联

import fileYun from '@/components/fileY/file-yun.vue';

export default {
	name: 'createChamber',
	components: { //组件模板,
		industryCasc,
		fileYun
	},
	props: { //组件道具（参数）
		/* ****属性用法*****
		 * 
		 * 传递类型 type: Array | Number | String | Object
		 * 为必传 required: true
		 * 默认值 default: ''
		 * 
		 */
		cardStyle: {//卡片样式
			type: Boolean,
			default: true
		},
	},
	data() { //数据
		return {
			
			selectFile: [],
			
			modalShow: false,
			
			title: '商会',
			
			formData: {
				nature: 1,//性质
				name: '',//名称
				superior: '',//上级
				domicile: [],//注册地
				originPlace: [],//所属地
				industry: [],//行业
				establishTime: '',//成立时间
				linkman: '',//联系人
				linkmanPhone: '',//联系人电话
				website: '',//网址
				vipcn: '',//公众号
				introduce: ''//介绍
			},
			
			ruleData: {
				nature: [
					{ type: 'number', required: true, message: '请选择性质', trigger: 'change' }
				],
				name: [
					{ required: true, message: '请输入名称', trigger: 'blur' }
				],
				domicile: [
					{ type: 'array', required: true, message: '请选择注册地', trigger: 'change' }
				],
				originPlace: [
					{ type: 'array', required: true, message: '请选择所属地', trigger: 'change' }
				],
				industry: [
					{ type: 'array', required: true, message: '请选择行业', trigger: 'change' }
				],
				establishTime: [
					{ required: true, message: '请选择成立时间', trigger: 'change' }
				],
				linkman: [
					{ required: true, message: '请输入联系人', trigger: 'blur' }
				],
				linkmanPhone: [
					{ required: true, message: '请输入联系人电话', trigger: 'blur' }
				],
			}
		}
	},
	methods: { //方法
		
		RadioGroupChange(val){
			if(val === 1){
				this.title = '商会';
			}else if(val === 2){
				this.title = '协会';
			}
		},
		
		timeChange(date){//成立时间
			this.formData.establishTime = date;
		},
		
		logoClick(){//图标选择
			this.modalShow = true;
		},
		
		submit(name){//提交数据
			
			let publicData = {//公共数据
				isshang: this.formData.nature,//商会还是协会
				name: this.formData.name, //名称
				nation: 86, //注册地国家
				provice: this.formData.domicile[0] || 666, //注册地省
				city: this.formData.domicile[1] || 666, //注册地市
				county: this.formData.domicile[2] || 666, //注册地县
				town: this.formData.domicile[3] || 666, //注册地镇
				contact: this.formData.linkman, //联系人
				mobile: this.formData.linkmanPhone, //电话
				website: this.formData.website, //网址
				gzh: this.formData.vipcn, //公众号
				introduce: this.formData.introduce, //介绍
				nation2: 86, //所属地国家
				fid: 0, //上级商协会ID
				icon: 'icon', //标志
			}
			
			let coceralData = {//商会数据
				provice2: this.formData.originPlace[0] || 666, //所属地省
				city2: this.formData.originPlace[1] || 666, //所属地城市
				county2: this.formData.originPlace[2] || 666, //所属地县
				town2: this.formData.originPlace[3] || 666, //所属地镇
			}
			
			let associationData = {//协会数据
				hx1: this.formData.industry[0] || 666, //协会一级行业
				hx2: this.formData.industry[1] || 666, //协会二级行业
				setup_time: this.formData.establishTime, //协会成立时间
			}
			
			this.$refs[name].validate((valid) => {
				
                if (valid) {
                	
                	let Datatype = () => {
                		if(this.formData.nature === 1){//商会
                			return coceralData;
	                	}else if(this.formData.nature === 0){//协会
	                		return associationData;
	                	}
	                	return {};
                	}
                	
                	$ax.getAjaxData('user.Comm/addOrganize', Object.assign({}, publicData, Datatype()), res => {
						if(res.code == 0){
							this.$emit('on-create-succeed');
							
							this.$refs[name].resetFields();
							
							this.$Message.success('创建成功!');
						}
					});
                    
                }
                
            })
			
		},
		
	},
	computed: { //计算属性

	},
	watch: { //监测数据变化
		
	},

	//===================组件钩子===========================

	created() { //实例被创建完毕之后执行

	},
	mounted() { //模板被渲染完毕之后执行
		
	},
	
}
</script>

<style scoped lang="less">
</style>